import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Lock, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import { useTheme, useAuth } from '../contexts';
import { useDirection } from '../hooks';

export default function SecurityPage() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { changePassword } = useAuth();
  const { isRTL } = useDirection();

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError(t('security.passwordMismatch'));
      return;
    }

    if (formData.newPassword.length < 4) {
      setError(t('register.passwordTooShort'));
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const result = changePassword(formData.currentPassword, formData.newPassword);

      if (result.success) {
        setShowSuccess(true);
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        setError(t('security.incorrectPassword'));
      }
      setIsLoading(false);
    }, 500);
  };

  const inputClass = `w-full rounded-xl px-12 py-3 focus:outline-none focus:border-[#d4af37] transition-colors ${
    isDark
      ? 'bg-[#0d0d0d] border border-[#3a3a3a] text-[#f5f5f0] placeholder-[#666]'
      : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
  }`;

  const togglePassword = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-bold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
          {t('security.title')}
        </h1>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-2 p-4 bg-green-500/20 text-green-400 rounded-xl border border-green-500/30"
        >
          <Check className="w-5 h-5" />
          {t('security.passwordUpdated')}
        </motion.div>
      )}

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl border p-6 ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}
      >
        <h2 className={`text-lg font-semibold mb-6 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
          {t('security.changePassword')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Password */}
          <div>
            <label className={`block text-sm mb-2 ${isDark ? 'text-[#a8a8a8]' : 'text-gray-600'}`}>
              {t('security.currentPassword')}
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                value={formData.currentPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                className={inputClass}
                dir="ltr"
              />
              <Lock className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-[#666]' : 'text-gray-400'} ${isRTL ? 'right-4' : 'left-4'}`} />
              <button
                type="button"
                onClick={() => togglePassword('current')}
                className={`absolute top-1/2 -translate-y-1/2 ${isDark ? 'text-[#666] hover:text-[#a8a8a8]' : 'text-gray-400 hover:text-gray-600'} ${isRTL ? 'left-4' : 'right-4'}`}
              >
                {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className={`block text-sm mb-2 ${isDark ? 'text-[#a8a8a8]' : 'text-gray-600'}`}>
              {t('security.newPassword')}
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                value={formData.newPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                className={inputClass}
                dir="ltr"
              />
              <Lock className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-[#666]' : 'text-gray-400'} ${isRTL ? 'right-4' : 'left-4'}`} />
              <button
                type="button"
                onClick={() => togglePassword('new')}
                className={`absolute top-1/2 -translate-y-1/2 ${isDark ? 'text-[#666] hover:text-[#a8a8a8]' : 'text-gray-400 hover:text-gray-600'} ${isRTL ? 'left-4' : 'right-4'}`}
              >
                {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className={`block text-sm mb-2 ${isDark ? 'text-[#a8a8a8]' : 'text-gray-600'}`}>
              {t('security.confirmPassword')}
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className={inputClass}
                dir="ltr"
              />
              <Lock className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-[#666]' : 'text-gray-400'} ${isRTL ? 'right-4' : 'left-4'}`} />
              <button
                type="button"
                onClick={() => togglePassword('confirm')}
                className={`absolute top-1/2 -translate-y-1/2 ${isDark ? 'text-[#666] hover:text-[#a8a8a8]' : 'text-gray-400 hover:text-gray-600'} ${isRTL ? 'left-4' : 'right-4'}`}
              >
                {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-xl"
            >
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? t('security.updating') : t('security.updatePassword')}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
