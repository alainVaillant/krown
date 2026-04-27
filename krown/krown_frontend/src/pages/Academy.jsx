import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { GraduationCap, PlayCircle, Clock, Star, ArrowRight, Loader2 } from 'lucide-react';
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

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-krown-gold font-bold uppercase tracking-widest text-sm mb-4"
            >
              <GraduationCap className="h-5 w-5" />
              Bass Academy
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-krown-bordeaux tracking-tighter"
            >
              Propulsez votre <span className="text-krown-gold">carrière créative</span>
            </motion.h1>
          </div>
          <p className="text-gray-500 max-w-sm">
            Apprenez auprès des meilleurs experts et rejoignez une communauté de talents ambitieux.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 text-krown-gold animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all"
              >
                <div className="h-56 bg-gray-100 relative overflow-hidden">
                  {course.thumbnail ? (
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-krown-bordeaux bg-opacity-5">
                      <PlayCircle className="h-16 w-16 text-krown-gold opacity-50" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-krown-gold/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                    {course.category === 'bass' ? 'Guitare Basse' : 'Accompagnement'}
                  </div>
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-krown-bordeaux font-bold shadow-lg">
                    {course.price} €
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 12h de cours</span>
                    <span className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-400" /> 4.9 (120 avis)</span>
                  </div>
                  <h3 className="text-2xl font-bold text-krown-bordeaux mb-4 group-hover:text-krown-gold transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-8 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <button 
                    onClick={() => handleEnroll(course.id)}
                    className="w-full py-4 bg-krown-bordeaux text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all shadow-lg"
                  >
                    S'inscrire maintenant <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
