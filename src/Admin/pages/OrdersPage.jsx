import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import AdminHeader from '../layouts/AdminHeader';
import SearchInput from '../components/common/SearchInput';
import OrderList from '../components/orders/OrderList';
import OrderDetails from '../components/orders/OrderDetails';
import { useTheme } from '../contexts';
import { mockOrders } from '../data/mockData';

export default function OrdersPage() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin-login');
      return;
    }
    const savedOrders = JSON.parse(localStorage.getItem('adminOrders') || 'null');
    setOrders(savedOrders || mockOrders);
  }, [navigate]);

  const statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  const filteredOrders = orders
    .filter(order => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = (
        order.id.toLowerCase().includes(searchLower) ||
        order.customerName.toLowerCase().includes(searchLower)
      );
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleUpdateStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('adminOrders', JSON.stringify(updatedOrders));

    // Update selected order if it's the one being changed
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return (
    <div className="min-h-screen">
      <AdminHeader title={t('orders.title')} />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="w-full sm:w-80">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={t('orders.searchOrders')}
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              <Filter className={`w-4 h-4 ${isDark ? 'text-[#666]' : 'text-gray-400'}`} />
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    statusFilter === status
                      ? 'bg-[#d4af37] text-[#0d0d0d]'
                      : isDark
                        ? 'bg-[#2a2a2a] text-[#a8a8a8] hover:bg-[#3a3a3a]'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status === 'all' ? t('orders.allStatuses') : t(`orders.${status}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Orders List */}
          <OrderList
            orders={filteredOrders}
            onViewDetails={setSelectedOrder}
          />
        </motion.div>
      </div>

      {/* Order Details Modal */}
      <OrderDetails
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
