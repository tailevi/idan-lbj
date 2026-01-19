import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ChevronRight, ChevronLeft, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Print types with their associated frames
const printTypes = [
  { type: 'הדבקה אקרילית', priceModifier: 1 },
  { type: '100% כותנה', priceModifier: 1 },
  { type: 'קנבס מודרני', priceModifier: 1 }
];

// Frame options for each print type
const framesByPrintType = {
  'הדבקה אקרילית': [
    {
      name: 'Hidden Minimalist',
      priceModifier: 1,
      description: 'ללא מסגרת גלויה. מערכת תלייה אחורית נסתרת מאלומיניום המעניקה מראה "צף" ונקי.'
    },
    {
      name: 'Modern Shadow Gallery Box',
      priceModifier: 1.4,
      description: 'מסגרת עץ צפה. מסגרת עץ מלא עמוקה המקיפה את האקריליק עם רווח היקפי יוקרתי.'
    }
  ],
  '100% כותנה': [
    {
      name: 'Classic Studio Frame',
      priceModifier: 1,
      description: 'מסגרת עץ אורן או אלומיניום. כולל זכוכית שקופה ופספרטו (שוליים לבנים) נטול חומצה.'
    },
    {
      name: 'Hardwood Gallery Selection',
      priceModifier: 1.3,
      description: 'מסגרת עץ מלא. עצים קשים ויוקרתיים (אלון, אגוז או אפר) בגימור טבעי או שחור מט.'
    },
    {
      name: 'Signature Museum Collection',
      priceModifier: 1.6,
      description: 'מסגרת עץ פרימיום + זכוכית מוזיאונית. זכוכית בלתי נראית המונעת השתקפויות ומגנה מפני UV.'
    }
  ],
  'קנבס מודרני': [
    {
      name: 'Raw Gallery Wrap',
      priceModifier: 1,
      description: 'קנבס מתוח. התמונה עוטפת את שולי שלדת העץ הפנימית למראה טבעי וללא מסגרת חיצונית.'
    },
    {
      name: 'Essential Shadow Float',
      priceModifier: 1.2,
      description: 'מסגרת צפה מודרנית. מסגרת מחומר פולימרי איכותי המעניקה מראה מעוצב ונקי.'
    }
  ]
};

