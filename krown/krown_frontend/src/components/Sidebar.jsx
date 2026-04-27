import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  LogOut, 
  User, 
  Briefcase
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { name: 'Vue d\'ensemble', path: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" />, roles: ['admin', 'client', 'student', 'partner'] },
    { name: 'Mes Formations', path: '/dashboard/courses', icon: <BookOpen className="h-5 w-5" />, roles: ['student', 'admin'] },
    { name: 'Mes Demandes', path: '/dashboard/requests', icon: <Briefcase className="h-5 w-5" />, roles: ['client', 'admin'] },
    { name: 'Profil', path: '/dashboard/profile', icon: <User className="h-5 w-5" />, roles: ['admin', 'client', 'student', 'partner'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(user?.role));

  return (
    <div className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
      <div className="p-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-krown-bordeaux rounded-lg flex items-center justify-center text-white font-black">K</div>
          <span className="font-black text-xl text-krown-bordeaux tracking-tighter uppercase">Dashboard</span>
        </Link>
      </div>

      <nav className="flex-grow px-4 space-y-2">
        {filteredMenu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              location.pathname === item.path 
              ? 'bg-krown-bordeaux text-white shadow-lg shadow-red-900/10' 
              : 'text-gray-500 hover:bg-gray-50 hover:text-krown-bordeaux'
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-medium text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut className="h-5 w-5" />
          Déconnexion
        </button>
      </div>
    </div>
  );
}
