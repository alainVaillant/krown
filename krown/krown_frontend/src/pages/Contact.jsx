import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, Globe, Zap } from 'lucide-react';

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
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: 'Consultation Stratégique', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-[#0A0505] min-h-screen pt-48 pb-32 transition-colors duration-700 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-krown-gold/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Infos de Contact - Style Elite */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-16"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 text-krown-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-8"
              >
                <Zap className="h-3 w-3 fill-current" />
                Concierge Service
              </motion.div>
              <h1 className="text-6xl md:text-8xl font-black text-krown-bordeaux dark:text-white tracking-tighter mb-10 leading-none transition-colors">
                Connect with <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-krown-gold to-krown-gold-light">the Future.</span>
              </h1>
              <p className="text-xl text-krown-sage dark:text-gray-400 font-medium max-w-md leading-relaxed transition-colors">
                Nos conseillers sont à votre disposition pour orchestrer votre prochaine étape stratégique.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <ContactInfoItem icon={<Mail className="h-6 w-6 text-krown-gold" />} title="Email" detail="contact@krown-ecosystem.com" />
              <ContactInfoItem icon={<Phone className="h-6 w-6 text-krown-gold" />} title="Phone" detail="+243 820 000 000" />
              <ContactInfoItem icon={<MapPin className="h-6 w-6 text-krown-gold" />} title="Headquarters" detail="Kinshasa, Gombe" />
              <ContactInfoItem icon={<Globe className="h-6 w-6 text-krown-gold" />} title="Presence" detail="Global Digital" />
            </div>
          </motion.div>

          {/* Formulaire - Glassmorphism Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-krown-cream dark:bg-[#120808] rounded-[60px] p-12 lg:p-16 shadow-3xl border border-white dark:border-white/5 transition-colors relative"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-krown-gold/10 rounded-full blur-3xl"></div>
            
            {success ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-green-50 dark:bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-green-500/10">
                  <CheckCircle className="h-12 w-12" />
                </motion.div>
                <h2 className="text-4xl font-black text-krown-bordeaux dark:text-white mb-4">Transmission Successful.</h2>
                <p className="text-krown-sage dark:text-gray-400 font-medium">Un expert KROWN prendra contact avec vous prochainement.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-krown-gold ml-2">Full Name</label>
                    <input type="text" required className="w-full p-6 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl focus:ring-2 focus:ring-krown-gold outline-none transition-all font-medium dark:text-white" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-krown-gold ml-2">Pro Email</label>
                    <input type="email" required className="w-full p-6 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl focus:ring-2 focus:ring-krown-gold outline-none transition-all font-medium dark:text-white" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-krown-gold ml-2">Area of Interest</label>
                  <select className="w-full p-6 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl focus:ring-2 focus:ring-krown-gold outline-none transition-all font-bold text-krown-bordeaux dark:text-white appearance-none" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}>
                    <option>Strategic Consultation</option>
                    <option>Digital Solutions</option>
                    <option>Bass Academy Enrollment</option>
                    <option>Real Estate Investment</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-krown-gold ml-2">Brief Message</label>
                  <textarea required rows="4" className="w-full p-6 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl focus:ring-2 focus:ring-krown-gold outline-none transition-all font-medium resize-none dark:text-white" placeholder="How can we elevate your vision?" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
                </div>

                <button type="submit" disabled={loading} className="w-full py-7 bg-krown-bordeaux dark:bg-krown-gold text-white rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-3xl hover:scale-[1.02] transition-all flex items-center justify-center gap-4 disabled:opacity-50">
                  {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Send className="h-5 w-5" />}
                  Initiate Contact
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
    <div className="group">
      <div className="w-14 h-14 bg-krown-cream dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-krown-gold/20 transition-colors">
        {icon}
      </div>
      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-krown-gold mb-2">{title}</h4>
      <p className="text-lg font-bold text-krown-bordeaux dark:text-white transition-colors leading-tight">{detail}</p>
    </div>
  );
}
