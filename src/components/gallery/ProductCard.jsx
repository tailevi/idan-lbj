import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, ShoppingBag, Heart } from 'lucide-react';

export default function ProductCard({ product, onQuickView, onAddToCart }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const categoryLabels = {
    wildlife: 'חיות',
    landscapes: 'נופים',
    tribes: 'אנשים',
    Authenticity: 'אותנטיות',
    Drama:'דרמה',
    Vision:'חזון',
    Fear:'חשש',
    Naturalness:'טבעיות',
    Focus:'מיקוד',
    Determination:'נחישת',
    Curiosity:'סקרנות',
    Power:'עוצמה',
    Peace:'שלווה',
    Wholeness:'שלמות'
  };

  // Handle tap on mobile to show product
  const handleCardClick = () => {
    // On mobile, clicking the card opens the product modal
    if (window.innerWidth < 768) {
      onQuickView(product);
    }
  };

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-[#1a1a1a] aspect-[3/4] cursor-pointer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.4 }}
        onClick={handleCardClick}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Image */}
        <motion.img
          src={product.image_url}
          alt={product.title}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.1 : 1,
            filter: isHovered ? 'saturate(1.2)' : 'saturate(1)'
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Golden Frame on Hover */}
        <motion.div
          className="absolute inset-0 border-2 border-[#d4af37] rounded-2xl pointer-events-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.95
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Like Button */}
        <motion.button
          className="absolute top-4 left-4 p-2 rounded-full bg-black/40 backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${
              isLiked ? 'text-[#d4af37] fill-[#d4af37]' : 'text-white'
            }`}
          />
        </motion.button>

        {/* Category Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-1">
          {product.categories?.map((cat, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-black/40 backdrop-blur-sm text-[#d4af37] text-xs rounded-full"
            >
              {categoryLabels[cat]}
            </span>
          ))}
        </div>

        {/* Overlay on Hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Description - below the picture */}
          {product.description && (
            <motion.p
              className="text-[#a0a0a0] text-sm mb-3 line-clamp-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              dir="rtl"
            >
              {product.description}
            </motion.p>
          )}

          <motion.h3
            className="text-[#f5f5f0] text-lg font-medium mb-1"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            dir="rtl"
          >
            {product.title}
          </motion.h3>

          <motion.p
            className="text-[#d4af37] text-xl font-light mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            החל מ-₪{product.price?.toLocaleString()}
          </motion.p>

          <motion.div
            className="flex gap-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onQuickView(product)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#f5f5f0] text-[#0d0d0d] rounded-xl font-medium text-sm"
            >
              <Eye className="w-4 h-4" />
              צפה במוצר
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAddToCart(product)}
              className="p-3 bg-[#d4af37] text-[#0d0d0d] rounded-xl"
            >
              <ShoppingBag className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Mobile Info (visible on touch devices) */}
      <div className="md:hidden mt-3" dir="rtl">
        <div className="text-center">
          <h3 className="text-[#f5f5f0] text-sm font-medium line-clamp-1">{product.title}</h3>
          <p className="text-[#d4af37] text-sm mt-1">החל מ-₪{product.price?.toLocaleString()}</p>
        </div>
        <div className="flex gap-2 mt-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onQuickView(product)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-[#1a1a1a] text-[#f5f5f0] rounded-xl text-sm border border-[#2a2a2a]"
          >
            <Eye className="w-4 h-4" />
            צפה
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddToCart(product)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-[#d4af37] text-[#0d0d0d] rounded-xl text-sm font-medium"
          >
            <ShoppingBag className="w-4 h-4" />
            הוסף
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}