import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';

export default function GalleryFilters({
  filters,
  onFilterChange,
  isOpen,
  onToggle,
  desktopOnly = false
}) {
  const categories = [
    { value: 'all', label: 'הכל' },
    { value: 'wildlife', label: 'חיות' },
    { value: 'landscapes', label: 'נופים' },
    { value: 'Authenticity', label: 'אותנטיות' },
    { value: 'Drama', label: 'דרמה' },
    { value: 'Vision', label: 'חזון' },
    { value: 'Fear', label: 'חשש' },
    { value: 'Naturalness', label: 'טבעיות' },
    { value: 'Focus', label: 'מיקוד' },
    { value: 'Determination', label: 'נחישות' },
    { value: 'Curiosity', label: 'סקרנות' },
    { value: 'Power', label: 'עוצמה' },
    { value: 'Peace', label: 'שלווה' },
    { value: 'Wholeness', label: 'שלמות' }
  ];

  const handleCategoryClick = (value) => {
    onFilterChange({ ...filters, category: value });
  };

  const filterVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const activeFilters = Object.entries(filters).filter(([key, value]) => {
    if (key === 'category' && value !== 'all') return true;
    return false;
  });

  // If desktopOnly, only render the desktop sidebar (no mobile elements)
  if (desktopOnly) {
    return (
      <div className="sticky top-24 space-y-6" dir="rtl">
        <div className="bg-[#0d0d0d]/60 backdrop-blur-xl rounded-2xl border border-[#1a1a1a] p-6">
          <h3 className="text-[#f5f5f0] font-medium mb-4 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#d4af37]" />
            סינון
          </h3>

          {/* Categories */}
          <div className="mb-6">
            <h4 className="text-[#8b7355] text-sm mb-3">קטגוריה</h4>
            <div className="space-y-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat.value}
                  whileHover={{ x: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCategoryClick(cat.value)}
                  className={`w-full text-right px-4 py-2 rounded-lg transition-all ${
                    filters.category === cat.value
                      ? 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30'
                      : 'bg-[#1a1a1a] text-[#a8a8a8] hover:bg-[#2a2a2a] border border-transparent'
                  }`}
                >
                  {cat.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          <AnimatePresence>
            {activeFilters.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-4 border-t border-[#1a1a1a]"
              >
                <div className="flex flex-wrap gap-2">
                  {activeFilters.map(([key, value]) => (
                    <motion.span
                      key={key}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#d4af37]/20 text-[#d4af37] text-xs rounded-full"
                    >
                      {categories.find(c => c.value === value)?.label}
                      <button
                        onClick={() => onFilterChange({
                          ...filters,
                          category: 'all'
                        })}
                        className="hover:text-white transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // Mobile-only rendering (floating button + drawer)
  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        className="lg:hidden fixed bottom-6 right-6 z-40 p-4 bg-[#d4af37] text-[#0d0d0d] rounded-full shadow-2xl shadow-[#d4af37]/20"
        aria-label="סינון"
      >
        <SlidersHorizontal className="w-6 h-6" />
      </motion.button>

      {/* Mobile Filters Drawer with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={onToggle}
            />

            {/* Drawer */}
            <motion.div
              variants={filterVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#0d0d0d] z-50 p-6 overflow-y-auto border-l border-[#1a1a1a]"
              dir="rtl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#f5f5f0] font-medium flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#d4af37]" />
                  סינון
                </h3>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onToggle}
                  className="p-2 text-[#8b7355] hover:text-[#f5f5f0] transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Active Filters Badge */}
              {activeFilters.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 flex flex-wrap gap-2"
                >
                  {activeFilters.map(([key, value]) => (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#d4af37]/20 text-[#d4af37] text-xs rounded-full"
                    >
                      {categories.find(c => c.value === value)?.label}
                      <button
                        onClick={() => onFilterChange({
                          ...filters,
                          category: 'all'
                        })}
                        className="hover:text-white transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </motion.div>
              )}

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-[#8b7355] text-sm mb-3">קטגוריה</h4>
                <div className="space-y-2">
                  {categories.map((cat, index) => (
                    <motion.button
                      key={cat.value}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: { delay: index * 0.03 }
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCategoryClick(cat.value)}
                      className={`w-full text-right px-4 py-3 rounded-xl transition-all ${
                        filters.category === cat.value
                          ? 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30'
                          : 'bg-[#1a1a1a] text-[#a8a8a8] border border-transparent active:bg-[#2a2a2a]'
                      }`}
                    >
                      {cat.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={onToggle}
                className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] font-medium rounded-xl shadow-lg shadow-[#d4af37]/20"
              >
                הצג תוצאות
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
