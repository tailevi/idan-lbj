import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import CustomerSidebar from './CustomerSidebar';
import CustomerHeader from './CustomerHeader';
import { useTheme } from '../contexts';
import { useDirection } from '../hooks';

export default function CustomerLayout() {
  const { isDark } = useTheme();
  const { direction } = useDirection();

  return (
    <div dir={direction} className={`customer-container min-h-screen ${isDark ? 'dark' : 'light'}`}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <CustomerSidebar />
          <main className="flex-1">
            <CustomerHeader />
            <div className="p-4 md:p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </SidebarProvider>

      <style>{`
        .customer-container {
          --customer-bg-primary: #0d0d0d;
          --customer-bg-secondary: #1a1a1a;
          --customer-bg-tertiary: #2a2a2a;
          --customer-border: #3a3a3a;
          --customer-text-primary: #f5f5f0;
          --customer-text-secondary: #a8a8a8;
          --customer-text-muted: #666666;
          --customer-gold: #d4af37;
          --customer-gold-dark: #cd7f32;
        }

        .customer-container.light {
          --customer-bg-primary: #ffffff;
          --customer-bg-secondary: #f5f5f5;
          --customer-bg-tertiary: #e5e5e5;
          --customer-border: #d1d5db;
          --customer-text-primary: #1a1a1a;
          --customer-text-secondary: #4b5563;
          --customer-text-muted: #9ca3af;
        }

        .customer-container {
          background-color: var(--customer-bg-primary);
          color: var(--customer-text-primary);
        }
      `}</style>
    </div>
  );
}
