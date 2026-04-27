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
  GripVertical
} from 'lucide-react';

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState('services');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: ''
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
      const endpoint = activeTab === 'services' ? 'services/manage/admin-manage/' : 'academy/manage/admin-manage/';
      const response = await api.get(endpoint);
      setData(response.data);
    } catch (error) {
      console.error("Erreur chargement", error);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Gestion des Cours/Services
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet élément ?")) return;
    try {
      const endpoint = activeTab === 'services' ? `services/manage/admin-manage/${id}/` : `academy/manage/admin-manage/${id}/`;
      await api.delete(endpoint);
      fetchData();
    } catch (error) {
      alert("Erreur suppression");
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        description: item.description,
        category: item.category || (activeTab === 'services' ? 'tech' : 'bass'),
        price: item.price || ''
      });
    } else {
      setEditingItem(null);
      setFormData({ 
        title: '', 
        description: '', 
        category: activeTab === 'services' ? 'tech' : 'bass', 
        price: '' 
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = activeTab === 'services' ? 'services/manage/admin-manage/' : 'academy/manage/admin-manage/';
      const dataToSend = { ...formData };
      if (!dataToSend.price) delete dataToSend.price;
      if (editingItem) {
        await api.patch(`${endpoint}${editingItem.id}/`, dataToSend);
      } else {
        await api.post(endpoint, dataToSend);
      }
      setIsModalOpen(false);
      fetchData();
      alert("Enregistrement réussi !");
    } catch (error) {
      alert("Erreur lors de l'enregistrement");
    }
  };

  // Gestion des Leçons
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
      await api.post('academy/manage/admin-lessons/', {
        ...lessonFormData,
        course: selectedCourse.id
      });
      setLessonFormData({ title: '', video_url: '', content: '', order: lessons.length + 1 });
      fetchLessons(selectedCourse.id);
    } catch (error) {
      alert("Erreur ajout leçon");
    }
  };

  const handleDeleteLesson = async (id) => {
    if (!window.confirm("Supprimer cette leçon ?")) return;
    try {
      await api.delete(`academy/manage/admin-lessons/${id}/`);
      fetchLessons(selectedCourse.id);
    } catch (error) {
      alert("Erreur suppression");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F4F3F0]">
      <Sidebar />
      
      <main className="flex-grow p-8 lg:p-16">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h1 className="text-4xl font-black text-krown-bordeaux tracking-tight">Gestion des Contenus</h1>
            <p className="text-krown-sage mt-2 font-medium italic">Créez et modifiez l'offre KROWN.</p>
          </div>
          
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-3 bg-krown-bordeaux text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:bg-krown-gold transition-all"
          >
            <Plus className="h-5 w-5" /> Ajouter un {activeTab === 'services' ? 'Service' : 'Cours'}
          </button>
        </header>

        {/* Onglets */}
        <div className="flex gap-4 mb-12 bg-white p-2 rounded-2xl w-fit shadow-sm border border-gray-100">
           <button onClick={() => setActiveTab('services')} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'services' ? 'bg-krown-bordeaux text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}><Layout className="h-4 w-4" /> Services</button>
           <button onClick={() => setActiveTab('academy')} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'academy' ? 'bg-krown-bordeaux text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}><BookOpen className="h-4 w-4" /> Académie</button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 text-krown-gold animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.map((item) => (
              <motion.div layout key={item.id} className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 group">
                 <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-krown-gold group-hover:bg-krown-gold group-hover:text-white transition-all"><ImageIcon className="h-6 w-6" /></div>
                    <div className="flex gap-2">
                       {activeTab === 'academy' && (
                         <button onClick={() => handleOpenLessonManager(item)} className="p-3 bg-krown-gold/10 text-krown-gold rounded-xl hover:bg-krown-gold hover:text-white transition-all">
                            <PlayCircle className="h-4 w-4" />
                         </button>
                       )}
                       <button onClick={() => handleOpenModal(item)} className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-krown-bordeaux hover:text-white transition-all"><Edit className="h-4 w-4" /></button>
                       <button onClick={() => handleDelete(item.id)} className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 className="h-4 w-4" /></button>
                    </div>
                 </div>
                 <h3 className="text-xl font-bold text-krown-bordeaux mb-2">{item.title}</h3>
                 <p className="text-krown-sage text-sm line-clamp-2 mb-6">{item.description}</p>
                 <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-krown-gold">{item.category}</span>
                    <span className="font-bold text-krown-bordeaux">{item.price ? `${item.price} €` : 'Sur devis'}</span>
                 </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modale d'Édition Cours/Service */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-krown-bordeaux/40 backdrop-blur-md">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-2xl rounded-[50px] shadow-2xl overflow-hidden p-12">
                <div className="flex justify-between items-center mb-10">
                   <h2 className="text-3xl font-black text-krown-bordeaux">{editingItem ? 'Modifier' : 'Nouveau'} {activeTab === 'services' ? 'Service' : 'Cours'}</h2>
                   <button onClick={() => setIsModalOpen(false)}><X className="h-6 w-6 text-gray-400" /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                   <input type="text" required placeholder="Titre" className="w-full p-5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-krown-gold" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                   <textarea required rows="4" placeholder="Description" className="w-full p-5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-krown-gold resize-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                   <button type="submit" className="w-full py-6 bg-krown-bordeaux text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-krown-gold transition-all shadow-xl"><Save className="h-6 w-6" /> Enregistrer</button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modale de Gestion des Leçons */}
        <AnimatePresence>
          {isLessonModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-krown-bordeaux/60 backdrop-blur-md">
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="bg-[#F4F3F0] w-full max-w-4xl h-[80vh] rounded-[50px] shadow-2xl overflow-hidden flex flex-col">
                <div className="p-10 bg-white border-b border-gray-100 flex justify-between items-center">
                   <div>
                      <h2 className="text-2xl font-black text-krown-bordeaux">Programme : {selectedCourse?.title}</h2>
                      <p className="text-krown-gold font-bold text-xs uppercase tracking-widest mt-1">Gestion des Leçons Vidéos</p>
                   </div>
                   <button onClick={() => setIsLessonModalOpen(false)} className="p-3 bg-gray-50 rounded-full"><X className="h-6 w-6" /></button>
                </div>

                <div className="flex-grow overflow-y-auto p-10 flex flex-col lg:flex-row gap-10">
                   {/* Formulaire Nouvelle Leçon */}
                   <div className="lg:w-1/3">
                      <form onSubmit={handleAddLesson} className="bg-white p-8 rounded-[32px] shadow-sm space-y-4 sticky top-0">
                         <h3 className="font-black text-krown-bordeaux uppercase text-xs tracking-widest mb-6">Ajouter une Leçon</h3>
                         <input type="text" placeholder="Titre de la leçon" className="w-full p-4 bg-gray-50 rounded-xl outline-none text-sm" value={lessonFormData.title} onChange={(e) => setLessonFormData({...lessonFormData, title: e.target.value})} required />
                         <input type="url" placeholder="Lien Vidéo (YouTube/Vimeo)" className="w-full p-4 bg-gray-50 rounded-xl outline-none text-sm" value={lessonFormData.video_url} onChange={(e) => setLessonFormData({...lessonFormData, video_url: e.target.value})} />
                         <textarea placeholder="Tablatures / Notes" rows="3" className="w-full p-4 bg-gray-50 rounded-xl outline-none text-sm resize-none" value={lessonFormData.content} onChange={(e) => setLessonFormData({...lessonFormData, content: e.target.value})}></textarea>
                         <button type="submit" className="w-full py-4 bg-krown-gold text-white rounded-xl font-bold text-sm hover:bg-krown-bordeaux transition-all">Ajouter au programme</button>
                      </form>
                   </div>

                   {/* Liste des Leçons */}
                   <div className="lg:w-2/3 space-y-4">
                      {lessons.length === 0 ? (
                        <div className="text-center py-20 bg-white/50 rounded-[32px] border-2 border-dashed border-gray-200 text-gray-400 font-medium italic">Aucune leçon pour le moment.</div>
                      ) : (
                        lessons.map((lesson, idx) => (
                          <div key={lesson.id} className="bg-white p-6 rounded-[24px] shadow-sm flex items-center gap-4 group">
                             <div className="text-gray-200"><GripVertical className="h-5 w-5" /></div>
                             <div className="w-10 h-10 bg-krown-bordeaux/5 rounded-full flex items-center justify-center font-black text-krown-bordeaux text-xs">{idx + 1}</div>
                             <div className="flex-grow">
                                <p className="font-bold text-krown-bordeaux">{lesson.title}</p>
                                <p className="text-[10px] text-krown-sage font-medium truncate max-w-[200px]">{lesson.video_url || 'Pas de vidéo'}</p>
                             </div>
                             <button onClick={() => handleDeleteLesson(lesson.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                          </div>
                        ))
                      )}
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
