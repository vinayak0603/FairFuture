import React from 'react';
import ScrollReveal from '../ScrollReveal';

export default function AboutSection() {
  return (
    <section id="about" className="w-full bg-[#f8f9fa] py-14 lg:py-20 px-6 md:px-12 lg:px-24 min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden text-slate-900 font-sans">
      {/* Left Floating Image (Desktop) */}
      <ScrollReveal delay={0.2} direction="right" className="absolute left-8 xl:left-16 top-16 w-[180px] xl:w-[220px] aspect-[4/5] rounded-[24px] overflow-hidden shadow-lg hidden lg:block border border-slate-100 hover:scale-[1.02] transition-transform duration-300">
        <img
          src="https://images.pexels.com/photos/8962372/pexels-photo-8962372.jpeg"
          alt="About us student smiling"
          className="w-full h-full object-cover"
        />
      </ScrollReveal>

      {/* Center: Main Content Card */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center space-y-6 lg:space-y-8">
        <ScrollReveal delay={0.05}>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">ABOUT US</span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-heading font-semibold text-slate-900 text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.12] tracking-tight max-w-2xl">
            About <span className="text-[#233d63] italic font-serif font-medium">Fair Future</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
            Fair Future is one of the oldest overseas education consultancy based in Kerala. Having achieved the milestone of 18 plus years of service in providing consultation to top ranked universities in Canada, the U.S.A, Australia, New Zealand, the U.K, Ireland, France, Germany and Switzerland for international students recruitment as their official representative.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
            Fair Future has provided counseling to more than <span className="font-heading font-bold text-[#233d63]">100,000 students</span> from Kerala in fulfilling their dream of studying abroad till date. That's not all! Fair Future is also officially representing more than <span className="font-heading font-bold text-[#233d63]">500 institutes</span> from around the world.
          </p>
        </ScrollReveal>

        {/* Stats Bar */}
        <div className="w-full mt-0 pt-3 border-t border-slate-200/60 z-20">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-6 md:gap-x-4 w-full">
            {[
              { value: '500+', label: 'Institutions Worldwide' },
              { value: '10', label: 'Countries' },
              { value: '1L+', label: 'Students Counselled' },
              { value: '12k', label: 'Students Abroad' },
              { value: '18+', label: 'Years Experience' }
            ].map((stat, i) => (
              <ScrollReveal
                key={i}
                delay={0.2 + i * 0.05}
                className={`flex flex-col items-center text-center ${i === 4 ? 'col-span-2 md:col-span-1' : 'col-span-1'}`}
              >
                <span
                  className="text-4xl sm:text-5xl text-[#233d63] tracking-tight leading-none mb-1.5 font-bold"
                  style={{ fontFamily: 'cursive' }}
                >
                  {stat.value}
                </span>
                <span className="text-slate-500 text-[10px] sm:text-xs font-semibold leading-tight tracking-wide uppercase">
                  {stat.label}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
