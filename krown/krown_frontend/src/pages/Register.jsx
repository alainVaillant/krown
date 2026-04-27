import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, ArrowRight, AlertCircle, Briefcase } from 'lucide-react';
import api from '../services/api';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    role: 'client'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('accounts/register/', formData);
      console.log("Inscription réussie:", response.data);
      alert("Compte créé avec succès ! Connectez-vous.");
      navigate('/login');
    } catch (err) {
      console.error("Erreur d'inscription détaillée:", err.response?.data || err.message);
      const errorMsg = err.response?.data 
        ? Object.values(err.response.data).flat().join(' ')
        : "Impossible de contacter le serveur. Vérifiez que le backend est lancé.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-krown-cream pt-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-[40px] shadow-2xl p-12 border border-gray-100"
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-krown-bordeaux tracking-tight">Rejoindre KROWN</h2>
          <p className="text-krown-sage mt-2 font-medium">Commencez votre ascension stratégique dès aujourd'hui.</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center gap-3 rounded-xl">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm font-bold">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-krown-gold ml-2">Nom d'utilisateur</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
              <input
                type="text"
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-krown-gold outline-none transition-all font-medium"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-krown-gold ml-2">Adresse Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
              <input
                type="email"
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-krown-gold outline-none transition-all font-medium"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-krown-gold ml-2">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
              <input
                type="password"
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-krown-gold outline-none transition-all font-medium"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-krown-gold ml-2">Téléphone</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-krown-gold outline-none transition-all font-medium"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+243..."
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-krown-gold ml-2">Je suis un...</label>
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
              <select
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-krown-gold outline-none transition-all font-bold text-krown-bordeaux appearance-none"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="client">Client (Entreprise / Entrepreneur)</option>
                <option value="student">Étudiant (Formation)</option>
                <option value="partner">Partenaire Stratégique</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-krown-bordeaux text-white rounded-2xl font-black text-lg shadow-xl hover:bg-krown-bordeaux-light transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? 'Création en cours...' : 'Créer mon compte'}
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </form>

        <p className="text-center mt-10 text-krown-sage font-medium">
          Déjà membre ? <Link to="/login" className="text-krown-gold font-black hover:underline ml-1">Se connecter</Link>
        </p>
      </motion.div>
    </div>
  );
}
