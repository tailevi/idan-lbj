import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import AdminHeader from '../layouts/AdminHeader';
import SearchInput from '../components/common/SearchInput';
import UserList from '../components/users/UserList';
import UserDetails from '../components/users/UserDetails';
import { mockUsers } from '../data/mockData';

export default function UsersPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin-login');
      return;
    }
    setUsers(mockUsers);
  }, [navigate]);

  const filteredUsers = users.filter(user => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.phone.includes(searchQuery)
    );
  });

  return (
    <div className="min-h-screen">
      <AdminHeader title={t('users.title')} />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Search Bar */}
          <div className="w-full sm:w-80">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={t('users.searchUsers')}
            />
          </div>

          {/* Users List */}
          <UserList
            users={filteredUsers}
            onViewDetails={setSelectedUser}
          />
        </motion.div>
      </div>

      {/* User Details Modal */}
      <UserDetails
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        user={selectedUser}
      />
    </div>
  );
}
