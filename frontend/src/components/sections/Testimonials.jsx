import { motion } from 'framer-motion';
import { StaggerTestimonials } from '../ui/stagger-testimonials';

const Testimonials = () => {
  return (
    <section className="bg-[#080808] py-32 overflow-hidden border-t border-[#1F1F1F]">
      <div className="container mx-auto px-6 mb-10 text-center">
         <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="font-bebas text-7xl md:text-8xl text-white tracking-tighter"
         >
           WHAT <span className="text-primary italic">PLAYERS</span> SAY
         </motion.h2>
         <motion.p 
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="font-dm text-textMuted uppercase tracking-[0.4em] font-black text-xs mt-4"
         >
           JOIN THE ELITE SPORTS COMMUNITY IN JAMMU.
         </motion.p>
      </div>

      <div className="flex w-full justify-center items-center max-w-[1400px] mx-auto min-h-[600px]">
        <StaggerTestimonials />
      </div>

    </section>
  );
};

export default Testimonials;
