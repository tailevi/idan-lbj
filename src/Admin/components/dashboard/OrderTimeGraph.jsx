import React from 'react';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../contexts';
import { mockAnalytics } from '../../data/mockData';

export default function OrderTimeGraph() {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const data = mockAnalytics.ordersByTime;

  return (
    <div className={`p-6 rounded-xl border ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
        {t('dashboard.ordersByTime')}
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#2a2a2a' : '#e5e7eb'} />
            <XAxis
              dataKey="hour"
              stroke={isDark ? '#666' : '#9ca3af'}
              fontSize={12}
            />
            <YAxis
              stroke={isDark ? '#666' : '#9ca3af'}
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1a1a1a' : '#fff',
                border: `1px solid ${isDark ? '#2a2a2a' : '#e5e7eb'}`,
                borderRadius: '8px',
                color: isDark ? '#f5f5f0' : '#1a1a1a'
              }}
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#d4af37"
              strokeWidth={2}
              fill="url(#orderGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
