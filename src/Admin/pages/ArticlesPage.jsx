import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Plus, Loader2, AlertCircle } from 'lucide-react';
import AdminHeader from '../layouts/AdminHeader';
import SearchInput from '../components/common/SearchInput';
import ConfirmDialog from '../components/common/ConfirmDialog';
import ArticleList from '../components/articles/ArticleList';
import ArticleForm from '../components/articles/ArticleForm';
import { useTheme } from '../contexts';
import { articlesApi } from '../../services/api';

export default function ArticlesPage() {
  const { t, i18n } = useTranslation();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const isHebrew = i18n.language === 'he';

  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [deleteArticle, setDeleteArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await articlesApi.getAll();
      setArticles(data.articles);
    } catch (err) {
      if (err.status === 401 || err.status === 403) {
        navigate('/login');
        return;
      }
      setError(err.message || 'Failed to load articles');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchArticles();
  }, [navigate, fetchArticles]);

  const filteredArticles = articles
    .filter(article => {
      if (!searchQuery) return true;
      const searchLower = searchQuery.toLowerCase();
      return (
        article.title.toLowerCase().includes(searchLower) ||
        (article.titleHe && article.titleHe.includes(searchQuery)) ||
        article.content.toLowerCase().includes(searchLower) ||
        (article.contentHe && article.contentHe.includes(searchQuery))
      );
    })
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleSaveArticle = async (articleData) => {
    try {
      setIsSaving(true);
      setError('');
      if (editingArticle) {
        const updated = await articlesApi.update(articleData.id, articleData);
        setArticles(prev => prev.map(a => a.id === updated.id ? updated : a));
      } else {
        const created = await articlesApi.create(articleData);
        setArticles(prev => [...prev, created]);
      }
      setIsFormOpen(false);
      setEditingArticle(null);
    } catch (err) {
      setError(err.message || 'Failed to save article');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setError('');
      await articlesApi.delete(deleteArticle.id);
      setArticles(prev => prev.filter(a => a.id !== deleteArticle.id));
      setDeleteArticle(null);
    } catch (err) {
      setError(err.message || 'Failed to delete article');
      setDeleteArticle(null);
    }
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen">
      <AdminHeader title={t('articles.title')} />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Error Banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-xl"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
              <button
                onClick={() => setError('')}
                className="ml-auto text-red-400 hover:text-red-300"
              >
                &times;
              </button>
            </motion.div>
          )}

          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="w-full sm:w-80">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={t('articles.searchArticles')}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setEditingArticle(null);
                setIsFormOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] hover:opacity-90 transition-opacity"
            >
              <Plus className="w-5 h-5" />
              {t('articles.addArticle')}
            </motion.button>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className={`w-8 h-8 animate-spin ${isDark ? 'text-[#d4af37]' : 'text-amber-600'}`} />
            </div>
          ) : (
            <ArticleList
              articles={filteredArticles}
              onEdit={handleEdit}
              onDelete={setDeleteArticle}
            />
          )}
        </motion.div>
      </div>

      {/* Article Form Modal */}
      <ArticleForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingArticle(null);
        }}
        onSave={handleSaveArticle}
        article={editingArticle}
        isSaving={isSaving}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteArticle}
        onClose={() => setDeleteArticle(null)}
        onConfirm={handleDeleteConfirm}
        title={t('common.delete')}
        message={t('articles.confirmDelete')}
        confirmLabel={t('common.delete')}
        variant="danger"
      />
    </div>
  );
}
