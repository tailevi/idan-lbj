import React from 'react';
import { useTranslation } from 'react-i18next';
import { Package } from 'lucide-react';
import { useTheme } from '../../contexts';
import { mockAnalytics } from '../../data/mockData';

export default function TopProductsWidget() {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const products = mockAnalytics.topProducts;

  return (
    <div className={`p-6 rounded-xl border ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
        {t('dashboard.topProducts')}
      </h3>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`flex items-center gap-4 p-3 rounded-xl ${
              isDark ? 'bg-[#0d0d0d]' : 'bg-gray-50'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
              index === 0
                ? 'bg-[#d4af37]/20 text-[#d4af37]'
                : isDark
                  ? 'bg-[#2a2a2a] text-[#a8a8a8]'
                  : 'bg-gray-200 text-gray-600'
            }`}>
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-medium truncate ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                {product.title}
              </p>
              <p className={`text-sm ${isDark ? 'text-[#666]' : 'text-gray-400'}`}>
                {product.sales} {t('dashboard.sales')}
              </p>
            </div>
            <div className="text-end">
              <p className={`font-semibold ${isDark ? 'text-[#d4af37]' : 'text-amber-600'}`}>
                ₪{product.revenue.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
