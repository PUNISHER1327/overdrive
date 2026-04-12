import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, ArrowRight, ArrowLeft, X, Play } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { getGallery } from '../../utils/dataStore';
import { API_URL } from '../../config';

const GalleryItem = ({ item, onImageClick }) => (
  <div
    onClick={() => onImageClick(item)}
    className="relative aspect-[9/16] w-[70vw] md:w-[22vw] shrink-0 overflow-hidden rounded-[24px] border border-white/5 group cursor-pointer bg-[#111]"
  >
    <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-1000">
      {item.type === 'video' ? (
        <video
          src={item.url.startsWith('http') ? item.url : `${API_URL}${item.url}`}
          className="w-full h-full object-cover opacity-100 transition-all duration-700 pointer-events-none"
          muted
          loop
          playsInline
          autoPlay
        />
      ) : (
        <img
          src={item.url.startsWith('http') ? item.url : `${API_URL}${item.url}`}
          className="w-full h-full object-cover opacity-100 transition-all duration-700 pointer-events-none shadow-2xl"
          alt={`Arena Gallery ${item.id}`}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent pointer-events-none"></div>
    </div>

    {/* Hover Indicators */}
    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
      <div className="p-4 bg-black/80 rounded-full text-primary scale-0 group-hover:scale-100 transition-transform duration-500 backdrop-blur-md">
        {item.type === 'video' ? <Play size={24} fill="currentColor" /> : <Maximize2 size={24} />}
      </div>
    </div>

    <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0 pointer-events-none">
      <span className="text-[10px] text-primary font-black uppercase tracking-[0.4em] bg-black/60 px-4 py-2 rounded-full backdrop-blur-md border border-primary/20">
        {item.type === 'video' ? 'VIDEO' : 'STILL'}
      </span>
    </div>
  </div>
);

const Gallery = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${API_URL}/api/gallery`);
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setImages(data.data);
        } else {
          setImages(getGallery());
        }
      } catch (err) {
        console.error(err);
        setImages(getGallery());
      }
    };
    fetchGallery();
  }, []);

  useEffect(() => {
    let animationFrameId;
    let floatScroll = scrollRef.current ? scrollRef.current.scrollLeft : 0;

    if (images.length === 0) return;

    const scroll = () => {
      if (scrollRef.current && !isHovered && !selectedItem) {
        floatScroll += 1.2;

        if (floatScroll >= (scrollRef.current.scrollWidth / 3)) {
          floatScroll = 0;
        }

        scrollRef.current.scrollLeft = floatScroll;
      } else if (scrollRef.current) {
        floatScroll = scrollRef.current.scrollLeft;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, selectedItem, images]);

  const scrollLeftBtn = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
  };
  const scrollRightBtn = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
  };

  if (images.length === 0) return null;

  return (
    <section id="gallery" className="bg-[#0A0A0A] py-32 overflow-hidden border-b border-[#1F1F1F] scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="font-bebas text-7xl md:text-8xl text-white tracking-widest uppercase mb-6"
            >
              INSIDE <span className="text-primary italic">THE ARENA</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-dm text-textMuted uppercase tracking-[0.4em] font-black text-[10px] md:text-xs"
            >
              GLIMPSE INTO JAMMU'S FINEST SPORTS DESTINATION.
            </motion.p>
          </div>

          <div className="flex gap-4">
            <button onClick={scrollLeftBtn} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shrink-0">
              <ArrowLeft size={20} />
            </button>
            <button onClick={scrollRightBtn} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shrink-0">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex gap-6 overflow-x-auto scrollbar-hide no-scrollbar w-full px-6 md:px-16"
      >
        {/* Original items */}
        {images.map((item, idx) => (
          <GalleryItem key={`orig-${item.id}-${idx}`} item={item} onImageClick={setSelectedItem} />
        ))}
        {/* Duplicated items for infinite scroll */}
        {images.map((item, idx) => (
          <GalleryItem key={`dup-${item.id}-${idx}`} item={item} onImageClick={setSelectedItem} />
        ))}
        {/* More duplicates to ensure smooth looping on larger screens */}
        {images.map((item, idx) => (
          <GalleryItem key={`dup2-${item.id}-${idx}`} item={item} onImageClick={setSelectedItem} />
        ))}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-xl p-6 cursor-pointer"
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-10 right-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-primary hover:text-black text-white transition-all z-[110]"
            >
              <X size={24} />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-4xl w-full aspect-[9/16] md:aspect-auto md:max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItem.type === 'video' ? (
                <video
                  src={selectedItem.url.startsWith('http') ? selectedItem.url : `${API_URL}${selectedItem.url}`}
                  className="max-h-[85vh] rounded-2xl shadow-2xl shadow-primary/10 border border-white/10"
                  controls
                  autoPlay
                />
              ) : (
                <img
                  src={selectedItem.url.startsWith('http') ? selectedItem.url : `${API_URL}${selectedItem.url}`}
                  alt="Gallery Preview"
                  className="max-h-[85vh] w-auto object-contain rounded-2xl shadow-2xl shadow-primary/10 border border-white/10"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Gallery;

