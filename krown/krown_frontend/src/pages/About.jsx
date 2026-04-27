import { motion } from 'framer-motion';
import { Target, Eye, Shield, Users, Crown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero À Propos */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-krown-bordeaux text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
              L'excellence est une <br /> <span className="text-krown-gold">culture.</span>
            </h1>
            <p className="text-xl text-red-100/70 max-w-2xl mx-auto leading-relaxed">
              KROWN est né d'une ambition simple : centraliser le meilleur de la technologie, 
              du mentorat et de l'éducation pour créer les leaders de demain.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-krown-gold opacity-10 rounded-full blur-[100px] -mr-20 -mt-20"></div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-32 bg-krown-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="w-16 h-16 bg-krown-gold/10 rounded-2xl flex items-center justify-center">
                <Eye className="h-8 w-8 text-krown-gold" />
              </div>
              <h2 className="text-4xl font-black text-krown-bordeaux">Notre Vision</h2>
              <p className="text-lg text-krown-sage leading-relaxed font-medium">
                Créer un écosystème digital premium capable d'accompagner chaque talent et chaque entreprise vers son plein potentiel. 
                Nous voyons un futur où l'accès à l'expertise technologique et stratégique n'est plus un obstacle, mais un moteur de croissance universel.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="w-16 h-16 bg-krown-bordeaux/5 rounded-2xl flex items-center justify-center">
                <Target className="h-8 w-8 text-krown-bordeaux" />
              </div>
              <h2 className="text-4xl font-black text-krown-bordeaux">Notre Mission</h2>
              <p className="text-lg text-krown-sage leading-relaxed font-medium">
                Apporter des solutions concrètes et de haute précision en technologie, formation et stratégie. 
                KROWN s'engage à transformer les défis numériques en opportunités de leadership à travers ses quatre piliers d'excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valeurs Fondamentales */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h2 className="text-5xl font-black text-krown-bordeaux tracking-tight mb-4">Valeurs Fondamentales</h2>
          <div className="w-24 h-2 bg-krown-gold mx-auto rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="p-12 bg-white rounded-[40px] border border-gray-50 shadow-sm hover:shadow-xl transition-all group">
            <Crown className="h-12 w-12 text-krown-gold mb-8 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-krown-bordeaux mb-4">Prestige</h3>
            <p className="text-gray-500 leading-relaxed">Nous visons le plus haut standard de qualité dans chaque ligne de code et chaque conseil stratégique.</p>
          </div>

          <div className="p-12 bg-white rounded-[40px] border border-gray-50 shadow-sm hover:shadow-xl transition-all group">
            <Shield className="h-12 w-12 text-krown-gold mb-8 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-krown-bordeaux mb-4">Confiance</h3>
            <p className="text-gray-500 leading-relaxed">La sécurité de vos données et la fiabilité de nos solutions sont le socle de notre partenariat.</p>
          </div>

          <div className="p-12 bg-white rounded-[40px] border border-gray-50 shadow-sm hover:shadow-xl transition-all group">
            <Users className="h-12 w-12 text-krown-gold mb-8 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-krown-bordeaux mb-4">Impact</h3>
            <p className="text-gray-500 leading-relaxed">Chaque projet KROWN doit générer une valeur mesurable pour votre entreprise ou votre carrière.</p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 bg-krown-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-krown-bordeaux rounded-[60px] p-16 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-8">Prêt à réinventer votre futur ?</h2>
            <p className="text-xl text-red-100/70 mb-12 max-w-2xl mx-auto">Rejoignez l'écosystème KROWN et profitez d'un accompagnement sur mesure.</p>
            <Link to="/register" className="inline-flex items-center gap-3 bg-krown-gold text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-white hover:text-krown-bordeaux transition-all shadow-2xl shadow-black/20">
              Démarrer l'aventure <ArrowRight className="h-6 w-6" />
            </Link>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-krown-gold/20 to-transparent pointer-events-none"></div>
        </div>
      </section>
    </div>
  );
}
