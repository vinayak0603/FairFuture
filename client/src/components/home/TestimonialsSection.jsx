import React from 'react';
import ScrollReveal from '../ScrollReveal';

export default function TestimonialsSection() {
  const testimonialsScrollRef = React.useRef(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [activeTestimonialDot, setActiveTestimonialDot] = React.useState(0);
  const dragStart = React.useRef({ x: 0, scrollLeft: 0 });

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
  ];

  const scrollTestimonials = (direction) => {
    if (testimonialsScrollRef.current) {
      const cardWidth = testimonialsScrollRef.current.querySelector('[data-card]')?.offsetWidth + 24 || 374;
      testimonialsScrollRef.current.scrollBy({
        left: direction * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const goToTestimonial = (idx) => {
    if (testimonialsScrollRef.current) {
      const cardWidth = testimonialsScrollRef.current.querySelector('[data-card]')?.offsetWidth + 24 || 374;
      testimonialsScrollRef.current.scrollTo({
        left: idx * cardWidth,
        behavior: 'smooth'
      });
      setActiveTestimonialDot(idx);
    }
  };

  const handleTDragStart = (e) => {
    setIsDragging(true);
    const pageX = e.touches ? e.touches[0].pageX : e.pageX;
    dragStart.current = { x: pageX, scrollLeft: testimonialsScrollRef.current.scrollLeft };
  };

  const handleTDragMove = (e) => {
    if (!isDragging) return;
    const pageX = e.touches ? e.touches[0].pageX : e.pageX;
    const walk = (pageX - dragStart.current.x) * 1.4;
    testimonialsScrollRef.current.scrollLeft = dragStart.current.scrollLeft - walk;
  };

  const handleTDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <section id="testimonials" className="w-full bg-[#f8f9fa] py-14 lg:py-20 border-t border-slate-100/50 font-sans">
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-8 lg:px-10 flex flex-col space-y-10">

        {/* Section Header + Nav Arrows Row */}
        <ScrollReveal delay={0.1} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">TESTIMONIALS</span>
            <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
              What Our <span className="text-[#233d63] italic font-serif font-medium">Successful Students</span> Say
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Over 12,000+ students guided globally. Hear directly from our alumni.
            </p>
          </div>

          {/* Arrow Nav */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scrollTestimonials(-1)}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-[#233d63] hover:border-[#233d63] hover:text-white text-slate-600 flex items-center justify-center shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={() => scrollTestimonials(1)}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-[#233d63] hover:border-[#233d63] hover:text-white text-slate-600 flex items-center justify-center shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </ScrollReveal>

        {/* Drag-scrollable Cards Row */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#f8f9fa] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#f8f9fa] to-transparent z-10 pointer-events-none" />

          <div
            ref={testimonialsScrollRef}
            onMouseDown={handleTDragStart}
            onMouseMove={handleTDragMove}
            onMouseUp={handleTDragEnd}
            onMouseLeave={handleTDragEnd}
            onTouchStart={handleTDragStart}
            onTouchMove={handleTDragMove}
            onTouchEnd={handleTDragEnd}
            onScroll={() => {
              const el = testimonialsScrollRef.current;
              if (!el) return;
              const cardWidth = el.querySelector('[data-card]')?.offsetWidth + 24 || 374;
              setActiveTestimonialDot(Math.round(el.scrollLeft / cardWidth));
            }}
            className="flex gap-6 overflow-x-auto py-4 px-1 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden select-none"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                data-card
                className="w-[280px] sm:w-[350px] shrink-0 snap-start bg-white border border-slate-200/70 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:border-[#233d63]/30 hover:shadow-md transition-all duration-300 text-slate-800 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-0.5 text-amber-500 text-base">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-medium">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3.5 mt-6 pt-4 border-t border-slate-200/60">
                  <div className="w-10 h-10 rounded-full bg-[#233d63]/10 border border-[#233d63]/20 flex items-center justify-center text-[#233d63] font-bold text-sm shrink-0 group-hover:bg-[#233d63]/15 transition-colors">
                    {t.name[0]}
                  </div>
                  <div className="flex flex-col items-start min-w-0">
                    <span className="font-heading font-bold text-xs sm:text-sm text-slate-900 truncate w-full">{t.name}</span>
                    <span className="text-[10px] sm:text-xs text-slate-500 truncate w-full mt-0.5">{t.program} &bull; {t.country}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center justify-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToTestimonial(idx)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                activeTestimonialDot === idx
                  ? 'w-6 h-2 bg-[#233d63]'
                  : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
