import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts';

export default function ArticleForm({ isOpen, onClose, onSave, article, isSaving }) {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    title: '',
    titleHe: '',
    content: '',
    contentHe: '',
    image_url: '',
    order: 1,
    published: true,
    slug: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || '',
        titleHe: article.titleHe || '',
        content: article.content || '',
        contentHe: article.contentHe || '',
        image_url: article.image_url || '',
        order: article.order || 1,
        published: article.published ?? true,
        slug: article.slug || ''
      });
    } else {
      setFormData({
        title: '',
        titleHe: '',
        content: '',
        contentHe: '',
        image_url: '',
        order: 1,
        published: true,
        slug: ''
      });
    }
    setErrors({});
  }, [article, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title?.trim()) newErrors.title = t('products.required');
    if (!formData.content?.trim()) newErrors.content = t('products.required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        id: article?.id,
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
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={`w-full max-w-2xl my-8 rounded-2xl p-6 ${isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-gray-200'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                {article ? t('articles.editArticle') : t('articles.addArticle')}
              </h2>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-[#2a2a2a] text-[#a8a8a8]' : 'hover:bg-gray-100 text-gray-500'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                    {t('articles.articleTitle')} (EN) *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none ${
                      errors.title ? 'border-red-500' : isDark ? 'border-[#3a3a3a] focus:border-[#d4af37]' : 'border-gray-300 focus:border-[#d4af37]'
                    } ${isDark ? 'bg-[#0d0d0d] text-[#f5f5f0]' : 'bg-white text-gray-900'}`}
                  />
                  {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
                </div>
                <div>
                  <label className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                    {t('articles.articleTitle')} (HE)
                  </label>
                  <input
                    type="text"
                    value={formData.titleHe}
                    onChange={(e) => setFormData(prev => ({ ...prev, titleHe: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none ${
                      isDark ? 'border-[#3a3a3a] focus:border-[#d4af37] bg-[#0d0d0d] text-[#f5f5f0]' : 'border-gray-300 focus:border-[#d4af37] bg-white text-gray-900'
                    }`}
                    dir="rtl"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                  {t('articles.content')} (EN) *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none resize-none ${
                    errors.content ? 'border-red-500' : isDark ? 'border-[#3a3a3a] focus:border-[#d4af37]' : 'border-gray-300 focus:border-[#d4af37]'
                  } ${isDark ? 'bg-[#0d0d0d] text-[#f5f5f0]' : 'bg-white text-gray-900'}`}
                />
                {errors.content && <p className="text-red-400 text-sm mt-1">{errors.content}</p>}
              </div>

              <div>
                <label className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                  {t('articles.content')} (HE)
                </label>
                <textarea
                  value={formData.contentHe}
                  onChange={(e) => setFormData(prev => ({ ...prev, contentHe: e.target.value }))}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none resize-none ${
                    isDark ? 'border-[#3a3a3a] focus:border-[#d4af37] bg-[#0d0d0d] text-[#f5f5f0]' : 'border-gray-300 focus:border-[#d4af37] bg-white text-gray-900'
                  }`}
                  dir="rtl"
                />
              </div>

              <div>
                <label className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                  {t('articles.imageUrl')}
                </label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none ${
                    isDark ? 'border-[#3a3a3a] focus:border-[#d4af37] bg-[#0d0d0d] text-[#f5f5f0]' : 'border-gray-300 focus:border-[#d4af37] bg-white text-gray-900'
                  }`}
                  dir="ltr"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                    {t('articles.order')}
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 1 }))}
                    min="1"
                    className={`w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none ${
                      isDark ? 'border-[#3a3a3a] focus:border-[#d4af37] bg-[#0d0d0d] text-[#f5f5f0]' : 'border-gray-300 focus:border-[#d4af37] bg-white text-gray-900'
                    }`}
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                    {t('orders.status')}
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, published: !prev.published }))}
                    className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                      formData.published
                        ? 'bg-green-500/20 border-green-500/30 text-green-400'
                        : isDark
                          ? 'bg-[#0d0d0d] border-[#3a3a3a] text-[#a8a8a8]'
                          : 'bg-gray-50 border-gray-300 text-gray-600'
                    }`}
                  >
                    {formData.published ? t('articles.published') : t('articles.draft')}
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSaving}
                  className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                    isDark ? 'bg-[#2a2a2a] text-[#f5f5f0] hover:bg-[#3a3a3a]' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  } disabled:opacity-50`}
                >
                  {t('articles.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-3 rounded-xl font-bold bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {t('articles.save')}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
