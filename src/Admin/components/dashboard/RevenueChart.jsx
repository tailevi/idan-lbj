import React from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../contexts';
import { mockAnalytics } from '../../data/mockData';

export default function RevenueChart() {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const data = mockAnalytics.revenueByMonth;

  return (
    <div className={`p-6 rounded-xl border ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
        {t('dashboard.revenueComparison')}
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#2a2a2a' : '#e5e7eb'} />
            <XAxis
              dataKey="month"
              stroke={isDark ? '#666' : '#9ca3af'}
              fontSize={12}
            />
            <YAxis
              stroke={isDark ? '#666' : '#9ca3af'}
              fontSize={12}
              tickFormatter={(value) => `₪${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1a1a1a' : '#fff',
                border: `1px solid ${isDark ? '#2a2a2a' : '#e5e7eb'}`,
                borderRadius: '8px',
                color: isDark ? '#f5f5f0' : '#1a1a1a'
              }}
              formatter={(value) => [`₪${value.toLocaleString()}`, '']}
            />
            <Legend />
            <Bar
              dataKey="current"
              name={t('dashboard.currentMonth')}
              fill="#d4af37"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="previous"
              name={t('dashboard.previousMonth')}
              fill="#cd7f32"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
