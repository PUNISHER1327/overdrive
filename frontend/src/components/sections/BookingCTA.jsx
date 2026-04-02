import { motion } from 'framer-motion';

const BookingCTA = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f0a] via-[#080808] to-[#080808]"></div>
      
      {/* Decorative pulse element */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-4xl">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="font-bebas text-7xl md:text-9xl leading-[0.8] text-white tracking-tighter mb-6"
          >
            READY TO <span className="text-primary italic">PLAY?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-dm text-2xl text-textMuted max-w-xl font-medium"
          >
            Book your slot in under 60 seconds and experience Jammu's most premium arena. Professional courts, epic energy.
          </motion.p>
        </div>

        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ 
             type: "spring",
             stiffness: 260,
             damping: 20,
             duration: 1
           }}
           className="relative group"
        >
          {/* Pulsing overlay */}
          <div className="absolute -inset-4 bg-primary/20 rounded-full animate-pulse-slow blur-2xl group-hover:bg-primary/40 transition-colors"></div>
          
          <a 
            href="https://hudle.in/venues/overdrive-arena/883625"
            target="_blank"
            className="relative font-bebas text-4xl md:text-5xl px-16 py-8 rounded-full bg-primary text-black tracking-widest hover:bg-white hover:text-black transition-all duration-500 block shadow-2xl transform group-hover:scale-105 active:scale-95"
          >
            BOOK ON HUDLE
          </a>
        </motion.div>
      </div>

      {/* Decorative text marquee (subtle) */}
      <div className="absolute bottom-10 left-0 w-full overflow-hidden opacity-5 pointer-events-none">
        <div className="flex whitespace-nowrap animate-marquee font-bebas text-[150px] leading-none text-white select-none">
           FOOTBALL · BOX CRICKET · BADMINTON · PICKLEBALL · FOOTBALL · BOX CRICKET · BADMINTON · PICKLEBALL
        </div>
      </div>
    </section>
  );
};

export default BookingCTA;
