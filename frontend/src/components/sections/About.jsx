import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { id: 1, label: "SPORTS", value: 4 },
  { id: 2, label: "PLAYERS", value: 500, suffix: "+" },
  { id: 3, label: "PRO EQUIPMENTS", value: 20 },
  { id: 4, label: "ONLINE BOOKING", value: 24, suffix: "/7" }
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
    <div ref={ref} className="text-center md:text-left flex flex-col space-y-2">
      <h3 className="font-bebas text-6xl md:text-8xl text-primary leading-none tracking-tighter">
        {count}{suffix}
      </h3>
      <p className="font-dm text-xs md:text-sm text-textMuted uppercase tracking-[0.3em] font-black">
        {label}
      </p>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="bg-[#080808] py-32 overflow-hidden relative border-y border-[#1F1F1F]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Column: Image/Visual */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="relative group h-[500px] md:h-[650px] overflow-hidden rounded-3xl border-l-[6px] border-primary"
          >
            <div className="absolute inset-0 bg-[#111] grid place-items-center">
               {/* Replace with real image later */}
               <div className="text-primary/10 font-bebas text-[20vw] select-none">ARENA</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#080808] via-transparent to-transparent"></div>
            <div className="absolute bottom-10 left-10 p-8 glass rounded-2xl border border-white/10 max-w-sm group-hover:scale-105 transition-all duration-700">
               <h4 className="font-bebas text-3xl text-white mb-2">BUILT FOR CHAMPIONS</h4>
               <p className="text-textMuted text-sm font-medium">Jammu's first choice for high-intensity outdoor sports.</p>
            </div>
          </motion.div>

          {/* Right Column: Story & Stats */}
          <div className="space-y-12">
            <div className="space-y-6">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-primary text-sm font-black tracking-[0.4em] uppercase block"
              >
                OUR STORY
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="font-bebas text-7xl md:text-8xl leading-[0.9] text-white tracking-tighter"
              >
                BUILT FOR ATHLETES.<br />
                <span className="text-primary italic">POWERED BY PASSION.</span>
              </motion.h2>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-6 font-medium text-textMuted max-w-xl leading-relaxed"
            >
              <p>
                 Overdrive Arena is Jammu's premier multi-sport outdoor facility, meticulously designed for both serious athletes and recreational players. Located at Kamla Palace Road, we host high-octane football matches, intense box cricket tournaments, and competitive badminton sessions.
              </p>
              <p>
                 Our facility is equipped with FIFA-standard turfs and pro-grade lighting to ensure your game never stops, day or night. Whether you're here to train for the next big game or just looking for a weekend match with friends, Overdrive provides the perfect stadium-energy atmosphere.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-12 pt-10 border-t border-[#1F1F1F]">
              {stats.map(stat => (
                <StatCounter key={stat.id} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
