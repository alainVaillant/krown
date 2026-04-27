import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { Sparkles, Loader2, ArrowRight, Rocket, Users, Shield, GraduationCap, Zap } from 'lucide-react';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="pt-40 pb-32 min-h-screen bg-krown-cream dark:bg-[#0A0505] transition-colors duration-700 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-krown-bordeaux/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-krown-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-krown-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-6"
          >
            <Zap className="h-3 w-3 fill-current" />
            Cutting-Edge Expertise
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black text-krown-bordeaux dark:text-white tracking-tighter leading-none transition-colors"
          >
            Elite <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-krown-gold to-krown-gold-light">Capabilities.</span>
          </motion.h1>
        </div>

        {/* Filtres Premium */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-3 mb-20 p-2 bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-[32px] border border-white dark:border-white/10 w-fit shadow-xl transition-colors"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-3 px-8 py-4 rounded-[24px] font-black text-xs uppercase tracking-widest transition-all ${
                activeTab === cat.id 
                ? 'bg-krown-bordeaux dark:bg-krown-gold text-white shadow-2xl scale-105' 
                : 'text-krown-sage dark:text-gray-400 hover:bg-white dark:hover:bg-white/10 hover:text-krown-bordeaux dark:hover:text-white'
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="h-12 w-12 text-krown-gold animate-spin" />
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <AnimatePresence mode='popLayout'>
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  layout
                  variants={itemVariants}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -15 }}
                  className="bg-white dark:bg-[#120808] rounded-[40px] overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col group"
                >
                  <div className="h-64 bg-gray-100 dark:bg-white/5 relative overflow-hidden">
                    {service.image ? (
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-krown-gold opacity-10 group-hover:opacity-30 transition-opacity">
                        <Rocket className="h-24 w-24" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-krown-bordeaux/80 dark:from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                       <span className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2">View Details <ArrowRight className="h-4 w-4" /></span>
                    </div>
                  </div>
                  <div className="p-10 flex-grow">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-krown-gold mb-6 opacity-60">
                      {service.category}
                    </div>
                    <h3 className="text-3xl font-black text-krown-bordeaux dark:text-white mb-6 group-hover:text-krown-gold transition-colors leading-none tracking-tight">{service.title}</h3>
                    <p className="text-krown-sage dark:text-gray-400 text-sm leading-relaxed mb-10 line-clamp-3 font-medium transition-colors">
                      {service.description}
                    </p>
                    <button 
                      onClick={() => setSelectedService(service)}
                      className="w-full py-5 bg-gray-50 dark:bg-white/5 text-krown-bordeaux dark:text-white font-black rounded-2xl border border-krown-bordeaux/5 dark:border-white/5 hover:bg-krown-bordeaux dark:hover:bg-krown-gold hover:text-white transition-all duration-300 tracking-[0.2em] text-[10px] uppercase"
                    >
                      Request Consultation
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
