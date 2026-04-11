"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '../../lib/utils';
import { API_URL } from '../../config';

const SQRT_5000 = Math.sqrt(5000);

const featuredTestimonials = [
  { tempId: 'f0', by: "Rahul Sharma, Football MVP", testimonial: "The best turf in Jammu. The lighting is incredible and the atmosphere is always electric.", imgSrc: "https://i.pravatar.cc/150?img=11", rating: 5 },
  { tempId: 'f1', by: "Amit Mehra, Box Cricket", testimonial: "Overdrive has completely changed the way we play box cricket. Pro-grade facilities!", imgSrc: "https://i.pravatar.cc/150?img=12", rating: 5 },
  { tempId: 'f2', by: "Sneha Gupta, Badminton", testimonial: "Safe, clean, and top-notch courts. Highly recommend for women's sessions too.", imgSrc: "https://i.pravatar.cc/150?img=5", rating: 5 },
];

const TestimonialCard = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter 
          ? "z-10 bg-primary text-black border-primary" 
          : "z-0 bg-[#111111] text-white border-[#1F1F1F] hover:border-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px #1F1F1F" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-[#1F1F1F]"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <div className="flex justify-between items-start mb-4">
        <img
          src={testimonial.imgSrc}
          alt={`${testimonial.by.split(',')[0]}`}
          className="h-14 w-12 bg-[#080808] object-cover object-top filter grayscale"
          style={{
            boxShadow: "3px 3px 0px #080808"
          }}
        />
        <div className="flex gap-1">
          {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
            <Star key={i} size={14} fill="currentColor" className={isCenter ? "text-black/40" : "text-primary/40"} />
          ))}
        </div>
      </div>
      <h3 className={cn(
        "text-xl sm:text-2xl md:text-3xl font-bebas tracking-wide leading-tight",
        isCenter ? "text-black font-black" : "text-white"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-xs font-dm font-black uppercase tracking-widest",
        isCenter ? "text-black/80" : "text-primary"
      )}>
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/api/reviews`);
        const json = await response.json();
        
        if (json.success && json.data.length > 0) {
          // Map DB reviews to carousel format
          const mappedReviews = json.data.map((r, i) => ({
            tempId: r._id,
            by: r.name,
            testimonial: r.comment,
            imgSrc: r.imgSrc,
            rating: r.rating
          }));
          
          // Combine with some featured ones if list is short
          if (mappedReviews.length < 3) {
            setTestimonialsList([...mappedReviews, ...featuredTestimonials]);
          } else {
            setTestimonialsList(mappedReviews);
          }
        } else {
          setTestimonialsList(featuredTestimonials);
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setTestimonialsList(featuredTestimonials);
      }
    };

    fetchReviews();
  }, []);

  const handleMove = (steps) => {
    if (testimonialsList.length === 0) return;
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (testimonialsList.length === 0) return null;

  return (
    <div
      className="relative w-full overflow-hidden bg-transparent"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        // Handle varying list sizes for position logic
        const mid = Math.floor(testimonialsList.length / 2);
        const position = index - mid;
        
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-[#111111] text-white border-2 border-[#1F1F1F] hover:bg-primary hover:border-primary hover:text-black",
            "focus-visible:outline-none"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-[#111111] text-white border-2 border-[#1F1F1F] hover:bg-primary hover:border-primary hover:text-black",
            "focus-visible:outline-none"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

