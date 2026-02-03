import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu } from 'lucide-react';
import { useTheme } from '../contexts';
import { useDirection } from '../hooks';
import ThemeToggle from '../components/common/ThemeToggle';
import LanguageToggle from '../components/common/LanguageToggle';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function AdminHeader({ title }) {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { isRTL } = useDirection();

  return (
    <header className={`sticky top-0 z-40 border-b ${
      isDark ? 'bg-[#0d0d0d]/95 border-[#2a2a2a]' : 'bg-white/95 border-gray-200'
    } backdrop-blur-sm`}>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <SidebarTrigger className={`md:hidden ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
            <Menu className="w-6 h-6" />
          </SidebarTrigger>
          <h1 className={`text-xl font-bold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
