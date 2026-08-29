import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../ScrollReveal';

export default function FaqSection({
  faqItems,
  activeCategory,
  setActiveCategory,
  openFaq,
  setOpenFaq,
}) {
  const navigate = useNavigate();

  return (
    <section id="faq" className="w-full bg-[#f8f9fa] py-14 lg:py-20 px-6 md:px-8 lg:px-10 border-t border-slate-100/50 text-slate-900">
      <div className="w-full max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

        {/* Left Column: Sticky Header details */}
        <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
          <ScrollReveal delay={0.1} className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">FAQ</span>
            <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
              Frequently <span className="text-[#233d63] italic font-serif font-medium">Asked Questions</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md">
              Find quick answers to common queries about study abroad services, student visa applications, tuition costs, and country guidelines.
            </p>
          </ScrollReveal>

          {/* Organized Category Buttons */}
          <div className="flex flex-row gap-3 w-full">
            {['Canada', 'UK'].map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setOpenFaq(null); // Close active FAQ when switching categories
                  }}
                  className={`px-4 py-3 rounded-xl font-heading font-bold text-xs sm:text-sm text-center transition-all border cursor-pointer flex items-center justify-center space-x-2 w-1/2 sm:w-auto sm:px-6 ${isActive
                    ? 'bg-[#233d63] text-white border-transparent shadow-md'
                    : 'bg-white border-slate-100 text-slate-700 hover:bg-[#233d63]/5 hover:text-[#233d63] shadow-sm'
                    }`}
                >
                  <span>{category === 'Canada' ? 'Canada' : 'United Kingdom'}</span>
                </button>
              );
            })}
          </div>

          {/* Helpful support helper card (Desktop only) */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm max-w-sm text-slate-900 hidden lg:block">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#233d63]/10 flex items-center justify-center text-[#233d63]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h4 className="font-heading font-bold text-slate-900 text-sm">Still have questions?</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">We are available 24/7 to help you.</p>
              </div>
            </div>

            <button className="shiny-cta py-2.5 w-full text-center" onClick={() => navigate('/form')}>
              <span>Contact Support</span>
            </button>
          </div>
        </div>

        {/* Right Column: FAQ Accordion list */}
        <div className="lg:col-span-7 space-y-4">

          {/* Filtered Accordion List */}
          {faqItems
            .filter((item) => item.category === activeCategory)
            .map((item) => {
              const isOpen = openFaq === item.id;
              return (
                <div key={item.id} className="border-b border-slate-200/60 pb-4">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between text-left focus:outline-none group py-2 cursor-pointer"
                  >
                    <div className={`relative flex-1 flex items-center space-x-3 rounded-xl px-4 py-2.5 border transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] min-w-0 ${isOpen ? 'bg-[#233d63]/15 border-transparent text-[#233d63]' : 'bg-white border-slate-100 hover:bg-[#233d63]/10 text-slate-800'}`}>
                      <span className="font-heading font-bold text-sm sm:text-base md:text-lg leading-tight break-words">
                        {item.question}
                      </span>
                    </div>

                    <span className={`shrink-0 ml-4 rounded-full w-7 h-7 flex items-center justify-center border transition-all ${isOpen ? 'bg-[#233d63]/10 border-[#233d63]/25 text-[#233d63]' : 'border-slate-200 text-slate-400 group-hover:border-slate-300 group-hover:text-slate-600'}`}>
                      {isOpen ? (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                        </svg>
                      )}
                    </span>
                  </button>

                  {/* Transitionable Accordion Content */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0 pointer-events-none'}`}
                  >
                    <div className="ml-3 sm:ml-5 mt-1">
                      <div className="bg-[#233d63] text-white rounded-2xl px-4 py-2.5 text-xs sm:text-sm w-fit max-w-full md:max-w-md leading-relaxed shadow-sm">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          {/* Helpful support helper card (Mobile only) */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm w-full text-slate-900 block lg:hidden mt-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#233d63]/10 flex items-center justify-center text-[#233d63] shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h4 className="font-heading font-bold text-slate-900 text-sm">Still have questions?</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">We are available 24/7 to help you.</p>
              </div>
            </div>

            <button className="shiny-cta py-2.5 w-full text-center" onClick={() => navigate('/form')}>
              <span>Contact Support</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
