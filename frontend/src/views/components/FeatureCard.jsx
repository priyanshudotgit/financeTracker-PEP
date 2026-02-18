const FeatureCard = ({ icon, title, desc }) => (
    <div className="p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-left">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400">{desc}</p>
    </div>
);

export default FeatureCard;