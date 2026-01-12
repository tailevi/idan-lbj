import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import ProductCard from '../components/gallery/ProductCard';
import ProductModal from '../components/gallery/ProductModal';
import GalleryFilters from '../components/gallery/GalleryFilters';
import ParticleField from '../components/effects/ParticleField';

// Mock product data
const mockProducts = [
  {
    id: '1',
    title: 'אריה אפריקאי',
    image_url: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=800&q=80',
    price: 890,
    category: 'wildlife',
    description: 'צילום מרהיב של אריה אפריקאי בשקיעה',
    sizes: [
      { dimensions: '30×40 ס"מ', price: 890 },
      { dimensions: '50×70 ס"מ', price: 1335 },
      { dimensions: '70×100 ס"מ', price: 1780 },
      { dimensions: '100×150 ס"מ', price: 2670 }
    ]
  },
  {
    id: '2',
    title: 'פיל בסוואנה',
    image_url: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800&q=80',
    price: 950,
    category: 'wildlife',
    description: 'פיל מלכותי צועד בשטחי הסוואנה האפריקאית'
  },
  {
    id: '3',
    title: 'נמר בג׳ונגל',
    image_url: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80',
    price: 1100,
    category: 'wildlife',
    description: 'נמר מסתורי בין עלי הג׳ונגל'
  },
  {
    id: '4',
    title: 'זברות במדבר',
    image_url: 'https://images.unsplash.com/photo-1501706362039-c06b2d715385?w=800&q=80',
    price: 780,
    category: 'wildlife',
    description: 'עדר זברות בשחר האפריקאי'
  },
  {
    id: '5',
    title: 'הרי האלפים',
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    price: 1200,
    category: 'landscapes',
    description: 'נוף מרהיב של הרי האלפים בשלג'
  },
  {
    id: '6',
    title: 'שקיעה באוקיינוס',
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    price: 850,
    category: 'landscapes',
    description: 'שקיעה זהובה מעל האוקיינוס השקט'
  },
  {
    id: '7',
    title: 'יער הגשם',
    image_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    price: 920,
    category: 'landscapes',
    description: 'יער גשם טרופי בכל הודו'
  },
  {
    id: '8',
    title: 'מדבר הסהרה',
    image_url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
    price: 990,
    category: 'landscapes',
    description: 'דיונות חול זהובות במדבר הסהרה'
  },
  {
    id: '9',
    title: 'שבט המסאי',
    image_url: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80',
    price: 1350,
    category: 'tribes',
    description: 'לוחם משבט המסאי בלבוש מסורתי'
  },
  {
    id: '10',
    title: 'נשות שבט',
    image_url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80',
    price: 1250,
    category: 'tribes',
    description: 'נשים משבט אפריקאי בתלבושות מסורתיות'
  },
  {
    id: '11',
    title: 'ילדי הכפר',
    image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    price: 980,
    category: 'tribes',
    description: 'ילדים משחקים בכפר אפריקאי'
  },
  {
    id: '12',
    title: 'ג׳ירפה בשדה',
    image_url: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=800&q=80',
    price: 870,
    category: 'wildlife',
    description: 'ג׳ירפה אלגנטית בשדות אפריקה'
  }
];

export default function Gallery() {
  const [filters, setFilters] = useState({
    category: 'all',
    maxPrice: 10000
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // Get category from URL and load products
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category) {
      setFilters(prev => ({ ...prev, category }));
    }

    // Simulate loading delay for smooth UX
    setTimeout(() => {
      setProducts(mockProducts);
      setIsLoading(false);
    }, 500);
  }, []);

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