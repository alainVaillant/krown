import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import { 
  Search, 
  Edit, 
  Trash2, 
  Loader2
} from 'lucide-react';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = useCallback(async () => {
    try {
      const response = await api.get('accounts/admin/users/');
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.patch(`accounts/admin/users/${userId}/`, { role: newRole });
      fetchUsers();
      alert("Rôle mis à jour !");
    } catch (error) {
      alert("Erreur lors de la mise à jour", error);
    }
  };

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F4F3F0]">
      <Sidebar />
      
      <main className="flex-grow p-8 lg:p-16">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h1 className="text-4xl font-black text-krown-bordeaux tracking-tight">Gestion des Membres</h1>
            <p className="text-krown-sage mt-2 font-medium italic">Pilotez la communauté KROWN.</p>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Rechercher un membre (nom, email)..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-krown-gold outline-none font-medium transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 text-krown-gold animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50">
                  <tr className="text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-50">
                    <th className="px-8 py-6">Membre</th>
                    <th className="px-8 py-6">Rôle Actuel</th>
                    <th className="px-8 py-6">Date d'inscription</th>
                    <th className="px-8 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredUsers.map((u) => (
                    <motion.tr 
                      layout
                      key={u.id} 
                      className="group hover:bg-krown-cream/30 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-krown-bordeaux/5 rounded-full flex items-center justify-center text-krown-bordeaux font-bold">
                              {u.username[0].toUpperCase()}
                           </div>
                           <div>
                              <p className="font-bold text-krown-bordeaux">{u.username}</p>
                              <p className="text-xs text-krown-sage">{u.email}</p>
                           </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <select 
                          className="bg-gray-50 border-none rounded-lg text-xs font-black uppercase tracking-widest text-krown-gold px-3 py-2 outline-none cursor-pointer hover:bg-white transition-all shadow-sm"
                          value={u.role}
                          onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        >
                          <option value="admin">Admin</option>
                          <option value="client">Client</option>
                          <option value="student">Étudiant</option>
                          <option value="partner">Partenaire</option>
                        </select>
                      </td>
                      <td className="px-8 py-6 text-sm text-gray-400 font-medium">
                        {new Date(u.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                           <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-krown-bordeaux hover:text-white transition-all">
                              <Edit className="h-4 w-4" />
                           </button>
                           <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                              <Trash2 className="h-4 w-4" />
                           </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
