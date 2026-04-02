"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  { tempId: 0, by: "Rahul Sharma, Football MVP", testimonial: "The best turf in Jammu. The lighting is incredible and the atmosphere is always electric.", imgSrc: "https://i.pravatar.cc/150?img=11" },
  { tempId: 1, by: "Amit Mehra, Box Cricket", testimonial: "Overdrive has completely changed the way we play box cricket. Pro-grade facilities!", imgSrc: "https://i.pravatar.cc/150?img=12" },
  { tempId: 2, by: "Sneha Gupta, Badminton", testimonial: "Safe, clean, and top-notch courts. Highly recommend for women's sessions too.", imgSrc: "https://i.pravatar.cc/150?img=5" },
  { tempId: 3, by: "Vikram Singh, Pickleball", testimonial: "First place in Jammu offering Pickleball. The energy here is just different.", imgSrc: "https://i.pravatar.cc/150?img=14" },
  { tempId: 4, by: "Sameer Tak, Football", testimonial: "Amazing experience! The staff is friendly and the booking process is seamless.", imgSrc: "https://i.pravatar.cc/150?img=15" },
  { tempId: 5, by: "Ishaan Kohli, Box Cricket", testimonial: "The stadium energy is real. Playing here feels like being in a professional league.", imgSrc: "https://i.pravatar.cc/150?img=68" }
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
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(',')[0]}`}
        className="mb-4 h-14 w-12 bg-[#080808] object-cover object-top filter grayscale"
        style={{
          boxShadow: "3px 3px 0px #080808"
        }}
      />
      <h3 className={cn(
        "text-xl sm:text-3xl font-bebas tracking-wide leading-tight",
        isCenter ? "text-black" : "text-white"
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
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps) => {
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

  return (
    <div
      className="relative w-full overflow-hidden bg-transparent"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
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
