import { useState, useEffect } from 'react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import { Briefcase, Loader2, Clock, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UserRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const response = await api.get('services/my-requests/');
        setRequests(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement de vos demandes");
      } finally {
        setLoading(false);
      }
    };
    fetchMyRequests();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-bold uppercase"><Clock className="h-3 w-3" /> En examen</span>;
      case 'approved': return <span className="flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase"><CheckCircle className="h-3 w-3" /> Approuvé</span>;
      case 'rejected': return <span className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase"><XCircle className="h-3 w-3" /> Refusé</span>;
      default: return <span className="bg-gray-50 text-gray-400 px-3 py-1 rounded-full text-xs font-bold uppercase">{status}</span>;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F7F5]">
      <Sidebar />
      <main className="flex-grow p-8 lg:p-16">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-krown-bordeaux tracking-tight">Mes Demandes</h1>
          <p className="text-krown-sage font-medium">Suivez l'état de vos projets et consultations.</p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 text-krown-gold animate-spin" />
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white p-12 rounded-[40px] text-center border border-gray-100">
            <Briefcase className="h-16 w-16 text-gray-200 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-krown-bordeaux mb-2">Aucune demande en cours</h3>
            <p className="text-gray-400 mb-8">Vous n'avez pas encore sollicité nos services tech ou stratégie.</p>
            <a href="/services" className="inline-block bg-krown-bordeaux text-white px-8 py-3 rounded-xl font-bold shadow-lg">Nos Solutions</a>
          </div>
        ) : (
          <div className="space-y-6">
            {requests.map((request) => (
              <motion.div 
                key={request.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="flex-grow">
                   <div className="flex items-center gap-4 mb-3">
                      {getStatusBadge(request.status)}
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Posté le {new Date(request.created_at).toLocaleDateString()}</span>
                   </div>
                   <h3 className="text-xl font-bold text-krown-bordeaux mb-2">{request.service_details?.title}</h3>
                   <p className="text-krown-sage text-sm italic line-clamp-1">"{request.message}"</p>
                </div>
                
                <div className="flex gap-4">
                   <button className="px-6 py-3 bg-gray-50 text-krown-bordeaux font-bold rounded-xl text-sm hover:bg-gray-100 transition-all">Détails</button>
                   <button className="px-6 py-3 bg-krown-cream text-krown-gold font-bold rounded-xl text-sm border border-krown-gold/20 hover:bg-krown-gold hover:text-white transition-all">Contacter</button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
