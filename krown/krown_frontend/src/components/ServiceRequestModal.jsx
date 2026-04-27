import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, CheckCircle } from 'lucide-react';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';

export default function ServiceRequestModal({ service, onClose }) {
  const { showNotification } = useNotification();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('services/request/', {
        service: service.id,
        message: message
      });
      setSuccess(true);
      showNotification("Demande envoyée !");
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      const errorMsg = error.response?.data?.detail || "Erreur lors de l'envoi de la demande. Assurez-vous d'être connecté.";
      showNotification(errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-krown-bordeaux/20 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden border border-white"
      >
        <div className="p-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-3xl font-black text-krown-bordeaux tracking-tight">Consultation</h3>
              <p className="text-krown-gold font-bold text-sm uppercase tracking-widest mt-1">{service.title}</p>
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
               <h4 className="text-2xl font-bold text-krown-bordeaux mb-2">Demande Envoyée !</h4>
               <p className="text-krown-sage font-medium">Un conseiller KROWN reviendra vers vous très prochainement.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-krown-gold mb-3 ml-2">Décrivez votre besoin</label>
                <textarea
                  required
                  rows="5"
                  className="w-full p-6 bg-gray-50 border border-gray-100 rounded-3xl focus:ring-2 focus:ring-krown-gold outline-none transition-all font-medium resize-none"
                  placeholder="Expliquez brièvement votre projet ou vos objectifs..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-krown-bordeaux text-white rounded-2xl font-black text-lg shadow-xl hover:bg-krown-bordeaux-light transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Send className="h-5 w-5" />}
                Envoyer ma demande
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
