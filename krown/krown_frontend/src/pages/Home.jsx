import { motion } from 'framer-motion';
import { ArrowRight, Rocket, Users, Shield, GraduationCap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-krown-cream">
      {/* Hero Section - Ultra Premium */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-krown-gold/10 text-krown-gold text-sm font-bold tracking-widest uppercase mb-6">
                L'Excellence comme Standard
              </span>
              <h1 className="text-6xl md:text-8xl font-black text-krown-bordeaux tracking-tighter leading-[0.9] mb-8">
                Bâtissons le <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-krown-gold to-krown-gold-light">Futur du Leadership.</span>
              </h1>
              <p className="text-xl text-krown-sage font-medium max-w-2xl mb-12 leading-relaxed">
                KROWN est un écosystème stratégique dédié à l'ascension des entreprises et des talents visionnaires à travers le monde.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/services" className="bg-krown-bordeaux text-white px-10 py-5 rounded-2xl text-lg font-bold hover:shadow-2xl hover:bg-krown-bordeaux-light transition-all flex items-center justify-center gap-3 group">
                  Nos Solutions <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/academy" className="bg-white text-krown-bordeaux border-2 border-krown-bordeaux/10 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-gray-50 transition-all flex items-center justify-center">
                  Bass Academy
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Éléments de design en arrière-plan */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-krown-bordeaux/5 -skew-x-12 translate-x-1/4"></div>
        <div className="absolute top-1/2 right-20 -translate-y-1/2 w-96 h-96 bg-krown-gold/20 rounded-full blur-[120px]"></div>
      </section>

      {/* Section Chiffres / Crédibilité */}
      <section className="py-24 bg-krown-bordeaux text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center">
              <p className="text-5xl font-black text-krown-gold mb-2">100+</p>
              <p className="text-sm font-bold tracking-widest uppercase opacity-60">Projets Tech</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-black text-krown-gold mb-2">500+</p>
              <p className="text-sm font-bold tracking-widest uppercase opacity-60">Talents Formés</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-black text-krown-gold mb-2">15M$</p>
              <p className="text-sm font-bold tracking-widest uppercase opacity-60">Investissements</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-black text-krown-gold mb-2">24/7</p>
              <p className="text-sm font-bold tracking-widest uppercase opacity-60">Support Expert</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Piliers - Design avec Cartes Flottantes */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-krown-bordeaux tracking-tight mb-6">
                Un écosystème conçu pour <span className="text-krown-gold">votre croissance.</span>
              </h2>
              <div className="w-24 h-2 bg-krown-gold rounded-full"></div>
            </div>
            <p className="text-krown-sage text-lg font-medium max-w-sm">
              Nous fusionnons technologie, stratégie et éducation pour créer des leaders de demain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PillarCard 
              title="Solutions Numériques" 
              icon={<Rocket />} 
              desc="Architecture logicielle, applications mobiles et transformation digitale de haute précision."
              color="bordeaux"
            />
            <PillarCard 
              title="Mentorat Stratégique" 
              icon={<Users />} 
              desc="Accompagnement personnalisé pour dirigeants et entrepreneurs en quête d'excellence."
              color="gold"
            />
            <PillarCard 
              title="Pôle Immobilier" 
              icon={<Shield />} 
              desc="Opportunités d'investissement exclusives et gestion d'actifs immobiliers de prestige."
              color="sage"
            />
            <PillarCard 
              title="Bass Academy" 
              icon={<GraduationCap />} 
              desc="Programmes intensifs pour maîtriser les outils créatifs et technologiques du futur."
              color="bordeaux"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function PillarCard({ title, icon, desc, color }) {
  const colors = {
    bordeaux: "bg-krown-bordeaux text-white",
    gold: "bg-krown-gold text-white",
    sage: "bg-krown-sage text-white"
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`p-12 rounded-[40px] shadow-2xl flex flex-col justify-between min-h-[400px] group transition-all ${colors[color]}`}
    >
      <div>
        <div className="mb-8 p-4 bg-white/10 w-fit rounded-2xl backdrop-blur-md">
          {icon}
        </div>
        <h3 className="text-3xl font-bold mb-4">{title}</h3>
        <p className="text-lg opacity-80 leading-relaxed mb-8">{desc}</p>
      </div>
      <button className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm group-hover:gap-4 transition-all">
        En savoir plus <ChevronRight className="h-5 w-5" />
      </button>
    </motion.div>
  );
}
