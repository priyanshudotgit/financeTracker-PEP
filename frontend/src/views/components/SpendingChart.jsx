import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid  } from 'recharts';

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#FB7185', '#64748B'];

export const AnalyticalPieChart = ({ transactions, theme }) => {
    const data = transactions
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

    const style = {
        bg: theme === 'dark' ? '#0f172a' : '#ffffff',
        border: theme === 'dark' ? '#1e293b' : '#e2e8f0'
    };

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                    >
                        {data.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="none" />
                        ))}
                    </Pie>
                    <Tooltip 
                        contentStyle={{ backgroundColor: style.bg, border: `1px solid ${style.border}`, borderRadius: '12px' }}
                    />
                    <Legend iconType="circle" verticalAlign="bottom" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export const AnalyticalBarChart = ({ transactions, theme }) => {
    const income = transactions.filter(t => t.type === 'income').reduce((a, b) => a + Number(b.amount), 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((a, b) => a + Number(b.amount), 0);

    const data = [{ name: 'Totals', Income: income, Expenses: expense }];

    const style = {
        bg: theme === 'dark' ? '#0f172a' : '#ffffff',
        border: theme === 'dark' ? '#1e293b' : '#e2e8f0',
        text: theme === 'dark' ? '#94a3b8' : '#64748b'
    };

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={style.border} />
                    <XAxis dataKey="name" hide />
                    <YAxis tick={{ fill: style.text, fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip 
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{ backgroundColor: style.bg, border: `1px solid ${style.border}`, borderRadius: '12px' }}
                    />
                    <Legend verticalAlign="top" align="right" height={36} />
                    <Bar dataKey="Income" fill="#10B981" radius={[6, 6, 0, 0]} barSize={50} />
                    <Bar dataKey="Expenses" fill="#F43F5E" radius={[6, 6, 0, 0]} barSize={50} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};