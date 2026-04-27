import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, Globe } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Consultation Stratégique',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simuler un envoi d'API (nous pourrons créer l'endpoint plus tard)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: 'Consultation Stratégique', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Infos de Contact */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div>
              <h1 className="text-5xl md:text-7xl font-black text-krown-bordeaux tracking-tighter mb-8 leading-none">
                Parlons de votre <span className="text-krown-gold">Prochaine Ascension.</span>
              </h1>
              <p className="text-xl text-krown-sage font-medium max-w-md leading-relaxed">
                Prêt à transformer votre vision en réalité ? Notre équipe d'experts est à votre disposition pour une consultation sur mesure.
              </p>
            </div>

            <div className="space-y-8">
              <ContactInfoItem 
                icon={<Mail className="h-6 w-6 text-krown-gold" />} 
                title="Email" 
                detail="contact@krown-ecosystem.com" 
              />
              <ContactInfoItem 
                icon={<Phone className="h-6 w-6 text-krown-gold" />} 
                title="Téléphone" 
                detail="+243 820 000 000" 
              />
              <ContactInfoItem 
                icon={<MapPin className="h-6 w-6 text-krown-gold" />} 
                title="Siège Stratégique" 
                detail="Kinshasa, Gombe - Immeuble KROWN" 
              />
              <ContactInfoItem 
                icon={<Globe className="h-6 w-6 text-krown-gold" />} 
                title="Présence" 
                detail="International & Digital" 
              />
            </div>
          </motion.div>

          {/* Formulaire de Contact */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-krown-cream rounded-[60px] p-12 shadow-sm border border-krown-bordeaux/5"
          >
            {success ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <h2 className="text-3xl font-black text-krown-bordeaux mb-4">Message Reçu.</h2>
                <p className="text-krown-sage font-medium">Un conseiller KROWN vous contactera sous 24 heures ouvrées.</p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="mt-10 text-krown-gold font-black uppercase tracking-widest text-xs hover:underline"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-krown-gold ml-2">Nom Complet</label>
                    <input
                      type="text"
                      required
                      className="w-full p-5 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-krown-gold outline-none transition-all font-medium"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-krown-gold ml-2">Email Professionnel</label>
                    <input
                      type="email"
                      required
                      className="w-full p-5 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-krown-gold outline-none transition-all font-medium"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-krown-gold ml-2">Sujet</label>
                  <select
                    className="w-full p-5 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-krown-gold outline-none transition-all font-bold text-krown-bordeaux appearance-none"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  >
                    <option>Consultation Stratégique</option>
                    <option>Projet Solutions Numériques</option>
                    <option>Inscription Bass Academy</option>
                    <option>Opportunité Immobilière</option>
                    <option>Autre Demande</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-krown-gold ml-2">Votre Message</label>
                  <textarea
                    required
                    rows="5"
                    className="w-full p-5 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-krown-gold outline-none transition-all font-medium resize-none"
                    placeholder="Comment pouvons-hui vous accompagner ?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 bg-krown-bordeaux text-white rounded-2xl font-black text-lg shadow-xl hover:bg-krown-gold transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Send className="h-5 w-5" />}
                  Envoyer ma demande
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ContactInfoItem({ icon, title, detail }) {
  return (
    <div className="flex items-start gap-6 group">
      <div className="p-4 bg-krown-cream rounded-2xl group-hover:bg-krown-gold/10 transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-krown-gold mb-1">{title}</h4>
        <p className="text-lg font-bold text-krown-bordeaux">{detail}</p>
      </div>
    </div>
  );
}
