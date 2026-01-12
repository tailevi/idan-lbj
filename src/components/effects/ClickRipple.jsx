import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClickRipple() {
  const [ripples, setRipples] = useState([]);

  const createRipples = useCallback((e) => {
    const x = e.clientX;
    const y = e.clientY;
    const timestamp = Date.now();

    // Create 3 ripples with staggered delays
    const newRipples = [
      { id: `${timestamp}-1`, x, y, delay: 0 },
      { id: `${timestamp}-2`, x, y, delay: 0.1 },
      { id: `${timestamp}-3`, x, y, delay: 0.2 },
    ];

    setRipples(prev => [...prev, ...newRipples]);

    // Clean up ripples after animation completes
    setTimeout(() => {
      setRipples(prev => prev.filter(r => !newRipples.find(nr => nr.id === r.id)));
    }, 1500);
  }, []);

  useEffect(() => {
    document.addEventListener('click', createRipples);
    return () => document.removeEventListener('click', createRipples);
  }, [createRipples]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full border-2 border-[#d4af37]"
            style={{
              left: ripple.x,
              top: ripple.y,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{
              width: 0,
              height: 0,
              opacity: 0.8,
              borderWidth: 3
            }}
            animate={{
              width: 150,
              height: 150,
              opacity: 0,
              borderWidth: 1
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              delay: ripple.delay,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
