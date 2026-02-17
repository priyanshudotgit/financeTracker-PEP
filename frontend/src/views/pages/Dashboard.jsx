import { useAuthContext } from '../../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = useAuthContext();

    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Fintech Dashboard</h1>
            <div className="flex items-center gap-4">
            <span className="text-slate-400">{user?.email}</span>
            <button 
                onClick={logout}
                className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all"
            >
                Logout
            </button>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
            <p className="text-slate-400 text-sm">Welcome back, your system is ready.</p>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;