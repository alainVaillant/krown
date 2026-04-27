import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { Rocket, Users, Shield, GraduationCap, ArrowRight, Loader2, Sparkles } from 'lucide-react';

const categories = [
  { id: 'all', name: 'Tous nos pôles', icon: <Sparkles className="h-4 w-4" /> },
  { id: 'tech', name: 'Solutions Numériques', icon: <Rocket className="h-4 w-4" /> },
  { id: 'mentorship', name: 'Mentorat Stratégique', icon: <Users className="h-4 w-4" /> },
  { id: 'real_estate', name: 'Pôle Immobilier', icon: <Shield className="h-4 w-4" /> },
  { id: 'academy', name: 'Bass Academy', icon: <GraduationCap className="h-4 w-4" /> },
];

export default function Services() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchServices = useCallback(async () => {
    try {
      const response = await api.get('services/');
      setServices(response.data);
      setFilteredServices(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des services:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredServices(services);
    } else {
      setFilteredServices(services.filter(s => s.category === activeTab));
    }
  }, [activeTab, services]);

  return (
    <div className="pt-40 pb-32 min-h-screen bg-krown-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-krown-gold font-bold uppercase tracking-[0.3em] text-xs mb-6"
          >
            <div className="w-12 h-[2px] bg-krown-gold"></div>
            Expertise & Innovation
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-krown-bordeaux tracking-tighter leading-none"
          >
            Nos Solutions <br /> <span className="text-krown-gold">Stratégiques.</span>
          </motion.h1>
        </div>

        {/* Filtres Premium */}
        <div className="flex flex-wrap gap-3 mb-16 p-2 bg-white/50 backdrop-blur-md rounded-[32px] border border-white w-fit shadow-sm">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-3 px-8 py-4 rounded-[24px] font-bold text-sm transition-all ${
                activeTab === cat.id 
                ? 'bg-krown-bordeaux text-white shadow-xl shadow-red-900/20 scale-105' 
                : 'text-krown-sage hover:bg-white hover:text-krown-bordeaux'
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="h-12 w-12 text-krown-gold animate-spin" />
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <AnimatePresence mode='popLayout'>
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -15 }}
                  className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col group"
                >
                  <div className="h-64 bg-gray-100 relative overflow-hidden">
                    {service.image ? (
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-krown-bordeaux/5 text-krown-gold">
                        <Rocket className="h-16 w-16 opacity-20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-krown-bordeaux/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                       <span className="text-white font-bold flex items-center gap-2">Découvrir <ArrowRight className="h-4 w-4" /></span>
                    </div>
                  </div>
                  <div className="p-10 flex-grow">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-krown-gold mb-4 opacity-60">
                      {service.category}
                    </div>
                    <h3 className="text-2xl font-bold text-krown-bordeaux mb-4 group-hover:text-krown-gold transition-colors">{service.title}</h3>
                    <p className="text-krown-sage text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                      {service.description}
                    </p>
                    <button className="w-full py-5 bg-krown-cream text-krown-bordeaux font-black rounded-2xl border border-krown-bordeaux/5 hover:bg-krown-bordeaux hover:text-white transition-all duration-300 tracking-widest text-xs uppercase">
                      Demander une consultation
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
