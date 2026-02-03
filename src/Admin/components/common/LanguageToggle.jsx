import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const { isDark } = useTheme();
  const isHebrew = i18n.language === 'he';

  const toggleLanguage = () => {
    const newLang = isHebrew ? 'en' : 'he';
    i18n.changeLanguage(newLang);
    localStorage.setItem('admin-language', newLang);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-3 py-2 rounded-xl font-medium text-sm transition-colors ${
        isDark
          ? 'bg-[#2a2a2a] text-[#f5f5f0] hover:bg-[#3a3a3a]'
          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
      }`}
      title={isHebrew ? 'Switch to English' : 'עבור לעברית'}
    >
      {isHebrew ? 'EN' : 'עב'}
    </motion.button>
  );
}
