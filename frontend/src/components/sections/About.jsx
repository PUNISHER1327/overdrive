import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { id: 1, label: "PREMIUM 5v5 TURF", value: 1, suffix: "" },
  { id: 2, label: "HAPPY PLAYERS", value: 500, suffix: "+" },
  { id: 3, label: "PRO EQUIPMENTS", value: 20, suffix: "+" },
  { id: 4, label: "SUPPORT HOURS", value: 24, suffix: "/7" }
];

const StatCounter = ({ label, value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startTime;
      const duration = 2000; // 2 seconds
      
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        // Easing function (easeOutExpo)
        const easedValue = 1 - Math.pow(2, -10 * percentage);
        setCount(Math.floor(easedValue * value));
        
        if (percentage < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="flex items-baseline justify-center md:justify-start gap-1 mb-1">
        <h3 className="font-bebas text-5xl md:text-7xl text-primary leading-none">
          {count}
        </h3>
        <span className="font-bebas text-xl md:text-2xl text-primary/60">{suffix}</span>
      </div>
      <p className="font-dm text-[10px] md:text-xs text-textMuted uppercase tracking-[0.2em] font-medium">
        {label}
      </p>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="bg-[#080808] py-32 overflow-hidden relative border-y border-[#1F1F1F]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left Column: Image/Visual with a more premium frame */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative group aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1574629810360-7efbf5ce0063?q=80&w=2000&auto=format&fit=crop" 
                alt="Overdrive Arena"
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80"></div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 p-6 glass rounded-xl border border-white/10 max-w-xs backdrop-blur-xl">
                 <div className="w-12 h-[2px] bg-primary mb-4"></div>
                 <h4 className="font-bebas text-2xl text-white mb-2 tracking-wide">THE NEW STANDARD</h4>
                 <p className="text-textMuted text-[13px] leading-relaxed font-medium">Experience sports like never before with our premium infrastructure and stadium-grade lighting.</p>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -top-6 -right-6 w-32 h-32 border-t border-r border-primary/30 rounded-tr-3xl -z-10"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b border-l border-primary/30 rounded-bl-3xl -z-10"></div>
          </motion.div>

          {/* Right Column: Story & Stats */}
          <div className="space-y-12">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-4"
              >
                <div className="h-[1px] w-12 bg-primary"></div>
                <span className="text-primary text-[11px] font-bold tracking-[0.5em] uppercase">
                  OUR STORY
                </span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="font-bebas text-6xl md:text-8xl leading-[1] text-white tracking-widest"
              >
                BUILT FOR <span className="text-primary italic">THE ELITE.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-textMuted text-lg font-medium leading-relaxed max-w-xl"
              >
                Overdrive Arena is Jammu's premier sports destination, featuring an international-standard 5v5 turf. From high-intensity football matches to recreational sessions, we've created a space where passion meets профессионализм.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="space-y-8"
            >
              <p className="text-textMuted/70 text-sm leading-relaxed max-w-lg border-l border-primary/30 pl-6 py-2">
                Located at Kamla Palace Road, our facility is equipped with pro-grade lighting to ensure your game never stops, day or night. We provide a complete stadium-energy atmosphere with full amenities like parking and clean washrooms.
              </p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-8 pt-6">
                {stats.map(stat => (
                  <StatCounter key={stat.id} {...stat} />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
               <button 
                onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-4 text-white hover:text-primary transition-colors duration-300"
               >
                 <span className="font-bebas text-xl tracking-widest">VISIT US TODAY</span>
                 <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary group-hover:translate-x-2 transition-all duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                 </div>
               </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

