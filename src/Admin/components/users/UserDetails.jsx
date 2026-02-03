import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, ShoppingBag, Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts';
import { mockOrders } from '../../data/mockData';

export default function UserDetails({ isOpen, onClose, user }) {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  if (!user) return null;

  const userOrders = mockOrders.filter(order => order.userId === user.id);

  const statusColors = {
    pending: 'bg-amber-500/20 text-amber-400',
    processing: 'bg-blue-500/20 text-blue-400',
    shipped: 'bg-purple-500/20 text-purple-400',
    delivered: 'bg-green-500/20 text-green-400',
    cancelled: 'bg-red-500/20 text-red-400'
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
              <h2 className={`text-xl font-bold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                {t('users.viewDetails')}
              </h2>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-[#2a2a2a] text-[#a8a8a8]' : 'hover:bg-gray-100 text-gray-500'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Info */}
            <div className={`p-4 rounded-xl mb-6 ${isDark ? 'bg-[#0d0d0d]' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${
                  isDark ? 'bg-[#2a2a2a] text-[#d4af37]' : 'bg-amber-100 text-amber-600'
                }`}>
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                    {user.firstName} {user.lastName}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className={`text-sm ${isDark ? 'text-[#a8a8a8]' : 'text-gray-500'}`}>
                      {user.totalOrders} {t('users.totalOrders').toLowerCase()}
                    </span>
                    <span className="text-[#d4af37] font-semibold">
                      ₪{user.totalSpent.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className={`w-5 h-5 ${isDark ? 'text-[#666]' : 'text-gray-400'}`} />
                  <span className={isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}>{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className={`w-5 h-5 ${isDark ? 'text-[#666]' : 'text-gray-400'}`} />
                  <span className={isDark ? 'text-[#f5f5f0]' : 'text-gray-900'} dir="ltr">{user.phone}</span>
                </div>
                <div className="flex items-center gap-3 md:col-span-2">
                  <MapPin className={`w-5 h-5 ${isDark ? 'text-[#666]' : 'text-gray-400'}`} />
                  <span className={isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}>{user.address}</span>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                <ShoppingBag className="w-5 h-5" />
                {t('users.orderHistory')}
              </h3>

              {userOrders.length === 0 ? (
                <div className={`text-center py-8 rounded-xl border ${isDark ? 'border-[#2a2a2a]' : 'border-gray-200'}`}>
                  <Package className={`w-10 h-10 mx-auto mb-2 ${isDark ? 'text-[#666]' : 'text-gray-300'}`} />
                  <p className={isDark ? 'text-[#666]' : 'text-gray-400'}>{t('users.noOrders')}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {userOrders.map((order) => (
                    <div
                      key={order.id}
                      className={`p-4 rounded-xl border ${isDark ? 'bg-[#0d0d0d] border-[#2a2a2a]' : 'bg-gray-50 border-gray-200'}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className={`font-mono text-sm ${isDark ? 'text-[#d4af37]' : 'text-amber-600'}`}>
                            {order.id}
                          </span>
                          <span className={`text-sm ${isDark ? 'text-[#666]' : 'text-gray-400'}`}>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                          {t(`orders.${order.status}`)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${isDark ? 'text-[#a8a8a8]' : 'text-gray-500'}`}>
                          {order.items.length} {t('orders.items').toLowerCase()}
                        </span>
                        <span className={`font-semibold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                          ₪{order.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
