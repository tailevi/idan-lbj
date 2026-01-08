import React, { useRef, useEffect, useCallback } from 'react';

export default function ParticleField({ className = '', interactive = true, density = 50 }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  const initParticles = useCallback((canvas) => {
    const particles = [];
    const count = Math.floor((canvas.width * canvas.height) / (20000 / density * 100));
    
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        gold: Math.random() > 0.7
      });
    }
    return particles;
  }, [density]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      particlesRef.current = initParticles(canvas);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      particlesRef.current.forEach((particle, i) => {
        // Mouse repulsion
        if (interactive) {
          const dx = particle.x - mouseRef.current.x;
          const dy = particle.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 100) {
            const force = (100 - dist) / 100;
            particle.vx += (dx / dist) * force * 0.2;
            particle.vy += (dy / dist) * force * 0.2;
          }
        }

        // Apply velocity with damping
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.offsetWidth;
        if (particle.x > canvas.offsetWidth) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.offsetHeight;
        if (particle.y > canvas.offsetHeight) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        if (particle.gold) {
          ctx.fillStyle = `rgba(212, 175, 55, ${particle.opacity})`;
        } else {
          ctx.fillStyle = `rgba(139, 115, 85, ${particle.opacity * 0.5})`;
        }
        ctx.fill();

        // Draw connections
        particlesRef.current.slice(i + 1).forEach(other => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 80 && particle.gold && other.gold) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.1 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [interactive, initParticles]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
    />
  );
}