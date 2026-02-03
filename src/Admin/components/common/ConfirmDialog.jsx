import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts';

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmLabel, variant = 'danger' }) {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const variantStyles = {
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    warning: 'bg-amber-500 hover:bg-amber-600 text-white',
    primary: 'bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d]'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`rounded-2xl p-6 max-w-md w-full ${
              isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-gray-200'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${variant === 'danger' ? 'bg-red-500/20' : 'bg-amber-500/20'}`}>
                  <AlertTriangle className={`w-5 h-5 ${variant === 'danger' ? 'text-red-500' : 'text-amber-500'}`} />
                </div>
                <h3 className={`text-lg font-bold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                  {title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-[#2a2a2a] text-[#a8a8a8]' : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className={`mb-6 ${isDark ? 'text-[#a8a8a8]' : 'text-gray-600'}`}>
              {message}
            </p>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                  isDark
                    ? 'bg-[#2a2a2a] text-[#f5f5f0] hover:bg-[#3a3a3a]'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={onConfirm}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${variantStyles[variant]}`}
              >
                {confirmLabel || t('common.confirm')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
