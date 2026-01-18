import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2 } from 'lucide-react';

const sizes = [
  { label: '30×40', width: 30, height: 40, price: 1200 },
  { label: '50×70', width: 50, height: 70, price: 1800 },
  { label: '70×100', width: 70, height: 100, price: 2800 },
  { label: '100×150', width: 100, height: 150, price: 4500 }
];

const materials = [
  { type: 'קנבס קלאסי', priceModifier: 1, description: 'קנבס כותנה איכותי - הבחירה הנפוצה' },
  { type: 'קנבס פרימיום', priceModifier: 1.3, description: 'קנבס כותנה עבה במיוחד עם ציפוי מט' },
  { type: 'קנבס מיוזיאום', priceModifier: 1.6, description: 'איכות מוזיאון עם ציפוי UV מגן' }
];

export default function CanvasSizes() {
  const [selectedSize, setSelectedSize] = useState(1);
  const [selectedMaterial, setSelectedMaterial] = useState(0);

  const calculatePrice = () => {
    return Math.round(sizes[selectedSize].price * materials[selectedMaterial].priceModifier);
  };

  const getCanvasScale = (size) => {
    const maxScale = 0.7;
    const baseSize = sizes[3].width;
    return (size.width / baseSize) * maxScale;
  };

  return (
    <section className="relative py-32 bg-[#000000] overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          dir="rtl"
        >
          <span className="text-[#d4af37] text-sm tracking-[0.3em] uppercase">
            גדלים
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-[#f5f5f0] mt-4">
            בחרו את הגודל המושלם
          </h2>
          <p className="text-[#8b7355] mt-4 max-w-md mx-auto">
            כל היצירות מודפסות על קנבס כותנה איכותי עם מסגרת עץ פנימית
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Room Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-3xl overflow-hidden"
          >
            {/* Wall */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, #2a2520 0%, #1a1815 100%)'
              }}
            />

            {/* Couch Silhouette */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1/4 bg-[#0d0d0d]/80 rounded-t-3xl" />

            {/* Canvas on Wall */}
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSize}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                  style={{
                    transform: `scale(${getCanvasScale(sizes[selectedSize])})`,
                    transformOrigin: 'center'
                  }}
                >
                  {/* Canvas Frame */}
                  <div className="relative bg-[#1a1a1a] p-2 rounded shadow-2xl shadow-black/50">
                    <img
                      src="/products/Celestial_Halo_of_Majesty_.webp"
                      alt="Canvas Preview"
                      className="w-[300px] aspect-[3/4] object-cover rounded"
                    />
                    
                    {/* Measurement Lines */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="absolute -right-16 top-0 bottom-0 flex flex-col items-center justify-center"
                    >
                      <div className="h-full w-[1px] bg-[#d4af37]/50" />
                      <span className="absolute bg-[#0d0d0d] px-2 py-1 text-[#d4af37] text-xs">
                        {sizes[selectedSize].height} ס"מ
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="absolute -bottom-12 left-0 right-0 flex items-center justify-center"
                    >
                      <div className="w-full h-[1px] bg-[#d4af37]/50" />
                      <span className="absolute bg-[#0d0d0d] px-2 py-1 text-[#d4af37] text-xs">
                        {sizes[selectedSize].width} ס"מ
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Light Source Effect */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1/2 bg-gradient-to-b from-[#d4af37]/5 to-transparent pointer-events-none" />
          </motion.div>

          {/* Size Selector */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
            dir="rtl"
          >
            <div className="grid grid-cols-2 gap-4">
              {sizes.map((size, index) => (
                <motion.button
                  key={size.label}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedSize(index)}
                  className={`relative p-6 rounded-2xl border-2 transition-all ${
                    selectedSize === index
                      ? 'border-[#d4af37] bg-[#d4af37]/10'
                      : 'border-[#1a1a1a] bg-[#0d0d0d] hover:border-[#2a2a2a]'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Maximize2 className={`w-5 h-5 ${
                      selectedSize === index ? 'text-[#d4af37]' : 'text-[#8b7355]'
                    }`} />
                    <span className="text-[#f5f5f0] text-xl font-light">
                      {size.label} ס"מ
                    </span>
                  </div>
                  <div className={`text-lg ${
                    selectedSize === index ? 'text-[#d4af37]' : 'text-[#8b7355]'
                  }`}>
                    ₪{size.price.toLocaleString()}
                  </div>

                  {/* Selection Indicator */}
                  {selectedSize === index && (
                    <motion.div
                      layoutId="sizeIndicator"
                      className="absolute top-3 left-3 w-3 h-3 bg-[#d4af37] rounded-full"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Material Selection */}
            <div className="mt-6">
              <h3 className="text-[#f5f5f0] text-sm mb-3">סוג קנבס:</h3>
              <div className="space-y-3">
                {materials.map((material, index) => (
                  <motion.button
                    key={material.type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedMaterial(index)}
                    className={`relative w-full p-4 rounded-xl border-2 text-right transition-all ${
                      selectedMaterial === index
                        ? 'border-[#d4af37] bg-[#d4af37]/10'
                        : 'border-[#1a1a1a] bg-[#0d0d0d] hover:border-[#2a2a2a]'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[#f5f5f0] font-medium">{material.type}</span>
                      {material.priceModifier > 1 && (
                        <span className={`text-sm ${selectedMaterial === index ? 'text-[#d4af37]' : 'text-[#8b7355]'}`}>
                          +{Math.round((material.priceModifier - 1) * 100)}%
                        </span>
                      )}
                    </div>
                    <p className="text-[#8b7355] text-xs mt-1">{material.description}</p>

                    {selectedMaterial === index && (
                      <motion.div
                        layoutId="materialIndicator"
                        className="absolute top-3 left-3 w-3 h-3 bg-[#d4af37] rounded-full"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Total Price */}
            <motion.div
              key={calculatePrice()}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="mt-6 p-4 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] text-center"
            >
              <span className="text-[#8b7355] text-sm">מחיר משוער: </span>
              <span className="text-[#d4af37] text-2xl font-medium">₪{calculatePrice().toLocaleString()}</span>
            </motion.div>

            {/* Info Text */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="p-6 bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a]"
            >
              <h4 className="text-[#f5f5f0] font-medium mb-2">כלול במחיר:</h4>
              <ul className="space-y-2 text-[#8b7355] text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                  הדפסה על קנבס כותנה איכותי
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                  מסגרת עץ פנימית
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                  משלוח חינם לכל הארץ
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                  תעודת מקוריות חתומה
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}