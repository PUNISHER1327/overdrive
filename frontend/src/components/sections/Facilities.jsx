import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const facilities = [
  {
    id: 1,
    title: "Premium Lighting",
    desc: "Daylight-simulating floodlights for perfect visibility. Never lose sight of the ball, whether it's midnight or early morning.",
    tags: ["Anti-glare", "Floodlights", "Zero Shadows"],
    image: "/turf.jpg"
  },
  {
    id: 2,
    title: "Pro Turfs",
    desc: "FIFA-standard artificial grass for maximum performance, injury prevention, and the ultimate stadium feel.",
    tags: ["FIFA Approved", "5v5 Size", "All-weather"],
    image: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Prime Location",
    desc: "Easy access at Kamla Palace Road with secure, ample parking available for all players and spectators.",
    tags: ["Kamla Palace Road", "Parking Available", "24/7 Security"],
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Amenities",
    desc: "Clean, well-maintained washrooms and changing facilities to ensure a comfortable experience for every athlete.",
    tags: ["Washrooms Available", "Changing Rooms", "Clean Facility"],
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    title: "Easy Booking",
    desc: "Book your favorite slot in seconds via Hudle or WhatsApp without any hassle or waiting in lines.",
    tags: ["Hudle Integration", "WhatsApp Booking", "Instant Confirmation"],
    image: "https://images.unsplash.com/photo-1649433391719-2e784576d044?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va2luZ3xlbnwwfHwwfHx8MA%3D%3D"
  }
];

const Facilities = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-[#0A0A0A] py-24 md:py-40 px-6 overflow-hidden">
      <div className="container mx-auto max-w-[1200px]">
        {/* Massive Header Section */}
        <div className="mb-4 md:mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-bebas text-[15vw] md:text-[150px] leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary/50"
          >
            WORLD CLASS
          </motion.h2>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="font-bebas text-[15vw] md:text-[150px] leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary/50 via-white to-primary "
          >
            FACILITIES
          </motion.h2>
        </div>

        {/* Subhead Divider Block */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           transition={{ duration: 1 }}
           className="flex flex-col md:flex-row pb-16 md:pb-20 border-b border-[#1F1F1F]"
        >
          <div className=" mb-6 md:mb-0">
             <span className="font-dm text-xs uppercase tracking-[0.3em] font-black text-textMuted inline-block bg-[#111] px-4 py-2 rounded-full border border-[#1f1f1f]">
               [ARENA — 01]
             </span>
             <div className="">
             <h3 className="font-dm text-3xl md:text-5xl font-medium tracking-tight leading-tight">
               The stadium experience, <span className="text-textMuted">reimagined for every player.</span>
             </h3>
          </div>
          </div>
          
        </motion.div>

        {/* Interactive Accordion + Image Grid */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left: Accordion List */}
          <div className="lg:w-1/2">
             {facilities.map((fac, idx) => {
               const isActive = activeIndex === idx;
               return (
                 <div 
  key={fac.id} 
  className="border-t border-[#1F1F1F] first:border-none"
  onMouseEnter={() => setActiveIndex(idx)}
>
                   <button 
                     onClick={() => setActiveIndex(idx)}
                     className="w-full py-8 md:py-10 flex items-center justify-between group outline-none"
                   >
                     <div className="flex items-center gap-6 md:gap-12">
                        <span className="font-dm text-textMuted text-sm w-8 text-left">0{fac.id}.</span>
                        <span className="font-dm text-3xl md:text-5xl font-medium tracking-tight text-white group-hover:text-primary transition-colors text-left">
                           {fac.title}
                        </span>
                     </div>
                     <span className="text-3xl font-light text-textMuted group-hover:text-primary transition-colors">
                        {isActive ? '−' : '+'}
                     </span>
                   </button>
                   
                   <AnimatePresence>
                     {isActive && (
                       <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                       >
                          <div className="pl-14 md:pl-[80px] pb-10 pr-4">
                             <p className="font-dm text-textMuted text-sm md:text-base mb-8 leading-relaxed max-w-md">
                               {fac.desc}
                             </p>
                             <div className="flex flex-wrap gap-3">
                               {fac.tags.map(t => (
                                 <span key={t} className="px-5 py-2 rounded-full border border-[#2A2A2A] text-[10px] md:text-xs font-dm font-bold text-white uppercase tracking-widest bg-[#111] hover:border-primary hover:text-primary transition-all cursor-default">
                                   {t}
                                 </span>
                               ))}
                             </div>
                          </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>
               )
             })}
          </div>

          {/* Right: Sticky Image Reveal */}
          <div className="lg:w-1/2 hidden lg:block relative">
             <div className="sticky top-40 h-[650px] w-full rounded-[40px] overflow-hidden group bg-[#111] border border-[#1f1f1f] p-4">
                <div className="w-full h-full rounded-[30px] overflow-hidden relative">
                   <AnimatePresence mode="wait">
                      <motion.img 
                        key={activeIndex}
                        src={facilities[activeIndex].image}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                   </AnimatePresence>
                   
                   {/* Hover Darken Overlay */}
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500"></div>

                   {/* Floating View Icon */}
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="w-24 h-24 bg-black/40 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform duration-500 ease-out">
                         <ArrowUpRight size={40} />
                      </div>
                   </div>
                </div>
             </div>
          </div>
          
          {/* Mobile Image (Visible only on small screens) */}
          <div className="w-full h-[400px] lg:hidden rounded-3xl overflow-hidden relative mt-8">
              <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeIndex}
                    src={facilities[activeIndex].image}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
              </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Facilities;
