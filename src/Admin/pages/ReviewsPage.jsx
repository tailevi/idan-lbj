import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { getAdminAuth } from '../../utils/cookies';
import AdminHeader from '../layouts/AdminHeader';
import SearchInput from '../components/common/SearchInput';
import ConfirmDialog from '../components/common/ConfirmDialog';
import ReviewList from '../components/reviews/ReviewList';
import ReviewForm from '../components/reviews/ReviewForm';
import { useTheme } from '../contexts';
import { mockReviews } from '../data/mockData';

export default function ReviewsPage() {
  const { t, i18n } = useTranslation();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const isHebrew = i18n.language === 'he';

  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [deleteReview, setDeleteReview] = useState(null);

  useEffect(() => {
    const isAuthenticated = getAdminAuth();
    if (!isAuthenticated) {
      navigate('/admin-login');
      return;
    }
    const savedReviews = JSON.parse(localStorage.getItem('adminReviews') || 'null');
    setReviews(savedReviews || mockReviews);
  }, [navigate]);

  const filteredReviews = reviews.filter(review => {
    const searchLower = searchQuery.toLowerCase();
    return (
      review.customerName.toLowerCase().includes(searchLower) ||
      review.text.toLowerCase().includes(searchLower) ||
      (review.textHe && review.textHe.includes(searchQuery))
    );
  });

  const saveReviews = (updatedReviews) => {
    setReviews(updatedReviews);
    localStorage.setItem('adminReviews', JSON.stringify(updatedReviews));
  };

  const handleSaveReview = (reviewData) => {
    let updatedReviews;
    if (editingReview) {
      updatedReviews = reviews.map(r => r.id === reviewData.id ? reviewData : r);
    } else {
      updatedReviews = [...reviews, reviewData];
    }
    saveReviews(updatedReviews);
    setIsFormOpen(false);
    setEditingReview(null);
  };

  const handleDeleteConfirm = () => {
    const updatedReviews = reviews.filter(r => r.id !== deleteReview.id);
    saveReviews(updatedReviews);
    setDeleteReview(null);
  };

  const handleApprove = (review) => {
    const updatedReviews = reviews.map(r =>
      r.id === review.id ? { ...r, approved: true } : r
    );
    saveReviews(updatedReviews);
  };

  const handleReject = (review) => {
    const updatedReviews = reviews.map(r =>
      r.id === review.id ? { ...r, approved: false } : r
    );
    saveReviews(updatedReviews);
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen">
      <AdminHeader title={t('reviews.title')} />

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
                placeholder={t('reviews.searchReviews')}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setEditingReview(null);
                setIsFormOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] hover:opacity-90 transition-opacity"
            >
              <Plus className="w-5 h-5" />
              {t('reviews.addReview')}
            </motion.button>
          </div>

          {/* Reviews List */}
          <ReviewList
            reviews={filteredReviews}
            onEdit={handleEdit}
            onDelete={setDeleteReview}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </motion.div>
      </div>

      {/* Review Form Modal */}
      <ReviewForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingReview(null);
        }}
        onSave={handleSaveReview}
        review={editingReview}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteReview}
        onClose={() => setDeleteReview(null)}
        onConfirm={handleDeleteConfirm}
        title={t('common.delete')}
        message={t('reviews.confirmDelete')}
        confirmLabel={t('common.delete')}
        variant="danger"
      />
    </div>
  );
}
