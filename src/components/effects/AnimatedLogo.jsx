import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedLogo({ size = 'large', className = '' }) {
  const isLarge = size === 'large';
  
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      filter: 'blur(20px)'
    },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const shimmerVariants = {
    initial: { backgroundPosition: '-200% center' },
    animate: { 
      backgroundPosition: '200% center',
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div 
      className={`flex flex-col items-center ${className}`}
      initial="hidden"
      animate="visible"
      whileHover={isLarge ? { scale: 1.02 } : undefined}
    >
      <div className={`flex ${isLarge ? 'gap-4 md:gap-8' : 'gap-1'}`} dir="ltr">
        {['L', 'B', 'J'].map((letter, i) => (
          <motion.span
            key={letter}
            custom={i}
            variants={letterVariants}
            className={`
              ${isLarge ? 'text-7xl md:text-9xl' : 'text-2xl'}
              font-serif font-bold
              bg-gradient-to-br from-[#d4af37] via-[#f5e6c4] to-[#cd7f32]
              bg-clip-text text-transparent
              drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]
            `}
            style={{
              backgroundSize: '200% 200%',
            }}
            whileHover={isLarge ? {
              rotateY: 15,
              rotateX: 5,
              transition: { duration: 0.3 }
            } : undefined}
          >
            <motion.span
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="inline-block bg-gradient-to-r from-[#d4af37] via-[#fff8e7] to-[#d4af37] bg-clip-text"
              style={{
                backgroundSize: '200% 100%',
              }}
            >
              {letter}
            </motion.span>
          </motion.span>
        ))}
      </div>
      
      {isLarge && (
        <motion.div
          variants={subtitleVariants}
          className="mt-6 text-center"
          dir="rtl"
        >
          <motion.p 
            className="text-[#f5f5f0] text-lg md:text-xl font-light tracking-wider"
            style={{ fontFamily: 'serif' }}
          >
            Bahar Fine Art Photography
          </motion.p>
          <motion.p 
            className="text-[#8b7355] text-sm md:text-base mt-2"
          >
            by Limor & Jacob
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
}