import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Award, Heart, Globe, ChevronDown } from 'lucide-react';

// Mock articles - in production, these would come from admin/database
const defaultArticles = [
  {
    id: '1',
    title: 'Our Journey',
    titleHe: 'המסע שלנו',
    content: 'Our story began with a deep passion for capturing the raw beauty of nature.',
    contentHe: 'הסיפור שלנו התחיל עם תשוקה עמוקה ללכוד את היופי הגולמי של הטבע. מאז ילדותנו, הקסם של חיות הבר ונופי הטבע המרהיבים משך אותנו למסע בלתי נגמר של גילוי ויצירה. כל מסע מביא איתו הפתעות חדשות, רגעים בלתי צפויים שהופכים לתמונות נצחיות.',
    image_url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80',
    order: 1,
    published: true
  },
  {
    id: '2',
    title: 'The Artist',
    titleHe: 'האמן',
    content: 'Behind every photograph is a story waiting to be told.',
    contentHe: 'מאחורי כל תצלום יש סיפור שמחכה להיספר. שעות של המתנה בשקט, בטמפרטורות קיצוניות, במרחקים עצומים מהציוויליזציה - כל אלה הופכים לרגע אחד מושלם. אנחנו מאמינים שצילום אמיתי לא רק מתעד מציאות, אלא חושף את הנשמה שמסתתרת בתוכה.',
    image_url: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
    order: 2,
    published: true
  },
  {
    id: '3',
    title: 'Our Process',
    titleHe: 'התהליך שלנו',
    content: 'From the wild savannas of Africa to your living room.',
    contentHe: 'מהסוואנות הפראיות של אפריקה לסלון שלכם - כל יצירה עוברת תהליך קפדני של אוצרות ועיבוד. אנחנו משתמשים בטכנולוגיות ההדפסה המתקדמות ביותר, על חומרים באיכות מוזיאון, כדי להבטיח שכל תמונה תשמר את עוצמתה לדורות.',
    image_url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80',
    order: 3,
    published: true
  },
  {
    id: '4',
    title: 'Quality Promise',
    titleHe: 'הבטחת איכות',
    content: 'We are committed to delivering only the highest quality.',
    contentHe: 'אנו מתחייבים לספק רק את האיכות הגבוהה ביותר. כל הדפס מלווה בתעודת מקוריות חתומה, המעידה על ייחודיות היצירה ואיכות החומרים. השימוש בדיו פיגמנטי ארכיוני וקנבס פרימיום מבטיח שהתמונות שלכם ישמרו על צבעיהן העזים לעשרות שנים.',
    image_url: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
    order: 4,
    published: true
  }
];

export default function About() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Load articles from localStorage or use defaults
    const savedArticles = localStorage.getItem('adminArticles');
    if (savedArticles) {
      const parsed = JSON.parse(savedArticles);
      const publishedArticles = parsed.filter(a => a.published !== false);
      setArticles(publishedArticles.length > 0 ? publishedArticles : defaultArticles);
    } else {
      setArticles(defaultArticles);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const features = [
    { icon: Camera, label: 'צילום מקצועי', value: '20+ שנות ניסיון' },
    { icon: Award, label: 'פרסים בינלאומיים', value: 'National Geographic' },
    { icon: Globe, label: 'מדינות', value: '50+' },
    { icon: Heart, label: 'לקוחות מרוצים', value: '500+' }
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d]" dir="rtl">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80"
            alt="About Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/70 via-[#0d0d0d]/50 to-[#0d0d0d]" />
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-[#d4af37] rounded-full blur-[120px]" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#cd7f32] rounded-full blur-[150px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[#d4af37] text-sm tracking-[0.3em] uppercase"
          >
            הכירו אותנו
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl md:text-7xl font-light text-[#f5f5f0] mt-4"
          >
            הסיפור <span className="text-[#d4af37]">שלנו</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-[#a8a8a8] text-lg mt-6 max-w-2xl mx-auto"
          >
            מביאים את היופי הפראי של הטבע אל תוך הבית שלכם
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[#d4af37]"
            >
              <ChevronDown className="w-8 h-8" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="relative py-12 bg-[#1a1a1a] border-y border-[#2a2a2a]">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#d4af37]/10 text-[#d4af37] mb-4 group-hover:bg-[#d4af37]/20 transition-colors"
                >
                  <feature.icon className="w-7 h-7" />
                </motion.div>
                <p className="text-[#d4af37] text-2xl font-light">{feature.value}</p>
                <p className="text-[#8b7355] text-sm mt-1">{feature.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d4af37] text-sm tracking-[0.3em] uppercase">
              גלו עוד
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-[#f5f5f0] mt-4">
              עלינו ועל <span className="text-[#d4af37]">היצירות שלנו</span>
            </h2>
            <motion.div
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-6"
            />
          </motion.div>

          {/* Articles Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-32"
          >
            {articles.sort((a, b) => (a.order || 0) - (b.order || 0)).map((article, index) => (
              <motion.article
                key={article.id}
                variants={itemVariants}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Image */}
                <motion.div
                  className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <motion.img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/60 via-transparent to-transparent" />
                  </div>

                  {/* Decorative Corners */}
                  <motion.div
                    variants={lineVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={`absolute -top-4 ${index % 2 === 0 ? '-right-4' : '-left-4'} w-24 h-24 border-t-2 ${index % 2 === 0 ? 'border-r-2' : 'border-l-2'} border-[#d4af37] ${index % 2 === 0 ? 'origin-top-right' : 'origin-top-left'}`}
                  />
                  <motion.div
                    variants={lineVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={`absolute -bottom-4 ${index % 2 === 0 ? '-left-4' : '-right-4'} w-24 h-24 border-b-2 ${index % 2 === 0 ? 'border-l-2' : 'border-r-2'} border-[#d4af37] ${index % 2 === 0 ? 'origin-bottom-left' : 'origin-bottom-right'}`}
                  />

                  {/* Article Number Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className={`absolute -bottom-6 ${index % 2 === 0 ? 'right-8' : 'left-8'} bg-[#1a1a1a] border border-[#d4af37]/30 rounded-xl px-5 py-3`}
                  >
                    <p className="text-[#d4af37] text-3xl font-light">0{index + 1}</p>
                  </motion.div>
                </motion.div>

                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <h3 className="text-3xl md:text-4xl font-light text-[#f5f5f0] mb-6">
                      {article.titleHe || article.title}
                    </h3>
                    <p className="text-[#a8a8a8] text-lg leading-relaxed">
                      {article.contentHe || article.content}
                    </p>
                  </motion.div>

                  {/* Decorative Line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className={`h-[2px] w-20 bg-gradient-to-r from-[#d4af37] to-transparent ${index % 2 === 0 ? 'origin-right' : 'origin-left'}`}
                  />
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37] rounded-full blur-[200px] opacity-5" />
        </div>

        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-[#f5f5f0] mb-6">
              מוכנים <span className="text-[#d4af37]">להתחיל?</span>
            </h2>
            <p className="text-[#a8a8a8] text-lg max-w-2xl mx-auto mb-10">
              גלו את האוסף המלא שלנו ומצאו את היצירה המושלמת עבורכם
            </p>
            <motion.a
              href="/Gallery"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-[#d4af37]/20"
            >
              <span>לגלריה</span>
              <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
