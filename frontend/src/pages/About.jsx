import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, ArrowLeft, Wifi, Watch, Star, Plus, MapPin } from 'lucide-react';

const About = () => {
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
             <button className="bg-primary text-black font-dm font-bold text-lg px-8 py-4 rounded-full flex items-center gap-2 hover:bg-white hover:text-black transition-colors duration-300 group">
               Book your slot 
               <div className="bg-black/10 group-hover:bg-black group-hover:text-white p-1 rounded-full transition-colors">
                  <ArrowUpRight size={18} />
               </div>
             </button>
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
          {/* Card 1: Avatars block */}
          <div className="bg-white/95 text-black rounded-[30px] p-6 flex flex-col justify-between flex-1 relative overflow-hidden group">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/150?img=11" alt="Avatar"/>
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/150?img=12" alt="Avatar"/>
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/150?img=13" alt="Avatar"/>
              </div>
              <div>
                <p className="font-dm font-black text-xl leading-none">10,000+</p>
                <p className="font-dm text-xs text-black/50 font-medium">satisfied athletes</p>
              </div>
            </div>
            <p className="font-dm text-[11px] md:text-xs text-black/70 font-medium leading-relaxed max-w-[90%]">
              They arrive with different goals, yet they all find the professional pitch and motivation they need. Their success is the ultimate validation of our arena.
            </p>
          </div>

          {/* Card 2: Glassmorphism Quote block */}
          <div className="bg-[#111111]/40 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 md:p-8 flex-1.5 min-w-[30%] flex flex-col justify-between text-center relative max-w-[500px]">
             <div className="flex justify-between items-center w-full absolute top-1/2 -translate-y-1/2 left-0 px-4 opacity-50">
               <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><ArrowLeft size={16}/></div>
               <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><ArrowRight size={16}/></div>
             </div>
             
             <p className="font-dm text-white font-medium text-sm md:text-base max-w-[80%] mx-auto mt-4 px-4">
               Your skills sharpen while you play. Make our 24/7 floodlit turfs your secret weapon for maximum progression.
             </p>
             
             <div className="flex justify-between items-end w-full mt-8 font-dm text-xs text-white/50 tracking-widest uppercase">
               <span className="flex items-center gap-1"><MapPin size={12}/> Jammu, IN</span>
               <span>Est. 22</span>
             </div>
          </div>

          {/* Card 3: Solid Accent block */}
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
        </motion.div>

      </section>


      {/* =========================================
          ZONE 2: WELCOME & CAROUSEL SECTION
          ========================================= */}
      <section className="py-24 px-6 md:px-16 container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
           
           {/* Left Info */}
           <div className="lg:w-1/3 w-full">
              <div className="inline-block border border-white/20 rounded-full px-6 py-2 mb-8">
                <span className="font-dm text-sm font-medium">Premium Arena</span>
              </div>
              <h2 className="font-dm text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-10">
                Welcome to Overdrive Arena, where champions forge their skills and conquer the game.
              </h2>
              <button className="bg-[#1A1A1A] hover:bg-primary hover:text-black text-white font-dm px-8 py-3 rounded-full flex items-center gap-3 transition-colors duration-300">
                Explore Facility 
                <div className="bg-white text-black rounded-full p-1"><ArrowUpRight size={16}/></div>
              </button>
           </div>

           {/* Right Carousel Grid */}
           <div className="lg:w-2/3 w-full">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                 
                 {/* Item 1 */}
                 <div className="relative h-[450px] bg-black rounded-[30px] overflow-hidden group">
                   <img src="https://images.unsplash.com/photo-1518605368461-1e12522201c1?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700"/>
                   <div className="absolute top-6 left-6 bg-white/95 text-black font-dm font-bold text-sm px-6 py-2 rounded-full">
                     Pro Football Turf
                   </div>
                   <div className="absolute bottom-6 left-6 right-6">
                     <p className="font-dm text-white text-xl md:text-2xl font-bold leading-snug">
                       FIFA certified grass for working<br/> with maximum traction.
                     </p>
                   </div>
                   <div className="absolute bottom-6 right-6 w-12 h-12 bg-[#1A1A1A]/80 backdrop-blur-md rounded-full flex items-center justify-center -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowUpRight size={20} />
                   </div>
                 </div>

                 {/* Item 2 */}
                 <div className="relative h-[450px] bg-black rounded-[30px] overflow-hidden group">
                   <img src="https://images.unsplash.com/photo-1622227432807-91559b52b7b5?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700"/>
                   <div className="absolute top-6 left-6 bg-white/95 text-black font-dm font-bold text-sm px-6 py-2 rounded-full">
                     Box Cricket
                   </div>
                   <div className="absolute bottom-6 left-6 right-6">
                     <p className="font-dm text-white text-xl md:text-2xl font-bold leading-snug">
                       Fully netted boundary <br/> with floodlit pitch setups.
                     </p>
                   </div>
                   <div className="absolute bottom-6 right-6 w-12 h-12 bg-[#1A1A1A]/80 backdrop-blur-md rounded-full flex items-center justify-center -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowUpRight size={20} />
                   </div>
                 </div>

             </div>

             {/* Carousel arrows */}
             <div className="flex justify-end gap-3 mt-8">
                <button className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                  <ArrowLeft size={24} />
                </button>
                <button className="w-14 h-14 rounded-full bg-black border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                  <ArrowRight size={24} />
                </button>
             </div>
           </div>

        </div>
      </section>


      {/* =========================================
          ZONE 3: THE BENTO GRID
          ========================================= */}
      <section className="px-6 md:px-16 container mx-auto">
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
                   <p className="font-dm text-sm lg:text-base font-medium">A seating area serving beverages & energy drinks.</p>
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
