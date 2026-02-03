import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Package, X, MapPin, Calendar, Truck } from 'lucide-react';
import { useTheme, useAuth } from '../contexts';

export default function OrdersPage() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { getOrders } = useAuth();
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = getOrders();

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'current') return ['pending', 'processing', 'shipped'].includes(order.status);
    if (filter === 'past') return ['delivered', 'cancelled'].includes(order.status);
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'shipped': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'delivered': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('he-IL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const filterOptions = [
    { value: 'all', label: t('orders.all') },
    { value: 'current', label: t('orders.current') },
    { value: 'past', label: t('orders.past') }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className={`text-2xl font-bold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
          {t('orders.title')}
        </h1>

        {/* Filter Tabs */}
        <div className={`flex rounded-xl p-1 ${isDark ? 'bg-[#1a1a1a]' : 'bg-gray-100'}`}>
          {filterOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === option.value
                  ? 'bg-[#d4af37] text-[#0d0d0d]'
                  : isDark ? 'text-[#a8a8a8] hover:text-[#f5f5f0]' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-center py-16 rounded-2xl border ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}
        >
          <Package className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-[#2a2a2a]' : 'text-gray-300'}`} />
          <p className={isDark ? 'text-[#a8a8a8]' : 'text-gray-500'}>
            {t('orders.noOrders')}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}
            >
              {/* Order Header */}
              <div className={`p-4 border-b ${isDark ? 'border-[#2a2a2a]' : 'border-gray-200'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className={`font-semibold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                      {order.id}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                      {t(`orders.${order.status}`)}
                    </span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-[#a8a8a8]' : 'text-gray-500'}`}>
                    <Calendar className="w-4 h-4" />
                    {formatDate(order.createdAt)}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4">
                <div className="space-y-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || '/products/placeholder.webp'}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium truncate ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                          {item.title}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-[#a8a8a8]' : 'text-gray-500'}`}>
                          {item.size} | {t('orders.items')}: {item.quantity}
                        </p>
                      </div>
                      <p className="text-[#d4af37] font-medium">
                        ₪{item.price.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Footer */}
              <div className={`p-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${isDark ? 'border-[#2a2a2a] bg-[#0d0d0d]/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-[#a8a8a8]' : 'text-gray-500'}`}>
                  <MapPin className="w-4 h-4" />
                  {order.shippingAddress}
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-lg font-bold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                    {t('orders.total')}: ₪{order.total.toLocaleString()}
                  </span>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] font-medium rounded-xl text-sm"
                  >
                    {t('orders.viewDetails')}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`w-full max-w-lg rounded-2xl p-6 ${isDark ? 'bg-[#1a1a1a]' : 'bg-white'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                  {selectedOrder.id}
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className={`p-2 rounded-lg ${isDark ? 'hover:bg-[#2a2a2a]' : 'hover:bg-gray-100'}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Timeline */}
              <div className="mb-6">
                <div className={`flex items-center gap-2 p-3 rounded-xl ${getStatusColor(selectedOrder.status)}`}>
                  <Truck className="w-5 h-5" />
                  <span className="font-medium">{t(`orders.${selectedOrder.status}`)}</span>
                </div>
              </div>

              {/* Order Info */}
              <div className="space-y-4">
                <div>
                  <p className={`text-sm ${isDark ? 'text-[#a8a8a8]' : 'text-gray-500'}`}>
                    {t('orders.orderDate')}
                  </p>
                  <p className={isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}>
                    {formatDate(selectedOrder.createdAt)}
                  </p>
                </div>

                {selectedOrder.shippedAt && (
                  <div>
                    <p className={`text-sm ${isDark ? 'text-[#a8a8a8]' : 'text-gray-500'}`}>
                      {t('orders.shippedDate')}
                    </p>
                    <p className={isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}>
                      {formatDate(selectedOrder.shippedAt)}
                    </p>
                  </div>
                )}

                {selectedOrder.deliveredAt && (
                  <div>
                    <p className={`text-sm ${isDark ? 'text-[#a8a8a8]' : 'text-gray-500'}`}>
                      {t('orders.deliveredDate')}
                    </p>
                    <p className={isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}>
                      {formatDate(selectedOrder.deliveredAt)}
                    </p>
                  </div>
                )}

                <div>
                  <p className={`text-sm ${isDark ? 'text-[#a8a8a8]' : 'text-gray-500'}`}>
                    {t('orders.shippingAddress')}
                  </p>
                  <p className={isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}>
                    {selectedOrder.shippingAddress}
                  </p>
                </div>

                <div className={`pt-4 border-t ${isDark ? 'border-[#2a2a2a]' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-center">
                    <span className={`font-medium ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                      {t('orders.total')}
                    </span>
                    <span className="text-2xl font-bold text-[#d4af37]">
                      ₪{selectedOrder.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
