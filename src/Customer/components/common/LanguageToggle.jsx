import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { useTheme } from '../../contexts';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const { isDark = true } = useTheme() || {};

  const toggleLanguage = () => {
    const newLang = i18n.language === 'he' ? 'en' : 'he';
    i18n.changeLanguage(newLang);
    localStorage.setItem('customerLanguage', newLang);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
        isDark
          ? 'bg-[#1a1a1a] text-[#a8a8a8] hover:text-[#d4af37] border border-[#2a2a2a]'
          : 'bg-gray-100 text-gray-600 hover:text-[#d4af37] border border-gray-200'
      }`}
    >
      <Languages className="w-4 h-4" />
      <span className="text-sm font-medium">
        {i18n.language === 'he' ? 'EN' : 'עב'}
      </span>
    </motion.button>
  );
}
