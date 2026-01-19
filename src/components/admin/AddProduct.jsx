import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Image, AlertCircle, CheckCircle, ChevronDown } from 'lucide-react';

const categoryLabels = {
  wildlife: 'חיות',
  landscapes: 'נופים',
  tribes: 'אנשים',
  Authenticity: 'אותנטיות',
  Drama: 'דרמה',
  Vision: 'חזון',
  Fear: 'חשש',
  Naturalness: 'טבעיות',
  Focus: 'מיקוד',
  Determination: 'נחישת',
  Curiosity: 'סקרנות',
  Power: 'עוצמה',
  Peace: 'שלווה',
  Wholeness: 'שלמות'
};

const categoryOptions = Object.entries(categoryLabels).map(([key, value]) => ({
  value: key,
  label: value
}));

export default function AddProduct() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category1: '',
    category2: '',
    image: ''
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [openDropdown, setOpenDropdown] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title || formData.title.trim() === '') {
      newErrors.title = 'שדה חובה';
    } else if (typeof formData.title !== 'string') {
      newErrors.title = 'חייב להיות טקסט';
    }

    if (!formData.price || formData.price === '') {
      newErrors.price = 'שדה חובה';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'חייב להיות מספר חיובי';
    }

    if (!formData.category1) {
      newErrors.category1 = 'שדה חובה';
    }

    if (!formData.category2) {
      newErrors.category2 = 'שדה חובה';
    }

    if (!formData.image || formData.image.trim() === '') {
      newErrors.image = 'שדה חובה';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (validateForm()) {
      // Create product object
      const newProduct = {
        id: Date.now().toString(),
        title: formData.title,
        price: Number(formData.price),
        categories: [formData.category1, formData.category2],
        image_url: formData.image,
        description: '',
        sizes: [
          { dimensions: '30×40 ס"מ', price: Number(formData.price) },
          { dimensions: '50×70 ס"מ', price: Math.round(Number(formData.price) * 1.5) },
          { dimensions: '70×100 ס"מ', price: Math.round(Number(formData.price) * 2) },
          { dimensions: '100×150 ס"מ', price: Math.round(Number(formData.price) * 3) }
        ],
        materials: [
          { type: 'קנבס קלאסי', priceModifier: 1 },
          { type: 'קנבס פרימיום', priceModifier: 1.3 },
          { type: 'קנבס מיוזיאום', priceModifier: 1.6 }
        ]
      };

      // Get existing products from localStorage or initialize empty array
      const existingProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]');
      existingProducts.push(newProduct);
      localStorage.setItem('adminProducts', JSON.stringify(existingProducts));

      console.log('New Product Added:', newProduct);
      setSubmitStatus('success');

      // Reset form
      setFormData({
        title: '',
        price: '',
        category1: '',
        category2: '',
        image: ''
      });

      // Clear success message after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    } else {
      setSubmitStatus('error');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const SelectDropdown = ({ value, onChange, options, placeholder, error, id }) => {
    const isOpen = openDropdown === id;
    const selectedOption = options.find(opt => opt.value === value);

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpenDropdown(isOpen ? null : id)}
          className={`w-full bg-[#0d0d0d] border ${error ? 'border-red-500' : 'border-[#3a3a3a]'} rounded-xl px-4 py-3 text-right flex items-center justify-between transition-colors focus:outline-none focus:border-[#d4af37]`}
        >
          <ChevronDown className={`w-5 h-5 text-[#666] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          <span className={selectedOption ? 'text-[#f5f5f0]' : 'text-[#666]'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 w-full mt-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto"
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpenDropdown(null);
                  }}
                  className={`w-full px-4 py-3 text-right hover:bg-[#2a2a2a] transition-colors ${
                    value === option.value ? 'bg-[#d4af37]/10 text-[#d4af37]' : 'text-[#f5f5f0]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto" dir="rtl">
      <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-[#2a2a2a]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#d4af37]/20 rounded-xl flex items-center justify-center">
            <Plus className="w-5 h-5 text-[#d4af37]" />
          </div>
          <h2 className="text-xl font-bold text-[#f5f5f0]">הוסף מוצר חדש</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-[#f5f5f0] text-sm mb-2">כותרת *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full bg-[#0d0d0d] border ${errors.title ? 'border-red-500' : 'border-[#3a3a3a]'} rounded-xl px-4 py-3 text-[#f5f5f0] placeholder-[#666] focus:outline-none focus:border-[#d4af37] transition-colors`}
              placeholder="הזן כותרת מוצר"
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-[#f5f5f0] text-sm mb-2">מחיר (₪) *</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              className={`w-full bg-[#0d0d0d] border ${errors.price ? 'border-red-500' : 'border-[#3a3a3a]'} rounded-xl px-4 py-3 text-[#f5f5f0] placeholder-[#666] focus:outline-none focus:border-[#d4af37] transition-colors`}
              placeholder="הזן מחיר"
              min="0"
              dir="ltr"
            />
            {errors.price && (
              <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.price}
              </p>
            )}
          </div>

          {/* Category 1 */}
          <div>
            <label className="block text-[#f5f5f0] text-sm mb-2">קטגוריה ראשית *</label>
            <SelectDropdown
              value={formData.category1}
              onChange={(value) => handleInputChange('category1', value)}
              options={categoryOptions}
              placeholder="בחר קטגוריה"
              error={errors.category1}
              id="category1"
            />
            {errors.category1 && (
              <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.category1}
              </p>
            )}
          </div>

          {/* Category 2 */}
          <div>
            <label className="block text-[#f5f5f0] text-sm mb-2">קטגוריה משנית *</label>
            <SelectDropdown
              value={formData.category2}
              onChange={(value) => handleInputChange('category2', value)}
              options={categoryOptions}
              placeholder="בחר קטגוריה"
              error={errors.category2}
              id="category2"
            />
            {errors.category2 && (
              <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.category2}
              </p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block text-[#f5f5f0] text-sm mb-2">קישור לתמונה *</label>
            <div className="relative">
              <input
                type="text"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                className={`w-full bg-[#0d0d0d] border ${errors.image ? 'border-red-500' : 'border-[#3a3a3a]'} rounded-xl px-4 py-3 pr-12 text-[#f5f5f0] placeholder-[#666] focus:outline-none focus:border-[#d4af37] transition-colors`}
                placeholder="/products/image_name.webp"
                dir="ltr"
              />
              <Image className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" />
            </div>
            <p className="text-[#d4af37] text-sm mt-2 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              אנא המר את התמונה לפורמט webp לפני ההעלאה!
            </p>
            {errors.image && (
              <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.image}
              </p>
            )}
          </div>

          {/* Submit Status Messages */}
          <AnimatePresence>
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-3 rounded-xl"
              >
                <CheckCircle className="w-5 h-5" />
                <span>המוצר נוסף בהצלחה!</span>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-xl"
              >
                <AlertCircle className="w-5 h-5" />
                <span>אנא תקן את השגיאות בטופס</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] font-bold py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            הוסף מוצר חדש
          </motion.button>
        </form>
      </div>
    </div>
  );
}
