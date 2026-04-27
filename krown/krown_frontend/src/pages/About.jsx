import { motion } from 'framer-motion';
import { Target, Eye, Shield, Users, Crown, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="bg-white dark:bg-[#0A0505] transition-colors duration-700 overflow-hidden">
      
      {/* Hero À Propos - Impact Maximal */}
      <section className="relative pt-64 pb-40 bg-krown-bordeaux dark:bg-[#120808] text-white overflow-hidden transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-white/10 text-krown-gold text-[10px] font-black tracking-[0.4em] uppercase mb-8 border border-white/10">
              The Genesis of Excellence
            </span>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-12 leading-[0.85]">
              Redefining <br /> <span className="text-krown-gold">Standards.</span>
            </h1>
            <p className="text-2xl text-red-100/60 max-w-3xl mx-auto leading-relaxed font-medium">
              KROWN n'est pas seulement une entreprise. C'est un mouvement vers l'excellence, 
              né d'une volonté de fusionner stratégie, technologie et talent.
            </p>
          </motion.div>
        </div>
        
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-full h-full opacity-20">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-krown-gold rounded-full blur-[180px]"></div>
        </div>
      </section>

      {/* Vision & Mission - Design Asymétrique */}
      <section className="py-40 bg-krown-cream dark:bg-[#0A0505] transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-40">
            {/* Vision */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col lg:flex-row items-center gap-20"
            >
              <div className="lg:w-1/2">
                <div className="w-20 h-20 bg-krown-gold/10 rounded-[30px] flex items-center justify-center mb-10">
                  <Eye className="h-10 w-10 text-krown-gold" />
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-krown-bordeaux dark:text-white tracking-tighter mb-8 leading-none transition-colors">Global <br /> Vision.</h2>
                <p className="text-xl text-krown-sage dark:text-gray-400 leading-relaxed font-medium transition-colors">
                  Nous projetons un futur où chaque entreprise et chaque talent possède les outils technologiques et stratégiques pour dominer son marché. 
                  KROWN est l'architecte de cette transformation.
                </p>
              </div>
              <div className="lg:w-1/2 w-full h-[400px] bg-krown-gold/5 rounded-[60px] relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-br from-krown-gold/20 to-transparent"></div>
                 <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 text-krown-gold opacity-10 group-hover:scale-110 transition-transform duration-1000" />
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col lg:flex-row-reverse items-center gap-20"
            >
              <div className="lg:w-1/2">
                <div className="w-20 h-20 bg-krown-bordeaux/5 dark:bg-white/5 rounded-[30px] flex items-center justify-center mb-10 transition-colors">
                  <Target className="h-10 w-10 text-krown-bordeaux dark:text-krown-gold" />
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-krown-bordeaux dark:text-white tracking-tighter mb-8 leading-none transition-colors">Elite <br /> Mission.</h2>
                <p className="text-xl text-krown-sage dark:text-gray-400 leading-relaxed font-medium transition-colors">
                  Notre mission est de délivrer une expertise de haute précision. 
                  À travers le mentorat, l'académie et nos solutions numériques, nous créons de la valeur tangible et mesurable.
                </p>
              </div>
              <div className="lg:w-1/2 w-full h-[400px] bg-krown-bordeaux/5 dark:bg-white/5 rounded-[60px] relative overflow-hidden group transition-colors">
                 <div className="absolute inset-0 bg-gradient-to-br from-krown-bordeaux/10 to-transparent"></div>
                 <Crown className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 text-krown-bordeaux dark:text-white opacity-10 group-hover:scale-110 transition-transform duration-1000" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valeurs - Bento Style */}
      <section className="py-40 dark:bg-[#0A0505] transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-black text-krown-bordeaux dark:text-white tracking-tight mb-4 transition-colors">Our Values.</h2>
          <div className="w-32 h-2 bg-krown-gold mx-auto rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <ValueAboutCard icon={<Crown className="h-12 w-12 text-krown-gold" />} title="Prestige" desc="Chaque détail compte. Nous visons l'excellence absolue." />
          <ValueAboutCard icon={<Shield className="h-12 w-12 text-krown-gold" />} title="Confiance" desc="Votre succès est notre unique indicateur de performance." />
          <ValueAboutCard icon={<Users className="h-12 w-12 text-krown-gold" />} title="Impact" desc="Des solutions qui changent la donne, réellement." />
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-40 bg-krown-cream dark:bg-[#0A0505] transition-colors duration-700 px-4">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="max-w-6xl mx-auto bg-krown-bordeaux dark:bg-[#120808] rounded-[80px] p-20 lg:p-32 text-center text-white relative overflow-hidden shadow-3xl transition-colors border dark:border-white/5"
        >
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter leading-none">Ready for the <br /> <span className="text-krown-gold font-display italic">Next Level?</span></h2>
            <Link to="/register" className="inline-flex items-center gap-4 bg-krown-gold text-white px-12 py-6 rounded-3xl text-xl font-black hover:bg-white hover:text-krown-bordeaux transition-all shadow-2xl shadow-black/20 uppercase tracking-widest text-xs">
              Start the Journey <ArrowRight className="h-6 w-6" />
            </Link>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-krown-gold/10 to-transparent pointer-events-none"></div>
        </motion.div>
      </section>
    </div>
  );
}

function ValueAboutCard({ icon, title, desc }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="p-16 bg-white dark:bg-[#120808] rounded-[60px] border border-gray-50 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 group"
    >
      <div className="mb-10 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-3xl font-black text-krown-bordeaux dark:text-white mb-6 transition-colors tracking-tight">{title}</h3>
      <p className="text-krown-sage dark:text-gray-400 leading-relaxed font-medium transition-colors">{desc}</p>
    </motion.div>
  );
}
