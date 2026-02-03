import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, MapPin, Clock, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts';

export default function OrderDetails({ isOpen, onClose, order, onUpdateStatus }) {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  if (!order) return null;

  const statusColors = {
    pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    processing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    shipped: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    delivered: 'bg-green-500/20 text-green-400 border-green-500/30',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  const handleStatusChange = (newStatus) => {
    onUpdateStatus(order.id, newStatus);
    setShowStatusDropdown(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 ${isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-gray-200'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                  {t('orders.viewDetails')}
                </h2>
                <p className={`text-sm ${isDark ? 'text-[#d4af37]' : 'text-amber-600'} font-mono`}>
                  {order.id}
                </p>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-[#2a2a2a] text-[#a8a8a8]' : 'hover:bg-gray-100 text-gray-500'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status & Date */}
            <div className={`flex items-center justify-between p-4 rounded-xl mb-6 ${isDark ? 'bg-[#0d0d0d]' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                <Clock className={`w-5 h-5 ${isDark ? 'text-[#666]' : 'text-gray-400'}`} />
                <span className={isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}>
                  {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}
                </span>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${statusColors[order.status]}`}
                >
                  {t(`orders.${order.status}`)}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showStatusDropdown ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showStatusDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`absolute right-0 top-full mt-2 w-40 rounded-xl border shadow-xl overflow-hidden z-10 ${
                        isDark ? 'bg-[#1a1a1a] border-[#3a3a3a]' : 'bg-white border-gray-200'
                      }`}
                    >
                      {statuses.map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(status)}
                          className={`w-full px-4 py-2 text-start text-sm transition-colors ${
                            status === order.status
                              ? isDark ? 'bg-[#2a2a2a]' : 'bg-gray-100'
                              : isDark ? 'hover:bg-[#2a2a2a]' : 'hover:bg-gray-50'
                          } ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}
                        >
                          {t(`orders.${status}`)}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Customer & Shipping */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className={`p-4 rounded-xl ${isDark ? 'bg-[#0d0d0d]' : 'bg-gray-50'}`}>
                <h3 className={`font-semibold mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                  {t('orders.customer')}
                </h3>
                <p className={isDark ? 'text-[#a8a8a8]' : 'text-gray-600'}>
                  {order.customerName}
                </p>
              </div>
              <div className={`p-4 rounded-xl ${isDark ? 'bg-[#0d0d0d]' : 'bg-gray-50'}`}>
                <h3 className={`font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                  <MapPin className="w-4 h-4" />
                  {t('orders.shippingAddress')}
                </h3>
                <p className={isDark ? 'text-[#a8a8a8]' : 'text-gray-600'}>
                  {order.shippingAddress}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className={`font-semibold mb-4 flex items-center gap-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                <Package className="w-5 h-5" />
                {t('orders.items')} ({order.items.length})
              </h3>

              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-xl ${
                      isDark ? 'bg-[#0d0d0d]' : 'bg-gray-50'
                    }`}
                  >
                    <div>
                      <p className={`font-medium ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                        {item.title}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-[#666]' : 'text-gray-400'}`}>
                        x{item.quantity}
                      </p>
                    </div>
                    <span className="font-semibold text-[#d4af37]">
                      ₪{item.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className={`flex items-center justify-between p-4 mt-4 rounded-xl border-2 ${
                isDark ? 'border-[#d4af37]/30 bg-[#d4af37]/10' : 'border-amber-300 bg-amber-50'
              }`}>
                <span className={`font-semibold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                  {t('orders.total')}
                </span>
                <span className="text-xl font-bold text-[#d4af37]">
                  ₪{order.total.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
