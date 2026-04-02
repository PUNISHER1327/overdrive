import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Sports', href: '/#sports' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#1F1F1F] py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-bebas text-3xl tracking-wider text-primary">
          OVERDRIVE ARENA
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors ${
                location.pathname === link.href ? 'text-primary' : 'text-white hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="https://hudle.in/venues/overdrive-arena/883625"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-black font-bebas px-6 py-2 rounded-full text-lg tracking-widest hover:bg-black hover:text-primary border border-primary transition-all duration-300"
          >
            BOOK A SLOT
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#080808] z-[60] flex flex-col items-center justify-center space-y-8"
          >
            <button className="absolute top-6 right-6 text-white" onClick={() => setIsMenuOpen(false)}>
              <X size={32} />
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="font-bebas text-5xl text-white hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://hudle.in/venues/overdrive-arena/883625"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-black font-bebas px-10 py-4 rounded-full text-2xl tracking-widest mt-6"
              onClick={() => setIsMenuOpen(false)}
            >
              BOOK A SLOT
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
