import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const collections = [
  {
    id: 'wildlife',
    title: 'טבע פראי',
    subtitle: 'Wildlife',
    image: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=800&q=80',
    count: 45
  },
  {
    id: 'landscapes',
    title: 'נופים',
    subtitle: 'Landscapes',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    count: 38
  },
  {
    id: 'tribes',
    title: 'שבטים',
    subtitle: 'Tribes',
    image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80',
    count: 22
  }
];

export default function FeaturedCollections() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative py-32 bg-[#000000] overflow-hidden">
      {/* Animated Topographic Lines Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 800 600">
          <motion.path
            d="M0,100 Q200,150 400,100 T800,100"
            fill="none"
            stroke="#d4af37"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M0,200 Q200,250 400,200 T800,200"
            fill="none"
            stroke="#d4af37"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M0,300 Q200,350 400,300 T800,300"
            fill="none"
            stroke="#d4af37"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        </svg>
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
            הקולקציות שלנו
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-[#f5f5f0] mt-4">
            גלה את העולמות
          </h2>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group"
            >
              <Link to={`${createPageUrl('Gallery')}?category=${collection.id}`}>
                <motion.div
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: 1000
                  }}
                >
                  {/* Image */}
                  <motion.img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                      filter: hoveredIndex === index ? 'saturate(1.3)' : 'saturate(1)'
                    }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Golden Frame on Hover */}
                  <motion.div
                    className="absolute inset-4 border border-[#d4af37] rounded-xl pointer-events-none"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      scale: hoveredIndex === index ? 1 : 0.95
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8" dir="rtl">
                    <motion.div
                      animate={{
                        y: hoveredIndex === index ? -10 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-[#d4af37] text-xs tracking-wider uppercase mb-2">
                        {collection.subtitle}
                      </p>
                      <h3 className="text-[#f5f5f0] text-2xl font-light mb-2">
                        {collection.title}
                      </h3>
                      <p className="text-[#8b7355] text-sm">
                        {collection.count} יצירות
                      </p>
                    </motion.div>

                    {/* Arrow Icon */}
                    <motion.div
                      className="absolute left-8 bottom-8"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        x: hoveredIndex === index ? 0 : -20
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-[#d4af37] flex items-center justify-center">
                        <ArrowUpLeft className="w-5 h-5 text-[#0d0d0d]" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Glitch Effect on Hover */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                      opacity: hoveredIndex === index ? [0, 0.1, 0, 0.05, 0] : 0
                    }}
                    transition={{ duration: 0.5 }}
                    style={{
                      background: 'linear-gradient(45deg, transparent 30%, #d4af37 50%, transparent 70%)',
                      mixBlendMode: 'overlay'
                    }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}