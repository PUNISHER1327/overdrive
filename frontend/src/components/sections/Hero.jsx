import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

const headlines = [
  {
    range: [0, 0.50],
    heading: "THE ARENA AWAITS",
    sub: "Jammu's premier indoor sports facility"
  },
  {
    range: [0.50, 1.00],
    heading: "PLAY. COMPETE. DOMINATE.",
    sub: "Book your slot today at Overdrive Arena"
  }
];

const Hero = () => {
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const framesRef = useRef([]);
  const frameCount = 160;

  // Preload images
  useEffect(() => {
    const preloadImages = () => {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = `/frame/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
        framesRef.current[i - 1] = img;
      }
    };
    preloadImages();
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const drawImage = (index) => {
      const img = framesRef.current[index];
      if (!img) return;

      // Ensure image is loaded before drawing
      if (!img.complete) {
        img.onload = () => drawImage(index);
        return;
      }

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.width;
      const imgHeight = img.height;

      const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;
      const x = (canvasWidth - newWidth) / 2;
      const y = (canvasHeight - newHeight) / 2;

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(img, x, y, newWidth, newHeight);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // We don't want to use the local 'progress' state here because it might be stale 
      // during the resize event listener setup, but ScrollTrigger handles it.
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const init = () => {
      const isMobile = window.innerWidth <= 768;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: isMobile ? "+=150%" : "+=400%",
        scrub: true,
        pin: videoWrapperRef.current,
        anticipatePin: 1,
        onUpdate: (self) => {
          const frameIndex = Math.floor(self.progress * (frameCount - 1));
          requestAnimationFrame(() => drawImage(frameIndex));
          setProgress(self.progress);
        }
      });
      
      // Initial draw
      drawImage(0);
    };

    // Give images a tiny bit of time to start loading before initial draw
    const timeout = setTimeout(init, 100);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.killAll();
    };
  }, []);

  const active = headlines.find(h => progress >= h.range[0] && progress < h.range[1]) || headlines[1];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '2px',
          width: `${progress * 100}%`,
          backgroundColor: '#7ED45A',
          zIndex: 9999
        }}
      />

      {/* Scroll Container */}
      <div 
        ref={containerRef} 
        style={{ position: 'relative' }}
      >
        <div ref={videoWrapperRef} style={{ position: 'relative', height: '100dvh', width: '100vw' }}>
          <motion.div 
            initial={{ scale: 0.35, borderRadius: '120px', opacity: 0 }}
            animate={{ scale: 1, borderRadius: '0px', opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 1.6 }}
            style={{ position: 'absolute', inset: 0, overflow: 'hidden', backgroundColor: '#000' }}
          >
          
          {/* Canvas Background */}
          <canvas 
            ref={canvasRef}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'block'
            }}
          />

          {/* Dark Overlay */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.45)'
            }}
          />

          {/* Content Wrapper */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 20px'
            }}
          >
            {/* Headlines */}
            <AnimatePresence>
              <motion.div 
                key={active.heading}
                initial={
                  active.heading === "PLAY. COMPETE. DOMINATE." 
                    ? { opacity: 0, scale: 0.95, y: 30 } 
                    : { opacity: 0, y: 30 }
                }
                animate={
                  active.heading === "PLAY. COMPETE. DOMINATE." 
                    ? { opacity: 1, scale: 1, y: 0 } 
                    : { opacity: 1, y: 0 }
                }
                exit={{ opacity: 0, scale: 1.05, y: -20, position: 'absolute' }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ textAlign: 'center', width: '100%' }}
              >
                <h1 
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(48px, 10vw, 120px)",
                    color: "#F0F0F0",
                    letterSpacing: "4px",
                    lineHeight: 1,
                    textAlign: "center",
                    textShadow: "0 0 80px rgba(0,0,0,0.9)",
                    margin: 0
                  }}
                >
                  {active.heading}
                </h1>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "18px",
                    color: "#d5ceceff",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    marginTop: "16px",
                    textAlign: "center"
                  }}
                >
                  {active.sub}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CTA Button */}
            <AnimatePresence>
              {progress >= 0.50 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  style={{ marginTop: '40px' }}
                >
                  <button
                    onClick={() => {
                      const element = document.getElementById('book');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#7ED45A';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#7ED45A';
                      e.target.style.color = '#080808';
                    }}
                    style={{
                      backgroundColor: '#7ED45A',
                      color: '#080808',
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '20px',
                      letterSpacing: '2px',
                      padding: '16px 48px',
                      borderRadius: '100px',
                      border: '1px solid #7ED45A',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    BOOK NOW
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Hero;
