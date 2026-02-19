import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PieChart, Shield, Zap } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import logo from '../../assets/finance64.png';

const Landing = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
        <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
            <img src={logo} alt="logo" draggable="false" />
            {/* <h1 className="text-2xl font-bold text-emerald-500 font-s">FinanceX</h1> */}
            <div className='flex gap-5'>  
                <Link to="/login" className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-6 py-1 rounded-xl font-bold text-lg inline-flex items-center gap-2 transition-all hover:scale-105 shadow-xl shadow-emerald-500/20">Login</Link>
                <Link to="/signup" className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-6 py-1 rounded-xl font-bold text-lg inline-flex items-center gap-2 transition-all hover:scale-105 shadow-xl shadow-emerald-500/20">Signup</Link>
            </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6">
            Take Control of Your <span className="text-emerald-500">Wealth.</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
            A professional-grade finance tracker to monitor spending, set goals, and visualize your financial future.
            </p>
            <Link to="/signup" className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-8 py-4 rounded-2xl font-bold text-lg inline-flex items-center gap-2 transition-all hover:scale-105 shadow-xl shadow-emerald-500/20">
            Get Started for Free <ArrowRight size={20} />
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
            <FeatureCard icon={<PieChart className="text-emerald-500"/>} title="Smart Analytics" desc="Beautifully visualized spending patterns." />
            <FeatureCard icon={<Shield className="text-emerald-500"/>} title="Secure Data" desc="Powered by Firebase for banking-grade security." />
            <FeatureCard icon={<Zap className="text-emerald-500"/>} title="Real-time Sync" desc="Your data updates instantly across all devices." />
            </div>
        </main>
        </div>
    );
};

export default Landing;