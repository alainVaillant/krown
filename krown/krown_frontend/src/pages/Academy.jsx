import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { GraduationCap, PlayCircle, Clock, Star, ArrowRight, Loader2, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export default function Academy() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { showNotification } = useNotification();

  const fetchCourses = useCallback(async () => {
    try {
      const response = await api.get('academy/');
      setCourses(response.data);
    } catch (error) {
      showNotification("Erreur lors du chargement des cours", "error");
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleEnroll = async (courseId) => {
    if (!user) {
      showNotification("Veuillez vous connecter pour vous inscrire.", "info");
      return;
    }
    try {
      await api.post('academy/enroll/', { course: courseId });
      showNotification("Inscription réussie ! Bienvenue à la Bass Academy.");
    } catch (error) {
      showNotification("Vous êtes déjà inscrit à ce cours.", "info");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="pt-40 pb-32 min-h-screen bg-white dark:bg-[#0A0505] transition-colors duration-700 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-krown-gold/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-krown-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-6"
            >
              <Zap className="h-3 w-3 fill-current" />
              Empowering Creative Minds
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-9xl font-black text-krown-bordeaux dark:text-white tracking-tighter leading-[0.85] transition-colors"
            >
              Bass <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-krown-gold to-krown-gold-light">Academy.</span>
            </motion.h1>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-krown-sage dark:text-gray-400 max-w-sm font-medium leading-relaxed"
          >
            Maîtrisez l'art de la basse et de l'accompagnement avec la méthode d'excellence KROWN.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="h-12 w-12 text-krown-gold animate-spin" />
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            <AnimatePresence>
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  variants={cardVariants}
                  whileHover={{ y: -20 }}
                  className="group bg-white dark:bg-[#120808] rounded-[50px] overflow-hidden border border-gray-50 dark:border-white/5 shadow-sm hover:shadow-3xl transition-all duration-700"
                >
                  <div className="h-72 bg-gray-100 dark:bg-white/5 relative overflow-hidden p-4">
                    <div className="w-full h-full rounded-[36px] overflow-hidden relative">
                        {course.thumbnail ? (
                        <img 
                            src={course.thumbnail} 
                            alt={course.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                        ) : (
                        <div className="w-full h-full flex items-center justify-center bg-krown-bordeaux/5 dark:bg-krown-gold/5 text-krown-gold">
                            <PlayCircle className="h-20 w-20 opacity-20" />
                        </div>
                        )}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700"></div>
                    </div>
                    
                    <div className="absolute top-8 left-8 bg-krown-gold px-4 py-2 rounded-full text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-xl">
                      {course.category === 'bass' ? 'Guitare Basse' : 'Accompagnement'}
                    </div>
                    <div className="absolute bottom-8 right-8 bg-white dark:bg-krown-bordeaux px-4 py-2 rounded-2xl text-krown-bordeaux dark:text-white font-black shadow-2xl">
                      {course.price} €
                    </div>
                  </div>
                  
                  <div className="p-12">
                    <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-krown-sage mb-6 opacity-60">
                      <span className="flex items-center gap-2"><Clock className="h-3 w-3" /> 12H MASTERCLASS</span>
                      <span className="flex items-center gap-2"><Star className="h-3 w-3 text-krown-gold fill-current" /> 4.9 RATING</span>
                    </div>
                    <h3 className="text-3xl font-black text-krown-bordeaux dark:text-white mb-6 group-hover:text-krown-gold transition-colors leading-none tracking-tight">
                      {course.title}
                    </h3>
                    <p className="text-krown-sage dark:text-gray-400 text-sm mb-10 line-clamp-2 leading-relaxed transition-colors">
                      {course.description}
                    </p>
                    
                    <button 
                      onClick={() => handleEnroll(course.id)}
                      className="w-full py-6 bg-krown-bordeaux dark:bg-krown-gold text-white font-black rounded-3xl flex items-center justify-center gap-3 hover:scale-[1.03] transition-all shadow-xl shadow-red-900/10 dark:shadow-krown-gold/10 uppercase tracking-widest text-xs"
                    >
                      Enroll Now <ArrowRight className="h-4 w-4" />
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
