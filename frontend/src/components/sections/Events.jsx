import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Info, Trophy } from 'lucide-react';
import { getEvents, registerTeam } from '../../utils/dataStore';
import { API_URL } from '../../config';

const Events = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load events dynamically from Backend
  useEffect(() => {
     const fetchEvents = async () => {
        try {
          const res = await fetch(`${API_URL}/api/competitions`);
          const data = await res.json();
          setEvents(data);
        } catch (err) {
          console.error('Failed to fetch competitions:', err);
        } finally {
          setLoading(false);
        }
     };
     fetchEvents();
  }, []);

  const nextEvent = () => {
    if (events.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevEvent = () => {
    if (events.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const handleRegistration = (eventName) => {
     const text = encodeURIComponent(`Hi! I would like to register my team for the ${eventName} tournament.`);
     window.open(`https://wa.me/917051107301?text=${text}`, '_blank');
  };

  if (loading) return null;

  // PREMIUM EMPTY STATE
  if (events.length === 0) {
    return (
      <section id="events" className="relative w-full py-24 bg-[#080808] border-b border-[#1F1F1F] overflow-hidden">
        <div className="container mx-auto px-6 md:px-16 flex flex-col items-center justify-center text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-8 border border-primary/20"
          >
            <Trophy className="text-primary" size={32} />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-bebas text-5xl md:text-7xl text-white tracking-widest mb-4"
          >
            NO ACTIVE COMPETITIONS
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-dm text-textMuted max-w-lg mb-10"
          >
            We're currently planning some massive tournaments and leagues for the upcoming season. Follow us on Instagram to stay updated on the next big reveal!
          </motion.p>
          
          <motion.a 
            href="https://www.instagram.com/overdrive_arena"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#111] border border-[#1f1f1f] text-white font-dm font-bold text-xs uppercase tracking-[0.3em] px-8 py-4 rounded-full hover:border-primary hover:text-primary transition-all"
          >
            Follow @OverdriveArena
          </motion.a>
        </div>
        
        {/* Subtle background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          <h3 className="font-bebas text-[20vw] text-white/[0.02] tracking-tighter whitespace-nowrap">COMING SOON</h3>
        </div>
      </section>
    );
  }

  const activeEvent = events[currentIndex];

  return (
    <section className="relative w-full h-[85vh] bg-[#080808] border-b border-[#1F1F1F] overflow-hidden flex flex-col justify-end">
      
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img 
              src={activeEvent.img?.startsWith('http') ? activeEvent.img : `${API_URL}${activeEvent.img}`} 
              alt={activeEvent.title} 
              className="w-full h-full object-cover object-center opacity-70 mix-blend-luminosity brightness-[0.4]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/90 via-transparent to-transparent" />
      </div>

      {/* Static Header Section */}
      <div className="absolute top-24 left-0 w-full z-20 pointer-events-none">
         <div className="container mx-auto px-6 md:px-16">
            <span className="text-primary font-dm font-black tracking-[0.4em] uppercase text-xs">JOIN THE COMPETITION</span>
            <h2 className="font-bebas text-6xl md:text-8xl text-white tracking-widest mt-2 opacity-20 hidden md:block">UPCOMING EVENTS</h2>
         </div>
      </div>

      {/* Active Event Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-16 pb-20 md:pb-32 w-full flex flex-col md:flex-row md:items-end justify-between gap-12">
         
         <div className="max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="flex items-center gap-4 mb-4">
                   <span className="bg-primary text-black font-dm text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                     {activeEvent.tag}
                   </span>
                   <span className="text-white/60 font-dm text-sm font-bold tracking-[0.3em] uppercase">
                     {activeEvent.sport}
                   </span>
                </div>
                
                <h3 className="font-bebas text-6xl md:text-8xl lg:text-[140px] text-white leading-[0.9] tracking-tighter mb-8">
                  {activeEvent.title}
                </h3>
                
                <div className="flex flex-wrap items-center gap-6 md:gap-12 font-dm text-white">
                   <div className="flex items-center gap-3">
                      <Calendar className="text-primary" size={24} />
                      <div>
                        <p className="text-[10px] text-white/50 uppercase tracking-widest">Date</p>
                        <p className="font-bold tracking-wide">{activeEvent.date}</p>
                      </div>
                   </div>
                   <div className="w-[1px] h-10 bg-white/20 hidden md:block" />
                   <div className="flex items-center gap-3">
                      <Info className="text-primary" size={24} />
                      <div>
                        <p className="text-[10px] text-white/50 uppercase tracking-widest">Location</p>
                        <p className="font-bold tracking-wide text-primary">{activeEvent.location}</p>
                      </div>
                   </div>
                   <div className="w-[1px] h-10 bg-white/20 hidden md:block" />
                   <div className="flex items-center gap-3">
                      <Trophy className="text-[#FFD700]" size={24} />
                      <div>
                        <p className="text-[10px] text-white/50 uppercase tracking-widest">Prize Pool</p>
                        <p className="font-bold tracking-wide">{activeEvent.prize}</p>
                      </div>
                   </div>
                </div>

              </motion.div>
            </AnimatePresence>
         </div>

         {/* Navigation Controls */}
         <div className="flex flex-col items-center gap-6 shrink-0">
             <button onClick={() => handleRegistration(activeEvent.title)} className="bg-white text-black hover:bg-primary font-dm font-bold text-sm px-10 py-4 rounded-full transition-all duration-300 w-full whitespace-nowrap">
                REGISTER TEAM
             </button>
             
             <div className="flex gap-3">
                <button 
                  onClick={prevEvent}
                  className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-black/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-colors"
                >
                  <ArrowLeft size={24} />
                </button>
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-black/20 backdrop-blur-md text-white/50 font-dm font-bold text-sm">
                   {currentIndex + 1} / {events.length}
                </div>
                <button 
                  onClick={nextEvent}
                  className="w-14 h-14 rounded-full bg-primary text-black flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ArrowRight size={24} />
                </button>
             </div>
         </div>

      </div>

    </section>
  );
};

export default Events;
