import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Star, Check, X as XIcon, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts';

export default function ReviewList({ reviews, onEdit, onDelete, onApprove, onReject }) {
  const { t, i18n } = useTranslation();
  const { isDark } = useTheme();
  const isHebrew = i18n.language === 'he';

  if (reviews.length === 0) {
    return (
      <div className={`text-center py-12 rounded-xl border ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
        <Star className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-[#666]' : 'text-gray-300'}`} />
        <p className={isDark ? 'text-[#666]' : 'text-gray-400'}>{t('common.noResults')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {reviews.map((review, index) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                isDark ? 'bg-[#2a2a2a] text-[#d4af37]' : 'bg-amber-100 text-amber-600'
              }`}>
                {review.customerName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`font-medium ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                    {review.customerName}
                  </h3>
                  {review.featured && (
                    <Award className="w-4 h-4 text-[#d4af37]" title={t('reviews.featured')} />
                  )}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'text-[#d4af37] fill-[#d4af37]' : isDark ? 'text-[#3a3a3a]' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              review.approved
                ? 'bg-green-500/20 text-green-400'
                : 'bg-amber-500/20 text-amber-400'
            }`}>
              {review.approved ? t('reviews.approved') : t('reviews.pending')}
            </span>
          </div>

          <p className={`text-sm mb-4 ${isDark ? 'text-[#a8a8a8]' : 'text-gray-600'}`}>
            {isHebrew ? (review.textHe || review.text) : review.text}
          </p>

          <div className="flex items-center gap-2 border-t pt-3 ${isDark ? 'border-[#2a2a2a]' : 'border-gray-100'}">
            {!review.approved && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onApprove(review)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
              >
                <Check className="w-4 h-4" />
                {t('reviews.approve')}
              </motion.button>
            )}
            {review.approved && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onReject(review)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors"
              >
                <XIcon className="w-4 h-4" />
                {t('reviews.reject')}
              </motion.button>
            )}
            <div className="flex-1" />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(review)}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-[#2a2a2a] text-[#d4af37]' : 'hover:bg-gray-100 text-amber-600'
              }`}
            >
              <Edit2 className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(review)}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-red-500/10 text-red-400' : 'hover:bg-red-50 text-red-500'
              }`}
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
