import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronDown, Camera, Sparkles } from 'lucide-react';

// Default articles about the photographers
const defaultArticles = [
  {
    id: 'photographer-1',
    title: 'The Artist Behind the Lens',
    titleHe: 'האמן מאחורי העדשה',
    content: 'Meet our lead photographer who has spent over two decades capturing the raw beauty of wildlife and nature.',
    contentHe: 'הכירו את הצלם הראשי שלנו שביליה יותר משני עשורים בלכידת היופי הגולמי של חיות הבר והטבע. המסע שלו התחיל בילדותו, כשקיבל את המצלמה הראשונה שלו במתנה. מאז, הוא טייל ליותר מ-50 מדינות, תיעד רגעים נדירים ויצר אמנות שמדברת אל הנשמה. כל תמונה מספרת סיפור של סבלנות, התמדה ואהבה עמוקה לטבע.',
    image_url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80',
    order: 1,
    published: true
  },
  {
    id: 'photographer-2',
    title: 'Our Creative Vision',
    titleHe: 'החזון היצירתי שלנו',
    content: 'Discover our unique approach to wildlife photography and what drives our passion.',
    contentHe: 'גלו את הגישה הייחודית שלנו לצילום חיות בר ומה מניע את התשוקה שלנו. אנחנו מאמינים שצילום אמיתי לא רק מתעד את המציאות, אלא חושף את הנשמה שמסתתרת בתוכה. הפילוסופיה שלנו מבוססת על כבוד לטבע, סבלנות אינסופית והבנה עמוקה של התנהגות בעלי חיים. כל יציאה לשטח היא הרפתקה חדשה, כל פגישה עם חיית בר היא זכות.',
    image_url: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
    order: 2,
    published: true
  }
];

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load articles from localStorage (same source as admin panel) or use defaults
    const savedArticles = localStorage.getItem('adminArticles');
    if (savedArticles) {
      const parsed = JSON.parse(savedArticles);
      const publishedArticles = parsed.filter(a => a.published !== false);
      // Take only first 2 articles for this page
      setArticles(publishedArticles.length > 0 ? publishedArticles.slice(0, 2) : defaultArticles);
    } else {
      setArticles(defaultArticles);
    }
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.2 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d]" dir="rtl">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#0d0d0d] to-[#0d0d0d]"
          />

          {/* Animated Particles/Orbs */}
          <motion.div
            variants={floatVariants}
            initial="initial"
            animate="animate"
            className="absolute top-20 right-[20%] w-32 h-32 bg-[#d4af37]/10 rounded-full blur-[60px]"
          />
          <motion.div
            variants={floatVariants}
            initial="initial"
            animate="animate"
            style={{ animationDelay: '2s' }}
            className="absolute bottom-32 left-[15%] w-48 h-48 bg-[#cd7f32]/10 rounded-full blur-[80px]"
          />
          <motion.div
            variants={floatVariants}
            initial="initial"
            animate="animate"
            style={{ animationDelay: '4s' }}
            className="absolute top-40 left-[30%] w-24 h-24 bg-[#d4af37]/5 rounded-full blur-[40px]"
          />
        </div>

        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#d4af37] to-transparent" />
          <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#d4af37] to-transparent" />
          <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#d4af37]/20 to-[#cd7f32]/10 mb-6"
          >
            <BookOpen className="w-10 h-10 text-[#d4af37]" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="block text-[#d4af37] text-sm tracking-[0.3em] uppercase mb-4"
          >
            הכירו אותנו
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-5xl md:text-7xl font-light text-[#f5f5f0]"
          >
            מאמרים <span className="text-[#d4af37]">על הצלמים</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-[#a8a8a8] text-lg mt-6 max-w-2xl mx-auto"
          >
            גלו את הסיפורים והאנשים מאחורי האמנות
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-8"
          />

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
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

      {/* Articles Section */}
      <section className="py-24 relative">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#d4af37]/3 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[#cd7f32]/3 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-32"
          >
            {articles.sort((a, b) => (a.order || 0) - (b.order || 0)).map((article, index) => (
              <motion.article
                key={article.id}
                variants={itemVariants}
                className="relative"
              >
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}>
                  {/* Image Section */}
                  <motion.div
                    className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                      {/* Shimmer Effect on Hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10"
                      />

                      <motion.img
                        src={article.image_url || 'https://via.placeholder.com/800x600?text=Article+Image'}
                        alt={article.titleHe || article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        variants={imageVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/800x600?text=Article+Image';
                        }}
                      />

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/70 via-transparent to-transparent" />

                      {/* Floating Camera Icon */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="absolute bottom-4 right-4 p-3 bg-[#0d0d0d]/80 backdrop-blur-sm rounded-xl border border-[#d4af37]/30"
                      >
                        <Camera className="w-5 h-5 text-[#d4af37]" />
                      </motion.div>
                    </div>

                    {/* Decorative Corners */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className={`absolute -top-4 ${index % 2 === 0 ? '-right-4' : '-left-4'} w-20 h-20`}
                    >
                      <div className={`absolute top-0 ${index % 2 === 0 ? 'right-0' : 'left-0'} w-full h-[2px] bg-gradient-to-${index % 2 === 0 ? 'l' : 'r'} from-[#d4af37] to-transparent`} />
                      <div className={`absolute top-0 ${index % 2 === 0 ? 'right-0' : 'left-0'} w-[2px] h-full bg-gradient-to-b from-[#d4af37] to-transparent`} />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className={`absolute -bottom-4 ${index % 2 === 0 ? '-left-4' : '-right-4'} w-20 h-20`}
                    >
                      <div className={`absolute bottom-0 ${index % 2 === 0 ? 'left-0' : 'right-0'} w-full h-[2px] bg-gradient-to-${index % 2 === 0 ? 'r' : 'l'} from-[#d4af37] to-transparent`} />
                      <div className={`absolute bottom-0 ${index % 2 === 0 ? 'left-0' : 'right-0'} w-[2px] h-full bg-gradient-to-t from-[#d4af37] to-transparent`} />
                    </motion.div>

                    {/* Article Number */}
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className={`absolute -bottom-8 ${index % 2 === 0 ? 'right-8' : 'left-8'} bg-[#1a1a1a] border border-[#d4af37]/30 rounded-xl px-6 py-4 shadow-2xl`}
                    >
                      <span className="text-[#d4af37]/40 text-sm">מאמר</span>
                      <p className="text-[#d4af37] text-4xl font-light">0{index + 1}</p>
                    </motion.div>
                  </motion.div>

                  {/* Content Section */}
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    {/* Sparkle Icon */}
                    <motion.div
                      initial={{ opacity: 0, rotate: -180 }}
                      whileInView={{ opacity: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="inline-flex items-center gap-2 text-[#d4af37]/60"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm tracking-wider">סיפור אישי</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="text-3xl md:text-5xl font-light text-[#f5f5f0] leading-tight"
                    >
                      {article.titleHe || article.title}
                    </motion.h2>

                    {/* Decorative Line */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                      className={`h-[2px] w-20 bg-gradient-to-${index % 2 === 0 ? 'l' : 'r'} from-[#d4af37] to-transparent origin-${index % 2 === 0 ? 'right' : 'left'}`}
                    />

                    {/* Content */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="text-[#a8a8a8] text-lg leading-relaxed"
                    >
                      {article.contentHe || article.content}
                    </motion.p>

                    {/* Read More Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.05, x: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex items-center gap-3 text-[#d4af37] hover:text-[#f5f5f0] transition-colors"
                      >
                        <span className="text-sm tracking-wider">קראו עוד</span>
                        <svg
                          className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.button>
                    </motion.div>
                  </div>
                </div>

                {/* Separator between articles */}
                {index < articles.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 1 }}
                    className="mt-32 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent"
                  />
                )}
              </motion.article>
            ))}
          </motion.div>

          {/* Empty State if no articles */}
          {articles.length === 0 && isLoaded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <BookOpen className="w-16 h-16 text-[#d4af37]/30 mx-auto mb-6" />
              <h3 className="text-2xl text-[#f5f5f0] mb-2">אין מאמרים עדיין</h3>
              <p className="text-[#a8a8a8]">מאמרים חדשים יתווספו בקרוב</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d]" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37] rounded-full blur-[200px]"
          />
        </div>

        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-[#f5f5f0] mb-6">
              רוצים לראות את <span className="text-[#d4af37]">העבודות שלנו?</span>
            </h2>
            <p className="text-[#a8a8a8] text-lg max-w-2xl mx-auto mb-10">
              בקרו בגלריה שלנו וגלו את האוסף המלא של יצירות האמנות
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
