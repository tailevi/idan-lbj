import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Package, Clock, Wallet, Calendar, ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import { useTheme, useAuth } from '../contexts';
import { useDirection } from '../hooks';

export default function DashboardPage() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { customer, getOrders } = useAuth();
  const { isRTL } = useDirection();

  const orders = getOrders();
  const pendingOrders = orders.filter(o => ['pending', 'processing', 'shipped'].includes(o.status));
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  const stats = [
    {
      icon: Package,
      label: t('dashboard.totalOrders'),
      value: orders.length,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Clock,
      label: t('dashboard.pendingOrders'),
      value: pendingOrders.length,
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: Wallet,
      label: t('dashboard.totalSpent'),
      value: `₪${totalSpent.toLocaleString()}`,
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Calendar,
      label: t('dashboard.memberSince'),
      value: customer?.createdAt ? new Date(customer.createdAt).toLocaleDateString('he-IL', { month: 'short', year: 'numeric' }) : '-',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'processing': return 'bg-blue-500/20 text-blue-400';
      case 'shipped': return 'bg-purple-500/20 text-purple-400';
      case 'delivered': return 'bg-green-500/20 text-green-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className={`text-2xl font-bold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
          {t('dashboard.welcome')}, {customer?.firstName}!
        </h1>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 md:p-6 rounded-2xl border ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <p className={`text-xl md:text-2xl font-bold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
              {stat.value}
            </p>
            <p className={`text-sm ${isDark ? 'text-[#a8a8a8]' : 'text-gray-500'}`}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`p-4 md:p-6 rounded-2xl border ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-lg font-semibold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
            {t('dashboard.recentOrders')}
          </h2>
          <Link
            to="/account/orders"
            className="flex items-center gap-1 text-[#d4af37] hover:underline text-sm"
          >
            {t('dashboard.viewAll')}
            <Arrow className="w-4 h-4" />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-[#2a2a2a]' : 'text-gray-300'}`} />
            <p className={isDark ? 'text-[#a8a8a8]' : 'text-gray-500'}>
              {t('dashboard.noOrders')}
            </p>
            <Link
              to="/Gallery"
              className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] font-medium rounded-xl"
            >
              {t('dashboard.startShopping')}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.slice(0, 3).map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`flex items-center gap-4 p-4 rounded-xl ${isDark ? 'bg-[#0d0d0d]' : 'bg-gray-50'}`}
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={order.items[0]?.image || '/products/placeholder.webp'}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-medium ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                      {order.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {t(`orders.${order.status}`)}
                    </span>
                  </div>
                  <p className={`text-sm truncate ${isDark ? 'text-[#a8a8a8]' : 'text-gray-500'}`}>
                    {order.items.map(i => i.title).join(', ')}
                  </p>
                  <p className="text-[#d4af37] text-sm font-medium mt-1">
                    ₪{order.total.toLocaleString()}
                  </p>
                </div>
                <Link
                  to={`/account/orders?id=${order.id}`}
                  className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-[#2a2a2a]' : 'hover:bg-gray-200'}`}
                >
                  <Arrow className={`w-5 h-5 ${isDark ? 'text-[#a8a8a8]' : 'text-gray-500'}`} />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
