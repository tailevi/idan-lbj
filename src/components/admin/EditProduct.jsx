import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Trash2, Image, AlertCircle, CheckCircle, ChevronDown, X } from 'lucide-react';

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

// Mock products - in a real app, these would come from an API/database
const getInitialProducts = () => {
  const savedProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]');
  const defaultProducts = [
    { id: '1', title: 'A Gentle Touch of Serenity', price: 3450, categories: ['wildlife', 'landscapes'], image_url: '/products/A_Gentle_Touch_of_Serenity_.webp' },
    { id: '2', title: 'A Lingering Glance in the Grass', price: 7820, categories: ['wildlife', 'landscapes'], image_url: '/products/A_Lingering_Glance_in_the_Grass_.webp' },
    { id: '3', title: 'A Moment of Gentle Grace', price: 2190, categories: ['wildlife', 'landscapes'], image_url: '/products/A_Moment_of_Gentle_Grace_.webp' },
    { id: '4', title: 'A Strategy in the Shadows', price: 5670, categories: ['wildlife', 'landscapes'], image_url: '/products/A_Strategy_in_the_Shadows_.webp' },
    { id: '5', title: 'A Stride Toward Discovery', price: 4230, categories: ['wildlife', 'landscapes'], image_url: '/products/A_Stride_Toward_Discovery_.webp' },
    { id: '6', title: 'A Whimsical Shift of Perspective', price: 8940, categories: ['wildlife', 'landscapes'], image_url: '/products/A_Whimsical_Shift_of_Perspective.webp' },
    { id: '7', title: 'Ascending with Grace', price: 1560, categories: ['wildlife', 'landscapes'], image_url: '/products/Ascending_with_Grace_.webp' },
    { id: '8', title: 'Aspiring to the Peak', price: 6780, categories: ['landscapes', 'wildlife'], image_url: '/products/Aspiring_to_the_Peak_.webp' },
    { id: '9', title: 'Burst of Vitality', price: 3890, categories: ['wildlife', 'landscapes'], image_url: '/products/Burst_of_Vitality_.webp' },
    { id: '10', title: 'Celestial Alignment', price: 9450, categories: ['landscapes', 'wildlife'], image_url: '/products/Celestial_Alignment_.webp' }
  ];
  return [...defaultProducts, ...savedProducts];
};

