import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { Users, Target, Rocket, Award, CheckCircle, Loader2, ArrowRight, X, Send, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export default function Mentorship() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const { user } = useAuth();
  const { showNotification } = useNotification();

  const fetchPrograms = useCallback(async () => {
    try {
      const response = await api.get('mentorship/');
      setPrograms(response.data);
    } catch (error) {
      showNotification("Erreur lors du chargement des programmes", "error");
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="bg-krown-cream dark:bg-[#0A0505] pt-40 pb-32 min-h-screen transition-colors duration-700 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-krown-bordeaux/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Mentorat */}
        <div className="max-w-5xl mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-krown-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-8"
          >
            <Zap className="h-3 w-3 fill-current" />
            Strategic Leadership
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black text-krown-bordeaux dark:text-white tracking-tighter mb-10 leading-[0.85] transition-colors"
          >
            Become the <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-krown-gold to-krown-gold-light">Architect of Future.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-krown-sage dark:text-gray-400 font-medium max-w-2xl leading-relaxed transition-colors"
          >
            Le mentorat KROWN est une immersion stratégique pour les dirigeants qui refusent le statu quo.
          </motion.p>
        </div>

        {/* Valeurs Mentorat en Bento Style */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40"
        >
          <ValueCard variants={fadeInUp} icon={<Target />} title="Visionary Goals" desc="Définissez des objectifs qui transcendent le marché actuel." />
          <ValueCard variants={fadeInUp} icon={<Rocket />} title="Rapid Execution" desc="Transformez vos idées en actifs concrets avec précision." />
          <ValueCard variants={fadeInUp} icon={<Award />} title="Elite Network" desc="Accédez à un écosystème de leaders et de partenaires mondiaux." />
        </motion.div>

        {/* Liste des Programmes avec design asymétrique */}
        <div className="space-y-32">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-20`}
            >
              <div className="lg:w-1/2">
                <div className="text-[10px] font-black text-krown-gold uppercase tracking-[0.3em] mb-6">Program Duration: {program.duration}</div>
                <h3 className="text-5xl md:text-6xl font-black text-krown-bordeaux dark:text-white mb-8 tracking-tighter transition-colors leading-none">{program.title}</h3>
                <p className="text-xl text-krown-sage dark:text-gray-400 font-medium mb-12 leading-relaxed transition-colors">
                  {program.description}
                </p>
                <div className="flex items-center gap-10">
                    <div className="text-3xl font-black text-krown-bordeaux dark:text-krown-gold transition-colors">{program.price} €</div>
                    <button 
                        onClick={() => setSelectedProgram(program)}
                        className="bg-krown-bordeaux dark:bg-white text-white dark:text-black px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
                    >
                        Apply Now
                    </button>
                </div>
              </div>
              <div className="lg:w-1/2 w-full h-[500px] rounded-[60px] overflow-hidden relative group">
                {program.image ? (
                  <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                ) : (
                  <div className="w-full h-full bg-krown-bordeaux/5 dark:bg-white/5 flex items-center justify-center text-krown-gold opacity-10">
                    <Users className="w-40 h-40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-krown-bordeaux/20 dark:bg-black/40 mix-blend-overlay"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProgram && (
          <MentorshipModal program={selectedProgram} onClose={() => setSelectedProgram(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ValueCard({ icon, title, desc, variants }) {
  return (
    <motion.div variants={variants} className="p-12 bg-white dark:bg-[#120808] rounded-[50px] border border-gray-50 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 text-center">
      <div className="w-16 h-16 bg-krown-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-8 text-krown-gold">
        {icon}
      </div>
      <h3 className="text-2xl font-black text-krown-bordeaux dark:text-white mb-4 transition-colors tracking-tight">{title}</h3>
      <p className="text-krown-sage dark:text-gray-400 font-medium leading-relaxed transition-colors text-sm">{desc}</p>
    </motion.div>
  );
}

function MentorshipModal({ program, onClose }) {
  const [motivation, setMotivation] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { showNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('mentorship/apply/', { program: program.id, motivation: motivation });
      setSuccess(true);
      showNotification("Candidature envoyée avec succès !");
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      showNotification("Une erreur est survenue.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-krown-bordeaux/40 backdrop-blur-md">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white dark:bg-[#120808] w-full max-w-xl rounded-[50px] shadow-3xl overflow-hidden transition-colors border dark:border-white/5">
        <div className="p-12">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="text-3xl font-black text-krown-bordeaux dark:text-white tracking-tight leading-none">Admission</h3>
              <p className="text-krown-gold font-bold text-xs uppercase tracking-widest mt-2">{program.title}</p>
            </div>
            <button onClick={onClose} className="p-3 bg-gray-50 dark:bg-white/5 rounded-full transition-colors"><X className="h-6 w-6 text-gray-400" /></button>
          </div>
          {success ? (
            <div className="text-center py-10">
               <div className="w-24 h-24 bg-green-50 dark:bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8"><CheckCircle className="h-12 w-12" /></div>
               <h4 className="text-3xl font-black text-krown-bordeaux dark:text-white mb-4">Application Received</h4>
               <p className="text-krown-sage dark:text-gray-400 font-medium">Nous reviendrons vers vous sous peu.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <textarea required rows="6" className="w-full p-8 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[40px] focus:ring-2 focus:ring-krown-gold outline-none transition-all font-medium resize-none text-krown-bordeaux dark:text-white" placeholder="Pourquoi KROWN ? Pourquoi maintenant ?" value={motivation} onChange={(e) => setMotivation(e.target.value)}></textarea>
              <button type="submit" disabled={loading} className="w-full py-6 bg-krown-bordeaux dark:bg-krown-gold text-white rounded-3xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Send className="h-5 w-5" />}
                Submit Application
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
