import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { Users, Target, Rocket, Award, CheckCircle, Loader2, ArrowRight, X, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export default function Mentorship() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const { user } = useAuth();

  const fetchPrograms = useCallback(async () => {
    try {
      const response = await api.get('mentorship/');
      setPrograms(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des programmes:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  return (
    <div className="bg-krown-cream pt-40 pb-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Mentorat */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-krown-bordeaux/5 text-krown-bordeaux text-xs font-black uppercase tracking-widest mb-8"
          >
            <Users className="h-4 w-4" /> Accompagnement Stratégique
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-krown-bordeaux tracking-tighter mb-8 leading-none"
          >
            Devenez le <span className="text-krown-gold">Leader</span> <br /> que vous devez être.
          </motion.h1>
          <p className="text-xl text-krown-sage font-medium max-w-3xl mx-auto leading-relaxed">
            Le programme de mentorat KROWN n'est pas une simple formation. C'est une immersion stratégique conçue pour propulser votre vision au niveau supérieur.
          </p>
        </div>

        {/* Valeurs Mentorat */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          <ValueCard 
            icon={<Target className="text-krown-gold" />} 
            title="Vision Claire" 
            desc="Définissez des objectifs ambitieux et tracez la route pour les atteindre." 
          />
          <ValueCard 
            icon={<Rocket className="text-krown-gold" />} 
            title="Exécution Rapide" 
            desc="Passez de l'idée à l'action avec des méthodes de travail éprouvées." 
          />
          <ValueCard 
            icon={<Award className="text-krown-gold" />} 
            title="Leadership" 
            desc="Maîtrisez l'art d'influencer et de fédérer vos équipes autour de votre projet." 
          />
        </div>

        {/* Liste des Programmes */}
        <h2 className="text-3xl font-black text-krown-bordeaux mb-12 text-center uppercase tracking-widest">Nos Programmes</h2>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 text-krown-gold animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {programs.map((program) => (
              <motion.div
                key={program.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-10 group transition-all hover:shadow-2xl"
              >
                <div className="md:w-1/2">
                   <div className="text-[10px] font-black text-krown-gold uppercase tracking-[0.3em] mb-4">Durée : {program.duration}</div>
                   <h3 className="text-3xl font-black text-krown-bordeaux mb-6 group-hover:text-krown-gold transition-colors">{program.title}</h3>
                   <p className="text-krown-sage font-medium mb-8 leading-relaxed">
                     {program.description}
                   </p>
                   <div className="text-2xl font-black text-krown-bordeaux mb-8">{program.price} € <span className="text-sm font-medium text-gray-400">/ programme</span></div>
                   <button 
                    onClick={() => setSelectedProgram(program)}
                    className="flex items-center gap-3 bg-krown-bordeaux text-white px-8 py-4 rounded-2xl font-bold hover:bg-krown-gold transition-all"
                   >
                     Postuler au programme <ArrowRight className="h-4 w-4" />
                   </button>
                </div>
                <div className="md:w-1/2 h-64 md:h-auto rounded-[30px] overflow-hidden bg-gray-50 relative">
                   {program.image ? (
                     <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-krown-gold opacity-10">
                        <Users className="w-32 h-32" />
                     </div>
                   )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modale de Candidature */}
      <AnimatePresence>
        {selectedProgram && (
          <MentorshipModal 
            program={selectedProgram} 
            onClose={() => setSelectedProgram(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ValueCard({ icon, title, desc }) {
  return (
    <div className="text-center p-8">
      <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6 text-2xl">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-krown-bordeaux mb-4">{title}</h3>
      <p className="text-krown-sage text-sm font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function MentorshipModal({ program, onClose }) {
  const { showNotification } = useNotification();
  const [motivation, setMotivation] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('mentorship/apply/', {
        program: program.id,
        motivation: motivation
      });
      setSuccess(true);
      showNotification("Candidature envoyée avec succès !");
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      const errorMsg = error.response?.data?.detail || "Une erreur est survenue. Assurez-vous d'être connecté.";
      showNotification(errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-krown-bordeaux/40 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden"
      >
        <div className="p-12">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="text-3xl font-black text-krown-bordeaux tracking-tight">Candidature</h3>
              <p className="text-krown-gold font-bold text-sm uppercase tracking-widest mt-1">{program.title}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          {success ? (
            <div className="text-center py-10">
               <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10" />
               </div>
               <h4 className="text-2xl font-bold text-krown-bordeaux mb-2">Candidature Reçue</h4>
               <p className="text-krown-sage font-medium">Nous analyserons votre profil avec la plus grande attention.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-krown-gold mb-4 ml-2">Pourquoi souhaitez-vous rejoindre ce programme ?</label>
                <textarea
                  required
                  rows="6"
                  className="w-full p-8 bg-gray-50 border border-gray-100 rounded-[30px] focus:ring-2 focus:ring-krown-gold outline-none transition-all font-medium resize-none text-krown-bordeaux"
                  placeholder="Décrivez vos ambitions et ce que vous attendez du mentorat KROWN..."
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-6 bg-krown-bordeaux text-white rounded-2xl font-black text-lg shadow-xl hover:bg-krown-gold transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Send className="h-5 w-5" />}
                Envoyer mon dossier
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
