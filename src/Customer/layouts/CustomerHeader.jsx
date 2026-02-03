import React from 'react';
import { useTranslation } from 'react-i18next';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useTheme, useAuth } from '../contexts';
import { useDirection } from '../hooks';
import LanguageToggle from '../components/common/LanguageToggle';
import ThemeToggle from '../components/common/ThemeToggle';

export default function CustomerHeader({ title }) {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { customer } = useAuth();
  const { isRTL } = useDirection();

  return (
    <header className={`sticky top-0 z-40 flex items-center justify-between px-4 md:px-6 py-4 border-b ${
      isDark ? 'bg-[#0d0d0d] border-[#1a1a1a]' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center gap-4">
        <SidebarTrigger className={isDark ? 'text-[#a8a8a8] hover:text-[#f5f5f0]' : 'text-gray-500 hover:text-gray-900'} />
        {title && (
          <h1 className={`text-xl font-semibold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg ${isDark ? 'bg-[#1a1a1a]' : 'bg-gray-100'}`}>
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className={`text-sm ${isDark ? 'text-[#a8a8a8]' : 'text-gray-600'}`}>
            {customer?.email}
          </span>
        </div>
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </header>
  );
}
