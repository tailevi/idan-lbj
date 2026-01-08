import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import ProductCard from '../components/gallery/ProductCard';
import ProductModal from '../components/gallery/ProductModal';
import GalleryFilters from '../components/gallery/GalleryFilters';
import ParticleField from '../components/effects/ParticleField';

export default function Gallery() {
  const [filters, setFilters] = useState({
    category: 'all',
    maxPrice: 10000
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get category from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category) {
      setFilters(prev => ({ ...prev, category }));
    }
  }, []);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
  });

  const filteredProducts = products.filter(product => {
    const categoryMatch = filters.category === 'all' || product.category === filters.category;
    const priceMatch = product.price <= filters.maxPrice;
    return categoryMatch && priceMatch;
  });

  const handleAddToCart = (product) => {
    // This will be handled by the layout's cart context
    const event = new CustomEvent('addToCart', { detail: product });
    window.dispatchEvent(event);
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCartFromModal = (productWithSize) => {
    const event = new CustomEvent('addToCart', { detail: productWithSize });
    window.dispatchEvent(event);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#000000] pt-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <ParticleField className="absolute inset-0 opacity-50" interactive={false} density={20} />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
            dir="rtl"
          >
            <span className="text-[#d4af37] text-sm tracking-[0.3em] uppercase">
              הגלריה
            </span>
            <h1 className="text-4xl md:text-6xl font-light text-[#f5f5f0] mt-4">
              כל היצירות
            </h1>
            <p className="text-[#8b7355] mt-4 max-w-md mx-auto">
              גלה את אוסף היצירות המלא שלנו ובחר את הקנבס המושלם לבית שלך
            </p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent"
        />
      </section>

      {/* Gallery Section */}
      <section className="py-12 pb-32">
        <div className="container mx-auto px-6">
          <div className="flex gap-8">
            {/* Sidebar Filters - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <GalleryFilters
                filters={filters}
                onFilterChange={setFilters}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
              />
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results Count */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8 flex items-center justify-between"
                dir="rtl"
              >
                <p className="text-[#8b7355]">
                  <motion.span
                    key={filteredProducts.length}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[#d4af37] font-medium"
                  >
                    {filteredProducts.length}
                  </motion.span>
                  {' '}תוצאות נמצאו
                </p>
              </motion.div>

              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center justify-center py-32">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Loader2 className="w-8 h-8 text-[#d4af37]" />
                  </motion.div>
                </div>
              )}

              {/* Products */}
              {!isLoading && (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <ProductCard
                          product={product}
                          onQuickView={handleQuickView}
                          onAddToCart={handleAddToCart}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Empty State */}
              {!isLoading && filteredProducts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-32"
                  dir="rtl"
                >
                  <p className="text-[#8b7355] text-lg">לא נמצאו תוצאות</p>
                  <p className="text-[#5a5a5a] text-sm mt-2">נסו לשנות את הפילטרים</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filters */}
      <GalleryFilters
        filters={filters}
        onFilterChange={setFilters}
        isOpen={isFilterOpen}
        onToggle={() => setIsFilterOpen(!isFilterOpen)}
      />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCartFromModal}
      />
    </div>
  );
}