import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, ShoppingBag, Heart } from 'lucide-react';

export default function ProductCard({ product, onQuickView, onAddToCart }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const categoryLabels = {
    wildlife: 'טבע פראי',
    landscapes: 'נופים',
    tribes: 'שבטים'
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
        className="relative overflow-hidden rounded-2xl bg-[#1a1a1a] aspect-[3/4]"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
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

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-black/40 backdrop-blur-sm text-[#d4af37] text-xs rounded-full">
            {categoryLabels[product.category]}
          </span>
        </div>

        {/* Overlay on Hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
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
      <div className="md:hidden mt-3 text-center" dir="rtl">
        <h3 className="text-[#f5f5f0] text-sm font-medium">{product.title}</h3>
        <p className="text-[#d4af37] text-sm mt-1">החל מ-₪{product.price?.toLocaleString()}</p>
      </div>
    </motion.div>
  );
}