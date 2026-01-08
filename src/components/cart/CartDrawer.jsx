import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  items = [], 
  onUpdateQuantity, 
  onRemoveItem 
}) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const drawerVariants = {
    closed: { x: '-100%', opacity: 0 },
    open: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 + i * 0.05 }
    }),
    exit: { opacity: 0, x: 50, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 left-0 h-full w-full max-w-md bg-[#0d0d0d] z-50 flex flex-col border-r border-[#d4af37]/20"
            dir="rtl"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#1a1a1a] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
                <h2 className="text-xl font-light text-[#f5f5f0]">הסל שלי</h2>
                <span className="px-2 py-0.5 bg-[#d4af37]/20 text-[#d4af37] text-sm rounded-full">
                  {items.length}
                </span>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-[#8b7355] hover:text-[#f5f5f0] transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <ShoppingBag className="w-16 h-16 text-[#1a1a1a] mx-auto mb-4" />
                    <p className="text-[#8b7355]">הסל שלך ריק</p>
                  </motion.div>
                ) : (
                  items.map((item, i) => (
                    <motion.div
                      key={`${item.product_id}-${item.size}`}
                      custom={i}
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      layout
                      className="flex gap-4 p-4 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a]"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.product_image} 
                          alt={item.product_title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[#f5f5f0] font-medium truncate">
                          {item.product_title}
                        </h3>
                        <p className="text-[#8b7355] text-sm mt-1">{item.size}</p>
                        
                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 bg-[#0d0d0d] rounded-lg p-1">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => onUpdateQuantity(item, item.quantity - 1)}
                              className="p-1 text-[#8b7355] hover:text-[#d4af37] transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </motion.button>
                            <span className="text-[#f5f5f0] w-6 text-center">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => onUpdateQuantity(item, item.quantity + 1)}
                              className="p-1 text-[#8b7355] hover:text-[#d4af37] transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </motion.button>
                          </div>

                          {/* Price */}
                          <motion.span 
                            className="text-[#d4af37] font-medium"
                            key={item.price * item.quantity}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                          >
                            ₪{(item.price * item.quantity).toLocaleString()}
                          </motion.span>
                        </div>
                      </div>

                      {/* Remove */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onRemoveItem(item)}
                        className="self-start p-2 text-[#8b7355] hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Summary */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#1a1a1a] bg-[#0d0d0d]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#8b7355]">סה"כ</span>
                  <motion.span
                    key={subtotal}
                    initial={{ scale: 1.1, color: '#d4af37' }}
                    animate={{ scale: 1, color: '#f5f5f0' }}
                    className="text-xl font-medium"
                  >
                    ₪{subtotal.toLocaleString()}
                  </motion.span>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] font-medium py-6 rounded-xl hover:opacity-90 transition-opacity"
                >
                  <motion.span
                    whileHover={{ x: -5 }}
                    className="flex items-center gap-2"
                  >
                    לתשלום
                    <span className="text-lg">←</span>
                  </motion.span>
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}