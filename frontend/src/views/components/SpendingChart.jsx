import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTheme } from '../../context/ThemeContext.jsx';

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#FB7185', '#64748B'];

const SpendingChart = ({ transactions }) => {
    const { theme } = useTheme();
    
    // filter expenses by category
    const chartData = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, curr) => {
        const existing = acc.find(item => item.name === curr.category);
        if (existing) {
            existing.value += Number(curr.amount);
        } else {
            acc.push({ name: curr.category, value: Number(curr.amount) });
        }
        return acc;
        }, []);

    const tooltipBg = theme === 'dark' ? '#0f172a' : '#f1f5f9';
    const tooltipBorder = theme === 'dark' ? '#1e293b' : '#cbd5e1';
    const tooltipText = theme === 'dark' ? '#f8fafc' : '#1e293b';

    return (
        <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
            <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
            >
                {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                ))}
            </Pie>
            <Tooltip 
                contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '12px' }}
                itemStyle={{ color: tooltipText }}
            />
            <Legend iconType="circle" />
            </PieChart>
        </ResponsiveContainer>
        </div>
    );
};

export default SpendingChart;