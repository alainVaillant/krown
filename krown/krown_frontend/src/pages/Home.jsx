import { motion } from 'framer-motion';
import { ArrowRight, Rocket, Users, Shield, GraduationCap, ChevronRight, Star, activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  // Animation variants pour le scroll reveal
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="bg-krown-cream dark:bg-[#0A0505] transition-colors duration-700 overflow-hidden relative">
      
      {/* 1. Abstract Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-krown-bordeaux/5 dark:bg-krown-gold/5 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -70, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-krown-gold/5 dark:bg-krown-gold/10 rounded-full blur-[100px]"
        />
      </div>

      {/* 2. Hero Section - Design Impactant */}
      <section className="relative min-h-screen flex items-center pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:w-2/3"
            >
              <motion.span 
                variants={fadeInUp}
                className="inline-block px-5 py-2 rounded-full bg-krown-gold/10 text-krown-gold text-xs font-black tracking-[0.4em] uppercase mb-8 border border-krown-gold/20"
              >
                Visionary Ecosystem
              </motion.span>
              <motion.h1 
                variants={fadeInUp}
                className="text-6xl md:text-9xl font-black text-krown-bordeaux dark:text-white tracking-tighter leading-[0.85] mb-10 transition-colors"
              >
                The Art of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-krown-gold via-krown-gold-light to-krown-gold">Ascension.</span>
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className="text-xl md:text-2xl text-krown-sage dark:text-gray-400 font-medium max-w-xl mb-12 leading-relaxed"
              >
                KROWN fusionne ingénierie numérique, mentorat de haut vol et immobilier de luxe pour bâtir les empires de demain.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-6">
                <Link to="/services" className="bg-krown-bordeaux dark:bg-krown-gold text-white px-10 py-6 rounded-2xl text-lg font-black hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3 group">
                  Start Your Project <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link to="/academy" className="bg-white/50 dark:bg-white/5 backdrop-blur-md text-krown-bordeaux dark:text-white border border-krown-bordeaux/10 dark:border-white/10 px-10 py-6 rounded-2xl text-lg font-bold hover:bg-white dark:hover:bg-white/10 transition-all">
                  Bass Academy
                </Link>
              </motion.div>
            </motion.div>

            {/* Visual Element (Like Norevex) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="lg:w-1/3 hidden lg:block"
            >
              <div className="relative">
                <div className="w-80 h-[500px] bg-gradient-to-br from-krown-bordeaux to-black rounded-[100px] shadow-2xl relative overflow-hidden p-1 border-4 border-white/10">
                   <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop" alt="Premium Tech" className="w-full h-full object-cover rounded-[96px] opacity-60 grayscale hover:grayscale-0 transition-all duration-1000" />
                   <div className="absolute inset-0 bg-krown-bordeaux/20 mix-blend-overlay"></div>
                </div>
                <div className="absolute -bottom-10 -left-10 bg-white dark:bg-[#120808] p-8 rounded-[40px] shadow-2xl border dark:border-white/5">
                   <Star className="text-krown-gold h-10 w-10 mb-4 fill-current" />
                   <p className="font-black text-2xl dark:text-white leading-none">Top 1%</p>
                   <p className="text-[10px] uppercase font-bold tracking-widest text-krown-gold mt-1">Excellence Score</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Bento Grid Section - Inspiré Norevex */}
      <section className="py-40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-20 text-center lg:text-left"
          >
            <h2 className="text-4xl md:text-6xl font-black text-krown-bordeaux dark:text-white tracking-tight mb-6">
              The <span className="text-krown-gold">Four Pillars</span> of Success.
            </h2>
            <div className="w-32 h-2 bg-krown-gold rounded-full mb-8 mx-auto lg:mx-0"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-8 h-auto lg:h-[800px]">
            {/* Case 1: Big Element (Tech) */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-2 md:row-span-2 bg-krown-bordeaux dark:bg-[#120808] rounded-[60px] p-16 text-white relative overflow-hidden shadow-2xl group transition-all duration-700"
            >
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-10 backdrop-blur-xl border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    <Rocket className="h-10 w-10 text-krown-gold" />
                  </div>
                  <h3 className="text-5xl font-black mb-8 tracking-tighter">Digital <br /> Engineering.</h3>
                  <p className="text-xl text-red-100/60 max-w-md leading-relaxed mb-10">
                    Nous bâtissons des infrastructures logicielles robustes et des applications qui redéfinissent les standards du marché.
                  </p>
                </div>
                <Link to="/services" className="flex items-center gap-4 font-black uppercase tracking-[0.2em] text-xs hover:gap-6 transition-all">
                  Discover Solutions <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="absolute top-1/2 right-0 w-80 h-80 bg-krown-gold opacity-10 rounded-full blur-[100px] pointer-events-none"></div>
            </motion.div>

            {/* Case 2: Mentorship */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-[#120808] rounded-[60px] p-12 border border-gray-100 dark:border-white/5 shadow-xl transition-all duration-500 group"
            >
              <Users className="h-10 w-10 text-krown-gold mb-8" />
              <h3 className="text-3xl font-black text-krown-bordeaux dark:text-white mb-4 tracking-tighter transition-colors">Mentorship.</h3>
              <p className="text-krown-sage dark:text-gray-400 font-medium text-sm leading-relaxed mb-8">
                Accompagnement VIP pour leaders.
              </p>
              <ChevronRight className="text-krown-gold opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            {/* Case 3: Real Estate */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-krown-gold rounded-[60px] p-12 text-white shadow-xl transition-all duration-500 relative overflow-hidden group"
            >
              <div className="relative z-10">
                <Shield className="h-10 w-10 text-white mb-8" />
                <h3 className="text-3xl font-black mb-4 tracking-tighter">Real Estate.</h3>
                <p className="text-white/80 font-medium text-sm leading-relaxed">
                  Actifs de prestige & investissements.
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Academy Preview - Style Minimaliste */}
      <section className="py-40 bg-white dark:bg-[#0A0505] transition-colors">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-50 dark:bg-[#120808] rounded-[80px] p-10 lg:p-24 flex flex-col lg:flex-row items-center gap-20 border dark:border-white/5 transition-colors">
               <div className="lg:w-1/2">
                  <span className="text-[10px] font-black text-krown-gold uppercase tracking-[0.4em] mb-6 block">The Creative Academy</span>
                  <h2 className="text-5xl md:text-7xl font-black text-krown-bordeaux dark:text-white tracking-tighter leading-none mb-10 transition-colors">Bass <br /> Academy.</h2>
                  <p className="text-lg text-krown-sage dark:text-gray-400 mb-12 leading-relaxed">
                    Maîtrisez le groove, la technique et l'accompagnement avec des programmes conçus pour l'excellence musicale.
                  </p>
                  <Link to="/academy" className="inline-flex items-center gap-4 bg-krown-bordeaux dark:bg-krown-gold text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                    Rejoindre l'Académie <ArrowRight className="h-4 w-4" />
                  </Link>
               </div>
               <div className="lg:w-1/2 grid grid-cols-2 gap-6">
                  <div className="space-y-6">
                     <div className="h-64 bg-krown-gold/20 rounded-[40px]"></div>
                     <div className="h-48 bg-krown-bordeaux rounded-[40px]"></div>
                  </div>
                  <div className="space-y-6 pt-12">
                     <div className="h-48 bg-krown-sage rounded-[40px]"></div>
                     <div className="h-64 bg-gray-200 dark:bg-white/5 rounded-[40px]"></div>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