export default function EditProduct() {
  const [products, setProducts] = useState(getInitialProducts);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newData, setNewData] = useState({
    title: '',
    price: '',
    category1: '',
    category2: '',
    image: ''
  });
  const [openDropdown, setOpenDropdown] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ show: false, type: null }); // type: 'edit' | 'delete'

  useEffect(() => {
    if (selectedProductId) {
      const product = products.find(p => p.id === selectedProductId);
      setSelectedProduct(product);
      setNewData({
        title: '',
        price: '',
        category1: '',
        category2: '',
        image: ''
      });
    } else {
      setSelectedProduct(null);
    }
  }, [selectedProductId, products]);

  const handleNewDataChange = (field, value) => {
    setNewData(prev => ({ ...prev, [field]: value }));
  };

  const handleEditConfirm = () => {
    if (!selectedProduct) return;

    const updatedProduct = {
      ...selectedProduct,
      title: newData.title.trim() || selectedProduct.title,
      price: newData.price ? Number(newData.price) : selectedProduct.price,
      categories: [
        newData.category1 || selectedProduct.categories[0],
        newData.category2 || selectedProduct.categories[1]
      ],
      image_url: newData.image.trim() || selectedProduct.image_url
    };

    const updatedProducts = products.map(p =>
      p.id === selectedProduct.id ? updatedProduct : p
    );

    setProducts(updatedProducts);

    // Update localStorage for admin-added products
    const adminProducts = updatedProducts.filter(p => Number(p.id) > 10 || p.id.length > 2);
    localStorage.setItem('adminProducts', JSON.stringify(adminProducts));

    setSubmitStatus('success');
    setConfirmModal({ show: false, type: null });
    setNewData({ title: '', price: '', category1: '', category2: '', image: '' });

    setTimeout(() => setSubmitStatus(null), 3000);
  };

  const handleDeleteConfirm = () => {
    if (!selectedProduct) return;

    const updatedProducts = products.filter(p => p.id !== selectedProduct.id);
    setProducts(updatedProducts);

    // Update localStorage
    const adminProducts = updatedProducts.filter(p => Number(p.id) > 10 || p.id.length > 2);
    localStorage.setItem('adminProducts', JSON.stringify(adminProducts));

    setSelectedProductId('');
    setSelectedProduct(null);
    setSubmitStatus('deleted');
    setConfirmModal({ show: false, type: null });

    setTimeout(() => setSubmitStatus(null), 3000);
  };

  const SelectDropdown = ({ value, onChange, options, placeholder, id, disabled = false }) => {
    const isOpen = openDropdown === id && !disabled;
    const selectedOption = options.find(opt => opt.value === value);

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setOpenDropdown(isOpen ? null : id)}
          disabled={disabled}
          className={`w-full bg-[#0d0d0d] border border-[#3a3a3a] rounded-xl px-4 py-3 text-right flex items-center justify-between transition-colors focus:outline-none focus:border-[#d4af37] ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
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

  const ProductSelectDropdown = () => {
    const isOpen = openDropdown === 'productSelect';

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpenDropdown(isOpen ? null : 'productSelect')}
          className="w-full bg-[#0d0d0d] border border-[#3a3a3a] rounded-xl px-4 py-3 text-right flex items-center justify-between transition-colors focus:outline-none focus:border-[#d4af37]"
        >
          <ChevronDown className={`w-5 h-5 text-[#666] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          <span className={selectedProductId ? 'text-[#f5f5f0]' : 'text-[#666]'}>
            {selectedProductId ? products.find(p => p.id === selectedProductId)?.title : 'בחר מוצר לעריכה'}
          </span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 w-full mt-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl shadow-xl overflow-hidden max-h-80 overflow-y-auto"
            >
              {products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => {
                    setSelectedProductId(product.id);
                    setOpenDropdown(null);
                  }}
                  className={`w-full px-4 py-3 text-right hover:bg-[#2a2a2a] transition-colors flex items-center justify-between ${
                    selectedProductId === product.id ? 'bg-[#d4af37]/10 text-[#d4af37]' : 'text-[#f5f5f0]'
                  }`}
                >
                  <span className="text-[#a8a8a8] text-sm">₪{product.price.toLocaleString()}</span>
                  <span>{product.title}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Confirmation Modal
  const ConfirmationModal = () => (
    <AnimatePresence>
      {confirmModal.show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setConfirmModal({ show: false, type: null })}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#1a1a1a] rounded-2xl p-6 max-w-md w-full border border-[#2a2a2a]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setConfirmModal({ show: false, type: null })}
                className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#a8a8a8]" />
              </button>
              <h3 className="text-lg font-bold text-[#f5f5f0]">
                {confirmModal.type === 'delete' ? 'מחיקת מוצר' : 'עדכון מוצר'}
              </h3>
            </div>

            <p className="text-[#a8a8a8] text-center mb-6" dir="rtl">
              {confirmModal.type === 'delete'
                ? `האם אתה בטוח שברצונך למחוק את המוצר "${selectedProduct?.title}"?`
                : 'האם אתה בטוח שברצונך לעדכן את פרטי המוצר?'
              }
            </p>

            <div className="flex gap-3" dir="rtl">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setConfirmModal({ show: false, type: null })}
                className="flex-1 bg-[#2a2a2a] text-[#f5f5f0] font-medium py-3 rounded-xl hover:bg-[#3a3a3a] transition-colors"
              >
                ביטול
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={confirmModal.type === 'delete' ? handleDeleteConfirm : handleEditConfirm}
                className={`flex-1 font-medium py-3 rounded-xl transition-colors ${
                  confirmModal.type === 'delete'
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d]'
                }`}
              >
                {confirmModal.type === 'delete' ? 'מחק' : 'עדכן'}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="max-w-2xl mx-auto" dir="rtl">
      <ConfirmationModal />

      <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-[#2a2a2a]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#d4af37]/20 rounded-xl flex items-center justify-center">
            <Edit className="w-5 h-5 text-[#d4af37]" />
          </div>
          <h2 className="text-xl font-bold text-[#f5f5f0]">ערוך מוצר</h2>
        </div>

        {/* Product Selector */}
        <div className="mb-6">
          <label className="block text-[#f5f5f0] text-sm mb-2">בחר מוצר</label>
          <ProductSelectDropdown />
        </div>

        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-6"
            >
              {/* Current Product Info */}
              <div className="bg-[#0d0d0d] rounded-xl p-4 border border-[#2a2a2a]">
                <h3 className="text-[#d4af37] text-sm font-medium mb-4">פרטים נוכחיים</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#666]">כותרת:</span>
                    <p className="text-[#f5f5f0]">{selectedProduct.title}</p>
                  </div>
                  <div>
                    <span className="text-[#666]">מחיר:</span>
                    <p className="text-[#f5f5f0]">₪{selectedProduct.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-[#666]">קטגוריה ראשית:</span>
                    <p className="text-[#f5f5f0]">{categoryLabels[selectedProduct.categories[0]]}</p>
                  </div>
                  <div>
                    <span className="text-[#666]">קטגוריה משנית:</span>
                    <p className="text-[#f5f5f0]">{categoryLabels[selectedProduct.categories[1]]}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[#666]">תמונה:</span>
                    <p className="text-[#f5f5f0] text-xs break-all" dir="ltr">{selectedProduct.image_url}</p>
                  </div>
                </div>
              </div>

              {/* New Values Section */}
              <div>
                <h3 className="text-[#f5f5f0] text-sm font-medium mb-4">ערכים חדשים (השאר ריק כדי לשמור את הערך הנוכחי)</h3>

                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-[#a8a8a8] text-sm mb-2">כותרת</label>
                    <input
                      type="text"
                      value={newData.title}
                      onChange={(e) => handleNewDataChange('title', e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-[#3a3a3a] rounded-xl px-4 py-3 text-[#f5f5f0] placeholder-[#666] focus:outline-none focus:border-[#d4af37] transition-colors"
                      placeholder="כותרת חדשה"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-[#a8a8a8] text-sm mb-2">מחיר (₪)</label>
                    <input
                      type="number"
                      value={newData.price}
                      onChange={(e) => handleNewDataChange('price', e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-[#3a3a3a] rounded-xl px-4 py-3 text-[#f5f5f0] placeholder-[#666] focus:outline-none focus:border-[#d4af37] transition-colors"
                      placeholder="מחיר חדש"
                      min="0"
                      dir="ltr"
                    />
                  </div>

                  {/* Category 1 */}
                  <div>
                    <label className="block text-[#a8a8a8] text-sm mb-2">קטגוריה ראשית</label>
                    <SelectDropdown
                      value={newData.category1}
                      onChange={(value) => handleNewDataChange('category1', value)}
                      options={categoryOptions}
                      placeholder="בחר קטגוריה חדשה"
                      id="newCategory1"
                    />
                  </div>

                  {/* Category 2 */}
                  <div>
                    <label className="block text-[#a8a8a8] text-sm mb-2">קטגוריה משנית</label>
                    <SelectDropdown
                      value={newData.category2}
                      onChange={(value) => handleNewDataChange('category2', value)}
                      options={categoryOptions}
                      placeholder="בחר קטגוריה חדשה"
                      id="newCategory2"
                    />
                  </div>

                  {/* Image */}
                  <div>
                    <label className="block text-[#a8a8a8] text-sm mb-2">קישור לתמונה</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={newData.image}
                        onChange={(e) => handleNewDataChange('image', e.target.value)}
                        className="w-full bg-[#0d0d0d] border border-[#3a3a3a] rounded-xl px-4 py-3 pr-12 text-[#f5f5f0] placeholder-[#666] focus:outline-none focus:border-[#d4af37] transition-colors"
                        placeholder="/products/new_image.webp"
                        dir="ltr"
                      />
                      <Image className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Messages */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-3 rounded-xl"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>המוצר עודכן בהצלחה!</span>
                  </motion.div>
                )}

                {submitStatus === 'deleted' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-xl"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>המוצר נמחק בהצלחה!</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setConfirmModal({ show: true, type: 'delete' })}
                  className="flex-1 bg-red-500/20 text-red-400 font-medium py-4 rounded-xl hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2 border border-red-500/30"
                >
                  <Trash2 className="w-5 h-5" />
                  מחק מוצר
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setConfirmModal({ show: true, type: 'edit' })}
                  className="flex-1 bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] font-bold py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  עדכן מוצר
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!selectedProduct && (
          <div className="text-center py-12 text-[#666]">
            <Edit className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>בחר מוצר מהרשימה כדי לערוך אותו</p>
          </div>
        )}
      </div>
    </div>
  );
}
