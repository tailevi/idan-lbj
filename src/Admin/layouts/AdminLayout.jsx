import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../contexts';
import { useDirection } from '../hooks';
import AdminSidebar from './AdminSidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import '../styles/admin.css';

export default function AdminLayout() {
  const { isDark } = useTheme();
  const { direction } = useDirection();

  return (
    <div
      dir={direction}
      className={`admin-container ${isDark ? '' : 'light'}`}
    >
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset className={isDark ? 'bg-[#0d0d0d]' : 'bg-gray-50'}>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
