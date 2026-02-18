import React from 'react';
import { useTransactions } from '../../controllers/transactionController.js';
import { Trash2, Coffee, ShoppingBag, Home, Zap, Heart, MoreHorizontal, BadgeIndianRupee } from 'lucide-react';

// Icon Map for Categories
const categoryIcons = {
    Income: <BadgeIndianRupee className='text-emerald-500' />,
    Food: <Coffee className="text-orange-400" />,
    Shopping: <ShoppingBag className="text-purple-400" />,
    Rent: <Home className="text-blue-400" />,
    Utilities: <Zap className="text-yellow-400" />,
    Health: <Heart className="text-rose-400" />,
    General: <MoreHorizontal className="text-slate-400" />,
};

const TransactionList = () => {
    const { transactions, deleteTransaction } = useTransactions();

    if (transactions.length === 0) {
        return (
        <div className="text-center py-20 bg-slate-200 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
            <p className="text-slate-600 dark:text-slate-500">No transactions found. Start by adding one!</p>
        </div>
        );
    }

    return (
        <div className="space-y-4">
        {transactions.map((t) => (
            <div 
            key={t.id} 
            className="group flex items-center justify-between p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
            >
            <div className="flex items-center gap-4">
                {/* icon */}
                <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                {categoryIcons[t.category] || categoryIcons.General}
                </div>
                
                <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">{t.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-500">{t.date} • {t.category}</p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <span className={`font-bold text-lg ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {t.type === 'income' ? '+' : '-'}${Number(t.amount).toLocaleString()}
                </span>
                
                {/* hidden delete button */}
                <button 
                onClick={() => deleteTransaction(t.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 dark:text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                >
                <Trash2 size={18} />
                </button>
            </div>
            </div>
        ))}
        </div>
    );
};

export default TransactionList;