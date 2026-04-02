import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import FloatingWhatsApp from './components/layout/FloatingWhatsApp'

import Home from './pages/Home'
import About from './pages/About'
import Admin from './pages/Admin'

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <main className="bg-[#080808] min-h-screen text-white overflow-clip">
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
