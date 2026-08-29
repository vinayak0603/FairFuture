import React from 'react';
import selectionImg from '../../assets/process/selection.png';
import processingImg from '../../assets/process/processing.png';
import moneyImg from '../../assets/process/money.png';
import visaImg from '../../assets/process/visa.png';
import testImg from '../../assets/test.png';
import Velaris from '../Velaris';
import ScrollReveal from '../ScrollReveal';

export default function ProcessSection() {
  const processScrollRef = React.useRef(null);

  const processSteps = [
    {
      num: '01',
      title: 'Free Profile Evaluation',
      desc: 'Connect with certified study abroad counselors to assess your academic background, career goals, and preferred countries.',
      tag: 'Step 01',
      color: '#233d63',
      img: testImg
    },
    {
      num: '02',
      title: 'Course & University Selection',
      desc: 'Shortlist top ranked global universities matching your budget, program level, and scholarship eligibility.',
      tag: 'Step 02',
      color: '#1b2a47',
      img: selectionImg
    },
    {
      num: '03',
      title: 'Application & Admission Offer',
      desc: 'Seamless document preparation, SOP review, and fast-track application submission for quick offer letters.',
      tag: 'Step 03',
      color: '#2d4f7c',
      img: processingImg
    },
    {
      num: '04',
      title: 'Scholarship & Fee Assistance',
      desc: 'Explore fee payment options, educational loan assistance, GIC setup, and scholarship applications.',
      tag: 'Step 04',
      color: '#16243a',
      img: moneyImg
    },
    {
      num: '05',
      title: 'Student Visa & Pre-Departure',
      desc: 'End-to-end visa filing, mock interview prep, medical guidance, and pre-departure briefings.',
      tag: 'Step 05',
      color: '#0d1b2e',
      img: visaImg
    }
  ];

  const scrollProcess = (direction) => {
    if (processScrollRef.current) {
      const scrollAmount = 360;
      processScrollRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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
          {/* Left Arrow Button */}
          <button
            onClick={() => scrollProcess(-1)}
            aria-label="Scroll process timeline left"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-white hover:bg-[#233d63] hover:border-[#233d63] flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scrollProcess(1)}
            aria-label="Scroll process timeline right"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-white hover:bg-[#233d63] hover:border-[#233d63] flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Desktop connecting track line */}
          <div className="hidden lg:block absolute top-[44%] left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-[#233d63]/25 z-0 pointer-events-none" />

          {/* Scrollable Timeline Grid */}
          <div
            ref={processScrollRef}
            className="flex gap-6 overflow-x-auto py-6 px-4 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {processSteps.map((stepObj, idx) => (
              <div
                key={idx}
                className={`flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[340px] snap-start relative group ${
                  idx % 2 === 1 ? 'lg:translate-y-6' : 'lg:-translate-y-2'
                }`}
              >
                <Velaris
                  bg={stepObj.color}
                  colors={['#2d4f7c', '#60a5fa', '#1b2a47', '#3b6aa0']}
                  speed={0.8}
                  grain={0.2}
                  height="100%"
                >
                  <div className="bg-[#233d63]/20 border border-slate-100/20 rounded-[28px] p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-[420px] sm:h-[440px]">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-white border border-white/15">
                          {stepObj.tag}
                        </span>
                        <span className="font-heading font-black text-3xl text-white/40 group-hover:text-white/80 transition-colors">
                          {stepObj.num}
                        </span>
                      </div>

                      <div className="w-full h-36 rounded-2xl overflow-hidden bg-black/20 border border-white/10 relative">
                        <img
                          src={stepObj.img}
                          alt={stepObj.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 text-left pt-2">
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-white leading-tight">
                        {stepObj.title}
                      </h3>
                      <p className="text-white/70 text-xs leading-relaxed line-clamp-3">
                        {stepObj.desc}
                      </p>
                    </div>
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
