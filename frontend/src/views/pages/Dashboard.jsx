// react
import React, {useState} from 'react';

// components
import AddTransactionForm from '../components/AddTransactionForm.jsx';
import TransactionList from '../components/TransactionList.jsx';
import { AnalyticalPieChart, AnalyticalBarChart } from '../components/SpendingChart.jsx';
import SummaryCard from '../components/SummaryCard.jsx';
import Navbar from '../components/Navbar.jsx';

// misc
import { useAuthContext } from '../../context/AuthContext';
import { useTransactions } from '../../controllers/transactionController.js';
import { ArrowUpCircle, ArrowDownCircle, Wallet, Plus, Search, Filter, FlameIcon, AtomIcon, WavesIcon, GithubIcon } from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useAuthContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {transactions} = useTransactions();
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const income = transactions.filter(t => t.type === 'income').reduce((a, b) => a + Number(b.amount), 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((a, b) => a + Number(b.amount), 0);
    const balance = income - expense;

    const filteredTransactions = transactions.filter(t => {
        const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    const categories = ['All', ...new Set(transactions.map(t => t.category))];

    const handleEditClick = (transaction) => {
        setEditingTransaction(transaction);
    };

    return (
        <>
        <Navbar />
        <div className="min-h-screen bg-slate-100 text-slate-900 p-8 dark:bg-slate-900 dark:text-white pt-20 pb-2">

        {/* Hero Section */}
        <div className="min-h-screen bg-slate-100 text-slate-900 p-4 md:p-8 dark:bg-slate-900 dark:text-white">
            {/* Hero Title */}
            <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
                <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Finances</h1>
                <p className="text-slate-600 dark:text-slate-400">Overview of your current standing</p>
                </div>
                <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 p-3 md:px-6 md:py-3 rounded-2xl flex items-center gap-2 font-bold transition-all"
                >
                <Plus size={20} />
                <span className="hidden md:inline">Add Transaction</span>
                </button>
            </div>

            {/* Summary Cards */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <SummaryCard title="Total Balance" amount={balance} icon={<Wallet className="text-blue-400" />} />
                <SummaryCard title="Total Income" amount={income} icon={<ArrowUpCircle className="text-emerald-400" />} />
                <SummaryCard title="Total Expenses" amount={expense} icon={<ArrowDownCircle className="text-rose-400" />} />
            </div>

            <div className="max-w-6xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Search Input */}
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                            <input 
                                type="text"
                                placeholder="Search transactions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm dark:text-white"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="relative group">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                            <select 
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 appearance-none transition-all shadow-sm dark:text-white"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

            {/* Transaction Section */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent History</h2>
                                <span className="text-xs font-medium px-3 py-1 bg-slate-200 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">
                                    {filteredTransactions.length} items
                                </span>
                            </div>
                            {/* Pass filtered list here */}
                            <TransactionList 
                                transactions={filteredTransactions} 
                                onEdit={handleEditClick} 
                            />
                            {editingTransaction && (
                                <AddTransactionForm 
                                    isOpen={true} 
                                    onClose={() => setEditingTransaction(null)} 
                                    initialData={editingTransaction}
                                />
                            )}
                        </div>
                        
                        {/* Right Analytics */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold dark:text-white">Financial Analytics</h2>
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
                                <AnalyticalPieChart transactions={filteredTransactions} />
                            </div>
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
                                <AnalyticalBarChart transactions={filteredTransactions} />
                            </div>
                        </div>
                    </div>

            {/* Form Model */}
            <AddTransactionForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>

        {/* Footer */}
        <footer className="mt-5 border-t border-slate-700 dark:border-white pt-2 text-center">
        <h6 className="text-sm font-medium text-slate-600">
            Developed By yours truly: 
            <a href="https://github.com/priyanshudotgit" className="text-indigo-600 hover:text-indigo-500 transition-colors mt-3 flex flex-row justify-center items-center">
            <GithubIcon />
            @priyanshudotgit
            </a>
        </h6>
        
        <div className="mt-4 flex flex-col items-center gap-2">
            <p className="text-xs uppercase text-slate-900 font-semibold">
            Tech Stack
            </p>
            <div className="flex gap-4 text-slate-800">
            <span className="text-xs hover:text-blue-500">
                <AtomIcon className='text-blue-500' />
            </span>
            <span className="text-xs hover:text-orange-500">
                <FlameIcon className="text-orange-500" />
            </span>
            <span className="text-xs hover:text-blue-300">
                <WavesIcon className='text-blue-300' />
            </span>
            </div>
        </div>
        </footer>
        </div>
        </>
    );
};

export default Dashboard;