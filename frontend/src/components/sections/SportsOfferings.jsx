import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const images = {
  football: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
  cricket: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800",
  badminton: "https://images.unsplash.com/photo-1626225967045-9410ec77351f?auto=format&fit=crop&q=80&w=800",
  pickleball: "https://images.unsplash.com/photo-1623126743135-24d4e334ab51?auto=format&fit=crop&q=80&w=800"
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
    <section id="sports" ref={containerRef} className="bg-[#080808] py-24 md:py-32 px-4 md:px-10 overflow-hidden">
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
                  Premium<br />Football
                </h3>
                <p className="font-dm text-black/70 mt-6 text-sm font-medium pr-4 leading-relaxed">
                  FIFA-standard artificial turf designed for clinical finishing, ultimate control, and high-stakes matches.
                </p>
                <a 
                  href="https://hudle.in/venues/overdrive-arena/883625"
                  target="_blank"
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
             className="lg:col-span-1 bg-[#9E5BFF] rounded-[40px] p-8 md:p-10 relative overflow-hidden flex flex-col justify-between h-[340px] md:h-auto"
          >
             <h3 className="font-dm text-4xl md:text-[2.75rem] text-white font-medium tracking-tight leading-none z-10 w-2/3">
               Pro Box Cricket
             </h3>
             <p className="text-white/80 font-dm text-sm mt-4 z-10 w-2/3 font-medium">
               The ultimate short-format pitch.
             </p>
             
             {/* Decorative Image */}
             <div className="absolute -bottom-8 -right-8 w-48 h-48 md:w-56 md:h-56 bg-white/10 rounded-full flex items-center justify-center overflow-hidden border-4 border-[#9E5BFF] shadow-xl group hover:scale-105 transition-transform">
                <img 
                  src={images.cricket} 
                  alt="Cricket" 
                  className="w-full h-full object-cover"
                />
             </div>
          </motion.div>

          {/* Card 3: Wrapped Bottom Section (Badminton & Pickleball) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="lg:col-span-2 bg-[#F3F4F6] rounded-[40px] p-4 flex flex-col md:flex-row gap-4 h-[auto] lg:h-full"
          >
             
             {/* Badminton (Light Blue) */}
             <div className="flex-1 bg-[#DCE9FA] rounded-[30px] p-8 md:p-10 flex flex-col relative overflow-hidden group">
                {/* Pill Image */}
                <div className="w-2/3 h-20 bg-white rounded-full mb-6 overflow-hidden shadow-sm relative">
                   <img 
                      src={images.badminton} 
                      alt="Badminton" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                   />
                </div>
                
                <h3 className="font-dm text-3xl md:text-4xl text-black font-medium tracking-tight mt-auto">
                  Badminton
                </h3>
                <p className="font-dm text-black/70 text-sm mt-3 font-medium">
                  Speed, agility, and power on our pro-grade courts.
                </p>
             </div>

             {/* Pickleball (Sand Yellow) */}
             <div className="flex-1 bg-[#E8CC81] rounded-[30px] p-8 md:p-10 flex flex-col justify-between relative group">
                <div className="flex items-start justify-between">
                   <div className="w-20 h-20 rounded-3xl border-4 border-black flex items-center justify-center relative overflow-hidden">
                      <img src={images.pickleball} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#9E5BFF] rounded-full border-2 border-[#E8CC81]"></div>
                   </div>
                   <span className="font-bebas text-6xl text-[#9E5BFF] tracking-widest mt-2 -mr-2">04 PKL</span>
                </div>
                
                <div className="mt-12">
                   <h3 className="font-dm text-xl md:text-2xl text-black font-medium tracking-tight">
                     Pickleball Club
                   </h3>
                   <p className="font-dm text-black/70 text-xs mt-2 font-medium max-w-[200px]">
                     The fastest growing urban sport, now in Jammu. Play today.
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
