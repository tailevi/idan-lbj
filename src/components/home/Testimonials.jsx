import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronRight, ChevronLeft, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'מיכל לוי',
    role: 'לקוחה מתל אביב',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    text: 'הקנבס של הפילים באפריקה תופס מקום כבוד בסלון שלנו. האיכות פשוט מדהימה, וכל מי שמבקר מתפעל.',
    rating: 5
  },
  {
    name: 'דני כהן',
    role: 'לקוח מירושלים',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    text: 'רכשתי שלוש יצירות לחדר העבודה. השירות היה מעולה והתמונות הגיעו ארוזות בצורה מושלמת.',
    rating: 5
  },
  {
    name: 'נועה ברק',
    role: 'מעצבת פנים',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    text: 'כמעצבת, אני תמיד מחפשת יצירות ייחודיות ללקוחות שלי. LBJ הפכו לכתובת הקבועה שלי לאמנות טבע.',
    rating: 5
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const navigate = (dir) => {
    setDirection(dir);
    if (dir === 1) {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    } else {
      setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      rotateY: direction > 0 ? 15 : -15
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      rotateY: direction < 0 ? 15 : -15
    })
  };

  return (
    <section className="relative py-32 bg-[#0d0d0d] overflow-hidden">
      {/* Background Photo Grid */}
      <div className="absolute inset-0 grid grid-cols-4 gap-2 opacity-5">
        {Array(12).fill(0).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="aspect-square bg-cover bg-center"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-${1500000000000 + i * 100}?w=200&q=50)`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          dir="rtl"
        >
          <span className="text-[#d4af37] text-sm tracking-[0.3em] uppercase">
            הלקוחות שלנו
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-[#f5f5f0] mt-4">
            מה אומרים עלינו
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative" style={{ perspective: 1000 }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#1a1a1a]/60 backdrop-blur-xl rounded-3xl border border-[#2a2a2a] p-8 md:p-12"
                dir="rtl"
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Image */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-[#d4af37]">
                      <img
                        src={testimonials[current].image}
                        alt={testimonials[current].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <motion.div
                      className="absolute -top-2 -right-2 w-10 h-10 bg-[#d4af37] rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Quote className="w-5 h-5 text-[#0d0d0d]" />
                    </motion.div>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-right">
                    {/* Stars */}
                    <div className="flex justify-center md:justify-start gap-1 mb-4">
                      {Array(testimonials[current].rating).fill(0).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 + i * 0.1 }}
                        >
                          <Star className="w-5 h-5 text-[#d4af37] fill-[#d4af37]" />
                        </motion.div>
                      ))}
                    </div>

                    <p className="text-[#f5f5f0] text-lg md:text-xl leading-relaxed mb-6">
                      "{testimonials[current].text}"
                    </p>

                    <div>
                      <p className="text-[#d4af37] font-medium">
                        {testimonials[current].name}
                      </p>
                      <p className="text-[#8b7355] text-sm">
                        {testimonials[current].role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate(-1)}
                className="p-3 bg-[#1a1a1a] rounded-full text-[#8b7355] hover:text-[#d4af37] transition-colors border border-[#2a2a2a]"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1);
                      setCurrent(i);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === current ? 'bg-[#d4af37] w-6' : 'bg-[#2a2a2a]'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate(1)}
                className="p-3 bg-[#1a1a1a] rounded-full text-[#8b7355] hover:text-[#d4af37] transition-colors border border-[#2a2a2a]"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}