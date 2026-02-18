// react
import React, {useState} from 'react';

// components
import AddTransactionForm from '../components/AddTransactionForm.jsx';
import TransactionList from '../components/TransactionList.jsx';
import SpendingChart from '../components/SpendingChart.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';
import SummaryCard from '../components/SummaryCard.jsx';

// misc
import { useAuthContext } from '../../context/AuthContext';
import { useTransactions } from '../../controllers/transactionController.js';
import { ArrowUpCircle, ArrowDownCircle, Wallet, Plus } from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useAuthContext();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const {transactions} = useTransactions();

    const income = transactions.filter(t => t.type === 'income').reduce((a, b) => a + Number(b.amount), 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((a, b) => a + Number(b.amount), 0);
    const balance = income - expense;

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900 p-8 dark:bg-slate-900 dark:text-white">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Fintech Dashboard</h1>
            <div className="flex items-center gap-4">
            <span className="text-slate-600 dark:text-slate-400">{user?.email}</span>
            <button 
                onClick={logout}
                className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all"
            >
                Logout
            </button>
            <ThemeToggle />
            </div>
        </div>

        {/* Hero Section */}
        <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 dark:bg-slate-900 dark:text-white">
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

            {/* Transaction Section */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left History */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Recent History</h2>
                    <TransactionList />
                </div>

                {/* Right Analytics */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Financial Analytics</h2>
                    <div className="bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 p-6 rounded-3xl">
                    <p className="text-slate-700 dark:text-slate-400 text-sm mb-4">Spending Breakdown</p>
                    {/* This is where the Pie Chart will go */}
                    <div className="bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 p-6 rounded-3xl">
                    {/* <h3 className="text-white font-semibold mb-4">Spending Breakdown</h3> */}
                    {transactions.length > 0 ? (
                        <SpendingChart transactions={transactions} />
                    ) : (
                        <div className="h-[200px] flex items-center justify-center text-slate-500 text-sm">
                        Add expenses to see analysis
                        </div>
                    )}
                    </div>
                    </div>
                </div>
            </div>

            {/* Form Model */}
            <AddTransactionForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
        </div>
    );
};

export default Dashboard;