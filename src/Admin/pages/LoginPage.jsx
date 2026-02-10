import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Lock, User, Eye, EyeOff, AlertCircle, Sparkles } from 'lucide-react';
import { useDirection } from '../hooks';
import LanguageToggle from '../components/common/LanguageToggle';
import { authApi, setToken } from '../../services/api';
import { setAdminAuth } from '../../utils/cookies';
import '../i18n/config';

export default function LoginPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { direction, isRTL } = useDirection();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authApi.login(username, password);

      if (response.role === 'ADMIN') {
        setToken(response.token);
        setAdminAuth(true);
        navigate('/admin');
      } else {
        setError(t('login.invalidCredentials'));
      }
    } catch (err) {
      setError(t('login.invalidCredentials'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div dir={direction} className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-4">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#1a1a1a] rounded-2xl p-8 shadow-2xl border border-[#2a2a2a]">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#cd7f32] rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Sparkles className="w-8 h-8 text-[#0d0d0d]" />
            </motion.div>
            <h1 className="text-2xl font-bold text-[#f5f5f0]">{t('login.title')}</h1>
            <p className="text-[#a8a8a8] mt-2">{t('login.subtitle')}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[#f5f5f0] text-sm mb-2">{t('login.username')}</label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full bg-[#0d0d0d] border border-[#3a3a3a] rounded-xl px-4 py-3 text-[#f5f5f0] placeholder-[#666] focus:outline-none focus:border-[#d4af37] transition-colors ${isRTL ? 'pr-12' : 'pl-12'}`}
                  placeholder={t('login.username')}
                  dir="ltr"
                />
                <User className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-[#666] ${isRTL ? 'right-4' : 'left-4'}`} />
              </div>
            </div>

            <div>
              <label className="block text-[#f5f5f0] text-sm mb-2">{t('login.password')}</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#3a3a3a] rounded-xl px-12 py-3 text-[#f5f5f0] placeholder-[#666] focus:outline-none focus:border-[#d4af37] transition-colors"
                  placeholder={t('login.password')}
                  dir="ltr"
                />
                <Lock className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-[#666] ${isRTL ? 'right-4' : 'left-4'}`} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute top-1/2 -translate-y-1/2 text-[#666] hover:text-[#a8a8a8] transition-colors ${isRTL ? 'left-4' : 'right-4'}`}
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

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-[#a8a8a8] hover:text-[#d4af37] transition-colors text-sm"
            >
              {t('login.backToSite')}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
