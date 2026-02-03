import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts';

export default function ProductList({ products, onEdit, onDelete }) {
  const { t, i18n } = useTranslation();
  const { isDark } = useTheme();
  const isHebrew = i18n.language === 'he';

  if (products.length === 0) {
    return (
      <div className={`text-center py-12 rounded-xl border ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
        <Package className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-[#666]' : 'text-gray-300'}`} />
        <p className={isDark ? 'text-[#666]' : 'text-gray-400'}>{t('common.noResults')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`rounded-xl border overflow-hidden ${
            isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'
          }`}
        >
          <div className="aspect-square bg-[#0d0d0d] relative">
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300?text=No+Image';
              }}
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onEdit(product)}
                className="p-2 rounded-lg bg-[#d4af37]/90 text-[#0d0d0d] hover:bg-[#d4af37]"
              >
                <Edit2 className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(product)}
                className="p-2 rounded-lg bg-red-500/90 text-white hover:bg-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
          <div className="p-4">
            <h3 className={`font-medium truncate ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
              {isHebrew ? (product.titleHe || product.title) : product.title}
            </h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[#d4af37] font-bold">
                ₪{product.price.toLocaleString()}
              </span>
              <span className={`text-sm ${isDark ? 'text-[#666]' : 'text-gray-400'}`}>
                {t(`categories.${product.categories[0]}`)}
              </span>
            </div>
            {product.stock !== undefined && (
              <div className="mt-2">
                <span className={`text-sm ${
                  product.stock < 5 ? 'text-red-400' : isDark ? 'text-[#a8a8a8]' : 'text-gray-500'
                }`}>
                  {t('products.stock')}: {product.stock}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
