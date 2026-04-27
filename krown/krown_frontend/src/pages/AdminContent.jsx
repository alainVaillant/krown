import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Loader2, 
  Layout, 
  BookOpen,
  X,
  Save,
  Image as ImageIcon,
  PlayCircle,
  GripVertical,
  Home,
  MapPin,
  Users,
  Clock
} from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState('services');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const { showNotification } = useNotification();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    location: '',
    duration: '',
    is_available: true
  });

  const [lessonFormData, setLessonFormData] = useState({
    title: '',
    video_url: '',
    content: '',
    order: 0
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let endpoint = '';
      if (activeTab === 'services') endpoint = 'services/manage/admin-manage/';
      else if (activeTab === 'academy') endpoint = 'academy/manage/admin-manage/';
      else if (activeTab === 'real_estate') endpoint = 'real-estate/manage/admin-manage/';
      else if (activeTab === 'mentorship') endpoint = 'mentorship/manage/admin-manage/';
      
      const response = await api.get(endpoint);
      setData(response.data);
    } catch (error) {
      showNotification("Erreur chargement", "error");
    } finally {
      setLoading(false);
    }
  }, [activeTab, showNotification]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet élément ?")) return;
    try {
      let endpoint = '';
      if (activeTab === 'services') endpoint = `services/manage/admin-manage/${id}/`;
      else if (activeTab === 'academy') endpoint = `academy/manage/admin-manage/${id}/`;
      else if (activeTab === 'real_estate') endpoint = `real-estate/manage/admin-manage/${id}/`;
      else if (activeTab === 'mentorship') endpoint = `mentorship/manage/admin-manage/${id}/`;
      
      await api.delete(endpoint);
      showNotification("Suppression réussie");
      fetchData();
    } catch (error) {
      showNotification("Erreur suppression", "error");
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        description: item.description,
        category: item.category || '',
        price: item.price || '',
        location: item.location || '',
        duration: item.duration || '',
        is_available: item.is_available ?? true
      });
    } else {
      setEditingItem(null);
      setFormData({ title: '', description: '', category: '', price: '', location: '', duration: '', is_available: true });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let endpoint = '';
      if (activeTab === 'services') endpoint = 'services/manage/admin-manage/';
      else if (activeTab === 'academy') endpoint = 'academy/manage/admin-manage/';
      else if (activeTab === 'real_estate') endpoint = 'real-estate/manage/admin-manage/';
      else if (activeTab === 'mentorship') endpoint = 'mentorship/manage/admin-manage/';

      const dataToSend = { ...formData };
      if (!dataToSend.price) delete dataToSend.price;

      if (editingItem) {
        await api.patch(`${endpoint}${editingItem.id}/`, dataToSend);
      } else {
        await api.post(endpoint, dataToSend);
      }
      setIsModalOpen(false);
      showNotification("Succès !");
      fetchData();
    } catch (error) {
      showNotification("Erreur enregistrement", "error");
    }
  };

  const fetchLessons = async (courseId) => {
    try {
      const response = await api.get(`academy/manage/admin-lessons/?course=${courseId}`);
      setLessons(response.data);
    } catch (error) {
      console.error("Erreur leçons");
    }
  };

  const handleOpenLessonManager = (course) => {
    setSelectedCourse(course);
    fetchLessons(course.id);
    setIsLessonModalOpen(true);
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    try {
      await api.post('academy/manage/admin-lessons/', { ...lessonFormData, course: selectedCourse.id });
      setLessonFormData({ title: '', video_url: '', content: '', order: lessons.length + 1 });
      fetchLessons(selectedCourse.id);
    } catch (error) {
      showNotification("Erreur ajout", "error");
    }
  };

  const handleDeleteLesson = async (id) => {
    if (!window.confirm("Supprimer ?")) return;
    try {
      await api.delete(`academy/manage/admin-lessons/${id}/`);
      fetchLessons(selectedCourse.id);
    } catch (error) {
      showNotification("Erreur", "error");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F4F3F0] dark:bg-[#0A0505] transition-colors duration-500">
      <Sidebar />
      <main className="flex-grow p-8 lg:p-16">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h1 className="text-4xl font-black text-krown-bordeaux dark:text-white tracking-tight transition-colors">Gestion des Contenus</h1>
            <p className="text-krown-sage dark:text-gray-400 mt-2 font-medium italic transition-colors">Maîtrisez l'intégralité de l'offre KROWN.</p>
          </div>
          <button onClick={() => handleOpenModal()} className="flex items-center gap-3 bg-krown-bordeaux dark:bg-krown-gold text-white px-8 py-4 rounded-2xl font-bold shadow-xl transition-all"><Plus className="h-5 w-5" /> Ajouter</button>
        </header>

        <div className="flex flex-wrap gap-4 mb-12 bg-white dark:bg-[#120808] p-2 rounded-2xl w-fit shadow-sm border border-gray-100 dark:border-white/5 transition-colors">
           <button onClick={() => setActiveTab('services')} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'services' ? 'bg-krown-bordeaux dark:bg-krown-gold text-white' : 'text-gray-400'}`}><Layout className="h-4 w-4" /> Services</button>
           <button onClick={() => setActiveTab('academy')} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'academy' ? 'bg-krown-bordeaux dark:bg-krown-gold text-white' : 'text-gray-400'}`}><BookOpen className="h-4 w-4" /> Académie</button>
           <button onClick={() => setActiveTab('mentorship')} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'mentorship' ? 'bg-krown-bordeaux dark:bg-krown-gold text-white' : 'text-gray-400'}`}><Users className="h-4 w-4" /> Mentorat</button>
           <button onClick={() => setActiveTab('real_estate')} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'real_estate' ? 'bg-krown-bordeaux dark:bg-krown-gold text-white' : 'text-gray-400'}`}><Home className="h-4 w-4" /> Immobilier</button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 text-krown-gold animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.map((item) => (
              <motion.div layout key={item.id} className="bg-white dark:bg-[#120808] p-8 rounded-[40px] border dark:border-white/5 shadow-sm group">
                 <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-krown-gold group-hover:bg-krown-gold group-hover:text-white transition-all">
                       {activeTab === 'services' ? <Layout className="h-6 w-6" /> : activeTab === 'academy' ? <BookOpen className="h-6 w-6" /> : activeTab === 'mentorship' ? <Users className="h-6 w-6" /> : <Home className="h-6 w-6" />}
                    </div>
                    <div className="flex gap-2">
                       {activeTab === 'academy' && <button onClick={() => handleOpenLessonManager(item)} className="p-3 bg-krown-gold/10 text-krown-gold rounded-xl"><PlayCircle className="h-4 w-4" /></button>}
                       <button onClick={() => handleOpenModal(item)} className="p-3 bg-gray-50 dark:bg-white/5 text-gray-400 rounded-xl hover:bg-krown-bordeaux hover:text-white transition-all"><Edit className="h-4 w-4" /></button>
                       <button onClick={() => handleDelete(item.id)} className="p-3 bg-gray-50 dark:bg-white/5 text-gray-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 className="h-4 w-4" /></button>
                    </div>
                 </div>
                 <h3 className="text-xl font-bold text-krown-bordeaux dark:text-white mb-2">{item.title}</h3>
                 <p className="text-krown-sage dark:text-gray-400 text-sm line-clamp-2 mb-6">{item.description}</p>
                 <div className="flex justify-between items-center pt-6 border-t dark:border-white/5">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-krown-gold">{item.category || item.duration || item.location || 'KROWN'}</span>
                    <span className="font-bold text-krown-bordeaux dark:text-krown-gold">{item.price ? `${item.price} €` : 'N/A'}</span>
                 </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modale d'Édition Universelle */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-krown-bordeaux/40 backdrop-blur-md">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white dark:bg-[#120808] w-full max-w-2xl rounded-[50px] shadow-3xl p-12 transition-colors">
                <div className="flex justify-between items-center mb-10">
                   <h2 className="text-3xl font-black text-krown-bordeaux dark:text-white">Gestion {activeTab}</h2>
                   <button onClick={() => setIsModalOpen(false)}><X className="h-6 w-6 text-gray-400" /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                   <input type="text" required placeholder="Titre" className="w-full p-5 bg-gray-50 dark:bg-white/5 dark:text-white rounded-2xl outline-none" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                   {activeTab === 'mentorship' && <input type="text" placeholder="Durée (ex: 6 mois)" className="w-full p-5 bg-gray-50 dark:bg-white/5 dark:text-white rounded-2xl outline-none" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} />}
                   {activeTab === 'real_estate' && <input type="text" placeholder="Localisation" className="w-full p-5 bg-gray-50 dark:bg-white/5 dark:text-white rounded-2xl outline-none" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />}
                   {activeTab !== 'services' && <input type="number" placeholder="Prix (€)" className="w-full p-5 bg-gray-50 dark:bg-white/5 dark:text-white rounded-2xl outline-none" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />}
                   <textarea required rows="4" placeholder="Description" className="w-full p-5 bg-gray-50 dark:bg-white/5 dark:text-white rounded-2xl outline-none resize-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                   <button type="submit" className="w-full py-6 bg-krown-bordeaux dark:bg-krown-gold text-white rounded-2xl font-black text-lg transition-all shadow-xl hover:scale-[1.02]">Enregistrer</button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modale Leçons */}
        <AnimatePresence>
          {isLessonModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-krown-bordeaux/60 backdrop-blur-md">
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="bg-[#F4F3F0] dark:bg-[#0A0505] w-full max-w-4xl h-[80vh] rounded-[50px] shadow-3xl overflow-hidden flex flex-col transition-colors border dark:border-white/5">
                <div className="p-10 bg-white dark:bg-[#120808] border-b dark:border-white/5 flex justify-between items-center transition-colors">
                   <h2 className="text-2xl font-black text-krown-bordeaux dark:text-white">Leçons : {selectedCourse?.title}</h2>
                   <button onClick={() => setIsLessonModalOpen(false)} className="p-3 bg-gray-50 dark:bg-white/5 rounded-full transition-colors"><X className="h-6 w-6 text-gray-400" /></button>
                </div>
                <div className="flex-grow overflow-y-auto p-10 flex flex-col lg:flex-row gap-10">
                   <div className="lg:w-1/3">
                      <form onSubmit={handleAddLesson} className="bg-white dark:bg-[#120808] p-8 rounded-[32px] space-y-4 sticky top-0 transition-colors border dark:border-white/5 shadow-sm">
                         <input type="text" placeholder="Titre" className="w-full p-4 bg-gray-50 dark:bg-white/5 dark:text-white rounded-xl outline-none text-sm" value={lessonFormData.title} onChange={(e) => setLessonFormData({...lessonFormData, title: e.target.value})} required />
                         <input type="url" placeholder="YouTube URL" className="w-full p-4 bg-gray-50 dark:bg-white/5 dark:text-white rounded-xl outline-none text-sm" value={lessonFormData.video_url} onChange={(e) => setLessonFormData({...lessonFormData, video_url: e.target.value})} />
                         <textarea placeholder="Notes" rows="3" className="w-full p-4 bg-gray-50 dark:bg-white/5 dark:text-white rounded-xl outline-none text-sm resize-none" value={lessonFormData.content} onChange={(e) => setLessonFormData({...lessonFormData, content: e.target.value})}></textarea>
                         <button type="submit" className="w-full py-4 bg-krown-gold text-white rounded-xl font-bold text-xs uppercase transition-all">Ajouter</button>
                      </form>
                   </div>
                   <div className="lg:w-2/3 space-y-4">
                      {lessons.length === 0 ? <div className="text-center py-20 text-gray-400 italic">Aucune leçon.</div> : lessons.map((lesson, idx) => (
                          <div key={lesson.id} className="bg-white dark:bg-[#120808] p-6 rounded-[24px] shadow-sm flex items-center gap-4 transition-colors border dark:border-white/5">
                             <div className="text-gray-200 dark:text-gray-700 font-black text-xl italic">{idx + 1}</div>
                             <div className="flex-grow text-sm font-bold text-krown-bordeaux dark:text-white">{lesson.title}</div>
                             <button onClick={() => handleDeleteLesson(lesson.id)} className="p-2 text-gray-300 hover:text-red-500 transition-all"><Trash2 className="h-4 w-4" /></button>
                          </div>
                      ))}
                   </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
