import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts';

export default function UserForm({ isOpen, onClose, onSave, user, isSaving }) {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const isEditing = !!user;

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'USER',
    enabled: true,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        password: '',
        role: user.role || 'USER',
        enabled: user.enabled !== false,
      });
    } else {
      setFormData({
        username: '',
        email: '',
        password: '',
        role: 'USER',
        enabled: true,
      });
    }
  }, [user, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData };
    if (isEditing && !data.password) {
      delete data.password;
    }
    onSave(data);
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 ${
    isDark
      ? 'bg-[#0d0d0d] border-[#2a2a2a] text-[#f5f5f0] placeholder-[#666]'
      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
  }`;

  const labelClass = `block text-sm font-medium mb-2 ${isDark ? 'text-[#a8a8a8]' : 'text-gray-600'}`;

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
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={`w-full max-w-lg rounded-2xl p-6 ${
              isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-gray-200'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                {isEditing ? t('users.editUser') : t('users.addUser')}
              </h2>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-[#2a2a2a] text-[#a8a8a8]' : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelClass}>{t('users.username')}</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>{t('users.email')}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>
                  {t('users.password')}
                  {isEditing && (
                    <span className={`text-xs ml-2 ${isDark ? 'text-[#666]' : 'text-gray-400'}`}>
                      ({t('users.passwordHelp')})
                    </span>
                  )}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className={inputClass}
                  required={!isEditing}
                />
              </div>

              <div>
                <label className={labelClass}>{t('users.role')}</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className={inputClass}
                >
                  <option value="USER">{t('users.roleUser')}</option>
                  <option value="ADMIN">{t('users.roleAdmin')}</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <label className={`text-sm font-medium ${isDark ? 'text-[#a8a8a8]' : 'text-gray-600'}`}>
                  {t('users.status')}
                </label>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, enabled: !prev.enabled }))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    formData.enabled ? 'bg-green-500' : isDark ? 'bg-[#2a2a2a]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                      formData.enabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
                <span className={`text-sm ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                  {formData.enabled ? t('users.enabled') : t('users.disabled')}
                </span>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
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
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-3 rounded-xl font-medium bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {t('common.save')}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
