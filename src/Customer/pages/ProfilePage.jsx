import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { User, Mail, Phone, MapPin, Check } from 'lucide-react';
import { useTheme, useAuth } from '../contexts';
import { useDirection } from '../hooks';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { customer, updateProfile } = useAuth();
  const { isRTL } = useDirection();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (customer) {
      setFormData({
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        email: customer.email || '',
        phone: customer.phone || '',
        address: customer.address || ''
      });
    }
  }, [customer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      updateProfile(formData);
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 500);
  };

  const inputClass = `w-full rounded-xl px-4 py-3 focus:outline-none focus:border-[#d4af37] transition-colors ${
    isDark
      ? 'bg-[#0d0d0d] border border-[#3a3a3a] text-[#f5f5f0] placeholder-[#666]'
      : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
  }`;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-bold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
          {t('profile.title')}
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
          {t('profile.saved')}
        </motion.div>
      )}

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl border p-6 ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}
      >
        <h2 className={`text-lg font-semibold mb-6 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
          {t('profile.personalInfo')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm mb-2 ${isDark ? 'text-[#a8a8a8]' : 'text-gray-600'}`}>
                {t('profile.firstName')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className={`${inputClass} ${isRTL ? 'pr-10' : 'pl-10'}`}
                />
                <User className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-[#666]' : 'text-gray-400'} ${isRTL ? 'right-3' : 'left-3'}`} />
              </div>
            </div>

            <div>
              <label className={`block text-sm mb-2 ${isDark ? 'text-[#a8a8a8]' : 'text-gray-600'}`}>
                {t('profile.lastName')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className={`${inputClass} ${isRTL ? 'pr-10' : 'pl-10'}`}
                />
                <User className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-[#666]' : 'text-gray-400'} ${isRTL ? 'right-3' : 'left-3'}`} />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className={`block text-sm mb-2 ${isDark ? 'text-[#a8a8a8]' : 'text-gray-600'}`}>
              {t('profile.email')}
            </label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`${inputClass} ${isRTL ? 'pr-12' : 'pl-12'}`}
                dir="ltr"
              />
              <Mail className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-[#666]' : 'text-gray-400'} ${isRTL ? 'right-4' : 'left-4'}`} />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className={`block text-sm mb-2 ${isDark ? 'text-[#a8a8a8]' : 'text-gray-600'}`}>
              {t('profile.phone')}
            </label>
            <div className="relative">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className={`${inputClass} ${isRTL ? 'pr-12' : 'pl-12'}`}
                dir="ltr"
              />
              <Phone className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-[#666]' : 'text-gray-400'} ${isRTL ? 'right-4' : 'left-4'}`} />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className={`block text-sm mb-2 ${isDark ? 'text-[#a8a8a8]' : 'text-gray-600'}`}>
              {t('profile.address')}
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className={`${inputClass} ${isRTL ? 'pr-12' : 'pl-12'}`}
              />
              <MapPin className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-[#666]' : 'text-gray-400'} ${isRTL ? 'right-4' : 'left-4'}`} />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? t('profile.saving') : t('profile.save')}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
