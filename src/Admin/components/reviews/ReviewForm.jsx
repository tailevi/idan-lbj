import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts';

export default function ReviewForm({ isOpen, onClose, onSave, review }) {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    customerName: '',
    rating: 5,
    text: '',
    textHe: '',
    approved: false,
    featured: false
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (review) {
      setFormData({
        customerName: review.customerName || '',
        rating: review.rating || 5,
        text: review.text || '',
        textHe: review.textHe || '',
        approved: review.approved ?? false,
        featured: review.featured ?? false
      });
    } else {
      setFormData({
        customerName: '',
        rating: 5,
        text: '',
        textHe: '',
        approved: false,
        featured: false
      });
    }
    setErrors({});
  }, [review, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.customerName?.trim()) newErrors.customerName = t('products.required');
    if (!formData.text?.trim()) newErrors.text = t('products.required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        id: review?.id || Date.now().toString(),
        ...formData
      });
    }
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
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={`w-full max-w-lg rounded-2xl p-6 ${isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-gray-200'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                {review ? t('reviews.editReview') : t('reviews.addReview')}
              </h2>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-[#2a2a2a] text-[#a8a8a8]' : 'hover:bg-gray-100 text-gray-500'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                  {t('reviews.customerName')} *
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none ${
                    errors.customerName ? 'border-red-500' : isDark ? 'border-[#3a3a3a] focus:border-[#d4af37]' : 'border-gray-300 focus:border-[#d4af37]'
                  } ${isDark ? 'bg-[#0d0d0d] text-[#f5f5f0]' : 'bg-white text-gray-900'}`}
                />
                {errors.customerName && <p className="text-red-400 text-sm mt-1">{errors.customerName}</p>}
              </div>

              <div>
                <label className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                  {t('reviews.rating')}
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          star <= formData.rating
                            ? 'text-[#d4af37] fill-[#d4af37]'
                            : isDark
                              ? 'text-[#3a3a3a]'
                              : 'text-gray-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                  {t('reviews.reviewText')} (EN) *
                </label>
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none resize-none ${
                    errors.text ? 'border-red-500' : isDark ? 'border-[#3a3a3a] focus:border-[#d4af37]' : 'border-gray-300 focus:border-[#d4af37]'
                  } ${isDark ? 'bg-[#0d0d0d] text-[#f5f5f0]' : 'bg-white text-gray-900'}`}
                />
                {errors.text && <p className="text-red-400 text-sm mt-1">{errors.text}</p>}
              </div>

              <div>
                <label className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                  {t('reviews.reviewText')} (HE)
                </label>
                <textarea
                  value={formData.textHe}
                  onChange={(e) => setFormData(prev => ({ ...prev, textHe: e.target.value }))}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none resize-none ${
                    isDark ? 'border-[#3a3a3a] focus:border-[#d4af37] bg-[#0d0d0d] text-[#f5f5f0]' : 'border-gray-300 focus:border-[#d4af37] bg-white text-gray-900'
                  }`}
                  dir="rtl"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.approved}
                    onChange={(e) => setFormData(prev => ({ ...prev, approved: e.target.checked }))}
                    className="w-4 h-4 rounded border-[#3a3a3a] text-[#d4af37] focus:ring-[#d4af37]"
                  />
                  <span className={isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}>{t('reviews.approved')}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="w-4 h-4 rounded border-[#3a3a3a] text-[#d4af37] focus:ring-[#d4af37]"
                  />
                  <span className={isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}>{t('reviews.featured')}</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                    isDark ? 'bg-[#2a2a2a] text-[#f5f5f0] hover:bg-[#3a3a3a]' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {t('reviews.cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl font-bold bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] hover:opacity-90 transition-opacity"
                >
                  {t('reviews.save')}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
