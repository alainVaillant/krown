import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import { BookOpen, Play, Loader2, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UserCourses() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const response = await api.get('academy/my-enrollments/');
        setEnrollments(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement de vos cours", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F8F7F5]">
      <Sidebar />
      <main className="flex-grow p-8 lg:p-16">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-krown-bordeaux tracking-tight">Mes Formations</h1>
          <p className="text-krown-sage font-medium">Continuez votre apprentissage à la Bass Academy.</p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 text-krown-gold animate-spin" />
          </div>
        ) : enrollments.length === 0 ? (
          <div className="bg-white p-12 rounded-[40px] text-center border border-gray-100">
            <BookOpen className="h-16 w-16 text-gray-200 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-krown-bordeaux mb-2">Aucun cours pour le moment</h3>
            <p className="text-gray-400 mb-8">Vous n'êtes inscrit à aucune formation.</p>
            <Link to="/academy" className="inline-block bg-krown-gold text-white px-8 py-3 rounded-xl font-bold shadow-lg">Explorer le catalogue</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {enrollments.map((enroll) => (
              <motion.div 
                key={enroll.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm flex flex-col sm:flex-row"
              >
                <div className="sm:w-1/3 h-40 sm:h-auto bg-gray-100 relative">
                   {enroll.course_details?.thumbnail ? (
                     <img src={enroll.course_details.thumbnail} alt="" className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center bg-krown-gold/5 text-krown-gold">
                        <BookOpen className="h-10 w-10" />
                     </div>
                   )}
                </div>
                <div className="p-8 flex-grow">
                   <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-krown-bordeaux">{enroll.course_details?.title}</h3>
                      {enroll.progress === 100 && <Award className="h-6 w-6 text-krown-gold" />}
                   </div>
                   
                   <div className="mb-6">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-krown-sage mb-2">
                         <span>Progression</span>
                         <span>{enroll.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                         <div className="h-full bg-krown-gold transition-all duration-1000" style={{ width: `${enroll.progress}%` }}></div>
                      </div>
                   </div>

                   <Link 
                      to={`/dashboard/courses/${enroll.course_details?.id}`}
                      className="flex items-center gap-2 text-krown-bordeaux font-black text-sm uppercase tracking-widest hover:gap-4 transition-all"
                   >
                      Reprendre le cours <Play className="h-4 w-4 fill-current" />
                   </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
