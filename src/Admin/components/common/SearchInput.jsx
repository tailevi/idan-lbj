import React from 'react';
import { Search, X } from 'lucide-react';
import { useTheme } from '../../contexts';

export default function SearchInput({ value, onChange, placeholder }) {
  const { isDark } = useTheme();

  return (
    <div className="relative">
      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-[#666]' : 'text-gray-400'}`} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full pl-10 pr-10 py-2.5 rounded-xl border transition-colors focus:outline-none ${
          isDark
            ? 'bg-[#0d0d0d] border-[#3a3a3a] text-[#f5f5f0] placeholder-[#666] focus:border-[#d4af37]'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#d4af37]'
        }`}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors ${
            isDark ? 'hover:bg-[#2a2a2a] text-[#666]' : 'hover:bg-gray-100 text-gray-400'
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
