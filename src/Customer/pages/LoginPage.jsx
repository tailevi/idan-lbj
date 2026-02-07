import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Lock, Mail, Eye, EyeOff, AlertCircle, Sparkles } from 'lucide-react';
import { useDirection } from '../hooks';
import { useTheme } from '../contexts';
import LanguageToggle from '../components/common/LanguageToggle';
import ThemeToggle from '../components/common/ThemeToggle';
import { authApi, setToken } from '../../services/api';
import '../i18n/config';

export default function LoginPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { direction, isRTL } = useDirection();
  const { isDark } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authApi.login(email, password);

      if (response.role === 'ADMIN') {
        setToken(response.token);
        localStorage.setItem('adminAuthenticated', 'true');
        navigate('/admin');
        return;
      }

      // Non-admin user - store token and profile data
      setToken(response.token);
      localStorage.setItem('customerAuthenticated', 'true');
      localStorage.setItem('customerData', JSON.stringify({
        id: response.username,
        email: response.email || email,
        firstName: response.firstName || '',
        lastName: response.lastName || '',
        phone: response.phone || '',
      }));
      navigate('/account');
    } catch (err) {
      setError(t('login.invalidCredentials'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div dir={direction} className={`min-h-screen flex items-center justify-center px-4 ${isDark ? 'bg-[#0d0d0d]' : 'bg-gray-50'}`}>
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
            >
              <Sparkles className="w-8 h-8 text-[#0d0d0d]" />
            </motion.div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
              {t('login.title')}
            </h1>
            <p className={isDark ? 'text-[#a8a8a8] mt-2' : 'text-gray-500 mt-2'}>
              {t('login.subtitle')}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                {t('login.email')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-xl px-4 py-3 focus:outline-none focus:border-[#d4af37] transition-colors ${
                    isDark
                      ? 'bg-[#0d0d0d] border border-[#3a3a3a] text-[#f5f5f0] placeholder-[#666]'
                      : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                  } ${isRTL ? 'pr-12' : 'pl-12'}`}
                  placeholder={t('login.email')}
                  dir="ltr"
                />
                <Mail className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-[#666]' : 'text-gray-400'} ${isRTL ? 'right-4' : 'left-4'}`} />
              </div>
            </div>

            <div>
              <label className={`block text-sm mb-2 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-700'}`}>
                {t('login.password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-xl px-12 py-3 focus:outline-none focus:border-[#d4af37] transition-colors ${
                    isDark
                      ? 'bg-[#0d0d0d] border border-[#3a3a3a] text-[#f5f5f0] placeholder-[#666]'
                      : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder={t('login.password')}
                  dir="ltr"
                />
                <Lock className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-[#666]' : 'text-gray-400'} ${isRTL ? 'right-4' : 'left-4'}`} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-[#666] hover:text-[#a8a8a8]' : 'text-gray-400 hover:text-gray-600'} ${isRTL ? 'left-4' : 'right-4'}`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-xl"
              >
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#d4af37] to-[#cd7f32] text-[#0d0d0d] font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? t('login.loggingIn') : t('login.login')}
            </motion.button>
          </form>

          <div className={`mt-6 text-center space-y-4 border-t pt-6 ${isDark ? 'border-[#2a2a2a]' : 'border-gray-200'}`}>
            <p className={isDark ? 'text-[#a8a8a8]' : 'text-gray-500'}>
              {t('login.noAccount')}{' '}
              <Link
                to="/register"
                className="text-[#d4af37] hover:underline font-medium"
              >
                {t('login.register')}
              </Link>
            </p>
            <button
              onClick={() => navigate('/')}
              className={`text-sm transition-colors ${isDark ? 'text-[#a8a8a8] hover:text-[#d4af37]' : 'text-gray-500 hover:text-[#d4af37]'}`}
            >
              {t('login.backToSite')}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
