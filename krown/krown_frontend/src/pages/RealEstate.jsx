import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { MapPin, Home, CheckCircle, MessageSquare, Loader2 } from 'lucide-react';

export default function RealEstate() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = useCallback(async () => {
    try {
      const response = await api.get('real-estate/');
      setProperties(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des propriétés:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-krown-bordeaux mb-4">Pôle Immobilier</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos offres immobilières exclusives pour vos projets résidentiels ou commerciaux.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 text-krown-gold animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {properties.map((property) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col lg:flex-row"
              >
                <div className="lg:w-2/5 h-64 lg:h-auto bg-gray-200 relative">
                  {property.image ? (
                    <img 
                      src={property.image} 
                      alt={property.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-krown-sage bg-opacity-10 text-krown-sage">
                      <Home className="h-12 w-12" />
                    </div>
                  )}
                  {property.is_available && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> Disponible
                    </div>
                  )}
                </div>

                <div className="lg:w-3/5 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-krown-bordeaux">{property.title}</h3>
                      <span className="text-xl font-black text-krown-gold">{property.price} €</span>
                    </div>
                    <p className="text-gray-400 flex items-center gap-1 text-sm mb-4">
                      <MapPin className="h-4 w-4" /> {property.location}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                      {property.description}
                    </p>
                  </div>
                  
                  <button className="flex items-center justify-center gap-2 w-full py-4 bg-krown-bordeaux text-white font-bold rounded-2xl hover:bg-opacity-90 transition-all">
                    <MessageSquare className="h-5 w-5" /> Contacter un conseiller
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
