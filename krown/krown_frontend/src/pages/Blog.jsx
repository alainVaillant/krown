import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { Calendar, User, ArrowRight, Loader2, BookOpen } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await api.get('blog/');
      setPosts(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des articles:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-krown-gold bg-opacity-10 text-krown-gold text-sm font-bold mb-6"
          >
            <BookOpen className="h-4 w-4" /> ACTUALITÉS KROWN
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-krown-bordeaux tracking-tighter mb-6">
            L'actualité du <span className="text-krown-gold">Leadership</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Découvrez nos analyses, conseils stratégiques et les dernières nouvelles de l'écosystème KROWN.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 text-krown-gold animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative h-64 mb-6 overflow-hidden rounded-3xl">
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-krown-sage opacity-40">
                      <BookOpen className="h-16 w-16" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-krown-bordeaux opacity-0 group-hover:opacity-40 transition-opacity"></div>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold text-krown-gold uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(post.created_at).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author_name}</span>
                </div>

                <h3 className="text-2xl font-bold text-krown-bordeaux mb-4 group-hover:text-krown-gold transition-colors leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-gray-500 line-clamp-3 mb-6 leading-relaxed">
                  {post.content}
                </p>

                <div className="flex items-center gap-2 text-krown-bordeaux font-bold group-hover:gap-4 transition-all">
                  Lire l'article <ArrowRight className="h-4 w-4" />
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
