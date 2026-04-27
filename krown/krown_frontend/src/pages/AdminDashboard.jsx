import { useState, useEffect } from 'react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  GraduationCap, 
  TrendingUp, 
  Clock, 
  ArrowUpRight,
  Loader2
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('dashboard/stats/');
        setStats(response.data);
      } catch (error) {
        console.error("Erreur stats admin");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-krown-cream dark:bg-[#0A0505]">
       <Loader2 className="w-12 h-12 text-krown-gold animate-spin" />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F4F3F0] dark:bg-[#0A0505] transition-colors duration-500">
      <Sidebar />
      
      <main className="flex-grow p-8 lg:p-16">
        <header className="mb-16">
           <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 bg-krown-gold text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">Admin Control</div>
           </div>
           <h1 className="text-5xl font-black text-krown-bordeaux dark:text-white tracking-tight transition-colors">Pilotage KROWN</h1>
           <p className="text-krown-sage dark:text-gray-400 mt-2 font-medium text-lg transition-colors">Vue d'ensemble de l'écosystème stratégique.</p>
        </header>

        {/* Cartes Stats Géantes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
           <AdminStatCard title="Membres" value={stats?.total_users} icon={<Users />} color="bordeaux" trend="+12% ce mois" />
           <AdminStatCard title="Demandes" value={stats?.total_requests} icon={<Briefcase />} color="gold" trend={`${stats?.pending_requests} en attente`} />
           <AdminStatCard title="Étudiants" value={stats?.total_enrollments} icon={<GraduationCap />} color="sage" trend="Excellent score" />
           <AdminStatCard title="Actifs Immobiliers" value={stats?.total_properties} icon={<TrendingUp />} color="bordeaux" trend="Portfolio Stable" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           <section className="lg:col-span-2 bg-white dark:bg-[#120808] p-12 rounded-[50px] shadow-sm border border-gray-100 dark:border-white/5 transition-colors">
              <h2 className="text-2xl font-black text-krown-bordeaux dark:text-white mb-10 flex items-center gap-3 transition-colors">
                 <Clock className="h-6 w-6 text-krown-gold" /> Demandes de Consultation
              </h2>
              
              <div className="overflow-x-auto">
                 <table className="w-full">
                    <thead>
                       <tr className="text-left text-[10px] font-black uppercase tracking-widest text-gray-300 dark:text-gray-500 border-b border-gray-50 dark:border-white/5 pb-4">
                          <th className="pb-6">Client</th>
                          <th className="pb-6">Service</th>
                          <th className="pb-6">Statut</th>
                          <th className="pb-6">Date</th>
                          <th className="pb-6 text-right">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                       {stats?.recent_requests.map((req) => (
                          <tr key={req.id} className="group">
                             <td className="py-6 font-bold text-krown-bordeaux dark:text-white transition-colors">{req.user__username}</td>
                             <td className="py-6 text-krown-sage dark:text-gray-400 font-medium transition-colors">{req.service__title}</td>
                             <td className="py-6">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                   req.status === 'pending' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600' : 'bg-green-50 dark:bg-green-500/10 text-green-600'
                                }`}>
                                   {req.status}
                                </span>
                             </td>
                             <td className="py-6 text-gray-400 dark:text-gray-600 text-sm transition-colors">{new Date(req.created_at).toLocaleDateString()}</td>
                             <td className="py-6 text-right">
                                <button className="p-2 hover:bg-krown-cream dark:hover:bg-white/5 rounded-xl transition-colors">
                                   <ArrowUpRight className="h-4 w-4 text-krown-gold" />
                                </button>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </section>

           <section className="space-y-8">
              <div className="bg-krown-bordeaux dark:bg-[#1A0A0A] p-12 rounded-[50px] text-white shadow-2xl relative overflow-hidden group transition-colors">
                 <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-6">Gestion Système</h3>
                    <div className="space-y-4">
                       <AdminActionBtn title="Gérer les Membres" />
                       <AdminActionBtn title="Publier un Article" />
                       <AdminActionBtn title="Nouveau Cours" />
                    </div>
                 </div>
                 <TrendingUp className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 rotate-12" />
              </div>
           </section>
        </div>
      </main>
    </div>
  );
}

function AdminStatCard({ title, value, icon, color, trend }) {
  const colors = {
    bordeaux: "bg-krown-bordeaux dark:bg-[#1A0A0A] text-white",
    gold: "bg-white dark:bg-[#120808] text-krown-bordeaux dark:text-krown-gold border border-gray-100 dark:border-white/5",
    sage: "bg-krown-sage dark:bg-[#1E2520] text-white"
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`p-10 rounded-[40px] flex flex-col justify-between h-64 shadow-sm transition-all duration-500 ${colors[color]}`}
    >
       <div className="flex justify-between items-start">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
             {icon}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{trend}</span>
       </div>
       <div>
          <p className="text-4xl font-black mb-1 tracking-tighter">{value || 0}</p>
          <p className="text-xs font-bold uppercase tracking-widest opacity-70">{title}</p>
       </div>
    </motion.div>
  );
}

function AdminActionBtn({ title }) {
  return (
    <button className="w-full flex items-center justify-between p-4 bg-white/10 rounded-2xl hover:bg-white hover:text-krown-bordeaux transition-all font-bold text-sm">
       {title}
       <ArrowUpRight className="h-4 w-4" />
    </button>
  );
}
