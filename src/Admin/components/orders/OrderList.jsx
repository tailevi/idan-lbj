import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts';
import DataTable from '../common/DataTable';

export default function OrderList({ orders, onViewDetails }) {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const statusColors = {
    pending: 'bg-amber-500/20 text-amber-400',
    processing: 'bg-blue-500/20 text-blue-400',
    shipped: 'bg-purple-500/20 text-purple-400',
    delivered: 'bg-green-500/20 text-green-400',
    cancelled: 'bg-red-500/20 text-red-400'
  };

  if (orders.length === 0) {
    return (
      <div className={`text-center py-12 rounded-xl border ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
        <ShoppingCart className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-[#666]' : 'text-gray-300'}`} />
        <p className={isDark ? 'text-[#666]' : 'text-gray-400'}>{t('common.noResults')}</p>
      </div>
    );
  }

  const columns = [
    {
      key: 'id',
      label: t('orders.orderId'),
      sortable: true,
      render: (id) => (
        <span className={`font-mono ${isDark ? 'text-[#d4af37]' : 'text-amber-600'}`}>
          {id}
        </span>
      )
    },
    {
      key: 'customerName',
      label: t('orders.customer'),
      sortable: true
    },
    {
      key: 'createdAt',
      label: t('orders.date'),
      sortable: true,
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      key: 'items',
      label: t('orders.items'),
      render: (items) => (
        <span className={`px-2 py-1 rounded-lg ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-100'}`}>
          {items.length}
        </span>
      )
    },
    {
      key: 'total',
      label: t('orders.total'),
      sortable: true,
      render: (value) => (
        <span className="font-semibold">
          ₪{value.toLocaleString()}
        </span>
      )
    },
    {
      key: 'status',
      label: t('orders.status'),
      sortable: true,
      render: (status) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
          {t(`orders.${status}`)}
        </span>
      )
    },
    {
      key: 'actions',
      label: '',
      render: (_, order) => (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onViewDetails(order)}
          className={`p-2 rounded-lg transition-colors ${
            isDark ? 'hover:bg-[#2a2a2a] text-[#d4af37]' : 'hover:bg-gray-100 text-amber-600'
          }`}
          title={t('orders.viewDetails')}
        >
          <Eye className="w-5 h-5" />
        </motion.button>
      )
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={orders}
      onRowClick={onViewDetails}
    />
  );
}
