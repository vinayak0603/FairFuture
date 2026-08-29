import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const appleEase = [0.16, 1, 0.3, 1];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 45, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: appleEase }
  }
};

export default function TestimonialsSection() {
  const testimonialsScrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringTestimonials, setIsHoveringTestimonials] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const [activeTestimonialDot, setActiveTestimonialDot] = useState(0);
  const autoPlayRef = useRef(null);
  const totalTestimonials = 10;

  const testimonials = [
    {
      name: "Anoop Krishna",
      program: "PG Diploma in Data Analytics",
      country: "Canada",
      quote: "Fair Future guided me perfectly from university selection to visa approval. Their post-arrival guidance was a lifesaver.",
      rating: 5
    },
    {
      name: "Meera Nair",
      program: "MSc in Finance",
      country: "UK",
      quote: "The certified experts made a complex UK Student Visa application feel effortless. Got my CAS and visa in record time!",
      rating: 5
    },
    {
      name: "Rahul Menon",
      program: "Master of Engineering",
      country: "Australia",
      quote: "Their fee assistance and scholarship guidance helped me secure a 25% tuition fee waiver. Highly professional team.",
      rating: 5
    },
    {
      name: "Anjali Joseph",
      program: "MBA",
      country: "Canada",
      quote: "Kerala's best study abroad consultants! Fair Future handled everything, including document vetting and GIC setup.",
      rating: 5
    },
    {
      name: "Dr. Sandra Mathew",
      program: "PhD in Biotechnology",
      country: "Germany",
      quote: "From university admission checks to blocked account opening, their Germany counselors were absolutely flawless.",
      rating: 5
    },
    {
      name: "Siddharth Verma",
      program: "MS in Computer Science",
      country: "USA",
      quote: "Excellent visa prep sessions! The mock interviews gave me the confidence to ace my F1 visa interview at the consulate.",
      rating: 5
    },
    {
      name: "Riya Elizabeth",
      program: "Master in Renewable Energy",
      country: "Sweden",
      quote: "Finding a specialized program in Scandinavia was hard, but their team structured my portfolio perfectly.",
      rating: 5
    },
    {
      name: "Mohammed Adil",
      program: "MSc in Data Science",
      country: "Ireland",
      quote: "Got admissions in three top Irish universities. The visa processing was fast and handled with absolute transparency.",
      rating: 5
    },
    {
      name: "Kavya Balakrishnan",
      program: "PG in Business Management",
      country: "New Zealand",
      quote: "Their pre-departure briefings are highly informative. Fair Future made sure I had accommodation sorted before landing.",
      rating: 5
    },
    {
      name: "Gautham S.",
      program: "LLM",
      country: "UK",
      quote: "100% satisfied with their guidance. No hidden costs, honest advice, and constant support at every milestone.",
      rating: 5
    }
  ];

  const goToTestimonial = useCallback((idx) => {
    const el = testimonialsScrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[data-card]')?.offsetWidth + 24 || 374;
    el.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
    setActiveTestimonialDot(idx);
  }, []);

  const scrollTestimonials = (dir) => {
    setActiveTestimonialDot(prev => {
      const next = Math.max(0, Math.min(totalTestimonials - 1, prev + dir));
      goToTestimonial(next);
      return next;
    });
  };

  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        setActiveTestimonialDot(prev => {
          const next = (prev + 1) % totalTestimonials;
          const el = testimonialsScrollRef.current;
          if (el) {
            const cardWidth = el.querySelector('[data-card]')?.offsetWidth + 24 || 374;
            el.scrollTo({ left: next * cardWidth, behavior: 'smooth' });
          }
          return next;
        });
      }, 3500);
    };
    if (!isHoveringTestimonials && !isDragging) {
      startAutoPlay();
    }
    return () => clearInterval(autoPlayRef.current);
  }, [isHoveringTestimonials, isDragging]);

  const handleTDragStart = (e) => {
    const el = testimonialsScrollRef.current;
    if (!el) return;
    clearInterval(autoPlayRef.current);
    setIsDragging(true);
    dragStart.current = { x: e.pageX || e.touches?.[0]?.pageX, scrollLeft: el.scrollLeft };
    el.style.cursor = 'grabbing';
  };

  const handleTDragMove = (e) => {
    if (!isDragging) return;
    const el = testimonialsScrollRef.current;
    if (!el) return;
    const x = e.pageX || e.touches?.[0]?.pageX;
    const walk = (x - dragStart.current.x) * 1.5;
    el.scrollLeft = dragStart.current.scrollLeft - walk;
  };

  const handleTDragEnd = () => {
    setIsDragging(false);
    const el = testimonialsScrollRef.current;
    if (el) el.style.cursor = 'grab';
    const el2 = testimonialsScrollRef.current;
    if (!el2) return;
    const cardWidth = el2.querySelector('[data-card]')?.offsetWidth + 24 || 374;
    setActiveTestimonialDot(Math.round(el2.scrollLeft / cardWidth));
  };

  return (
    <motion.section
      id="testimonials"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUpVariant}
      className="w-full bg-[#f8f9fa] py-14 lg:py-20 border-t border-slate-100/50 font-sans"
      onMouseEnter={() => setIsHoveringTestimonials(true)}
      onMouseLeave={() => setIsHoveringTestimonials(false)}
    >
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-8 lg:px-10 flex flex-col space-y-10">

        {/* Section Header + Nav Arrows Row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">TESTIMONIALS</span>
            <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
              What Our <span className="text-[#233d63] italic font-serif font-medium">Successful Students</span> Say
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Over 12,000+ students guided globally. Hear directly from our alumni.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center space-x-3 shrink-0 self-start sm:self-auto">
            <button
              onClick={() => scrollTestimonials(-1)}
              className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-[#233d63] hover:text-white text-slate-700 flex items-center justify-center shadow-sm transition-all duration-200 cursor-pointer"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => scrollTestimonials(1)}
              className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-[#233d63] hover:text-white text-slate-700 flex items-center justify-center shadow-sm transition-all duration-200 cursor-pointer"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Draggable Carousel Track */}
        <div
          ref={testimonialsScrollRef}
          className="flex space-x-6 overflow-x-auto scrollbar-none py-2 px-1 cursor-grab select-none active:cursor-grabbing"
          style={{ scrollSnapType: 'x mandatory' }}
          onMouseDown={handleTDragStart}
          onMouseMove={handleTDragMove}
          onMouseUp={handleTDragEnd}
          onMouseLeave={handleTDragEnd}
          onTouchStart={handleTDragStart}
          onTouchMove={handleTDragMove}
          onTouchEnd={handleTDragEnd}
        >
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              data-card
              className="w-[300px] sm:w-[350px] md:w-[380px] shrink-0 bg-white border border-slate-200/80 rounded-[28px] p-7 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-slate-900 text-sm">{t.name}</h4>
                  <p className="text-slate-400 text-xs mt-0.5">{t.program}</p>
                </div>
                <span className="text-[11px] font-bold text-[#233d63] bg-[#233d63]/8 px-3 py-1 rounded-full border border-[#233d63]/15">
                  {t.country}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center items-center space-x-2 pt-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToTestimonial(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeTestimonialDot === idx
                  ? 'w-8 bg-[#233d63]'
                  : 'w-2.5 bg-slate-200 hover:bg-slate-300'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </motion.section>
  );
}
