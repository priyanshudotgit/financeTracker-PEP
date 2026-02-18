import React, { useState } from 'react';
import { useTransactions } from '../../controllers/transactionController.js';
import { X } from 'lucide-react';

const AddTransactionForm = ({ isOpen, onClose, initialData }) => {
    const { addTransaction, updateTransaction } = useTransactions();
    const [formData, setFormData] = useState(initialData || {
        title: '',
        amount: '',
        type: 'income',
        category: 'Income',
        date: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(initialData?.id){
            await updateTransaction(initialData.id, formData);
        }
        else{
            await addTransaction(formData);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/80 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-md rounded-2xl shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{initialData ? 'Edit' : 'Add'} Transaction</h3>
            <button onClick={onClose} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <X size={24} />
            </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Type Toggle */}
            <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl">
                <button
                type="button"
                onClick={() => setFormData({...formData, type: 'income'})}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${formData.type === 'income' ? 'bg-emerald-500 text-white' : 'text-slate-600 dark:text-slate-400'}`}
                >
                Income
                </button>
                <button
                type="button"
                onClick={() => setFormData({...formData, type: 'expense'})}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${formData.type === 'expense' ? 'bg-rose-500 text-white' : 'text-slate-600 dark:text-slate-400'}`}
                >
                Expense
                </button>
            </div>

            <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1 uppercase tracking-wider">Title</label>
                <input 
                required
                className={`w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl py-2.5 px-4 ${formData.type==="income" ? "focus:ring-2 focus:ring-emerald-500" : "focus:ring-2 focus:ring-rose-500"} outline-none`}
                placeholder={formData.type==="income" ? "Salary, Freelance, Bonus..." : "Rent, Medical, Groceries..."}
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
            </div>

            {formData.type === "expense" && (
                <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1 uppercase tracking-wider">Category:</label>
                    <select
                    value={formData.category}
                    onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                    }
                    className={`w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl py-2.5 px-4 ${formData.type==="income" ? "focus:ring-2 focus:ring-emerald-500" : "focus:ring-2 focus:ring-rose-500"} outline-none`}
                    >
                    <option value="">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Rent">Rent</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Health">Health</option>
                    <option value="General">General</option>
                    </select>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1 uppercase tracking-wider">Amount</label>
                <input 
                    required
                    type="number"
                    className={`w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl py-2.5 px-4 ${formData.type==="income" ? "focus:ring-2 focus:ring-emerald-500" : "focus:ring-2 focus:ring-rose-500"} outline-none`}
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
                </div>
                <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1 uppercase tracking-wider">Date</label>
                <input 
                    type="date"
                    className={`w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl py-2.5 px-4 ${formData.type==="income" ? "focus:ring-2 focus:ring-emerald-500" : "focus:ring-2 focus:ring-rose-500"} outline-none`}
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
                </div>
            </div>

            <button 
                type="submit" 
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
            >
                Save Transaction
            </button>
            </form>
        </div>
        </div>
    );
};

export default AddTransactionForm;