import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, FileText, Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts';

export default function ArticleList({ articles, onEdit, onDelete }) {
  const { t, i18n } = useTranslation();
  const { isDark } = useTheme();
  const isHebrew = i18n.language === 'he';

  if (articles.length === 0) {
    return (
      <div className={`text-center py-12 rounded-xl border ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
        <FileText className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-[#666]' : 'text-gray-300'}`} />
        <p className={isDark ? 'text-[#666]' : 'text-gray-400'}>{t('common.noResults')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article, index) => {
        const imageUrl = article.image_url || article.coverImage;
        const isPublished = article.published ?? (article.status === 'PUBLISHED');

        return (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-center gap-4 p-4 rounded-xl border ${
              isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'
            }`}
          >
            {imageUrl && (
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#0d0d0d]">
                <img
                  src={imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/80?text=No+Image';
                  }}
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className={`font-medium truncate ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                  {isHebrew ? (article.titleHe || article.title) : article.title}
                </h3>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                  isPublished
                    ? 'bg-green-500/20 text-green-400'
                    : isDark
                      ? 'bg-[#2a2a2a] text-[#666]'
                      : 'bg-gray-100 text-gray-500'
                }`}>
                  {isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  {isPublished ? t('articles.published') : t('articles.draft')}
                </span>
              </div>
              <p className={`text-sm mt-1 line-clamp-2 ${isDark ? 'text-[#a8a8a8]' : 'text-gray-500'}`}>
                {isHebrew ? (article.contentHe || article.content) : article.content}
              </p>
              <p className={`text-xs mt-2 ${isDark ? 'text-[#666]' : 'text-gray-400'}`}>
                {t('articles.order')}: {article.order}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onEdit(article)}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-[#2a2a2a] text-[#d4af37]' : 'hover:bg-gray-100 text-amber-600'
                }`}
              >
                <Edit2 className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(article)}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-red-500/10 text-red-400' : 'hover:bg-red-50 text-red-500'
                }`}
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
