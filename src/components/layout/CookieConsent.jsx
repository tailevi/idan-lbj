import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Shield } from 'lucide-react';
import { getCookieConsent, setCookieConsent } from '@/utils/cookies';

export default function CookieConsent() {
  const [visible, setVisible] = useState(!getCookieConsent());

  const handleAccept = (level) => {
    setCookieConsent(level);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          dir="rtl"
        >
          <div className="max-w-4xl mx-auto bg-[#0d0d0d]/95 backdrop-blur-xl border border-[#d4af37]/20 rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
              {/* Icon + Text */}
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 bg-[#d4af37]/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Cookie className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <h3 className="text-[#f5f5f0] font-medium mb-1">אנחנו משתמשים בעוגיות</h3>
                  <p className="text-[#8b7355] text-sm leading-relaxed">
                    האתר שלנו משתמש בעוגיות כדי לשפר את חוויית הגלישה שלך, לשמור את סל הקניות ולזכור את פרטי החשבון שלך.
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAccept('essential')}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#2a2a2a] text-[#a8a8a8] hover:border-[#d4af37]/30 hover:text-[#f5f5f0] transition-colors text-sm"
                >
                  <Shield className="w-4 h-4" />
                  הכרחיים בלבד
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAccept('all')}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] font-medium hover:opacity-90 transition-opacity text-sm"
                >
                  קבל הכל
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
