import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, ArrowLeft, Wifi, Watch, Star, Plus, MapPin, CheckCircle2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const sportsData = {
  Cricket: {
    title: "BOX CRICKET",
    description: "Experience the thrill of box cricket engineered for fast-paced action. Turf perfectly balanced for bounce and grip, enveloped in high-tension safety nets, ensuring continuous play without interruptions.",
    features: ["AstroTurf Pro Surface", "360° Safety Netting", "High-Intensity LED Floodlights", "Automated Scoreboards"],
    image: "https://res.cloudinary.com/dkw3dx53h/image/upload/v1775968412/Gemini_Generated_Image_l4m6lwl4m6lwl4m6_xzto5x.png",
    color: "#7ED45A"
  },
  Football: {
    title: "5v5 FOOTBALL",
    description: "State-of-the-art FIFA-quality artificial grass designed for 5-a-side dominance. Exceptional shock absorption reduces injury risk while providing authentic ball roll under stadium-grade lighting.",
    features: ["FIFA Quality Pro Turf", "Shock Pad Underlay", "Stadium Quality Lighting", "Custom Goal Posts"],
    image: "https://res.cloudinary.com/dkw3dx53h/image/upload/v1775967847/20260219_130029_po3zwh.jpg",
    color: "#3B82F6"
  },
  Pickleball: {
    title: "PICKLEBALL",
    description: "The fastest-growing sport in the world now has a premium home in Jammu. Professional-grade hardcourt surfaces with tournament-regulation lines, delivering the perfect bounce for every dink and drive.",
    features: ["Regulation Hardcourt", "Anti-Slip Coating", "Tournament Nets", "Sound Baffles"],
    image: "https://res.cloudinary.com/dkw3dx53h/image/upload/v1775968138/Gemini_Generated_Image_mg9nosmg9nosmg9n_wm4xjb.png",
    color: "#F59E0B"
  },
  Badminton: {
    title: "BADMINTON",
    description: "Enjoy an intensive outdoor badminton experience on our premium artificial grass turf. Engineered to mimic professional football grade grass, it actively softens your landings and reduces impact on your joints, ensuring safe and continuous play under the open sky.",
    features: ["Artificial Grass Turf", "Outdoor Play", "Shock Absorption", "Stadium Lighting"],
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2000&auto=format&fit=crop",
    color: "#EC4899"
  }
};

const About = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSport = searchParams.get('sport') || 'Cricket';

  const [activeSport, setActiveSport] = useState(initialSport);
  const navigate = useNavigate();

  useEffect(() => {
    const sport = searchParams.get('sport');
    if (sport && sportsData[sport]) {
      setActiveSport(sport);
      
      // Auto-scroll to the section if arrived via URL param
      setTimeout(() => {
        const sportSection = document.getElementById('sports-selector');
        if (sportSection) {
          sportSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.search]);

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
             <button
               onClick={() => navigate('/')}
               className="bg-[#1F1F1F]/80 backdrop-blur-md text-white font-dm font-medium text-lg px-8 py-4 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
             >
               More about Overdrive
             </button>
          </motion.div>
        </div>

        {/* Floating Bottom Bar (Titan Style) */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-[1400px] mx-auto mb-10 mt-auto"
        >
          {/* Card 1: Book Now CTA */}
          <div className="bg-primary text-black rounded-[30px] p-6 flex flex-col justify-between relative cursor-pointer hover:bg-white transition-colors duration-500 group max-w-sm">
             <div className="absolute top-6 right-6 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowUpRight size={16} />
             </div>
             <div className="mt-auto">
               <h3 className="font-dm font-black text-2xl md:text-3xl leading-none mb-2">4 Sports. <br/> 1 Arena.</h3>
               <p className="font-dm text-xs font-semibold text-black/70">
                 Football, Box Cricket, Badminton & Pickleball — all under premium floodlights at Kamla Palace Road, Jammu.
               </p>
             </div>
          </div>
        </motion.div>

      </section>



      {/* =========================================
          ZONE 2: INTERACTIVE SPORTS SELECTOR
          ========================================= */}
      <section id="sports-selector" className="px-6 md:px-16 container mx-auto py-20">
        <div className="text-center mb-12">
          <h2 className="font-bebas text-5xl md:text-7xl tracking-widest text-white mb-4">CHOOSE YOUR ARENA</h2>
          <p className="font-dm text-white/50 text-lg max-w-2xl mx-auto">Explore the state-of-the-art courts available at Overdrive specifically engineered for ultimate performance.</p>
        </div>

        {/* Sport Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {Object.keys(sportsData).map((sport) => (
            <button
              key={sport}
              onClick={() => setActiveSport(sport)}
              className={`px-8 py-3 rounded-full font-bebas text-2xl tracking-widest transition-all duration-300 ${
                activeSport === sport 
                ? 'bg-primary text-black scale-105' 
                : 'bg-[#1A1A1A] text-white/50 hover:bg-[#222] hover:text-white'
              }`}
            >
              {sport}
            </button>
          ))}
        </div>

        {/* Active Sport Display */}
        <div className="bg-[#111111] border border-[#1F1F1F] rounded-[40px] p-6 lg:p-12 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Sport Info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSport}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col h-full justify-center order-2 lg:order-1"
              >
                <h3 className="font-bebas text-6xl md:text-8xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30 mb-6 drop-shadow-2xl">
                  {sportsData[activeSport].title}
                </h3>
                <p className="font-dm text-lg md:text-xl text-white/70 leading-relaxed mb-8">
                  {sportsData[activeSport].description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sportsData[activeSport].features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 bg-[#1A1A1A] px-4 py-3 rounded-xl border border-white/5">
                      <CheckCircle2 size={18} className="text-primary shrink-0" />
                      <span className="font-dm text-sm font-semibold text-white/90">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Sport Image */}
            <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden order-1 lg:order-2 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
               <AnimatePresence mode="wait">
                 <motion.img
                   key={activeSport}
                   src={sportsData[activeSport].image}
                   initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                   animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                   exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                   transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                   className="absolute inset-0 w-full h-full object-cover object-center"
                   alt={activeSport}
                 />
               </AnimatePresence>
               {/* Elegant Gradient Overlay */}
               <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#111111] to-transparent" />
            </div>

          </div>
        </div>
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
