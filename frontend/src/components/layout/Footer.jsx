import { ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0A0A0A] px-2 md:px-4 pb-2 md:pb-4 pt-10">
       <footer className="bg-primary rounded-t-[40px] md:rounded-t-[80px] pt-20 md:pt-32 pb-10 px-8 md:px-16 overflow-hidden">
         <div className="max-w-[1400px] mx-auto">
           {/* Top Half */}
           <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-16 mb-20">
             
             {/* Left side: Brand */}
             <div className="lg:max-w-md">
               <h2 className="font-bebas text-5xl md:text-7xl text-black tracking-widest">
                 OVERDRIVE<span className="text-white">.</span>
               </h2>
               <p className="text-black/80 font-dm text-sm md:text-base leading-relaxed mt-6 font-medium max-w-sm">
                 Jammu's premier multi-sport outdoor facility. Built for athletes, powered by passion. Play, compete, and dominate on professional grounds.
               </p>
             </div>

             {/* Right side: Links & Button */}
             <div className="flex flex-col md:flex-row gap-16 lg:gap-32 w-full lg:w-auto items-start">
                
                {/* Links Grids */}
                <div className="flex gap-16 lg:gap-32 w-full md:w-auto justify-between pl-0 lg:pl-10">
                   {/* Column 1 */}
                   <div className="flex flex-col space-y-6">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-black font-dm text-black/50 mb-2">SPORTS</span>
                      <Link to="/about?sport=Football" className="font-dm text-sm font-bold uppercase tracking-wider text-black hover:text-white transition-colors">FOOTBALL</Link>
                      <Link to="/about?sport=Cricket" className="font-dm text-sm font-bold uppercase tracking-wider text-black hover:text-white transition-colors">BOX CRICKET</Link>
                      <Link to="/about?sport=Badminton" className="font-dm text-sm font-bold uppercase tracking-wider text-black hover:text-white transition-colors">BADMINTON</Link>
                      <Link to="/about?sport=Pickleball" className="font-dm text-sm font-bold uppercase tracking-wider text-black hover:text-white transition-colors">PICKLEBALL</Link>
                   </div>

                   {/* Column 2 */}
                   <div className="flex flex-col space-y-6">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-black font-dm text-black/50 mb-2">ARENA</span>
                      <Link to="/about" className="font-dm text-sm font-bold uppercase tracking-wider text-black hover:text-white transition-colors">ABOUT</Link>
                      <Link to="/#gallery" className="font-dm text-sm font-bold uppercase tracking-wider text-black hover:text-white transition-colors">GALLERY</Link>
                      <Link to="/#contact" className="font-dm text-sm font-bold uppercase tracking-wider text-black hover:text-white transition-colors">CONTACT</Link>
                      <a href="https://hudle.in/venues/overdrive-arena/883625" target="_blank" rel="noopener noreferrer" className="font-dm text-sm font-bold uppercase tracking-wider text-black hover:text-white transition-colors">BOOKING</a>
                   </div>
                </div>

                {/* Back to Top */}
                <div className="hidden lg:flex justify-end pr-4">
                  <button 
                     onClick={scrollToTop} 
                     className="w-16 h-16 bg-white hover:bg-black transition-colors duration-300 rounded-full flex items-center justify-center text-primary group shadow-xl"
                  >
                     <ArrowUp size={24} strokeWidth={2.5} className="group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>

             </div>
           </div>

           {/* Mobile Back to Top (Visible only on small screens) */}
           <div className="flex lg:hidden justify-center mb-16">
              <button 
                 onClick={scrollToTop} 
                 className="w-14 h-14 bg-white hover:bg-black transition-colors duration-300 rounded-full flex items-center justify-center text-primary shadow-lg"
              >
                 <ArrowUp size={20} strokeWidth={2.5} />
              </button>
           </div>

           {/* Divider */}
           <div className="w-full h-[1px] bg-black/10 mb-8"></div>

           {/* Bottom Half */}
           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              
              {/* Socials */}
              <div className="flex gap-8">
                 <a href="https://instagram.com/overdrive_arena" target="_blank" className="font-dm text-[11px] font-bold uppercase tracking-widest text-black hover:text-white transition-colors">INSTAGRAM</a>
                 <a href="https://wa.me/917051107301" target="_blank" className="font-dm text-[11px] font-bold uppercase tracking-widest text-black hover:text-white transition-colors">WHATSAPP</a>
              </div>

              {/* Copyright */}
              <div className="flex flex-col items-center md:items-end gap-1">
                 <p className="font-dm text-[10px] uppercase tracking-[0.2em] font-medium text-black/50 text-center md:text-right">
                   © 2024 OVERDRIVE ARENA INC. JAMMU, INDIA.
                 </p>
                 <p className="font-dm text-[10px] uppercase tracking-[0.2em] font-bold text-black/70 text-center md:text-right">
                   MADE BY BUILDORA
                 </p>
              </div>

           </div>
         </div>
       </footer>
    </div>
  );
};

export default Footer;
