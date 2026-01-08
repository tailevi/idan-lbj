import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus('success');
    setEmail('');
    
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="relative py-32 bg-gradient-to-b from-[#000000] to-[#0d0d0d] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/80 to-[#0d0d0d]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
          dir="rtl"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-16 h-16 mx-auto mb-8 bg-[#d4af37]/10 rounded-full flex items-center justify-center"
          >
            <Sparkles className="w-8 h-8 text-[#d4af37]" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-light text-[#f5f5f0] mb-4">
            הישארו מעודכנים
          </h2>
          <p className="text-[#8b7355] mb-8">
            הרשמו לניוזלטר שלנו וקבלו עדכונים על יצירות חדשות, מבצעים מיוחדים וסיפורים מאחורי הקלעים
          </p>

          <form onSubmit={handleSubmit} className="relative">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="הזינו את כתובת המייל שלכם"
                  className="w-full px-6 py-6 bg-[#1a1a1a] border-[#2a2a2a] text-[#f5f5f0] placeholder:text-[#8b7355] rounded-xl focus:border-[#d4af37] focus:ring-[#d4af37]/20 text-right"
                  disabled={status === 'loading' || status === 'success'}
                />
                <motion.span
                  animate={{
                    boxShadow: status === 'idle' ? 'none' : '0 0 20px rgba(212, 175, 55, 0.3)'
                  }}
                  className="absolute inset-0 rounded-xl pointer-events-none"
                />
              </div>

              <Button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="px-8 py-6 bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] font-medium rounded-xl hover:opacity-90 transition-opacity min-w-[140px]"
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      הרשמה
                    </motion.span>
                  )}
                  {status === 'loading' && (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-[#0d0d0d] border-t-transparent rounded-full"
                      />
                      שולח...
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      נרשמת!
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </form>

          {/* Success Message */}
          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6"
              >
                <p className="text-[#d4af37]">
                  תודה על ההרשמה! נשלח לך עדכונים בקרוב.
                </p>
                
                {/* Confetti Effect */}
                <div className="fixed inset-0 pointer-events-none z-50">
                  {Array(20).fill(0).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        opacity: 1,
                        x: window.innerWidth / 2,
                        y: window.innerHeight / 2,
                        scale: 0
                      }}
                      animate={{
                        opacity: 0,
                        x: window.innerWidth / 2 + (Math.random() - 0.5) * 600,
                        y: window.innerHeight / 2 + (Math.random() - 0.5) * 600,
                        scale: Math.random() * 1.5 + 0.5,
                        rotate: Math.random() * 360
                      }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                      className="absolute w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: ['#d4af37', '#cd7f32', '#b76e79', '#f5f5f0'][
                          Math.floor(Math.random() * 4)
                        ]
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-[#5a5a5a] text-xs mt-6">
            לעולם לא נשתף את המידע שלכם עם צד שלישי
          </p>
        </motion.div>
      </div>
    </section>
  );
}