import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import FloatingWhatsApp from './components/layout/FloatingWhatsApp'
import { API_URL } from './config'

import Home from './pages/Home'
import About from './pages/About'
import Admin from './pages/Admin'

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    // Only track if it's the first visit of the session and not admin
    if (!isAdmin && !sessionStorage.getItem('od_visit_tracked')) {
      fetch(`${API_URL}/api/analytics/visit`, { method: 'POST' })
        .then(() => sessionStorage.setItem('od_visit_tracked', 'true'))
        .catch(console.error);
    }
  }, [isAdmin]);

  // Global Scroll Listener
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      let attempts = 0;
      const interval = setInterval(() => {
        const element = document.getElementById(id);
        if (element) {
          if (window.lenis) {
            window.lenis.scrollTo(element, { offset: -100, duration: 1.5 });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
          clearInterval(interval);
        }
        attempts++;
        if (attempts > 50) clearInterval(interval); // Timeout after 5 seconds
      }, 100);
      return () => clearInterval(interval);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.hash]);

  return (
    <main className="bg-[#080808] min-h-screen text-white overflow-x-hidden">
      {!isAdmin && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      
      {!isAdmin && <Footer />}
      {!isAdmin && <FloatingWhatsApp />}
    </main>
  )
}

export default App
