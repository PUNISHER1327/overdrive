import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckSquare } from 'lucide-react';
import { API_URL } from '../../config';
gsap.registerPlugin(ScrollTrigger);

const images = {
  football: "/images/football.png",
  cricket: "/images/cricket.png",
  badminton: "/images/badminton.png",
  pickleball: "/images/pickleball.png"
};

const SportsOfferings = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Basic fade in for the whole section to match scroll
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="sports" ref={containerRef} className="bg-[#080808] py-24 md:py-32 px-4 md:px-10 overflow-hidden scroll-mt-24">
      <div className="container mx-auto max-w-[1200px]">
        
        {/* BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:auto-rows-[340px]">
          
          {/* Card 1: Football (Tall Pink Card) */}
          <motion.div 
             whileHover={{ y: -5 }}
             className="lg:row-span-2 lg:col-span-1 bg-[#F5D5D8] rounded-[40px] flex flex-col justify-between overflow-hidden shadow-2xl p-8 md:p-10"
          >
             <div>
                <h3 className="font-dm text-4xl md:text-5xl text-black font-medium tracking-tight leading-tight">
                  <br />Football
                </h3>
                <p className="font-dm text-black/70 mt-6 text-sm font-medium pr-4 leading-relaxed">
                  FIFA-standard artificial turf designed for clinical finishing, ultimate control, and high-stakes matches.
                </p>
                <a 
                  href="https://hudle.in/venues/overdrive-arena/883625"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => fetch(`${API_URL}/api/analytics/click`, { method: 'POST' }).catch(console.error)}
                  className="inline-flex items-center gap-2 border border-black text-black text-xs font-dm font-bold uppercase tracking-widest px-6 py-3 rounded-full mt-8 hover:bg-black hover:text-white transition-all"
                >
                  Book Slot
                </a>
             </div>
             
             {/* Bottom Image Area */}
             <div className="mt-10 h-64 md:h-80 w-full relative group">
                <img 
                  src={images.football} 
                  alt="Football" 
                  className="absolute inset-0 w-full h-full object-cover rounded-[30px] shadow-lg group-hover:scale-105 transition-transform duration-700" 
                />
             </div>
          </motion.div>

          {/* Section Heading (Top Middle) */}
          <div className="lg:col-span-1 flex items-center justify-center p-6 md:p-0">
             <div className="relative">
                <h2 className="font-dm text-[2.8rem] md:text-6xl text-white font-medium tracking-tight leading-[1.1]">
                  We host<br/>
                  premium<br/>
                  <span className="text-white">experiences</span><span className="inline-block w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full ml-3 translate-y-2"></span><span className="text-primary">.</span>
                </h2>
             </div>
          </div>

          {/* Card 2: Box Cricket (Top Right Purple Square) */}
          <motion.div 
             whileHover={{ y: -5 }}
             className="lg:col-span-1 bg-[#9E5BFF] rounded-[40px] p-8 md:p-10 relative overflow-hidden flex flex-col justify-end h-[340px] md:h-auto group"
          >
             <img src={images.cricket} alt="Cricket bg" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#9E5BFF]/90 via-[#9E5BFF]/40 to-transparent pointer-events-none"></div>

             <div className="relative z-10">
               <h3 className="font-dm text-4xl md:text-[2.75rem] text-white font-medium tracking-tight leading-none w-4/5 pt-12">
                Box Cricket
               </h3>
               <p className="text-white/90 font-dm text-sm mt-4 w-4/5 font-medium">
                 The ultimate short-format pitch.
               </p>
             </div>
          </motion.div>

          {/* Card 3: Wrapped Bottom Section (Badminton & Pickleball) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="lg:col-span-2 bg-[#F3F4F6] rounded-[40px] p-4 flex flex-col md:flex-row gap-4 h-[auto] lg:h-full"
          >
             
             

             {/* Pickleball (Sand Yellow) */}
             <div className="flex-1 bg-[#E8CC81] rounded-[30px] p-8 md:p-10 flex flex-col justify-between relative group overflow-hidden">
                <img src={images.pickleball} alt="Pickleball bg" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#E8CC81] via-[#E8CC81]/40 to-transparent pointer-events-none"></div>

                <div className="flex items-start justify-end relative z-10">
                   <span className="font-bebas text-6xl text-[#9E5BFF] tracking-widest mt-2 -mr-2 bg-white/40 px-3 rounded-2xl backdrop-blur-md">04 PKL</span>
                </div>
                
                <div className="mt-12 relative z-10 pt-10">
                   <h3 className="font-dm text-xl md:text-2xl text-black font-medium tracking-tight">
                     Pickleball Club
                   </h3>
                   <p className="font-dm text-black/80 text-xs mt-2 font-bold max-w-[200px]">
                     The fastest growing urban sport, now in Jammu. Play today.
                   </p>
                </div>
             </div>

             {/* Badminton (Light Blue) */}
             <div className="flex-1 bg-[#DCE9FA] rounded-[30px] p-8 md:p-10 flex flex-col relative overflow-hidden group">
                <img src={images.badminton} alt="Badminton bg" className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-multiply group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#DCE9FA] via-[#DCE9FA]/60 to-transparent pointer-events-none"></div>

                <div className="relative z-10 mt-auto pt-24">
                  <h3 className="font-dm text-3xl md:text-4xl text-black font-medium tracking-tight">
                    Badminton
                  </h3>
                  <p className="font-dm text-black/80 text-sm mt-3 font-bold">
                    Speed, agility, and power on our pro-grade courts.
                  </p>
                </div>
             </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SportsOfferings;
