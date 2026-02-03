import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CreditCard, Plus, Trash2, Check, Star, X } from 'lucide-react';
import { useTheme, useAuth } from '../contexts';
import { useDirection } from '../hooks';

export default function PaymentPage() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { customer, addCreditCard, removeCreditCard, setDefaultCard } = useAuth();
  const { isRTL } = useDirection();

  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    nameOnCard: ''
  });

  const cards = customer?.creditCards || [];

  const handleAddCard = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      addCreditCard(formData);
      setFormData({ cardNumber: '', expiryMonth: '', expiryYear: '', cvv: '', nameOnCard: '' });
      setShowAddForm(false);
      setIsLoading(false);
    }, 500);
  };

  const handleRemoveCard = (cardId) => {
    removeCreditCard(cardId);
  };

  const handleSetDefault = (cardId) => {
    setDefaultCard(cardId);
  };

  const getCardBrandIcon = (brand) => {
    switch (brand) {
      case 'Visa':
        return '💳 Visa';
      case 'Mastercard':
        return '💳 Mastercard';
      case 'Amex':
        return '💳 Amex';
      default:
        return '💳 Card';
    }
  };

  const inputClass = `w-full rounded-xl px-4 py-3 focus:outline-none focus:border-[#d4af37] transition-colors ${
    isDark
      ? 'bg-[#0d0d0d] border border-[#3a3a3a] text-[#f5f5f0] placeholder-[#666]'
      : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
  }`;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
          {t('payment.title')}
        </h1>
        {!showAddForm && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] font-medium rounded-xl"
          >
            <Plus className="w-5 h-5" />
            {t('payment.addCard')}
          </motion.button>
        )}
      </div>

      {/* Add Card Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`rounded-2xl border p-6 overflow-hidden ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-lg font-semibold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                {t('payment.addCard')}
              </h2>
              <button
                onClick={() => setShowAddForm(false)}
                className={`p-2 rounded-lg ${isDark ? 'hover:bg-[#2a2a2a]' : 'hover:bg-gray-100'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCard} className="space-y-4">
              {/* Card Number */}
              <div>
                <label className={`block text-sm mb-2 ${isDark ? 'text-[#a8a8a8]' : 'text-gray-600'}`}>
                  {t('payment.cardNumber')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16) }))}
                    className={`${inputClass} ${isRTL ? 'pr-12' : 'pl-12'}`}
                    placeholder="1234 5678 9012 3456"
                    dir="ltr"
                    maxLength={16}
                  />
                  <CreditCard className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-[#666]' : 'text-gray-400'} ${isRTL ? 'right-4' : 'left-4'}`} />
                </div>
              </div>

              {/* Name on Card */}
              <div>
                <label className={`block text-sm mb-2 ${isDark ? 'text-[#a8a8a8]' : 'text-gray-600'}`}>
                  {t('payment.nameOnCard')}
                </label>
                <input
                  type="text"
                  value={formData.nameOnCard}
                  onChange={(e) => setFormData(prev => ({ ...prev, nameOnCard: e.target.value }))}
                  className={inputClass}
                  placeholder="John Doe"
                  dir="ltr"
                />
              </div>

              {/* Expiry & CVV Row */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={`block text-sm mb-2 ${isDark ? 'text-[#a8a8a8]' : 'text-gray-600'}`}>
                    {t('payment.expiryDate')}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.expiryMonth}
                      onChange={(e) => setFormData(prev => ({ ...prev, expiryMonth: e.target.value.replace(/\D/g, '').slice(0, 2) }))}
                      className={inputClass}
                      placeholder="MM"
                      dir="ltr"
                      maxLength={2}
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm mb-2 ${isDark ? 'text-[#a8a8a8]' : 'text-gray-600'}`}>
                    &nbsp;
                  </label>
                  <input
                    type="text"
                    value={formData.expiryYear}
                    onChange={(e) => setFormData(prev => ({ ...prev, expiryYear: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                    className={inputClass}
                    placeholder="YYYY"
                    dir="ltr"
                    maxLength={4}
                  />
                </div>
                <div>
                  <label className={`block text-sm mb-2 ${isDark ? 'text-[#a8a8a8]' : 'text-gray-600'}`}>
                    {t('payment.cvv')}
                  </label>
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) => setFormData(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                    className={inputClass}
                    placeholder="123"
                    dir="ltr"
                    maxLength={4}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isLoading ? t('payment.saving') : t('payment.save')}
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Saved Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl border p-6 ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}
      >
        <h2 className={`text-lg font-semibold mb-6 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
          {t('payment.savedCards')}
        </h2>

        {cards.length === 0 ? (
          <div className="text-center py-8">
            <CreditCard className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-[#2a2a2a]' : 'text-gray-300'}`} />
            <p className={isDark ? 'text-[#a8a8a8]' : 'text-gray-500'}>
              {t('payment.noCards')}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-between p-4 rounded-xl ${isDark ? 'bg-[#0d0d0d]' : 'bg-gray-50'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
                    <CreditCard className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                        {card.brand} •••• {card.lastFour}
                      </span>
                      {card.isDefault && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-[#d4af37]/20 text-[#d4af37] text-xs rounded-full">
                          <Star className="w-3 h-3" />
                          {t('payment.default')}
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${isDark ? 'text-[#a8a8a8]' : 'text-gray-500'}`}>
                      {t('payment.expires')} {card.expiryMonth}/{card.expiryYear}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!card.isDefault && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSetDefault(card.id)}
                      className={`p-2 rounded-lg text-sm ${isDark ? 'hover:bg-[#2a2a2a] text-[#a8a8a8]' : 'hover:bg-gray-200 text-gray-600'}`}
                      title={t('payment.setDefault')}
                    >
                      <Check className="w-5 h-5" />
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRemoveCard(card.id)}
                    className="p-2 rounded-lg text-red-400 hover:bg-red-500/10"
                    title={t('payment.remove')}
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
