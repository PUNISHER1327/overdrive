import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const PageLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial asset loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[200] bg-[#080808] flex items-center justify-center flex-col"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <h1 className="font-bebas text-6xl md:text-8xl text-primary tracking-widest mb-4">
              OVERDRIVE
            </h1>
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
               <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-full h-full bg-primary"
               />
            </div>
            <p className="mt-4 font-dm text-[10px] tracking-[0.5em] text-textMuted uppercase">
               Jammu's Premium Sports Arena
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
