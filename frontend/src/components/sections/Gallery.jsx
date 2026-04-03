import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, ArrowRight, ArrowLeft, X } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { getGallery } from '../../utils/dataStore';

const GalleryPage = ({ startIndex, images, onImageClick }) => {
  if (!images || images.length === 0) return null;
  const pageImages = Array.from({ length: 5 }).map((_, i) => images[(startIndex + i) % images.length]);

  const getCardSize = (idx) => {
    if (idx === 0) return "col-span-2 md:col-span-2 row-span-2 md:row-span-2";
    return "col-span-1 md:col-span-1 row-span-1 md:row-span-1";
  };

  return (
    <div className="min-w-[100vw] shrink-0 px-6 md:px-16 mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[200px] md:auto-rows-[250px] w-full">
        {pageImages.map((img, index) => (
          <div
            key={`${img.id}-${startIndex}-${index}`}
            onClick={() => onImageClick(img)}
            className={`relative overflow-hidden rounded-[30px] border border-[#1A1A1A] group cursor-pointer ${getCardSize(index)}`}
          >
            <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700">
              <img
                src={img.url}
                className="w-full h-full object-cover opacity-90 mix-blend-luminosity brightness-75 group-hover:opacity-80 group-hover:mix-blend-normal transition-all duration-700 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent pointer-events-none"></div>
            </div>

            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <div className="p-4 bg-black rounded-full text-primary scale-0 group-hover:scale-100 transition-transform duration-500">
                <Maximize2 size={32} />
              </div>
            </div>

            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 pointer-events-none">
              <span className="text-[10px] text-white font-black uppercase tracking-[0.4em] bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">EXPLORE</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Gallery = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(getGallery());
  }, []);

  // Auto-scroll logic utilizing RequestAnimationFrame for butter-smooth crawl
  useEffect(() => {
    let animationFrameId;
    let floatScroll = scrollRef.current ? scrollRef.current.scrollLeft : 0;

    // Safety check - wait for images to load
    if (images.length === 0) return;

    const scroll = () => {
      if (scrollRef.current && !isHovered && !selectedImg) {
        // Increment external float value instead of DOM getter to bypass Safari rendering bugs
        floatScroll += 1.5;

        // Infinite seamless loop detection
        if (floatScroll >= scrollRef.current.scrollWidth / 2) {
          floatScroll = 0; // Jump back stealthily
        }

        scrollRef.current.scrollLeft = floatScroll;
      } else if (scrollRef.current) {
        // Keep floatScroll synced with DOM if user manually scrolls or hovers
        floatScroll = scrollRef.current.scrollLeft;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, selectedImg, images]);

  const scrollLeftBtn = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
  };
  const scrollRightBtn = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
  };

  if (images.length === 0) return null;

  return (
    <section id="gallery" className="bg-[#0A0A0A] py-32 overflow-hidden border-b border-[#1F1F1F]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
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
              className="font-dm text-textMuted uppercase tracking-[0.4em] font-black text-xs md:text-sm"
            >
              GLIMPSE INTO JAMMU'S FINEST SPORTS DESTINATION.
            </motion.p>
          </div>

          <div className="flex gap-4">
            <button onClick={scrollLeftBtn} className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors shrink-0">
              <ArrowLeft size={24} />
            </button>
            <button onClick={scrollRightBtn} className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors shrink-0">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* HORIZONTAL CAROUSEL */}
      {/* We duplicate pages to allow the infinite loop jump */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex overflow-x-auto scrollbar-hide no-scrollbar w-full"
      >
        {/* Original Chunked Pages */}
        {Array.from({ length: Math.ceil(images.length / 5) }).map((_, chunkIndex) => (
          <GalleryPage key={`orig-${chunkIndex}`} startIndex={chunkIndex * 5} images={images} onImageClick={setSelectedImg} />
        ))}
        {/* Duplicated Chunked Pages for infinite scroll illusion */}
        {Array.from({ length: Math.ceil(images.length / 5) }).map((_, chunkIndex) => (
          <GalleryPage key={`dup-${chunkIndex}`} startIndex={chunkIndex * 5} images={images} onImageClick={setSelectedImg} />
        ))}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 cursor-pointer"
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary hover:text-black text-white transition-colors"
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              src={selectedImg.url}
              alt="Gallery Preview"
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl shadow-primary/20 border border-white/10"
              onClick={(e) => e.stopPropagation()} // Prevent clicking img from closing modal
            />
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Gallery;
