import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Camera, Focus, Palette, Home } from 'lucide-react';

const steps = [
  {
    icon: Camera,
    title: 'הרפתקה',
    subtitle: 'Adventure',
    description: 'נוסעים לקצוות העולם לחפש את הרגע המושלם',
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&q=80'
  },
  {
    icon: Focus,
    title: 'לכידה',
    subtitle: 'Capture',
    description: 'הרגע ההוא שבו האור, הנוף והחיים נפגשים',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80'
  },
  {
    icon: Palette,
    title: 'יצירה',
    subtitle: 'Creation',
    description: 'עיבוד מקצועי והדפסה על קנבס איכותי',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80'
  },
  {
    icon: Home,
    title: 'הבית שלך',
    subtitle: 'Your Home',
    description: 'היצירה מקבלת את מקומה בחלל שלכם',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80'
  }
];

export default function ProcessTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section 
      ref={containerRef}
      className="relative py-32 bg-[#0d0d0d] overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
          dir="rtl"
        >
          <span className="text-[#d4af37] text-sm tracking-[0.3em] uppercase">
            התהליך
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-[#f5f5f0] mt-4">
            מהטבע אליכם
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Progress Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#1a1a1a] transform -translate-x-1/2 hidden md:block">
            <motion.div
              className="w-full bg-gradient-to-b from-[#d4af37] to-[#cd7f32] origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-24 md:space-y-32">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const Icon = step.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                  dir="rtl"
                >
                  {/* Image Card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="w-full md:w-1/2 relative"
                  >
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                      <motion.img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    {/* Step Number */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className="absolute -top-4 -right-4 w-12 h-12 bg-[#d4af37] rounded-xl flex items-center justify-center text-[#0d0d0d] font-bold text-lg"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </motion.div>
                  </motion.div>

                  {/* Center Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#0d0d0d] border-2 border-[#d4af37] rounded-full items-center justify-center z-10"
                  >
                    <Icon className="w-6 h-6 text-[#d4af37]" />
                  </motion.div>

                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'text-right' : 'text-right md:text-left'}`}>
                    <motion.div
                      whileHover={{ x: isEven ? -10 : 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-[#8b7355] text-xs tracking-wider uppercase">
                        {step.subtitle}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-light text-[#f5f5f0] mt-2">
                        {step.title}
                      </h3>
                      <p className="text-[#a8a8a8] mt-4 max-w-sm">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}