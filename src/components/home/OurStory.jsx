import React from 'react';
import { motion } from 'framer-motion';

export default function OurStory() {
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    })
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="relative py-32 bg-[#0d0d0d] overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#d4af37] rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#cd7f32] rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center" dir="rtl">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <motion.img
                src="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=800&q=80"
                alt="Limor & Jacob"
                className="w-full h-full object-cover"
                whileInView={{ scale: 1 }}
                initial={{ scale: 1.1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
            </div>

            {/* Decorative Frame */}
            <motion.div
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute -top-4 -right-4 w-32 h-32 border-t-2 border-r-2 border-[#d4af37] origin-top-right"
            />
            <motion.div
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute -bottom-4 -left-4 w-32 h-32 border-b-2 border-l-2 border-[#d4af37] origin-bottom-left"
            />

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-8 right-8 bg-[#1a1a1a] border border-[#d4af37]/30 rounded-xl px-6 py-4"
            >
              <p className="text-[#d4af37] text-3xl font-light">+20</p>
              <p className="text-[#8b7355] text-sm">שנות ניסיון</p>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <div className="space-y-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.span
                custom={0}
                variants={textVariants}
                className="text-[#d4af37] text-sm tracking-[0.3em] uppercase"
              >
                הסיפור שלנו
              </motion.span>
              
              <motion.h2
                custom={1}
                variants={textVariants}
                className="text-4xl md:text-5xl font-light text-[#f5f5f0] mt-4 leading-tight"
              >
                לימור 
                <br />
                <span className="text-[#d4af37]">וג'ייקוב</span>
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.p
                custom={2}
                variants={textVariants}
                className="text-[#a8a8a8] text-lg leading-relaxed"
              >
כל תמונה באוסף שלנו היא רגע נדיר שנגע בנו באופן אישי. אנחנו, לימור וג'ייקוב, מקדישים את חיינו לחיפוש אחר נקודת המפגש שבין טבע פראי לדיוק אמנותי. השאיפה שלנו היא להביא את עוצמת העולם החיצון אל המרחב הפרטי שלכם; עבורנו, צילום הוא הרבה מעבר לתיעוד – הוא דרך לספר סיפור שמעורר השראה.
              </motion.p>

              <motion.p
                custom={3}
                variants={textVariants}
                className="text-[#a8a8a8] text-lg leading-relaxed"
              >
המסע המשותף שלנו זכה להכרה בבמות הנחשבות ביותר בעולם, עם פרסים בינלאומיים יוקרתיים ופרסומים במגזין National Geographic. חותמת איכות זו היא המנוע שלנו להמשיך ולחקור את גבולות היצירה, מתוך חזון להעניק לכם חוויה ויזואלית שלמה ובלתי מתפשרת.
              </motion.p>

              <motion.p
                custom={4}
                variants={textVariants}
                className="text-[#a8a8a8] text-lg leading-relaxed"
              >
כדי להבטיח יופי שנשמר לדורות, אנו מדפיסים את העבודות בסטנדרטים הגבוהים ביותר על חומרי הגלם המשובחים ביותר. כל יצירה מלווה בתעודת מקוריות (Certificate of Authenticity) חתומה, המבטיחה את ערכה האמנותי ואת בלעדיותה. המטרה שלנו היא לאפשר לכם להכניס את הטבע הפראי אל תוך הבית, ולהפוך כל קיר לחלון אל עולם של עוצמה ואופי ייחודי.              </motion.p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-[#1a1a1a]"
            >
              {[
                { value: '50+', label: 'מדינות' },
                { value: '1000+', label: 'יצירות' },
                { value: '500+', label: 'לקוחות' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <p className="text-3xl font-light text-[#d4af37]">{stat.value}</p>
                  <p className="text-[#8b7355] text-sm mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}