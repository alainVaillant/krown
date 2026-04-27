import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { PlayCircle, CheckCircle2, ChevronLeft, ChevronRight, Lock, BookOpen, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CoursePlayer() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      // Vérifier d'abord si l'utilisateur est inscrit (sécurité)
      const enrollResponse = await api.get('academy/my-enrollments/');
      const isEnrolled = enrollResponse.data.some(e => e.course.toString() === courseId || e.course_details?.id.toString() === courseId);
      
      if (!isEnrolled) {
        alert("Vous devez être inscrit pour accéder à ce contenu.");
        navigate('/dashboard/courses');
        return;
      }

      // Récupérer les détails du cours et les leçons
      // Pour simplifier, nous utilisons le ViewSet existant que nous allons mettre à jour
      const courseResponse = await api.get(`academy/manage/admin-manage/${courseId}/`);
      setCourse(courseResponse.data);
      
      // Récupérer les leçons via un nouvel endpoint que nous allons ajouter
      const lessonsResponse = await api.get(`academy/lessons/?course=${courseId}`);
      setLessons(lessonsResponse.data);
      if (lessonsResponse.data.length > 0) {
        setCurrentLesson(lessonsResponse.data[0]);
      }
    } catch (error) {
      console.error("Erreur chargement cours");
    } finally {
      setLoading(false);
    }
  }, [courseId, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-krown-cream">
       <Loader2 className="w-12 h-12 text-krown-gold animate-spin" />
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Barre Latérale des Leçons */}
      <div className="lg:w-96 bg-gray-50 border-r border-gray-100 flex flex-col h-screen sticky top-0">
        <div className="p-8 border-b border-gray-100">
           <button onClick={() => navigate('/dashboard/courses')} className="flex items-center gap-2 text-krown-sage font-bold text-sm mb-6 hover:text-krown-bordeaux transition-colors">
              <ChevronLeft className="h-4 w-4" /> Retour au Dashboard
           </button>
           <h2 className="text-2xl font-black text-krown-bordeaux tracking-tight">{course?.title}</h2>
           <p className="text-xs font-black uppercase tracking-[0.2em] text-krown-gold mt-2">Bass Academy • {lessons.length} Leçons</p>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-2">
           {lessons.map((lesson, index) => (
             <button
               key={lesson.id}
               onClick={() => setCurrentLesson(lesson)}
               className={`w-full flex items-center gap-4 p-5 rounded-[24px] text-left transition-all ${
                 currentLesson?.id === lesson.id 
                 ? 'bg-white shadow-xl shadow-krown-bordeaux/5 border border-krown-bordeaux/5 scale-[1.02]' 
                 : 'hover:bg-white/50 text-krown-sage'
               }`}
             >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                   currentLesson?.id === lesson.id ? 'bg-krown-bordeaux text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                   {index + 1}
                </div>
                <div className="flex-grow">
                   <p className={`font-bold text-sm ${currentLesson?.id === lesson.id ? 'text-krown-bordeaux' : ''}`}>{lesson.title}</p>
                   <div className="flex items-center gap-2 mt-1 opacity-50">
                      <PlayCircle className="h-3 w-3" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Vidéo</span>
                   </div>
                </div>
             </button>
           ))}
        </div>
      </div>

      {/* Zone de Lecture Principale */}
      <main className="flex-grow bg-white p-8 lg:p-20 overflow-y-auto">
        <AnimatePresence mode="wait">
          {currentLesson ? (
            <motion.div
              key={currentLesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-5xl mx-auto"
            >
              {/* Vidéo Player (Placeholder style) */}
              <div className="aspect-video bg-black rounded-[40px] mb-12 shadow-2xl overflow-hidden relative group">
                 {currentLesson.video_url ? (
                   <iframe 
                     className="w-full h-full"
                     src={currentLesson.video_url.replace('watch?v=', 'embed/')} 
                     title={currentLesson.title}
                     allowFullScreen
                   ></iframe>
                 ) : (
                   <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
                      <Lock className="w-20 h-20 mb-4" />
                      <p className="font-bold uppercase tracking-[0.3em] text-xs">Contenu en cours de déploiement</p>
                   </div>
                 )}
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                 <div>
                    <h1 className="text-4xl font-black text-krown-bordeaux tracking-tight mb-2">{currentLesson.title}</h1>
                    <div className="flex items-center gap-4">
                       <span className="px-3 py-1 bg-krown-gold/10 text-krown-gold text-[10px] font-black uppercase tracking-widest rounded-full">Leçon {lessons.indexOf(currentLesson) + 1} sur {lessons.length}</span>
                       <span className="text-krown-sage text-sm font-medium italic">Bass Academy Excellence</span>
                    </div>
                 </div>
                 <button className="flex items-center gap-3 bg-green-500 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-green-500/20 hover:scale-105 transition-all">
                    <CheckCircle2 className="h-5 w-5" /> Marquer comme terminé
                 </button>
              </div>

              <div className="prose prose-lg max-w-none">
                 <div className="p-10 bg-krown-cream rounded-[40px] border border-krown-bordeaux/5">
                    <h3 className="text-xl font-bold text-krown-bordeaux mb-6 flex items-center gap-2">
                       <BookOpen className="h-5 w-5 text-krown-gold" /> Notes de cours & Tablatures
                    </h3>
                    <div className="text-krown-sage leading-relaxed whitespace-pre-wrap font-medium">
                       {currentLesson.content || "Aucune note additionnelle pour cette leçon."}
                    </div>
                 </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center">
               <BookOpen className="w-20 h-20 text-gray-100 mb-6" />
               <h2 className="text-2xl font-bold text-krown-bordeaux">Sélectionnez une leçon pour commencer</h2>
               <p className="text-gray-400 mt-2">Votre voyage musical KROWN commence ici.</p>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
