import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import AdminHeader from '../layouts/AdminHeader';
import SearchInput from '../components/common/SearchInput';
import ConfirmDialog from '../components/common/ConfirmDialog';
import ProductList from '../components/products/ProductList';
import ProductForm from '../components/products/ProductForm';
import { useTheme } from '../contexts';
import { getProducts, saveProducts, mockProducts } from '../data/mockData';

export default function ProductsPage() {
  const { t, i18n } = useTranslation();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const isHebrew = i18n.language === 'he';

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin-login');
      return;
    }
    setProducts(getProducts());
  }, [navigate]);

  const filteredProducts = products.filter(product => {
    const searchLower = searchQuery.toLowerCase();
    return (
      product.title.toLowerCase().includes(searchLower) ||
      (product.titleHe && product.titleHe.includes(searchQuery)) ||
      product.categories.some(cat => cat.toLowerCase().includes(searchLower))
    );
  });

  const handleSaveProduct = (productData) => {
    let updatedProducts;
    if (editingProduct) {
      updatedProducts = products.map(p => p.id === productData.id ? productData : p);
    } else {
      updatedProducts = [...products, productData];
    }
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteConfirm = () => {
    const updatedProducts = products.filter(p => p.id !== deleteProduct.id);
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    setDeleteProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen">
      <AdminHeader title={t('products.title')} />

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
                placeholder={t('products.searchProducts')}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setEditingProduct(null);
                setIsFormOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] hover:opacity-90 transition-opacity"
            >
              <Plus className="w-5 h-5" />
              {t('products.addProduct')}
            </motion.button>
          </div>

          {/* Products Grid */}
          <ProductList
            products={filteredProducts}
            onEdit={handleEdit}
            onDelete={setDeleteProduct}
          />
        </motion.div>
      </div>

      {/* Product Form Modal */}
      <ProductForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        product={editingProduct}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteProduct}
        onClose={() => setDeleteProduct(null)}
        onConfirm={handleDeleteConfirm}
        title={t('products.delete')}
        message={t('products.confirmDelete')}
        confirmLabel={t('common.delete')}
        variant="danger"
      />
    </div>
  );
}
