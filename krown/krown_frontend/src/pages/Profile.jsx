import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import api from '../services/api';
import { Mail, Phone, ShieldCheck, Save, Loader2 } from 'lucide-react';

export default function Profile() {
  const { user, fetchProfile } = useAuth();
  const [formData, setFormData] = useState({
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      await api.patch('accounts/profile/', formData);
      await fetchProfile(); // Rafraîchir les données globales
      setMessage({ type: 'success', text: 'Profil mis à jour avec succès !' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Une erreur est survenue lors de la mise à jour.' });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-grow p-8 lg:p-12">
        <header className="mb-12">
          <h1 className="text-3xl font-black text-krown-bordeaux tracking-tight">Mon Profil</h1>
          <p className="text-gray-500">Gérez vos informations personnelles et votre sécurité.</p>
        </header>

        <div className="max-w-2xl bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-krown-bordeaux p-8 text-white flex items-center gap-6">
            <div className="w-20 h-20 bg-krown-gold rounded-full flex items-center justify-center text-3xl font-black border-4 border-white/20 shadow-xl">
              {user.username[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.username}</h2>
              <p className="text-red-100 opacity-80 capitalize">{user.role}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {message.text && (
              <div className={`p-4 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {message.text}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-krown-gold outline-none"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Téléphone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-krown-gold outline-none"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+243..."
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                Compte vérifié
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-krown-bordeaux text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-opacity-90 shadow-lg disabled:opacity-50 transition-all"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
