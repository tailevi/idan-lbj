import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useTheme } from '../../contexts';

export default function StatCard({ title, value, change, icon: Icon, prefix = '', suffix = '' }) {
  const { isDark } = useTheme();
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl border ${
        isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm ${isDark ? 'text-[#a8a8a8]' : 'text-gray-500'}`}>
            {title}
          </p>
          <p className={`text-2xl font-bold mt-1 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </p>
        </div>
        <div className={`p-3 rounded-xl ${isDark ? 'bg-[#d4af37]/20' : 'bg-amber-100'}`}>
          <Icon className="w-6 h-6 text-[#d4af37]" />
        </div>
      </div>

      {change !== undefined && (
        <div className="flex items-center gap-1 mt-3">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '+' : ''}{change}%
          </span>
          <span className={`text-sm ${isDark ? 'text-[#666]' : 'text-gray-400'}`}>
            vs last month
          </span>
        </div>
      )}
    </motion.div>
  );
}
