import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../ScrollReveal';

export default function WhyUsSection() {
  const navigate = useNavigate();

  return (
    <section id="why" className="w-full bg-[#f8f9fa] py-14 lg:py-20 px-6 md:px-8 lg:px-10 border-t border-slate-100/60 text-slate-900 font-sans">
      <div className="w-full max-w-[1720px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Heading, Description & Action Links */}
          <ScrollReveal delay={0.1} className="lg:col-span-4 space-y-6 text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">WHY FAIR FUTURE?</span>

            <h2 className="font-heading font-extrabold text-slate-900 text-4xl sm:text-5xl lg:text-[3.5rem] tracking-tight leading-[1.08]">
              The <span className="text-[#233d63] italic font-serif font-medium">Fair Future</span> Difference
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              For over 18 years, we've been Kerala's most trusted overseas education consultancy, earning and maintaining the trust of thousands of students and parents across top global destinations.
            </p>

            <div className="pt-2">
              <button
                onClick={() => navigate('/form')}
                className="shiny-cta pl-5 pr-2 py-2 cursor-pointer"
              >
                <span>
                  Book Free Consultation
                  <div className="bg-white rounded-full w-6.5 h-6.5 md:w-7 md:h-7 flex items-center justify-center text-[#233d63] ml-3 md:ml-4">
                    <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </span>
              </button>
            </div>
          </ScrollReveal>

          {/* Right Column: 2 Staggered Feature Columns with Dividers */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-0">

            {/* Middle Column (Column 1 of features) */}
            <div className="flex flex-col justify-start md:pr-4 lg:pr-6">

              {/* Item 1 */}
              <ScrollReveal delay={0.15} className="p-4 sm:p-5 lg:p-4 xl:p-5 pb-8 lg:pb-10 border-b border-slate-200/80 flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#233d63]/10 border border-[#233d63]/20 flex items-center justify-center text-[#233d63] flex-shrink-0 shadow-sm">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <div className="space-y-1.5 text-left flex-1 min-w-0 max-w-none">
                  <h3 className="font-heading font-bold text-slate-900 text-lg sm:text-xl tracking-tight">
                    12,000+ Success Stories
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Experience proven results without breaking the bank—we offer transparent, fair, and high-success guidance.
                  </p>
                </div>
              </ScrollReveal>

              {/* Item 2 */}
              <ScrollReveal delay={0.25} className="p-4 sm:p-5 lg:p-4 xl:p-5 pt-8 lg:pt-10 border-b md:border-b-0 border-slate-200/80 flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#233d63]/10 border border-[#233d63]/20 flex items-center justify-center text-[#233d63] flex-shrink-0 shadow-sm">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                  </svg>
                </div>
                <div className="space-y-1.5 text-left flex-1 min-w-0 max-w-none">
                  <h3 className="font-heading font-bold text-slate-900 text-lg sm:text-xl tracking-tight">
                    Certified Experts
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Choose Fair Future for proven excellence backed by certified overseas education counselors.
                  </p>
                </div>
              </ScrollReveal>

            </div>

            {/* Rightmost Column (Column 2 of features - Staggered downwards) */}
            <div className="flex flex-col justify-start md:border-l border-slate-200/80 md:pl-4 lg:pl-6 md:pt-14 lg:pt-18">

              {/* Item 3 */}
              <ScrollReveal delay={0.2} className="p-4 sm:p-5 lg:p-4 xl:p-5 pb-8 lg:pb-10 border-b border-slate-200/80 flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#233d63]/10 border border-[#233d63]/20 flex items-center justify-center text-[#233d63] flex-shrink-0 shadow-sm">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div className="space-y-1.5 text-left flex-1 min-w-0 max-w-none">
                  <h3 className="font-heading font-bold text-slate-900 text-lg sm:text-xl tracking-tight">
                    500+ Top Institutes
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Don't let budget constraints stop you—explore top university admissions, scholarships, and fee assistance.
                  </p>
                </div>
              </ScrollReveal>

              {/* Item 4 */}
              <ScrollReveal delay={0.3} className="p-4 sm:p-5 lg:p-4 xl:p-5 pt-8 lg:pt-10 flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#233d63]/10 border border-[#233d63]/20 flex items-center justify-center text-[#233d63] flex-shrink-0 shadow-sm">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="space-y-1.5 text-left flex-1 min-w-0 max-w-none">
                  <h3 className="font-heading font-bold text-slate-900 text-lg sm:text-xl tracking-tight">
                    100% Satisfaction
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Don't just take our word for it—see why over 12k students recommend Fair Future for stress-free visa approval.
                  </p>
                </div>
              </ScrollReveal>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
