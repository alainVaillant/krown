import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Crown, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 fixed w-full z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Crown className="h-8 w-8 text-krown-gold" />
              <span className="text-2xl font-black text-krown-bordeaux tracking-tighter uppercase">KROWN</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-krown-bordeaux font-bold transition-colors">Accueil</Link>
            <Link to="/about" className="text-gray-600 hover:text-krown-bordeaux font-bold transition-colors">À Propos</Link>
            <Link to="/services" className="text-gray-600 hover:text-krown-bordeaux font-bold transition-colors">Services</Link>
            <Link to="/academy" className="text-gray-600 hover:text-krown-bordeaux font-bold transition-colors">Académie</Link>
            <Link to="/real-estate" className="text-gray-600 hover:text-krown-bordeaux font-bold transition-colors">Immobilier</Link>
            <Link to="/blog" className="text-gray-600 hover:text-krown-bordeaux font-bold transition-colors">Blog</Link>
            <Link to="/contact" className="text-gray-600 hover:text-krown-bordeaux font-bold transition-colors">Contact</Link>
            
            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-gray-100">
                <Link to="/dashboard" className="flex items-center gap-2 text-krown-bordeaux font-bold bg-krown-gold/10 px-4 py-2 rounded-xl">
                  <User className="h-4 w-4" /> Dashboard
                </Link>
                <button onClick={logout} className="text-gray-400 hover:text-red-500 transition-colors">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-krown-bordeaux text-white px-8 py-3 rounded-full font-bold hover:shadow-xl transition-all">Connexion</Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-6 space-y-4 shadow-xl">
          <Link to="/" className="block text-gray-600 font-bold" onClick={() => setIsOpen(false)}>Accueil</Link>
          <Link to="/about" className="block text-gray-600 font-bold" onClick={() => setIsOpen(false)}>À Propos</Link>
          <Link to="/services" className="block text-gray-600 font-bold" onClick={() => setIsOpen(false)}>Services</Link>
          <Link to="/academy" className="block text-gray-600 font-bold" onClick={() => setIsOpen(false)}>Académie</Link>
          <Link to="/real-estate" className="block text-gray-600 font-bold" onClick={() => setIsOpen(false)}>Immobilier</Link>
          <Link to="/blog" className="block text-gray-600 font-bold" onClick={() => setIsOpen(false)}>Blog</Link>
          <Link to="/contact" className="block text-gray-600 font-bold" onClick={() => setIsOpen(false)}>Contact</Link>
          {user ? (
            <Link to="/dashboard" className="block text-krown-bordeaux font-black uppercase" onClick={() => setIsOpen(false)}>Dashboard</Link>
          ) : (
            <Link to="/login" className="block text-krown-bordeaux font-black uppercase" onClick={() => setIsOpen(false)}>Connexion</Link>
          )}
        </div>
      )}
    </nav>
  );
}
