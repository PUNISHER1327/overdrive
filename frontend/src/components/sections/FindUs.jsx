import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation, ArrowUpRight } from 'lucide-react';

const FindUs = () => {
  return (
    <section id="contact" className="bg-[#050505] py-32 overflow-hidden border-t border-[#1F1F1F] scroll-mt-24">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="font-bebas text-5xl sm:text-7xl md:text-9xl text-white tracking-[0.1em] md:tracking-widest uppercase leading-none"
            >
              TRANSMIT <br/> <span className="text-primary">COORDINATES</span>
            </motion.h2>
          </div>
          <motion.div 
             initial={{ opacity: 0, y: 20 }} 
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.2 }}
             className="text-left md:text-right"
          >
             <p className="font-dm text-white/50 uppercase tracking-[0.2em] md:tracking-[0.4em] font-black text-[10px] md:text-sm">
                COMMAND CENTER ACTIVE
             </p>
             <div className="flex items-center gap-2 justify-start md:justify-end mt-2">
                 <span className="relative flex h-3 w-3">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                 </span>
                 <p className="text-primary font-dm text-[10px] tracking-[0.2em] md:tracking-widest font-bold">LIVE LOCATION PINNED</p>
             </div>
          </motion.div>
        </div>

        {/* Master Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[700px]">
          
          {/* Left: Huge Map Panel (7 columns) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="lg:col-span-7 h-[500px] lg:h-full bg-[#0A0A0A] rounded-[40px] border border-[#1A1A1A] relative overflow-hidden group"
          >
             {/* Map Scanning Grid Overlay */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-10 opacity-30"></div>
             
             {/* Floating UI on top of Map */}
             <div className="absolute top-6 left-6 z-20 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-3">
                 <Navigation size={14} className="text-primary" />
                 <span className="text-[10px] text-white tracking-[0.3em] font-bold">JAMMU, IN — 32.7233° N, 74.8398° E</span>
             </div>

             {/* The Actual Map */}
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13414.28286282924!2d74.8398462!3d32.7233215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391e850e0e0e0e0e%3A0x0!2sOverdrive%20Arena!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
               width="100%" 
               height="100%" 
               className="relative z-0 scale-110 group-hover:scale-100 transition-transform duration-[2s] ease-in-out mix-blend-screen"
               style={{ filter: "grayscale(100%) invert(100%) contrast(150%) brightness(80%) sepia(30%) hue-rotate(85deg)" }}
               allowFullScreen="" 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
          </motion.div>


          {/* Right: Info Panels (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
             
             {/* Row 1: Phone & Time (Split 50/50) */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-[200px]">
                {/* Phone Panel */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-[30px] p-8 flex flex-col justify-between hover:bg-[#111111] hover:border-primary/30 transition-all duration-300 group"
                >
                   <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center border border-[#1F1F1F] group-hover:border-primary/50 transition-colors">
                      <Phone size={20} className="text-white group-hover:text-primary transition-colors" />
                   </div>
                   <div className="mt-8">
                      <p className="text-[10px] text-primary tracking-[0.4em] font-bold uppercase mb-2">Direct Line</p>
                      <h4 className="font-bebas text-2xl text-white tracking-widest leading-none">+91 96733 57356</h4>
                      <h4 className="font-bebas text-xl text-white/50 tracking-widest leading-none mt-1">+91 70511 07301</h4>
                   </div>
                </motion.div>

                {/* Timing Panel */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-[30px] p-8 flex flex-col justify-between hover:bg-[#111111] hover:border-primary/30 transition-all duration-300 group"
                >
                   <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center border border-[#1F1F1F] group-hover:border-primary/50 transition-colors">
                      <Clock size={20} className="text-white group-hover:text-primary transition-colors" />
                   </div>
                   <div className="mt-8">
                      <p className="text-[10px] text-primary tracking-[0.4em] font-bold uppercase mb-2">Operations</p>
                      <h4 className="font-bebas text-3xl text-white tracking-widest leading-none">24/7 OPEN</h4>
                      <p className="font-dm text-xs text-white/50 font-medium mt-2 leading-relaxed">Bookings actively monitored 6AM - 11PM</p>
                   </div>
                </motion.div>
             </div>

             {/* Row 2: Full Width Address */}
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-[30px] p-8 flex flex-col justify-between hover:bg-[#111111] hover:border-primary/30 transition-all duration-300 group flex-1 min-h-[200px]"
             >
                 <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center border border-[#1F1F1F] group-hover:border-primary/50 transition-colors">
                    <MapPin size={20} className="text-white group-hover:text-primary transition-colors" />
                 </div>
                 <div className="mt-8">
                    <p className="text-[10px] text-primary tracking-[0.4em] font-bold uppercase mb-2">Physical Location</p>
                    <h4 className="font-bebas text-3xl md:text-4xl text-white tracking-widest leading-none max-w-sm">Kamla Palace Road, Talab Tillo, Jammu, India.</h4>
                 </div>
             </motion.div>

             {/* Row 3: Digital Ticket Booking CTA */}
             <motion.a 
                href="https://hudle.in/venues/overdrive-arena/883625"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-primary rounded-[30px] p-8 relative overflow-hidden group min-h-[160px] flex items-center justify-between cursor-pointer"
             >
                 {/* Ticket Zig-Zag Edge Illusion */}
                 <div className="absolute top-0 bottom-0 left-0 w-2 shrink-0 border-r-8 border-dotted border-black/20 mix-blend-overlay"></div>
                 
                 <div className="z-10 pl-6">
                    <p className="text-[10px] text-black/60 tracking-[0.4em] font-black uppercase mb-1">SECURE ACCESS</p>
                    <h4 className="font-bebas text-4xl md:text-5xl text-black tracking-widest leading-none">BOOK SLOT ONLINE</h4>
                 </div>
                 
                 <div className="z-10 w-16 h-16 bg-black rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-xl">
                    <ArrowUpRight size={28} className="text-primary" />
                 </div>

                 {/* Hover Glow Sweep */}
                 <div className="absolute inset-0 bg-white/20 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out skew-x-12"></div>
             </motion.a>

          </div>

        </div>
      </div>
    </section>
  );
};

export default FindUs;
