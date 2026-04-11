import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, ArrowLeft, Wifi, Watch, Star, Plus, MapPin } from 'lucide-react';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#080808] min-h-screen pb-20 text-white selection:bg-primary selection:text-black">
      
      {/* =========================================
          ZONE 1: MASSIVE HERO BLOCK
          ========================================= */}
      <section className="relative w-full h-[95vh] rounded-b-[40px] md:rounded-b-[80px] overflow-hidden isolate pt-32 px-6 md:px-16 flex flex-col justify-between">
        
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 -z-10">
          <img 
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2000&auto=format&fit=crop" 
            alt="Athlete Training" 
            className="w-full h-full object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>

        {/* Top Text Block */}
        <div className="max-w-4xl mt-12 md:mt-24">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-dm text-5xl md:text-8xl font-black tracking-tighter leading-[1.1] mb-8"
          >
            PLAY HARDER.<br/>
            PLAY LONGER.<br/>
            PLAY STRONGER.
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-4"
          >
             <a href="https://hudle.in/venues/overdrive-arena/883625" target="_blank" rel="noopener noreferrer" className="bg-primary text-black font-dm font-bold text-lg px-8 py-4 rounded-full flex items-center gap-2 hover:bg-white hover:text-black transition-colors duration-300 group inline-flex">
               Book your slot 
               <div className="bg-black/10 group-hover:bg-black group-hover:text-white p-1 rounded-full transition-colors">
                  <ArrowUpRight size={18} />
               </div>
             </a>
             <button className="bg-[#1F1F1F]/80 backdrop-blur-md text-white font-dm font-medium text-lg px-8 py-4 rounded-full hover:bg-white hover:text-black transition-colors duration-300">
               More about Overdrive
             </button>
          </motion.div>
        </div>

        {/* Floating Bottom Bar (Titan Style) */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-[1400px] mx-auto mb-10 mt-auto flex flex-col md:flex-row items-stretch gap-4"
        >
          {/* Card 1: Solid Accent block */}
          <div className="bg-primary text-black rounded-[30px] p-6 flex flex-col justify-between flex-1 relative cursor-pointer hover:bg-white transition-colors duration-500 group">
             <div className="absolute top-6 right-6 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowUpRight size={16} />
             </div>
             <div className="mt-auto">
               <h3 className="font-dm font-black text-2xl md:text-3xl leading-none mb-2">Get 1st Match <br/> Discount</h3>
               <p className="font-dm text-xs font-semibold text-black/70">
                 Just give us a call or visit the front desk to claim your introductory offer.
               </p>
             </div>
          </div>

          {/* Card 2: Glassmorphism Quote block */}
          <div className="bg-[#111111]/40 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 md:p-8 flex-1 min-w-[30%] flex flex-col justify-between text-center relative max-w-[500px]">
             
             <p className="font-dm text-white font-medium text-sm md:text-base max-w-[80%] mx-auto mt-4 px-4">
               Your skills sharpen while you play. Make our 24/7 floodlit turfs your secret weapon for maximum progression.
             </p>
             
             <div className="flex justify-between items-end w-full mt-8 font-dm text-xs text-white/50 tracking-widest uppercase">
               <span className="flex items-center gap-1"><MapPin size={12}/> Jammu, IN</span>
               <span>Est. 22</span>
             </div>
          </div>
        </motion.div>

      </section>



      {/* =========================================
          ZONE 3: THE BENTO GRID
          ========================================= */}
      <section className="px-6 md:px-16 container mx-auto py-10">
        <div className="bg-[#111111] border border-[#1F1F1F] rounded-[40px] p-6 lg:p-10">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 auto-rows-[minmax(120px,auto)]">
            
            {/* Left Column blocks */}
            <div className="md:col-span-4 flex flex-col gap-4 lg:gap-6">
               <div className="bg-[#1A1A1A] p-6 lg:p-8 rounded-[24px] flex items-center gap-6 h-full min-h-[160px] group hover:bg-[#202020] transition-colors">
                 <Star size={40} className="text-white shrink-0 group-hover:text-primary transition-colors" />
                 <p className="font-dm text-lg lg:text-xl font-medium tracking-tight">Professional referees for tournaments with at least 5 years of experience.</p>
               </div>
               
               <div className="bg-[#1A1A1A] p-6 lg:p-8 rounded-[24px] flex items-center gap-6 h-full min-h-[160px] group hover:bg-[#202020] transition-colors">
                 <Plus size={48} strokeWidth={3} className="text-white shrink-0 group-hover:text-primary transition-colors" />
                 <p className="font-dm text-lg lg:text-xl font-medium tracking-tight">On-site first aid and immediate medical assistance.</p>
               </div>

               <div className="grid grid-cols-2 gap-4 lg:gap-6 h-full">
                 <div className="bg-transparent border border-[#2A2A2A] p-6 rounded-[24px] flex flex-col justify-center">
                   <h4 className="font-bebas text-5xl mb-2 flex items-baseline">4 <span className="font-dm text-sm tracking-normal capitalize ml-2 text-white/60">Sports</span></h4>
                   <span className="font-dm text-sm text-white/60">Offered</span>
                 </div>
                 <div className="bg-[#1A1A1A] p-6 rounded-[24px] flex items-center group hover:bg-[#202020] transition-colors">
                   <p className="font-dm text-sm lg:text-base font-medium">A seating area serving beverages &amp; energy drinks.</p>
                 </div>
               </div>
            </div>

            {/* Center Massive Vertical Block */}
            <div className="md:col-span-4 bg-[#1A1A1A] rounded-[24px] overflow-hidden relative min-h-[400px] lg:min-h-full">
              <img src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity brightness-50" />
              <div className="absolute inset-0 flex items-center justify-center font-bebas text-[350px] leading-none text-primary mix-blend-screen overflow-hidden selection:bg-transparent tracking-tighter">
                <span className="-ml-8 mt-12">O</span>
              </div>
            </div>

            {/* Right Column blocks */}
            <div className="md:col-span-4 flex flex-col gap-4 lg:gap-6">
              
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                <div className="bg-[#1A1A1A] p-6 rounded-[24px] flex flex-col items-center justify-center gap-4 text-center group hover:bg-[#202020] transition-colors">
                  <Wifi size={36} className="text-white group-hover:text-primary transition-colors" />
                  <p className="font-dm text-base font-medium">Free Wi-Fi</p>
                </div>
                <div className="bg-[#181818] p-6 rounded-[24px] flex items-center text-center">
                  <p className="font-dm text-base font-medium mx-auto">Pro Gear Rental</p>
                </div>
              </div>

              <div className="bg-[#1A1A1A] p-6 lg:p-8 rounded-[24px] flex items-center gap-6 h-full min-h-[160px] group hover:bg-[#202020] transition-colors">
                 <Watch size={40} className="text-white shrink-0 group-hover:text-primary transition-colors" />
                 <p className="font-dm text-lg lg:text-xl font-medium tracking-tight">CCTV match recording and smart highlight analysis.</p>
              </div>

              <div className="grid grid-cols-2 gap-4 lg:gap-6 h-full">
                 <div className="bg-[#181818] p-6 rounded-[24px] flex items-center group hover:bg-[#202020] transition-colors">
                   <p className="font-dm text-sm lg:text-base font-medium">Various kinds of tournaments.</p>
                 </div>
                 <div className="bg-transparent border border-[#2A2A2A] p-6 rounded-[24px] flex flex-col justify-center items-center">
                   <h4 className="font-dm font-black text-3xl lg:text-4xl">8000</h4>
                   <span className="font-dm text-xs text-white/50 tracking-widest uppercase mt-1">SQ FT</span>
                 </div>
               </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default About;
