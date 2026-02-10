import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Lock, Mail, Eye, EyeOff, AlertCircle, Sparkles, User, Phone } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDirection } from '../hooks';
import { useTheme } from '../contexts';
import LanguageToggle from '../components/common/LanguageToggle';
import ThemeToggle from '../components/common/ThemeToggle';
import { authApi, setToken } from '../../services/api';
import { setCustomerAuth, setCustomerData } from '../../utils/cookies';
import '../i18n/config';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || 'YOUR_RECAPTCHA_SITE_KEY';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { direction, isRTL } = useDirection();
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('register.required');
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = t('register.required');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('register.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && formData.email !== 'test') {
      newErrors.email = t('register.invalidEmail');
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('register.required');
    }
    if (!formData.password) {
      newErrors.password = t('register.required');
    } else if (formData.password.length < 6) {
      newErrors.password = t('register.passwordTooShort');
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('register.passwordMismatch');
    }
    if (!recaptchaToken) {
      newErrors.recaptcha = t('register.recaptchaRequired', 'Please verify you are not a robot');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await authApi.register(
        formData.email,
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.phone,
        recaptchaToken
      );

      setToken(response.token);
      setCustomerAuth(true);
      setCustomerData({
        id: response.username,
        email: response.email || formData.email,
        firstName: response.firstName || formData.firstName,
        lastName: response.lastName || formData.lastName,
        phone: response.phone || formData.phone,
      });
      navigate('/account');
    } catch (err) {
      const msg = err.message || '';
      if (msg.toLowerCase().includes('already exists')) {
        setGeneralError(t('register.emailExists'));
      } else {
        setGeneralError(msg || t('register.error'));
      }
      // Reset reCAPTCHA so user can try again
      setRecaptchaToken(null);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const inputClass = (hasError) => `w-full rounded-xl px-4 py-3 focus:outline-none focus:border-[#d4af37] transition-colors ${
    isDark
      ? 'bg-[#0d0d0d] border text-[#f5f5f0] placeholder-[#666]'
      : 'bg-gray-50 border text-gray-900 placeholder-gray-400'
  } ${hasError ? 'border-red-500' : isDark ? 'border-[#3a3a3a]' : 'border-gray-300'}`;

  return (
    <div dir={direction} className={`min-h-screen flex items-center justify-center px-4 py-8 ${isDark ? 'bg-[#0d0d0d]' : 'bg-gray-50'}`}>
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <ThemeToggle />
        <LanguageToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className={`rounded-2xl p-8 shadow-2xl border ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#cd7f32] rounded-full flex items-center justify-center mx-auto mb-4"
              aria-hidden="true"
            >
              <Sparkles className="w-8 h-8 text-[#0d0d0d]" aria-hidden="true" />
            </motion.div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
              {t('register.title')}
            </h1>
            <p className={isDark ? 'text-[#a8a8a8] mt-2' : 'text-gray-500 mt-2'}>
              {t('register.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate aria-label={t('register.title')}>
            {/* Name Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="register-firstName" className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                  {t('register.firstName')}
                </label>
                <div className="relative">
                  <input
                    id="register-firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className={`${inputClass(errors.firstName)} ${isRTL ? 'pr-10' : 'pl-10'}`}
                    placeholder={t('register.firstName')}
                    aria-required="true"
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                    autoComplete="given-name"
                  />
                  <User className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-[#666]' : 'text-gray-400'} ${isRTL ? 'right-3' : 'left-3'}`} aria-hidden="true" />
                </div>
                {errors.firstName && <p id="firstName-error" className="text-red-400 text-xs mt-1" role="alert">{errors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="register-lastName" className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                  {t('register.lastName')}
                </label>
                <div className="relative">
                  <input
                    id="register-lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className={`${inputClass(errors.lastName)} ${isRTL ? 'pr-10' : 'pl-10'}`}
                    placeholder={t('register.lastName')}
                    aria-required="true"
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                    autoComplete="family-name"
                  />
                  <User className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-[#666]' : 'text-gray-400'} ${isRTL ? 'right-3' : 'left-3'}`} aria-hidden="true" />
                </div>
                {errors.lastName && <p id="lastName-error" className="text-red-400 text-xs mt-1" role="alert">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="register-email" className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                {t('register.email')}
              </label>
              <div className="relative">
                <input
                  id="register-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`${inputClass(errors.email)} ${isRTL ? 'pr-12' : 'pl-12'}`}
                  placeholder={t('register.email')}
                  dir="ltr"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  autoComplete="email"
                />
                <Mail className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-[#666]' : 'text-gray-400'} ${isRTL ? 'right-4' : 'left-4'}`} aria-hidden="true" />
              </div>
              {errors.email && <p id="email-error" className="text-red-400 text-xs mt-1" role="alert">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="register-phone" className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                {t('register.phone')}
              </label>
              <div className="relative">
                <input
                  id="register-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={`${inputClass(errors.phone)} ${isRTL ? 'pr-12' : 'pl-12'}`}
                  placeholder="050-123-4567"
                  dir="ltr"
                  aria-required="true"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  autoComplete="tel"
                />
                <Phone className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-[#666]' : 'text-gray-400'} ${isRTL ? 'right-4' : 'left-4'}`} aria-hidden="true" />
              </div>
              {errors.phone && <p id="phone-error" className="text-red-400 text-xs mt-1" role="alert">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="register-password" className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                {t('register.password')}
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className={`${inputClass(errors.password)} px-12`}
                  placeholder={t('register.password')}
                  dir="ltr"
                  aria-required="true"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  autoComplete="new-password"
                />
                <Lock className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-[#666]' : 'text-gray-400'} ${isRTL ? 'right-4' : 'left-4'}`} aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-[#666] hover:text-[#a8a8a8]' : 'text-gray-400 hover:text-gray-600'} ${isRTL ? 'left-4' : 'right-4'}`}
                  aria-label={showPassword ? t('register.hidePassword', 'Hide password') : t('register.showPassword', 'Show password')}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" aria-hidden="true" /> : <Eye className="w-5 h-5" aria-hidden="true" />}
                </button>
              </div>
              {errors.password && <p id="password-error" className="text-red-400 text-xs mt-1" role="alert">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="register-confirmPassword" className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                {t('register.confirmPassword')}
              </label>
              <div className="relative">
                <input
                  id="register-confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  className={`${inputClass(errors.confirmPassword)} px-12`}
                  placeholder={t('register.confirmPassword')}
                  dir="ltr"
                  aria-required="true"
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                  autoComplete="new-password"
                />
                <Lock className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-[#666]' : 'text-gray-400'} ${isRTL ? 'right-4' : 'left-4'}`} aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-[#666] hover:text-[#a8a8a8]' : 'text-gray-400 hover:text-gray-600'} ${isRTL ? 'left-4' : 'right-4'}`}
                  aria-label={showConfirmPassword ? t('register.hidePassword', 'Hide password') : t('register.showPassword', 'Show password')}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" aria-hidden="true" /> : <Eye className="w-5 h-5" aria-hidden="true" />}
                </button>
              </div>
              {errors.confirmPassword && <p id="confirmPassword-error" className="text-red-400 text-xs mt-1" role="alert">{errors.confirmPassword}</p>}
            </div>

            {/* reCAPTCHA */}
            <div className="flex flex-col items-center" role="group" aria-label={t('register.recaptchaLabel', 'Bot verification')}>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={(token) => {
                  setRecaptchaToken(token);
                  if (errors.recaptcha) {
                    setErrors(prev => ({ ...prev, recaptcha: '' }));
                  }
                }}
                onExpired={() => setRecaptchaToken(null)}
                theme={isDark ? 'dark' : 'light'}
              />
              {errors.recaptcha && <p id="recaptcha-error" className="text-red-400 text-xs mt-1" role="alert">{errors.recaptcha}</p>}
            </div>

            <div aria-live="assertive" aria-atomic="true">
              {generalError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-xl"
                  role="alert"
                >
                  <AlertCircle className="w-5 h-5" aria-hidden="true" />
                  <span>{generalError}</span>
                </motion.div>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 mt-6"
              aria-busy={isLoading}
            >
              {isLoading ? t('register.registering') : t('register.register')}
            </motion.button>
          </form>

          <div className={`mt-6 text-center space-y-4 border-t pt-6 ${isDark ? 'border-[#2a2a2a]' : 'border-gray-200'}`}>
            <p className={isDark ? 'text-[#a8a8a8]' : 'text-gray-500'}>
              {t('register.haveAccount')}{' '}
              <Link
                to="/login"
                className="text-[#d4af37] hover:underline font-medium"
              >
                {t('register.login')}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
