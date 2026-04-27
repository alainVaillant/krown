import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  Crown,
  ChevronRight,
  Plus
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-krown-cream">
       <div className="w-12 h-12 border-4 border-krown-gold border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F8F7F5]">
      <Sidebar />
      
      <main className="flex-grow p-8 lg:p-16">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <Crown className="h-5 w-5 text-krown-gold" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-krown-gold">Espace Membre Privilège</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-krown-bordeaux tracking-tight">
              Bienvenue, {user.username}.
            </h1>
          </div>
          
          <button className="flex items-center gap-3 bg-krown-bordeaux text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-red-900/10 hover:scale-105 transition-all">
            <Plus className="h-5 w-5" /> Nouveau Projet
          </button>
        </header>

        {/* Statistiques Style Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <StatCard title="Projets Actifs" value="03" sub="2 en attente" color="bordeaux" />
          <StatCard title="Formations" value="01" sub="Progression: 45%" color="gold" />
          <StatCard title="Taux de Succès" value="98%" sub="Score Excellence" color="sage" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Activités Récentes */}
          <section className="lg:col-span-2 bg-white p-12 rounded-[40px] shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-10">
               <h2 className="text-2xl font-bold text-krown-bordeaux flex items-center gap-3">
                 <Clock className="h-6 w-6 text-krown-gold" /> Activité Récente
               </h2>
               <button className="text-sm font-bold text-krown-gold hover:underline">Voir tout</button>
            </div>
            
            <div className="space-y-8">
              <ActivityItem 
                title="Lancement du Projet E-commerce" 
                desc="L'équipe technique a validé le cahier des charges de votre plateforme." 
                time="Il y a 10 min" 
                icon={<CheckCircle2 className="text-green-500" />}
              />
              <ActivityItem 
                title="Paiement Reçu" 
                desc="Le règlement pour votre abonnement Mentorat a été confirmé." 
                time="Hier, 14:20" 
                icon={<Crown className="text-krown-gold" />}
              />
              <ActivityItem 
                title="Nouvelle Formation" 
                desc="Vous avez débloqué l'accès au module 'Stratégie de Croissance'." 
                time="24 Janv 2026" 
                icon={<BookOpen className="text-blue-500" />}
              />
            </div>
          </section>

          {/* Support / Quick Links */}
          <section className="space-y-8">
             <div className="bg-krown-bordeaux p-10 rounded-[40px] text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 italic">Un conseiller vous attend.</h3>
                  <p className="text-red-100/70 text-sm mb-8 leading-relaxed">
                    Besoin d'un accompagnement sur mesure ? Nos experts sont là pour vous.
                  </p>
                  <button className="w-full bg-white text-krown-bordeaux py-4 rounded-2xl font-black text-xs uppercase tracking-widest group-hover:bg-krown-gold group-hover:text-white transition-all">
                    Prendre RDV
                  </button>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
             </div>

             <div className="bg-white p-10 rounded-[40px] border border-gray-100">
                <h3 className="font-bold text-krown-bordeaux mb-6 uppercase text-xs tracking-widest">Ressources Utiles</h3>
                <ul className="space-y-4">
                   {['Guide de bienvenue', 'Catalogue 2026', 'Support Technique'].map((link) => (
                     <li key={link} className="flex justify-between items-center group cursor-pointer">
                        <span className="text-krown-sage font-medium group-hover:text-krown-bordeaux transition-colors">{link}</span>
                        <ChevronRight className="h-4 w-4 text-krown-gold group-hover:translate-x-2 transition-transform" />
                     </li>
                   ))}
                </ul>
             </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, sub, color }) {
  const styles = {
    bordeaux: "text-krown-bordeaux bg-white",
    gold: "text-krown-gold bg-white",
    sage: "text-krown-sage bg-white"
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={`p-10 rounded-[40px] shadow-sm border border-gray-100 flex flex-col justify-between h-56 transition-all duration-500 ${styles[color]}`}
    >
      <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">{title}</p>
      <div>
        <p className="text-5xl font-black mb-2 tracking-tighter">{value}</p>
        <p className="text-xs font-bold opacity-60 flex items-center gap-1">
           <TrendingUp className="h-3 w-3" /> {sub}
        </p>
      </div>
    </motion.div>
  );
}

function ActivityItem({ title, desc, time, icon }) {
  return (
    <div className="flex gap-6 group">
      <div className="mt-1 p-3 bg-gray-50 rounded-2xl group-hover:bg-krown-cream transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-krown-bordeaux text-lg leading-tight mb-1">{title}</h4>
        <p className="text-krown-sage text-sm mb-2 max-w-md">{desc}</p>
        <span className="text-[10px] font-black uppercase tracking-widest text-krown-gold opacity-60">{time}</span>
      </div>
    </div>
  );
}
