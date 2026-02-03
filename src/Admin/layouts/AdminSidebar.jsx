import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  FileText,
  Star,
  Users,
  ShoppingCart,
  LogOut,
  Home,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../contexts';
import { useDirection } from '../hooks';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator
} from '@/components/ui/sidebar';

export default function AdminSidebar() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { sidebarSide } = useDirection();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: t('sidebar.dashboard'), exact: true },
    { path: '/admin/products', icon: Package, label: t('sidebar.products') },
    { path: '/admin/articles', icon: FileText, label: t('sidebar.articles') },
    { path: '/admin/reviews', icon: Star, label: t('sidebar.reviews') },
    { path: '/admin/users', icon: Users, label: t('sidebar.users') },
    { path: '/admin/orders', icon: ShoppingCart, label: t('sidebar.orders') }
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    navigate('/admin-login');
  };

  return (
    <Sidebar side={sidebarSide} className={isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#cd7f32] rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#0d0d0d]" />
          </div>
          <div>
            <h1 className={`font-bold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
              {t('sidebar.adminPanel')}
            </h1>
            <p className={`text-xs ${isDark ? 'text-[#666]' : 'text-gray-400'}`}>
              Ethereal Artistry
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator className={isDark ? 'bg-[#2a2a2a]' : 'bg-gray-200'} />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.label}
                  >
                    <NavLink
                      to={item.path}
                      end={item.exact}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-base font-medium ${
                          isActive
                            ? 'bg-[#d4af37]/20 text-[#d4af37] border-l-4 border-[#d4af37]'
                            : isDark
                              ? 'text-[#a8a8a8] hover:bg-[#2a2a2a] hover:text-[#f5f5f0]'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-2">
        <SidebarSeparator className={isDark ? 'bg-[#2a2a2a]' : 'bg-gray-200'} />

        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-base font-medium ${
            isDark
              ? 'text-[#a8a8a8] hover:bg-[#2a2a2a] hover:text-[#f5f5f0]'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>{t('sidebar.backToSite')}</span>
        </motion.button>

        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-base font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>{t('sidebar.logout')}</span>
        </motion.button>
      </SidebarFooter>
    </Sidebar>
  );
}
