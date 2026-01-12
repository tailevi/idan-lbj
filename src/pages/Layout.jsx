
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import ClickRipple from '@/components/effects/ClickRipple';

export default function Layout({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Listen for add to cart events
  useEffect(() => {
    const handleAddToCart = (e) => {
      const product = e.detail;
      
      setCartItems(prev => {
        const existingIndex = prev.findIndex(
          item => item.product_id === product.id && 
                  item.size === (product.selectedSize?.dimensions || product.sizes?.[0]?.dimensions)
        );

        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex].quantity += product.quantity || 1;
          return updated;
        }

        return [...prev, {
          product_id: product.id,
          product_title: product.title,
          product_image: product.image_url,
          size: product.selectedSize?.dimensions || product.sizes?.[0]?.dimensions || '50×70 ס"מ',
          price: product.selectedSize?.price || product.price,
          quantity: product.quantity || 1
        }];
      });

      setIsCartOpen(true);
    };

    window.addEventListener('addToCart', handleAddToCart);
    return () => window.removeEventListener('addToCart', handleAddToCart);
  }, []);

  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => prev.map(i => 
      i.product_id === item.product_id && i.size === item.size
        ? { ...i, quantity: newQuantity }
        : i
    ));
  };

  const handleRemoveItem = (item) => {
    setCartItems(prev => prev.filter(i => 
      !(i.product_id === item.product_id && i.size === item.size)
    ));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#000000]">
      <ClickRipple />
      <style>{`
        :root {
          --color-primary: #d4af37;
          --color-secondary: #cd7f32;
          --color-accent: #b76e79;
          --color-bg-dark: #000000;
          --color-bg: #0d0d0d;
          --color-bg-light: #1a1a1a;
          --color-text: #f5f5f0;
          --color-text-muted: #a8a8a8;
          --color-text-subtle: #8b7355;
        }

        @import url('https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@300;400;500;700&family=Rubik:wght@300;400;500;600&family=Varela+Round&display=swap');

        body {
          font-family: 'Rubik', sans-serif;
          background-color: var(--color-bg-dark);
          color: var(--color-text);
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Varela Round', 'Frank Ruhl Libre', serif;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: var(--color-bg);
        }

        ::-webkit-scrollbar-thumb {
          background: var(--color-bg-light);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: var(--color-text-subtle);
        }

        /* Selection */
        ::selection {
          background: var(--color-primary);
          color: var(--color-bg-dark);
        }
      `}</style>

      <Header 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)} 
      />

      <main>
        {children}
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}
