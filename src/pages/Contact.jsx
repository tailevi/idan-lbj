import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { Send, Check, Mail, Phone, Instagram, MessageCircle, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ParticleField from '../components/effects/ParticleField';

const faqs = [
  {
    question: 'כמה זמן לוקחת הדפסה ומשלוח?',
    answer: 'ההדפסה אורכת 3-5 ימי עסקים והמשלוח 2-4 ימים נוספים. סה"כ כשבוע עד שהיצירה מגיעה אליכם.'
  },
  {
    question: 'האם ניתן להזמין גודל מותאם אישית?',
    answer: 'בהחלט! צרו איתנו קשר עם הגודל הרצוי ונשמח לספק הצעת מחיר מותאמת.'
  },
  {
    question: 'איך מתבצע התשלום?',
    answer: 'אנו מקבלים תשלום בכרטיס אשראי, ביט ופייבוקס. ניתן גם לשלם בהעברה בנקאית.'
  },
  {
    question: 'מה מדיניות ההחזרות?',
    answer: 'אם היצירה לא עונה על ציפיותיכם, ניתן להחזיר תוך 14 יום ולקבל החזר מלא.'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [openFaq, setOpenFaq] = useState(null);

  const submitMutation = useMutation({
    mutationFn: (data) => base44.entities.ContactMessage.create(data),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitMutation.mutateAsync(formData);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactMethods = [
    { icon: Mail, label: 'info@lbjbahar.com', href: 'mailto:info@lbjbahar.com' },
    { icon: Phone, label: '050-123-4567', href: 'tel:+972501234567' },
    { icon: Instagram, label: '@lbjbahar', href: 'https://instagram.com/lbjbahar' },
    { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/972501234567' }
  ];

  return (
    <div className="min-h-screen bg-[#000000] pt-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover opacity-20"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#000000]/80 to-[#000000]" />
        </div>

        <ParticleField className="absolute inset-0 opacity-30" interactive={false} density={15} />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
            dir="rtl"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[#d4af37] text-sm tracking-[0.3em] uppercase"
            >
              בואו נדבר
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-light text-[#f5f5f0] mt-4"
            >
              צור קשר
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16" dir="rtl">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#0d0d0d]/60 backdrop-blur-xl rounded-3xl border border-[#1a1a1a] p-8 md:p-12"
            >
              <h2 className="text-2xl font-light text-[#f5f5f0] mb-8">
                שלחו לנו הודעה
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[#8b7355] text-sm">שם מלא</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="הזינו את שמכם"
                      required
                      className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f5f5f0] placeholder:text-[#5a5a5a] focus:border-[#d4af37] focus:ring-[#d4af37]/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#8b7355] text-sm">אימייל</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f5f5f0] placeholder:text-[#5a5a5a] focus:border-[#d4af37] focus:ring-[#d4af37]/20"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[#8b7355] text-sm">טלפון</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="050-000-0000"
                      className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f5f5f0] placeholder:text-[#5a5a5a] focus:border-[#d4af37] focus:ring-[#d4af37]/20"
                      dir="ltr"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#8b7355] text-sm">נושא</label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => handleChange('subject', value)}
                    >
                      <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f5f5f0] focus:border-[#d4af37]">
                        <SelectValue placeholder="בחרו נושא" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                        <SelectItem value="general">שאלה כללית</SelectItem>
                        <SelectItem value="order">שאלה על הזמנה</SelectItem>
                        <SelectItem value="custom">הזמנה מותאמת אישית</SelectItem>
                        <SelectItem value="collaboration">שיתוף פעולה</SelectItem>
                        <SelectItem value="other">אחר</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[#8b7355] text-sm">הודעה</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="כתבו את הודעתכם כאן..."
                    required
                    rows={5}
                    className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f5f5f0] placeholder:text-[#5a5a5a] focus:border-[#d4af37] focus:ring-[#d4af37]/20 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitMutation.isPending || submitMutation.isSuccess}
                  className="w-full py-6 bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] font-medium rounded-xl hover:opacity-90 transition-opacity"
                >
                  <AnimatePresence mode="wait">
                    {!submitMutation.isPending && !submitMutation.isSuccess && (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        שלח הודעה
                      </motion.span>
                    )}
                    {submitMutation.isPending && (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        שולח...
                      </motion.span>
                    )}
                    {submitMutation.isSuccess && (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        ההודעה נשלחה!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </form>
            </motion.div>

            {/* Contact Info & FAQ */}
            <div className="space-y-12">
              {/* Contact Methods */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-light text-[#f5f5f0] mb-8">
                  דרכי יצירת קשר
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  {contactMethods.map((method, i) => {
                    const Icon = method.icon;
                    return (
                      <motion.a
                        key={i}
                        href={method.href}
                        target={method.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-4 p-6 bg-[#0d0d0d] rounded-2xl border border-[#1a1a1a] hover:border-[#d4af37]/30 transition-colors group"
                      >
                        <div className="w-12 h-12 bg-[#1a1a1a] rounded-xl flex items-center justify-center group-hover:bg-[#d4af37]/10 transition-colors">
                          <Icon className="w-5 h-5 text-[#d4af37]" />
                        </div>
                        <span className="text-[#a8a8a8] text-sm group-hover:text-[#f5f5f0] transition-colors">
                          {method.label}
                        </span>
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>

              {/* FAQ */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-light text-[#f5f5f0] mb-8">
                  שאלות נפוצות
                </h2>

                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-[#0d0d0d] rounded-2xl border border-[#1a1a1a] overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full p-6 flex items-center justify-between text-right"
                      >
                        <span className="text-[#f5f5f0] font-medium">
                          {faq.question}
                        </span>
                        <motion.div
                          animate={{ rotate: openFaq === i ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5 text-[#d4af37]" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-6 border-r-2 border-[#d4af37] mr-6">
                              <p className="text-[#8b7355]">{faq.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}