import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useTheme } from '../../contexts';

export default function DataTable({ columns, data, onRowClick }) {
  const { isDark } = useTheme();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  return (
    <div className={`overflow-x-auto rounded-xl border ${isDark ? 'border-[#2a2a2a]' : 'border-gray-200'}`}>
      <table className="w-full">
        <thead>
          <tr className={isDark ? 'bg-[#1a1a1a]' : 'bg-gray-50'}>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => col.sortable && handleSort(col.key)}
                className={`px-4 py-3 text-start text-sm font-medium ${
                  isDark ? 'text-[#a8a8a8]' : 'text-gray-600'
                } ${col.sortable ? 'cursor-pointer hover:bg-opacity-50' : ''}`}
              >
                <div className="flex items-center gap-2">
                  {col.label}
                  {col.sortable && sortConfig.key === col.key && (
                    sortConfig.direction === 'asc'
                      ? <ChevronUp className="w-4 h-4" />
                      : <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => (
            <tr
              key={row.id || idx}
              onClick={() => onRowClick?.(row)}
              className={`border-t transition-colors ${
                isDark
                  ? 'border-[#2a2a2a] hover:bg-[#1a1a1a]'
                  : 'border-gray-100 hover:bg-gray-50'
              } ${onRowClick ? 'cursor-pointer' : ''}`}
            >
              {columns.map((col) => (
                <td key={col.key} className={`px-4 py-3 text-sm ${isDark ? 'text-[#f5f5f0]' : 'text-gray-900'}`}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
          {sortedData.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className={`px-4 py-8 text-center ${isDark ? 'text-[#666]' : 'text-gray-400'}`}
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