export default function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPrintType, setSelectedPrintType] = useState(0);
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [hoveredFrame, setHoveredFrame] = useState(null);

  if (!product) return null;

  const sizes = product.sizes || [
    { dimensions: '30×40 ס"מ', price: product.price },
    { dimensions: '50×70 ס"מ', price: product.price * 1.5 },
    { dimensions: '70×100 ס"מ', price: product.price * 2 },
    { dimensions: '100×150 ס"מ', price: product.price * 3 },
  ];

  const currentPrintType = printTypes[selectedPrintType];
  const availableFrames = framesByPrintType[currentPrintType.type] || [];
  const currentFrame = availableFrames[selectedFrame] || availableFrames[0];

  const allImages = [product.image_url, ...(product.gallery_images || [])];

  const calculateFinalPrice = () => {
    if (selectedSize === null) return 0;
    const frameModifier = currentFrame?.priceModifier || 1;
    return Math.round(sizes[selectedSize].price * frameModifier);
  };

  // Reset frame selection when print type changes
  const handlePrintTypeChange = (index) => {
    setSelectedPrintType(index);
    setSelectedFrame(0);
  };

  const handleAddToCart = () => {
    if (selectedSize === null) return;
    onAddToCart({
      ...product,
      selectedSize: sizes[selectedSize],
      selectedPrintType: currentPrintType,
      selectedFrame: currentFrame,
      finalPrice: calculateFinalPrice(),
      quantity
    });
    onClose();
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="relative w-full max-w-5xl max-h-[90vh] overflow-auto bg-[#0d0d0d] rounded-3xl border border-[#1a1a1a]"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 left-4 z-10 p-2 bg-[#1a1a1a] rounded-full text-[#8b7355] hover:text-[#f5f5f0] transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <div className="grid md:grid-cols-2">
              {/* Image Section */}
              <div className="relative p-6">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#1a1a1a]">
                  <motion.img
                    key={currentImage}
                    src={allImages[currentImage]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Navigation Arrows */}
                  {allImages.length > 1 && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentImage((prev) => (prev + 1) % allImages.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentImage((prev) => (prev - 1 + allImages.length) % allImages.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.button>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {allImages.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {allImages.map((img, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setCurrentImage(i)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          currentImage === i ? 'border-[#d4af37]' : 'border-transparent'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Description - below the picture */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-[#8b7355] mt-4"
                >
                  {product.description || 'יצירה מקורית מודפסת על קנבס איכותי עם מסגרת פנימית'}
                </motion.p>
              </div>

              {/* Details Section */}
              <div className="p-6 md:p-8 flex flex-col">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl md:text-3xl font-light text-[#f5f5f0] mb-6"
                >
                  {product.title}
                </motion.h2>

                {/* Size Selection */}
                <div className="mb-6">
                  <h3 className="text-[#f5f5f0] text-sm mb-3">בחר גודל:</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {sizes.map((size, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedSize(i)}
                        className={`p-4 rounded-xl border-2 text-right transition-all ${
                          selectedSize === i
                            ? 'border-[#d4af37] bg-[#d4af37]/10'
                            : 'border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#3a3a3a]'
                        }`}
                      >
                        <div className="text-[#f5f5f0] font-medium">{size.dimensions}</div>
                        <div className={`text-sm mt-1 ${selectedSize === i ? 'text-[#d4af37]' : 'text-[#8b7355]'}`}>
                          ₪{size.price?.toLocaleString()}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Print Type Selection */}
                <div className="mb-6">
                  <h3 className="text-[#f5f5f0] text-sm mb-3">בחר סוג הדפסה:</h3>
                  <div className="flex flex-col gap-3">
                    {printTypes.map((printType, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePrintTypeChange(i)}
                        className={`p-4 rounded-xl border-2 text-right transition-all ${
                          selectedPrintType === i
                            ? 'border-[#d4af37] bg-[#d4af37]/10'
                            : 'border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#3a3a3a]'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="text-[#f5f5f0] font-medium">{printType.type}</div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Frame Selection */}
                <div className="mb-6 overflow-visible">
                  <h3 className="text-[#f5f5f0] text-sm mb-3">בחר מסגרת:</h3>
                  <div className="flex flex-col gap-3 overflow-visible">
                    {availableFrames.map((frame, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedFrame(i)}
                        className={`p-4 rounded-xl border-2 text-right transition-all ${
                          selectedFrame === i
                            ? 'border-[#d4af37] bg-[#d4af37]/10'
                            : 'border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#3a3a3a]'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-[#f5f5f0] font-medium">{frame.name}</span>
                            <div
                              className="relative z-[100]"
                              onMouseEnter={() => setHoveredFrame(i)}
                              onMouseLeave={() => setHoveredFrame(null)}
                            >
                              <HelpCircle className="w-4 h-4 text-[#8b7355] hover:text-[#d4af37] cursor-help transition-colors" />
                              <AnimatePresence>
                                {hoveredFrame === i && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="absolute z-[9999] bottom-full right-0 mb-2 w-64 p-3 bg-[#0d0d0d] border border-[#d4af37]/30 rounded-lg shadow-2xl"
                                    style={{
                                      boxShadow: '0 10px 40px rgba(0,0,0,0.8), 0 0 0 1px rgba(212,175,55,0.2)'
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <p className="text-sm text-[#f5f5f0] leading-relaxed">{frame.description}</p>
                                    <div className="absolute bottom-0 right-4 translate-y-full">
                                      <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-[#d4af37]/30" />
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                          {frame.priceModifier > 1 && (
                            <div className={`text-sm ${selectedFrame === i ? 'text-[#d4af37]' : 'text-[#8b7355]'}`}>
                              +{Math.round((frame.priceModifier - 1) * 100)}%
                            </div>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-8">
                  <h3 className="text-[#f5f5f0] text-sm mb-3">כמות:</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-[#1a1a1a] rounded-xl p-2">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 text-[#8b7355] hover:text-[#d4af37] transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </motion.button>
                      <span className="text-[#f5f5f0] w-8 text-center">{quantity}</span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 text-[#8b7355] hover:text-[#d4af37] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Price & Add to Cart */}
                <div className="mt-auto space-y-4">
                  {selectedSize !== null && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-[#8b7355]">סה"כ:</span>
                      <motion.span
                        key={calculateFinalPrice() * quantity}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-2xl font-medium text-[#d4af37]"
                      >
                        ₪{(calculateFinalPrice() * quantity).toLocaleString()}
                      </motion.span>
                    </motion.div>
                  )}

                  <Button
                    onClick={handleAddToCart}
                    disabled={selectedSize === null}
                    className="w-full py-6 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <motion.span
                      whileHover={{ x: -5 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      הוסף לסל
                    </motion.span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}