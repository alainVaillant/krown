import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { Sparkles, Loader2, ArrowRight, Rocket, Users, Shield, GraduationCap } from 'lucide-react';
import ServiceRequestModal from '../components/ServiceRequestModal';

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
  const [selectedService, setSelectedService] = useState(null);

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
    <div className="pt-40 pb-32 min-h-screen bg-krown-cream dark:bg-[#0A0505] transition-colors duration-500">
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
            className="text-5xl md:text-7xl font-black text-krown-bordeaux dark:text-white tracking-tighter leading-none transition-colors"
          >
            Nos Solutions <br /> <span className="text-krown-gold">Stratégiques.</span>
          </motion.h1>
        </div>

        {/* Filtres Premium */}
        <div className="flex flex-wrap gap-3 mb-16 p-2 bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-[32px] border border-white dark:border-white/10 w-fit shadow-sm transition-colors">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-3 px-8 py-4 rounded-[24px] font-bold text-sm transition-all ${
                activeTab === cat.id 
                ? 'bg-krown-bordeaux dark:bg-krown-gold text-white shadow-xl scale-105' 
                : 'text-krown-sage dark:text-gray-400 hover:bg-white dark:hover:bg-white/10 hover:text-krown-bordeaux dark:hover:text-white'
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
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode='popLayout'>
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -15 }}
                  className="bg-white dark:bg-[#120808] rounded-[40px] overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col group"
                >
                  <div className="h-64 bg-gray-100 dark:bg-white/5 relative overflow-hidden">
                    {service.image ? (
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-krown-gold opacity-20">
                        <Rocket className="h-16 w-16" />
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
                    <h3 className="text-2xl font-bold text-krown-bordeaux dark:text-white mb-4 group-hover:text-krown-gold transition-colors">{service.title}</h3>
                    <p className="text-krown-sage dark:text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3 font-medium transition-colors">
                      {service.description}
                    </p>
                    <button 
                      onClick={() => setSelectedService(service)}
                      className="w-full py-5 bg-krown-cream dark:bg-white/5 text-krown-bordeaux dark:text-white font-black rounded-2xl border border-krown-bordeaux/5 dark:border-white/5 hover:bg-krown-bordeaux dark:hover:bg-krown-gold hover:text-white transition-all duration-300 tracking-widest text-xs uppercase"
                    >
                      Demander une consultation
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <AnimatePresence>
          {selectedService && (
            <ServiceRequestModal service={selectedService} onClose={() => setSelectedService(null)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
