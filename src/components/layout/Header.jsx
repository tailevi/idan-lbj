import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { createPageUrl } from '@/utils';
import AnimatedLogo from '../effects/AnimatedLogo';

export default function Header({ cartCount = 0, onCartClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'בית', path: 'Home' },
    { label: 'גלריה', path: 'Gallery' },
    { label: 'צור קשר', path: 'Contact' }
  ];

  const menuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 50 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 + i * 0.1, duration: 0.4 }
    })
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-[#0d0d0d]/80 backdrop-blur-xl border-b border-[#d4af37]/10' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between" dir="rtl">
            {/* Logo */}
            <Link to={createPageUrl('Home')}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`transition-all duration-300 ${scrolled ? 'scale-90' : ''}`}
              >
                <AnimatedLogo size="small" />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item, i) => (
                <Link key={item.path} to={createPageUrl(item.path)}>
                  <motion.span
                    className="relative text-[#f5f5f0] text-sm tracking-wider group cursor-pointer"
                    whileHover={{ y: -2 }}
                  >
                    {item.label}
                    <motion.span
                      className="absolute -bottom-1 right-0 h-[1px] bg-gradient-to-l from-[#d4af37] to-transparent"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.span>
                </Link>
              ))}
            </nav>

            {/* Cart & Mobile Menu */}
            <div className="flex items-center gap-4">
              <motion.button
                onClick={onCartClick}
                className="relative p-2 text-[#f5f5f0] hover:text-[#d4af37] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="w-5 h-5" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -left-1 w-5 h-5 bg-[#d4af37] text-[#0d0d0d] text-xs rounded-full flex items-center justify-center font-bold"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                onClick={() => setMenuOpen(true)}
                className="md:hidden p-2 text-[#f5f5f0]"
                whileTap={{ scale: 0.95 }}
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 h-full w-80 bg-[#0d0d0d] z-50 p-8"
              dir="rtl"
            >
              <motion.button
                onClick={() => setMenuOpen(false)}
                className="absolute top-6 left-6 text-[#f5f5f0]"
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              <div className="mt-16 space-y-8">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    custom={i}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <Link 
                      to={createPageUrl(item.path)}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="text-2xl text-[#f5f5f0] hover:text-[#d4af37] transition-colors">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}