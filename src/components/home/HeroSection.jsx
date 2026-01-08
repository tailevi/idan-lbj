import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Leaf, Bird, Mountain } from 'lucide-react';
import ParticleField from '../effects/ParticleField';
import AnimatedLogo from '../effects/AnimatedLogo';

const heroImages = [
  'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
  'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=1920&q=80'
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [scrollIcon, setScrollIcon] = useState(0);
  
  const icons = [ChevronDown, Leaf, Bird, Mountain];
  const CurrentIcon = icons[scrollIcon];

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    const iconInterval = setInterval(() => {
      setScrollIcon((prev) => (prev + 1) % icons.length);
    }, 2000);

    return () => {
      clearInterval(imageInterval);
      clearInterval(iconInterval);
    };
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen overflow-hidden bg-[#000000]">
      {/* Background Images with Ken Burns Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <motion.img
            src={heroImages[currentImage]}
            alt=""
            className="w-full h-full object-cover"
            animate={{ scale: 1.05 }}
            transition={{ duration: 6, ease: 'linear' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black" />

      {/* Particle Field */}
      <ParticleField className="z-10" interactive={true} density={40} />

      {/* Logo Container */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatedLogo size="large" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-12 text-[#8b7355] text-sm md:text-base tracking-[0.3em] uppercase text-center"
        >
          Nature • Wildlife • Soul
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={scrollIcon}
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentIcon className="w-6 h-6 text-[#d4af37]" />
            </motion.div>
          </AnimatePresence>
          <span className="text-[#8b7355] text-xs tracking-wider">גלה עוד</span>
        </motion.div>
      </motion.button>

      {/* Side Decorative Lines */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute left-8 top-1/4 h-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#d4af37]/30 to-transparent origin-top hidden lg:block"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute right-8 top-1/4 h-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#d4af37]/30 to-transparent origin-top hidden lg:block"
      />
    </section>
  );
}