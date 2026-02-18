export default SummaryCard = ({ title, amount, icon }) => (
    <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl">
        <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-slate-200 dark:bg-slate-800 rounded-2xl">{icon}</div>
        <span className="text-slate-700 dark:text-slate-400 font-medium">{title}</span>
        </div>
        <div className="text-3xl font-bold text-slate-900 dark:text-white">${amount.toLocaleString()}</div>
    </div>
);