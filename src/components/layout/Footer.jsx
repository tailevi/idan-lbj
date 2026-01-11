import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AnimatedLogo from '../effects/AnimatedLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isPaperShieldHovered, setIsPaperShieldHovered] = useState(false);
  const shieldControls = useAnimation();

  const handlePaperShieldHover = async () => {
    setIsPaperShieldHovered(true);
    // Spin 360 quickly, then pulse like a heartbeat
    await shieldControls.start({
      rotate: 360,
      transition: { duration: 0.4, ease: "easeInOut" }
    });
    await shieldControls.start({
      scale: [1, 1.3, 1],
      transition: { duration: 0.3, ease: "easeOut" }
    });
    shieldControls.set({ rotate: 0 });
  };

  const handlePaperShieldLeave = () => {
    setIsPaperShieldHovered(false);
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Mail, href: 'mailto:info@lbjbahar.com', label: 'Email' },
    { icon: Phone, href: 'tel:+972501234567', label: 'Phone' }
  ];

  const navLinks = [
    { label: 'בית', path: 'Home' },
    { label: 'גלריה', path: 'Gallery' },
    { label: 'צור קשר', path: 'Contact' }
  ];

  return (
    <footer className="relative bg-[#000000] border-t border-[#1a1a1a]">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 items-start" dir="rtl">
          {/* Logo & Description */}
          <div className="space-y-6">
            <AnimatedLogo size="small" />
            <p className="text-[#8b7355] text-sm leading-relaxed max-w-xs">
              אמנות צילום בהשראת הטבע הפראי. יצירות מקוריות מודפסות על קנבס איכותי.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, i) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={i}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center text-[#8b7355] hover:text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors border border-[#2a2a2a]"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[#f5f5f0] font-medium mb-6">ניווט</h4>
            <nav className="space-y-3">
              {navLinks.map((link, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: -5 }}
                >
                  <Link
                    to={createPageUrl(link.path)}
                    className="text-[#8b7355] hover:text-[#d4af37] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#f5f5f0] font-medium mb-6">צור קשר</h4>
            <div className="space-y-4">
              <motion.a
                href="mailto:info@lbjbahar.com"
                whileHover={{ x: -5 }}
                className="flex items-center gap-3 text-[#8b7355] hover:text-[#d4af37] transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                info@lbjbahar.com
              </motion.a>
              <motion.a
                href="tel:+972501234567"
                whileHover={{ x: -5 }}
                className="flex items-center gap-3 text-[#8b7355] hover:text-[#d4af37] transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                050-123-4567
              </motion.a>
              <div className="flex items-center gap-3 text-[#8b7355] text-sm">
                <MapPin className="w-4 h-4" />
                ישראל
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1a1a1a]">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center" dir="rtl">
            <p className="text-[#5a5a5a] text-xs">
              © {currentYear} LBJ Bahar Fine Art Photography. כל הזכויות שמורות.
            </p>

            {/* Paper Shield Branding */}
            <a
              href="https://paper-shield.co.il/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 cursor-pointer"
              onMouseEnter={handlePaperShieldHover}
              onMouseLeave={handlePaperShieldLeave}
            >
              <span
                className="text-xs transition-colors duration-300"
                style={{ color: isPaperShieldHovered ? '#d4af37' : '#5a5a5a' }}
              >
                Powered By Paper Shield
              </span>
              <motion.img
                src="/paper-shield-logo.png"
                alt="Paper Shield Logo"
                className="w-16 h-16 object-contain"
                animate={shieldControls}
              />
            </a>

            <p className="text-[#5a5a5a] text-xs flex items-center gap-1">
              נוצר עם
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-3 h-3 text-[#d4af37] fill-[#d4af37]" />
              </motion.span>
              בישראל
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent"
      />
    </footer>
  );
}