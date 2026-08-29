import React from 'react';
import Velaris from '../Velaris';
import ScrollReveal from '../ScrollReveal';

import testImg from '../../assets/test.png';
import moneyImg from '../../assets/process/money.png';
import visaImg from '../../assets/process/visa.png';
import processingImg from '../../assets/process/processing.png';
import selectionImg from '../../assets/process/selection.png';

export default function ProcessSection() {
  const processScrollRef = React.useRef(null);

  const steps = [
    {
      step: "STEP 1",
      title: "Selection",
      desc: "Program, University and Country Selection",
      img: selectionImg
    },
    {
      step: "STEP 2",
      title: "Processing",
      desc: "University Application Processing",
      img: processingImg
    },
    {
      step: "STEP 3",
      title: "Tuition Fees",
      desc: "Tuition Fee Payment Assistance",
      img: moneyImg
    },
    {
      step: "STEP 4",
      title: "Visa Approval",
      desc: "Visa Application and Approval guidance",
      img: visaImg
    },
    {
      step: "STEP 5",
      title: "Departure",
      desc: "Travel and Accommodation assistance",
      img: testImg
    }
  ];

  return (
    <section id="process" className="w-full bg-[#f8f9fa] py-14 lg:py-20 px-6 md:px-8 lg:px-10 border-t border-slate-100/50 text-slate-900 font-sans">
      <div className="w-full max-w-[1720px] mx-auto flex flex-col space-y-12">

        {/* Section Header */}
        <ScrollReveal delay={0.1} className="space-y-4 text-center max-w-5xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#233d63]/80 block">OUR PROCESS</span>
          <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight md:whitespace-nowrap">
            How Does the <span className="text-[#233d63] italic font-serif font-medium">Consultation Process</span> Work?
          </h2>
          <div className="text-slate-500 text-xs sm:text-sm leading-relaxed space-y-2 max-w-2xl mx-auto">
            <p>With Fair Future, say goodbye to filling lengthy forms and hello to a hassle-free five steps experience.</p>
            <p className="text-slate-400 text-[11px] sm:text-xs">As your overseas education consultant, our experts will offer step-by-step guidance when it comes to:</p>
          </div>
        </ScrollReveal>

        {/* Timeline Container with Side Navigation Arrows */}
        <div className="relative w-full">
          {/* Left Arrow Button (Mobile/Tablet) */}
          <button
            onClick={() => {
              if (processScrollRef.current) {
                const scrollAmount = processScrollRef.current.clientWidth * 0.85;
                processScrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
              }
            }}
            aria-label="Previous step"
            className="lg:hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-30 w-11 h-11 rounded-full bg-white/75 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-center text-[#233d63] hover:bg-white active:scale-95 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow Button (Mobile/Tablet) */}
          <button
            onClick={() => {
              if (processScrollRef.current) {
                const scrollAmount = processScrollRef.current.clientWidth * 0.85;
                processScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
              }
            }}
            aria-label="Next step"
            className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-30 w-11 h-11 rounded-full bg-white/75 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-center text-[#233d63] hover:bg-white active:scale-95 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Steps Carousel / Grid */}
          <div
            ref={processScrollRef}
            className="flex lg:grid lg:grid-cols-5 gap-6 overflow-x-auto lg:overflow-visible py-4 lg:py-0 px-1 scroll-smooth snap-x snap-mandatory relative z-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {steps.map((stepObj, i) => (
              <div
                key={i}
                className="w-[calc(100vw-56px)] max-w-[340px] sm:w-[320px] lg:w-full flex-shrink-0 snap-center aspect-[1/1.24] sm:aspect-[1/1.45] rounded-[16px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 group relative z-10"
              >
                <Velaris
                  bg="#0f1827"
                  colors={['#142033', '#16243a', '#121d2d', '#152236']}
                  speed={0.6}
                  grain={0.15}
                  height="100%"
                >
                  <div className="h-full p-6 flex flex-col justify-between text-white relative z-10 border border-white/10 rounded-[16px]">

                    {/* Top Content: Step & Title */}
                    <div className="space-y-1 text-center">
                      <span className="text-[10px] font-bold text-sky-300/90 uppercase tracking-widest block">
                        {stepObj.step}
                      </span>
                      <h3 className="font-heading font-extrabold text-white text-lg sm:text-xl tracking-tight leading-tight">
                        {stepObj.title}
                      </h3>
                    </div>

                    {/* Middle Content: Icon & Wave Grid Divider */}
                    <div className="w-full flex flex-col items-center justify-center py-2 relative">
                      <div className="w-full flex items-center justify-center overflow-visible group-hover:scale-110 transition-transform duration-300">
                        <img
                          src={stepObj.img}
                          alt="Process Icon"
                          className="w-48 h-48 sm:w-32 sm:h-32 object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.55)]"
                        />
                      </div>
                    </div>

                    {/* Bottom Content: Step Description */}
                    <p className="text-white/80 text-[11px] sm:text-xs leading-relaxed text-center font-normal mb-2 mx-auto max-w-[190px]">
                      {stepObj.desc}
                    </p>

                  </div>
                </Velaris>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
