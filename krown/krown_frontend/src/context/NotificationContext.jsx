import { createContext, useState, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((message, type = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications((prev) => [...prev, { id, message, type }]);
    
    // Auto-suppression après 4 secondes
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  }, []);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="fixed bottom-8 right-8 z-[200] flex flex-col gap-4 w-full max-w-sm">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className={`p-5 rounded-3xl shadow-2xl flex items-center gap-4 border backdrop-blur-md ${
                n.type === 'success' 
                  ? 'bg-white/90 border-green-100 text-krown-bordeaux' 
                  : n.type === 'error'
                  ? 'bg-red-50/90 border-red-100 text-red-800'
                  : 'bg-krown-cream/90 border-krown-gold/20 text-krown-bordeaux'
              }`}
            >
              <div className={`p-2 rounded-2xl ${
                n.type === 'success' ? 'bg-green-50 text-green-500' : 
                n.type === 'error' ? 'bg-red-100 text-red-500' : 
                'bg-krown-gold/10 text-krown-gold'
              }`}>
                {n.type === 'success' && <CheckCircle className="h-5 w-5" />}
                {n.type === 'error' && <AlertCircle className="h-5 w-5" />}
                {n.type === 'info' && <Info className="h-5 w-5" />}
              </div>
              
              <div className="flex-grow font-bold text-sm leading-tight">
                {n.message}
              </div>

              <button onClick={() => removeNotification(n.id)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <X className="h-4 w-4 text-gray-400" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
