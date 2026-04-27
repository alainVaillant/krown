import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Services from './pages/Services';
import Academy from './pages/Academy';
import RealEstate from './pages/RealEstate';
import Blog from './pages/Blog';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/services" element={<Services />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/real-estate" element={<RealEstate />} />
            <Route path="/blog" element={<Blog />} />
            
            {/* Routes protégées */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/courses" element={<ProtectedRoute><div className="pt-32 text-center">Mes cours en construction...</div></ProtectedRoute>} />
            <Route path="/dashboard/requests" element={<ProtectedRoute><div className="pt-32 text-center">Mes demandes en construction...</div></ProtectedRoute>} />
          </Routes>
        </main>
        
        <footer className="bg-white border-t border-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-krown-bordeaux font-black text-2xl mb-2 tracking-tighter uppercase">KROWN</p>
            <p className="text-gray-400 text-sm font-medium tracking-wide">© 2026 KROWN. Excellence & Strategic Mentorship.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
