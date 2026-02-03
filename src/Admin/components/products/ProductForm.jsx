import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, AlertCircle, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts';
import { categoryLabels } from '../../data/mockData';

export default function ProductForm({ isOpen, onClose, onSave, product }) {
  const { t, i18n } = useTranslation();
  const { isDark } = useTheme();
  const isHebrew = i18n.language === 'he';
  const fileInputRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    titleHe: '',
    price: '',
    category1: '',
    category2: '',
    image: '',
    stock: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        titleHe: product.titleHe || '',
        price: product.price?.toString() || '',
        category1: product.categories?.[0] || '',
        category2: product.categories?.[1] || '',
        image: product.image_url || '',
        stock: product.stock?.toString() || ''
      });
      setImagePreview(product.image_url || null);
    } else {
      setFormData({
        title: '',
        titleHe: '',
        price: '',
        category1: '',
        category2: '',
        image: '',
        stock: ''
      });
      setImagePreview(null);
    }
    setErrors({});
  }, [product, isOpen]);

  const categoryOptions = Object.entries(categoryLabels).map(([key, value]) => ({
    value: key,
    label: isHebrew ? value.he : value.en
  }));

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title?.trim()) newErrors.title = t('products.required');
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = t('products.required');
    if (!formData.category1) newErrors.category1 = t('products.required');
    if (!formData.category2) newErrors.category2 = t('products.required');
    if (!formData.image?.trim()) newErrors.image = t('products.required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        id: product?.id || Date.now().toString(),
        title: formData.title,
        titleHe: formData.titleHe,
        price: Number(formData.price),
        categories: [formData.category1, formData.category2],
        image_url: formData.image,
        stock: formData.stock ? Number(formData.stock) : undefined
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.includes('webp') && !file.name.toLowerCase().endsWith('.webp')) {
        setErrors(prev => ({ ...prev, image: t('products.webpOnly') }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, image: reader.result }));
        setErrors(prev => ({ ...prev, image: null }));
      };
      reader.readAsDataURL(file);
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
          className={`w-full border rounded-xl px-4 py-3 flex items-center justify-between transition-colors focus:outline-none ${
            error ? 'border-red-500' : isDark ? 'border-[#3a3a3a] focus:border-[#d4af37]' : 'border-gray-300 focus:border-[#d4af37]'
          } ${isDark ? 'bg-[#0d0d0d]' : 'bg-white'}`}
        >
          <span className={selectedOption ? (isDark ? 'text-[#f5f5f0]' : 'text-gray-900') : (isDark ? 'text-[#666]' : 'text-gray-400')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''} ${isDark ? 'text-[#666]' : 'text-gray-400'}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`absolute z-50 w-full mt-2 border rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto ${
                isDark ? 'bg-[#1a1a1a] border-[#3a3a3a]' : 'bg-white border-gray-200'
              }`}
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpenDropdown(null);
                  }}
                  className={`w-full px-4 py-3 text-start transition-colors ${
                    value === option.value
                      ? 'bg-[#d4af37]/10 text-[#d4af37]'
                      : isDark
                        ? 'text-[#f5f5f0] hover:bg-[#2a2a2a]'
                        : 'text-gray-900 hover:bg-gray-50'
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={`w-full max-w-lg rounded-2xl p-6 ${isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-white border border-gray-200'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                {product ? t('products.editProduct') : t('products.addProduct')}
              </h2>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-[#2a2a2a] text-[#a8a8a8]' : 'hover:bg-gray-100 text-gray-500'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                  {t('products.productName')} (EN) *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none ${
                    errors.title ? 'border-red-500' : isDark ? 'border-[#3a3a3a] focus:border-[#d4af37]' : 'border-gray-300 focus:border-[#d4af37]'
                  } ${isDark ? 'bg-[#0d0d0d] text-[#f5f5f0]' : 'bg-white text-gray-900'}`}
                />
                {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                  {t('products.productName')} (HE)
                </label>
                <input
                  type="text"
                  value={formData.titleHe}
                  onChange={(e) => setFormData(prev => ({ ...prev, titleHe: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none ${
                    isDark ? 'border-[#3a3a3a] focus:border-[#d4af37] bg-[#0d0d0d] text-[#f5f5f0]' : 'border-gray-300 focus:border-[#d4af37] bg-white text-gray-900'
                  }`}
                  dir="rtl"
                />
              </div>

              <div>
                <label className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                  {t('products.price')} (₪) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none ${
                    errors.price ? 'border-red-500' : isDark ? 'border-[#3a3a3a] focus:border-[#d4af37]' : 'border-gray-300 focus:border-[#d4af37]'
                  } ${isDark ? 'bg-[#0d0d0d] text-[#f5f5f0]' : 'bg-white text-gray-900'}`}
                  min="0"
                  dir="ltr"
                />
                {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                    {t('products.primaryCategory')} *
                  </label>
                  <SelectDropdown
                    value={formData.category1}
                    onChange={(value) => setFormData(prev => ({ ...prev, category1: value }))}
                    options={categoryOptions}
                    placeholder={t('products.category')}
                    error={errors.category1}
                    id="category1"
                  />
                  {errors.category1 && <p className="text-red-400 text-sm mt-1">{errors.category1}</p>}
                </div>
                <div>
                  <label className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                    {t('products.secondaryCategory')} *
                  </label>
                  <SelectDropdown
                    value={formData.category2}
                    onChange={(value) => setFormData(prev => ({ ...prev, category2: value }))}
                    options={categoryOptions}
                    placeholder={t('products.category')}
                    error={errors.category2}
                    id="category2"
                  />
                  {errors.category2 && <p className="text-red-400 text-sm mt-1">{errors.category2}</p>}
                </div>
              </div>

              <div>
                <label className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                  {t('products.stock')}
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none ${
                    isDark ? 'border-[#3a3a3a] focus:border-[#d4af37] bg-[#0d0d0d] text-[#f5f5f0]' : 'border-gray-300 focus:border-[#d4af37] bg-white text-gray-900'
                  }`}
                  min="0"
                  dir="ltr"
                />
              </div>

              <div>
                <label className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                  {t('products.image')} *
                </label>
                {!imagePreview ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full border-2 border-dashed rounded-xl p-6 cursor-pointer transition-colors flex flex-col items-center justify-center gap-2 ${
                      errors.image ? 'border-red-500' : isDark ? 'border-[#3a3a3a] hover:border-[#d4af37]' : 'border-gray-300 hover:border-[#d4af37]'
                    } ${isDark ? 'bg-[#0d0d0d]' : 'bg-gray-50'}`}
                  >
                    <Upload className={`w-8 h-8 ${isDark ? 'text-[#666]' : 'text-gray-400'}`} />
                    <p className={`text-sm ${isDark ? 'text-[#a8a8a8]' : 'text-gray-500'}`}>
                      {t('products.uploadImage')}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-[#666]' : 'text-gray-400'}`}>
                      {t('products.webpOnly')}
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    <div className={`w-full aspect-video rounded-xl overflow-hidden border ${isDark ? 'border-[#3a3a3a]' : 'border-gray-300'}`}>
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-contain bg-[#0d0d0d]" />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData(prev => ({ ...prev, image: '' }));
                      }}
                      className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".webp,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {errors.image && <p className="text-red-400 text-sm mt-1">{errors.image}</p>}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                    isDark ? 'bg-[#2a2a2a] text-[#f5f5f0] hover:bg-[#3a3a3a]' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {t('products.cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl font-bold bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] hover:opacity-90 transition-opacity"
                >
                  {t('products.save')}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
