import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { MapPin, Home, CheckCircle, MessageSquare, Loader2, Zap } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

export default function RealEstate() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  const fetchProperties = useCallback(async () => {
    try {
      const response = await api.get('real-estate/');
      setProperties(response.data);
    } catch (error) {
      showNotification("Erreur lors du chargement des propriétés", "error");
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="pt-40 pb-32 min-h-screen bg-gray-50 dark:bg-[#0A0505] transition-colors duration-700 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-krown-gold/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 text-krown-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-8"
          >
            <Zap className="h-3 w-3 fill-current" />
            Curated Assets
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black text-krown-bordeaux dark:text-white tracking-tighter leading-none transition-colors mb-10"
          >
            Luxury <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-krown-gold to-krown-gold-light">Real Estate.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-krown-sage dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed transition-colors"
          >
            Investissez dans l'exceptionnel. Notre sélection d'actifs immobiliers redéfinit le prestige urbain et la rentabilité stratégique.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 text-krown-gold animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-20">
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} bg-white dark:bg-[#120808] rounded-[60px] overflow-hidden shadow-2xl border border-gray-100 dark:border-white/5 transition-all duration-700 group`}
              >
                <div className="lg:w-1/2 h-[500px] lg:h-auto bg-gray-200 dark:bg-white/5 relative overflow-hidden">
                  {property.image ? (
                    <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-krown-gold opacity-10">
                      <Home className="h-32 w-32" />
                    </div>
                  )}
                  {property.is_available && (
                    <div className="absolute top-8 left-8 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
                      <CheckCircle className="h-3 w-3" /> Now Available
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700"></div>
                </div>

                <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
                  <div className="mb-10">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-4xl md:text-5xl font-black text-krown-bordeaux dark:text-white tracking-tighter leading-none transition-colors">{property.title}</h3>
                    </div>
                    <p className="text-krown-gold flex items-center gap-2 font-black uppercase tracking-[0.2em] text-[10px] mb-8">
                      <MapPin className="h-4 w-4" /> {property.location}
                    </p>
                    <p className="text-krown-sage dark:text-gray-400 text-lg leading-relaxed font-medium transition-colors mb-10">
                      {property.description}
                    </p>
                    <div className="text-4xl font-black text-krown-bordeaux dark:text-krown-gold transition-colors">{property.price} €</div>
                  </div>
                  
                  <button className="flex items-center justify-center gap-3 w-full py-6 bg-krown-bordeaux dark:bg-krown-gold text-white rounded-3xl font-black text-xs uppercase tracking-[0.3em] hover:scale-[1.02] transition-all shadow-2xl">
                    <MessageSquare className="h-5 w-5" /> Inquire Privately
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && properties.length === 0 && (
          <div className="text-center py-40 bg-white/50 dark:bg-white/5 rounded-[60px] border-2 border-dashed border-gray-100 dark:border-white/5">
            <p className="text-krown-sage dark:text-gray-500 text-xl italic font-medium">Excellence in preparation. New properties arriving soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
