import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import AdminHeader from '../layouts/AdminHeader';
import SearchInput from '../components/common/SearchInput';
import ConfirmDialog from '../components/common/ConfirmDialog';
import ArticleList from '../components/articles/ArticleList';
import ArticleForm from '../components/articles/ArticleForm';
import { useTheme } from '../contexts';
import { mockArticles } from '../data/mockData';

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

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin-login');
      return;
    }
    const savedArticles = JSON.parse(localStorage.getItem('adminArticles') || 'null');
    setArticles(savedArticles || mockArticles);
  }, [navigate]);

  const filteredArticles = articles
    .filter(article => {
      const searchLower = searchQuery.toLowerCase();
      return (
        article.title.toLowerCase().includes(searchLower) ||
        (article.titleHe && article.titleHe.includes(searchQuery)) ||
        article.content.toLowerCase().includes(searchLower) ||
        (article.contentHe && article.contentHe.includes(searchQuery))
      );
    })
    .sort((a, b) => a.order - b.order);

  const handleSaveArticle = (articleData) => {
    let updatedArticles;
    if (editingArticle) {
      updatedArticles = articles.map(a => a.id === articleData.id ? articleData : a);
    } else {
      updatedArticles = [...articles, articleData];
    }
    setArticles(updatedArticles);
    localStorage.setItem('adminArticles', JSON.stringify(updatedArticles));
    setIsFormOpen(false);
    setEditingArticle(null);
  };

  const handleDeleteConfirm = () => {
    const updatedArticles = articles.filter(a => a.id !== deleteArticle.id);
    setArticles(updatedArticles);
    localStorage.setItem('adminArticles', JSON.stringify(updatedArticles));
    setDeleteArticle(null);
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

          {/* Articles List */}
          <ArticleList
            articles={filteredArticles}
            onEdit={handleEdit}
            onDelete={setDeleteArticle}
          />
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
