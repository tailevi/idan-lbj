import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Settings, User, LogOut, LogIn } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { getCustomerData, clearCustomerData, clearCustomerAuth, clearAuthToken } from '@/utils/cookies';
import AnimatedLogo from '../effects/AnimatedLogo';

export default function Header({ cartCount = 0, onCartClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check login status
  useEffect(() => {
    const checkAuth = () => {
      const customer = getCustomerData();
      if (customer) {
        setIsLoggedIn(true);
        setCustomerName(customer.firstName || 'User');
      } else {
        setIsLoggedIn(false);
        setCustomerName('');
      }
    };

    checkAuth();
    // Check periodically for auth changes
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    clearCustomerData();
    clearCustomerAuth();
    clearAuthToken();
    setIsLoggedIn(false);
    setCustomerName('');
    setShowUserMenu(false);
    navigate('/');
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showUserMenu && !e.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu]);

  const navItems = [
    { label: 'בית', path: 'Home' },
    { label: 'גלריה', path: 'Gallery' },
    { label: 'מאמרים', path: 'Articles' },
    { label: 'אודות', path: 'About' },
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

            {/* Cart & User Menu */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* User Account */}
              {isLoggedIn ? (
                <div className="relative user-menu-container">
                  <motion.button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-2 text-[#f5f5f0] hover:text-[#d4af37] transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-[#d4af37] to-[#cd7f32] rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-[#0d0d0d]" />
                    </div>
                    <span className="hidden md:block text-sm">{customerName}</span>
                  </motion.button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-2xl overflow-hidden z-50"
                        dir="rtl"
                      >
                        <Link
                          to="/account"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-3 text-[#f5f5f0] hover:bg-[#2a2a2a] transition-colors"
                        >
                          <User className="w-4 h-4" />
                          <span>החשבון שלי</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>התנתק</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : null}

              {/* User Panel (only show when logged in) */}
              {isLoggedIn && (
                <Link to="/account">
                  <motion.div
                    className="p-2 text-[#666] hover:text-[#d4af37] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Settings className="w-4 h-4" />
                  </motion.div>
                </Link>
              )}

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

                {/* Auth Section */}
                <motion.div
                  custom={navItems.length}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  className="pt-8 border-t border-[#2a2a2a]"
                >
                  {isLoggedIn ? (
                    <div className="space-y-4">
                      <Link
                        to="/account"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 text-xl text-[#f5f5f0] hover:text-[#d4af37] transition-colors"
                      >
                        <User className="w-5 h-5" />
                        <span>החשבון שלי</span>
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setMenuOpen(false);
                        }}
                        className="flex items-center gap-3 text-xl text-red-400 hover:text-red-300 transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>התנתק</span>
                      </button>
                    </div>
                  ) : null}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}