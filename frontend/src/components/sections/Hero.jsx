import React, { useLayoutEffect, useRef, useState } from 'react';
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
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const videoWrapperRef = useRef(null);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    gsap.registerPlugin(ScrollTrigger);

    const init = () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%",
        scrub: 1,
        pin: videoWrapperRef.current,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (video.duration) {
            video.currentTime = self.progress * video.duration;
          }
          setProgress(self.progress);
        }
      });
    };

    // If video is already ready
    if (video.readyState >= 3) {
      init();
    } else {
      video.addEventListener("canplaythrough", init, { once: true });
    }

    return () => {
      ScrollTrigger.killAll();
      video.removeEventListener("canplaythrough", init);
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
        <div ref={videoWrapperRef} style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
          
          {/* Video Background */}
          <video 
            ref={videoRef}
            muted 
            playsInline 
            preload="auto"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            src="/videos/light.mp4"
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
            <AnimatePresence mode="wait">
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
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{ textAlign: 'center' }}
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
                    color: "#888888",
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
                    onClick={() => window.open('https://hudle.in/venues/overdrive-arena/883625', '_blank')}
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

        </div>
      </div>
    </>
  );
};

export default Hero;
