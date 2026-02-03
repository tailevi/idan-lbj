import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import AdminHeader from '../layouts/AdminHeader';
import StatCard from '../components/dashboard/StatCard';
import RevenueChart from '../components/dashboard/RevenueChart';
import OrderStatusChart from '../components/dashboard/OrderStatusChart';
import TopProductsWidget from '../components/dashboard/TopProductsWidget';
import UsersGainedChart from '../components/dashboard/UsersGainedChart';
import OrderTimeGraph from '../components/dashboard/OrderTimeGraph';
import { mockAnalytics } from '../data/mockData';

export default function DashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin-login');
    }
  }, [navigate]);

  const { currentMonth, previousMonth } = mockAnalytics;

  const revenueChange = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue * 100).toFixed(1);
  const ordersChange = ((currentMonth.orders - previousMonth.orders) / previousMonth.orders * 100).toFixed(1);
  const usersChange = ((currentMonth.newUsers - previousMonth.newUsers) / previousMonth.newUsers * 100).toFixed(1);
  const avgOrderChange = ((currentMonth.avgOrderValue - previousMonth.avgOrderValue) / previousMonth.avgOrderValue * 100).toFixed(1);

  return (
    <div className="min-h-screen">
      <AdminHeader title={t('dashboard.title')} />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title={t('dashboard.totalRevenue')}
              value={currentMonth.revenue}
              change={parseFloat(revenueChange)}
              icon={DollarSign}
              prefix="₪"
            />
            <StatCard
              title={t('dashboard.totalOrders')}
              value={currentMonth.orders}
              change={parseFloat(ordersChange)}
              icon={ShoppingCart}
            />
            <StatCard
              title={t('dashboard.newUsers')}
              value={currentMonth.newUsers}
              change={parseFloat(usersChange)}
              icon={Users}
            />
            <StatCard
              title={t('dashboard.avgOrderValue')}
              value={currentMonth.avgOrderValue}
              change={parseFloat(avgOrderChange)}
              icon={TrendingUp}
              prefix="₪"
            />
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart />
            <OrderStatusChart />
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <TopProductsWidget />
            <UsersGainedChart />
            <OrderTimeGraph />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
