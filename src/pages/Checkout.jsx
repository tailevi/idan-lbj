import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CreditCard, Banknote, Smartphone, Trash2, ShoppingBag, Check, Package, Truck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getCartItems, setCartItems as setCartCookie, clearCartItems } from '@/utils/cookies';

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'credit'
  });

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRemoveItem = (item) => {
    const updated = cartItems.filter(i =>
      !(i.product_id === item.product_id && i.size === item.size)
    );
    setCartItems(updated);
    setCartCookie(updated);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Order submitted:', { items: cartItems, ...formData, total });

    clearCartItems();
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#000000] pt-24" dir="rtl">
        <div className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-br from-[#d4af37] to-[#cd7f32] rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <Check className="w-10 h-10 text-[#0d0d0d]" strokeWidth={3} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-light text-[#f5f5f0] mb-4"
            >
              ההזמנה התקבלה בהצלחה!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-[#8b7355] mb-8"
            >
              תודה על ההזמנה! ניצור איתך קשר בהקדם לאישור הפרטים.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={() => navigate('/Gallery')}
                className="bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] font-medium px-8 py-6 rounded-xl hover:opacity-90 transition-opacity"
              >
                חזרה לגלריה
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#000000] pt-24" dir="rtl">
        <div className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto text-center"
          >
            <ShoppingBag className="w-20 h-20 text-[#1a1a1a] mx-auto mb-6" />
            <h1 className="text-2xl font-light text-[#f5f5f0] mb-4">הסל שלך ריק</h1>
            <p className="text-[#8b7355] mb-8">הוסיפו פריטים לסל מהגלריה שלנו</p>
            <Button
              onClick={() => navigate('/Gallery')}
              className="bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] font-medium px-8 py-6 rounded-xl hover:opacity-90 transition-opacity"
            >
              לגלריה
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  const paymentMethods = [
    { id: 'credit', label: 'כרטיס אשראי', icon: CreditCard },
    { id: 'bit', label: 'ביט', icon: Smartphone },
    { id: 'transfer', label: 'העברה בנקאית', icon: Banknote }
  ];

  return (
    <div className="min-h-screen bg-[#000000] pt-24" dir="rtl">
      {/* Header */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[#d4af37] text-sm tracking-[0.3em] uppercase"
            >
              השלמת הזמנה
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-light text-[#f5f5f0] mt-4"
            >
              תשלום
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-5 gap-10">
              {/* Left: Shipping & Payment Form (3 cols) */}
              <div className="lg:col-span-3 space-y-8">
                {/* Shipping Details */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-[#0d0d0d]/60 backdrop-blur-xl rounded-3xl border border-[#1a1a1a] p-8"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-[#d4af37]/10 rounded-xl flex items-center justify-center">
                      <Truck className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <h2 className="text-xl font-light text-[#f5f5f0]">פרטי משלוח</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[#8b7355] text-sm">שם מלא</label>
                        <Input
                          value={formData.fullName}
                          onChange={(e) => handleChange('fullName', e.target.value)}
                          placeholder="הזינו את שמכם"
                          required
                          className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f5f5f0] placeholder:text-[#5a5a5a] focus:border-[#d4af37] focus:ring-[#d4af37]/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[#8b7355] text-sm">אימייל</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f5f5f0] placeholder:text-[#5a5a5a] focus:border-[#d4af37] focus:ring-[#d4af37]/20"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[#8b7355] text-sm">טלפון</label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          placeholder="050-000-0000"
                          required
                          className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f5f5f0] placeholder:text-[#5a5a5a] focus:border-[#d4af37] focus:ring-[#d4af37]/20"
                          dir="ltr"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[#8b7355] text-sm">עיר</label>
                        <Input
                          value={formData.city}
                          onChange={(e) => handleChange('city', e.target.value)}
                          placeholder="שם העיר"
                          required
                          className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f5f5f0] placeholder:text-[#5a5a5a] focus:border-[#d4af37] focus:ring-[#d4af37]/20"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[#8b7355] text-sm">כתובת</label>
                        <Input
                          value={formData.address}
                          onChange={(e) => handleChange('address', e.target.value)}
                          placeholder="רחוב, מספר בית, דירה"
                          required
                          className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f5f5f0] placeholder:text-[#5a5a5a] focus:border-[#d4af37] focus:ring-[#d4af37]/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[#8b7355] text-sm">מיקוד</label>
                        <Input
                          value={formData.zipCode}
                          onChange={(e) => handleChange('zipCode', e.target.value)}
                          placeholder="0000000"
                          className="bg-[#1a1a1a] border-[#2a2a2a] text-[#f5f5f0] placeholder:text-[#5a5a5a] focus:border-[#d4af37] focus:ring-[#d4af37]/20"
                          dir="ltr"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Payment Method */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-[#0d0d0d]/60 backdrop-blur-xl rounded-3xl border border-[#1a1a1a] p-8"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-[#d4af37]/10 rounded-xl flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <h2 className="text-xl font-light text-[#f5f5f0]">אמצעי תשלום</h2>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      const isSelected = formData.paymentMethod === method.id;
                      return (
                        <motion.button
                          key={method.id}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleChange('paymentMethod', method.id)}
                          className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                            isSelected
                              ? 'border-[#d4af37] bg-[#d4af37]/10'
                              : 'border-[#1a1a1a] bg-[#1a1a1a]/50 hover:border-[#2a2a2a]'
                          }`}
                        >
                          <Icon className={`w-6 h-6 ${isSelected ? 'text-[#d4af37]' : 'text-[#8b7355]'}`} />
                          <span className={`text-sm ${isSelected ? 'text-[#d4af37]' : 'text-[#8b7355]'}`}>
                            {method.label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

              {/* Right: Order Summary (2 cols) */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-[#0d0d0d]/60 backdrop-blur-xl rounded-3xl border border-[#1a1a1a] p-8 sticky top-28"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-[#d4af37]/10 rounded-xl flex items-center justify-center">
                      <Package className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <h2 className="text-xl font-light text-[#f5f5f0]">סיכום הזמנה</h2>
                  </div>

                  {/* Cart Items */}
                  <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                    <AnimatePresence>
                      {cartItems.map((item) => (
                        <motion.div
                          key={`${item.product_id}-${item.size}`}
                          layout
                          exit={{ opacity: 0, x: 50 }}
                          className="flex gap-3 p-3 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a]"
                        >
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.product_image}
                              alt={item.product_title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-[#f5f5f0] text-sm font-medium truncate">
                              {item.product_title}
                            </h3>
                            <p className="text-[#8b7355] text-xs mt-1">
                              {item.size} | כמות: {item.quantity}
                            </p>
                            <p className="text-[#d4af37] text-sm mt-1">
                              ₪{(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRemoveItem(item)}
                            className="self-start p-1.5 text-[#8b7355] hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </motion.button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Totals */}
                  <div className="border-t border-[#1a1a1a] pt-6 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#8b7355]">סכום ביניים</span>
                      <span className="text-[#a8a8a8]">₪{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#8b7355]">משלוח</span>
                      <span className="text-[#a8a8a8]">
                        {shipping === 0 ? (
                          <span className="text-green-400">חינם</span>
                        ) : (
                          `₪${shipping}`
                        )}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-[#8b7355] text-xs">
                        משלוח חינם בהזמנות מעל ₪500
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-3 border-t border-[#1a1a1a]">
                      <span className="text-[#f5f5f0] font-medium">סה"כ לתשלום</span>
                      <motion.span
                        key={total}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        className="text-xl font-medium text-[#d4af37]"
                      >
                        ₪{total.toLocaleString()}
                      </motion.span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] font-medium py-6 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    <AnimatePresence mode="wait">
                      {!isSubmitting ? (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          אישור הזמנה
                        </motion.span>
                      ) : (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          מעבד הזמנה...
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>

                  {/* Back link */}
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-full mt-4 flex items-center justify-center gap-2 text-[#8b7355] hover:text-[#d4af37] transition-colors text-sm"
                  >
                    <ArrowRight className="w-4 h-4" />
                    חזרה לסל
                  </button>
                </motion.div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
