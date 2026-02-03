import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Users, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts';
import DataTable from '../common/DataTable';

export default function UserList({ users, onViewDetails }) {
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
      key: 'name',
      label: t('users.name'),
      sortable: true,
      render: (_, user) => (
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
            isDark ? 'bg-[#2a2a2a] text-[#d4af37]' : 'bg-amber-100 text-amber-600'
          }`}>
            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
          </div>
          <div>
            <p className={`font-medium ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
              {user.firstName} {user.lastName}
            </p>
          </div>
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
      key: 'phone',
      label: t('users.phone'),
      render: (phone) => (
        <div className="flex items-center gap-2">
          <Phone className={`w-4 h-4 ${isDark ? 'text-[#666]' : 'text-gray-400'}`} />
          <span dir="ltr">{phone}</span>
        </div>
      )
    },
    {
      key: 'totalOrders',
      label: t('users.totalOrders'),
      sortable: true,
      render: (value) => (
        <span className={`px-2 py-1 rounded-lg ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-100'}`}>
          {value}
        </span>
      )
    },
    {
      key: 'totalSpent',
      label: t('users.totalSpent'),
      sortable: true,
      render: (value) => (
        <span className="text-[#d4af37] font-semibold">
          ₪{value.toLocaleString()}
        </span>
      )
    },
    {
      key: 'actions',
      label: '',
      render: (_, user) => (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onViewDetails(user)}
          className={`p-2 rounded-lg transition-colors ${
            isDark ? 'hover:bg-[#2a2a2a] text-[#d4af37]' : 'hover:bg-gray-100 text-amber-600'
          }`}
          title={t('users.viewDetails')}
        >
          <Eye className="w-5 h-5" />
        </motion.button>
      )
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={users}
      onRowClick={onViewDetails}
    />
  );
}
