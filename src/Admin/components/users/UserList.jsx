import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Users, Mail, Shield, ToggleLeft, ToggleRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts';
import DataTable from '../common/DataTable';

export default function UserList({ users, onEdit, onDelete, onToggleEnabled }) {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  if (users.length === 0) {
    return (
      <div className={`text-center py-12 rounded-xl border ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
        <Users className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-[#666]' : 'text-gray-300'}`} />
        <p className={isDark ? 'text-[#666]' : 'text-gray-400'}>{t('common.noResults')}</p>
      </div>
    );
  }

  const columns = [
    {
      key: 'username',
      label: t('users.username'),
      sortable: true,
      render: (username) => (
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
            isDark ? 'bg-[#2a2a2a] text-[#d4af37]' : 'bg-amber-100 text-amber-600'
          }`}>
            {username ? username.charAt(0).toUpperCase() : '?'}
          </div>
          <span className={`font-medium ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
            {username}
          </span>
        </div>
      )
    },
    {
      key: 'email',
      label: t('users.email'),
      sortable: true,
      render: (email) => (
        <div className="flex items-center gap-2">
          <Mail className={`w-4 h-4 ${isDark ? 'text-[#666]' : 'text-gray-400'}`} />
          <span>{email}</span>
        </div>
      )
    },
    {
      key: 'role',
      label: t('users.role'),
      sortable: true,
      render: (role) => (
        <div className="flex items-center gap-2">
          <Shield className={`w-4 h-4 ${role === 'ADMIN' ? 'text-[#d4af37]' : isDark ? 'text-[#666]' : 'text-gray-400'}`} />
          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
            role === 'ADMIN'
              ? 'bg-[#d4af37]/20 text-[#d4af37]'
              : isDark ? 'bg-[#2a2a2a] text-[#a8a8a8]' : 'bg-gray-100 text-gray-600'
          }`}>
            {role === 'ADMIN' ? t('users.roleAdmin') : t('users.roleUser')}
          </span>
        </div>
      )
    },
    {
      key: 'enabled',
      label: t('users.status'),
      render: (enabled, user) => (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleEnabled(user);
          }}
          className="flex items-center gap-2"
          title={t('users.toggleEnabled')}
        >
          {enabled ? (
            <ToggleRight className="w-6 h-6 text-green-500" />
          ) : (
            <ToggleLeft className={`w-6 h-6 ${isDark ? 'text-[#666]' : 'text-gray-400'}`} />
          )}
          <span className={`text-xs font-medium ${
            enabled ? 'text-green-500' : isDark ? 'text-[#666]' : 'text-gray-400'
          }`}>
            {enabled ? t('users.enabled') : t('users.disabled')}
          </span>
        </motion.button>
      )
    },
    {
      key: 'createdAt',
      label: t('users.createdAt'),
      sortable: true,
      render: (value) => (
        <span className={isDark ? 'text-[#a8a8a8]' : 'text-gray-500'}>
          {value ? new Date(value).toLocaleDateString() : '-'}
        </span>
      )
    },
    {
      key: 'actions',
      label: '',
      render: (_, user) => (
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(user);
            }}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? 'hover:bg-[#2a2a2a] text-[#d4af37]' : 'hover:bg-gray-100 text-amber-600'
            }`}
            title={t('common.edit')}
          >
            <Edit2 className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(user);
            }}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? 'hover:bg-red-500/20 text-red-400' : 'hover:bg-red-50 text-red-500'
            }`}
            title={t('common.delete')}
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      )
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={users}
    />
  );
}
