import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, LogOut, Package } from 'lucide-react';
import AddProduct from '../components/admin/AddProduct';
import EditProduct from '../components/admin/EditProduct';

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('add');

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin-login');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    navigate('/admin-login');
  };

  const tabs = [
    { id: 'add', label: 'הוסף מוצר', icon: Plus },
    { id: 'edit', label: 'ערוך מוצר', icon: Edit }
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      {/* Header */}
      <div className="bg-[#1a1a1a] border-b border-[#2a2a2a] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-[#a8a8a8] hover:text-[#f5f5f0] transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>התנתק</span>
            </motion.button>

            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-[#f5f5f0]">פאנל ניהול</h1>
              <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#cd7f32] rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-[#0d0d0d]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#151515] border-b border-[#2a2a2a]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1" dir="rtl">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-[#d4af37]'
                    : 'text-[#a8a8a8] hover:text-[#f5f5f0]'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37]"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'add' && <AddProduct />}
          {activeTab === 'edit' && <EditProduct />}
        </motion.div>
      </div>

      {/* Back to site button */}
      <div className="fixed bottom-6 left-6">
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#2a2a2a] text-[#a8a8a8] hover:text-[#f5f5f0] px-4 py-2 rounded-xl border border-[#3a3a3a] transition-colors text-sm"
        >
          חזרה לאתר
        </motion.button>
      </div>
    </div>
  );
}
