import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Plus, Loader2, AlertCircle } from 'lucide-react';
import { getAdminAuth } from '../../utils/cookies';
import AdminHeader from '../layouts/AdminHeader';
import SearchInput from '../components/common/SearchInput';
import ConfirmDialog from '../components/common/ConfirmDialog';
import UserList from '../components/users/UserList';
import UserForm from '../components/users/UserForm';
import { useTheme } from '../contexts';
import { usersApi } from '../../services/api';

export default function UsersPage() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await usersApi.getAll(0, 100);
      setUsers(data.users);
    } catch (err) {
      if (err.status === 401 || err.status === 403) {
        navigate('/login');
        return;
      }
      setError(err.message || 'Failed to load users');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const isAuthenticated = getAdminAuth();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchUsers();
  }, [navigate, fetchUsers]);

  const filteredUsers = users.filter(user => {
    if (user.role === 'ADMIN') return false;
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      (user.username && user.username.toLowerCase().includes(searchLower)) ||
      (user.email && user.email.toLowerCase().includes(searchLower))
    );
  });

  const handleSaveUser = async (userData) => {
    try {
      setIsSaving(true);
      setError('');
      if (editingUser) {
        const updated = await usersApi.update(editingUser.id, userData);
        setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
      } else {
        const created = await usersApi.create(userData);
        setUsers(prev => [created, ...prev]);
      }
      setIsFormOpen(false);
      setEditingUser(null);
    } catch (err) {
      setError(err.message || 'Failed to save user');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setError('');
      await usersApi.delete(deleteUser.id);
      setUsers(prev => prev.filter(u => u.id !== deleteUser.id));
      setDeleteUser(null);
    } catch (err) {
      setError(err.message || 'Failed to delete user');
      setDeleteUser(null);
    }
  };

  const handleToggleEnabled = async (user) => {
    try {
      setError('');
      const updated = await usersApi.toggleEnabled(user.id);
      setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
    } catch (err) {
      setError(err.message || 'Failed to toggle user status');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen">
      <AdminHeader title={t('users.title')} />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Error Banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-xl"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
              <button
                onClick={() => setError('')}
                className="ml-auto text-red-400 hover:text-red-300"
              >
                &times;
              </button>
            </motion.div>
          )}

          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="w-full sm:w-80">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={t('users.searchUsers')}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setEditingUser(null);
                setIsFormOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] hover:opacity-90 transition-opacity"
            >
              <Plus className="w-5 h-5" />
              {t('users.addUser')}
            </motion.button>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className={`w-8 h-8 animate-spin ${isDark ? 'text-[#d4af37]' : 'text-amber-600'}`} />
            </div>
          ) : (
            <UserList
              users={filteredUsers}
              onEdit={handleEdit}
              onDelete={setDeleteUser}
              onToggleEnabled={handleToggleEnabled}
            />
          )}
        </motion.div>
      </div>

      {/* User Form Modal */}
      <UserForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingUser(null);
        }}
        onSave={handleSaveUser}
        user={editingUser}
        isSaving={isSaving}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteUser}
        onClose={() => setDeleteUser(null)}
        onConfirm={handleDeleteConfirm}
        title={t('common.delete')}
        message={t('users.confirmDelete')}
        confirmLabel={t('common.delete')}
        variant="danger"
      />
    </div>
  );
}
