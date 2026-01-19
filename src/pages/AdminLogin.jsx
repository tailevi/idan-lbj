import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';

const ADMIN_CREDENTIALS = {
  username: 'IdanAdminLBJ',
  password: 'LBJadminIdan'
};

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        sessionStorage.setItem('adminAuthenticated', 'true');
        navigate('/admin');
      } else {
        setError('שם משתמש או סיסמה שגויים');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-4">
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
              <Lock className="w-8 h-8 text-[#0d0d0d]" />
            </motion.div>
            <h1 className="text-2xl font-bold text-[#f5f5f0]">כניסת מנהל</h1>
            <p className="text-[#a8a8a8] mt-2">הזן את פרטי ההתחברות שלך</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[#f5f5f0] text-sm mb-2 text-right">שם משתמש</label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#3a3a3a] rounded-xl px-4 py-3 pr-12 text-[#f5f5f0] placeholder-[#666] focus:outline-none focus:border-[#d4af37] transition-colors text-right"
                  placeholder="הזן שם משתמש"
                  dir="ltr"
                />
                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" />
              </div>
            </div>

            <div>
              <label className="block text-[#f5f5f0] text-sm mb-2 text-right">סיסמה</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#3a3a3a] rounded-xl px-12 py-3 text-[#f5f5f0] placeholder-[#666] focus:outline-none focus:border-[#d4af37] transition-colors text-right"
                  placeholder="הזן סיסמה"
                  dir="ltr"
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] hover:text-[#a8a8a8] transition-colors"
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
                dir="rtl"
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
              {isLoading ? 'מתחבר...' : 'התחבר'}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-[#a8a8a8] hover:text-[#d4af37] transition-colors text-sm"
            >
              חזרה לאתר הראשי
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
