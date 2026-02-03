import React from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTheme } from '../../contexts';
import { mockAnalytics } from '../../data/mockData';

export default function OrderStatusChart() {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const data = mockAnalytics.ordersByStatus.map(item => ({
    name: t(`dashboard.${item.status}`),
    value: item.count,
    color: item.color
  }));

  return (
    <div className={`p-6 rounded-xl border ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
        {t('dashboard.orderStatus')}
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1a1a1a' : '#fff',
                border: `1px solid ${isDark ? '#2a2a2a' : '#e5e7eb'}`,
                borderRadius: '8px',
                color: isDark ? '#f5f5f0' : '#1a1a1a'
              }}
            />
            <Legend
              formatter={(value) => (
                <span style={{ color: isDark ? '#a8a8a8' : '#6b7280' }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
