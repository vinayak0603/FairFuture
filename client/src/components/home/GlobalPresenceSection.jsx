import React from 'react';
import { useNavigate } from 'react-router-dom';
import Velaris from '../Velaris';
import ScrollReveal from '../ScrollReveal';

export default function GlobalPresenceSection() {
  const navigate = useNavigate();

  return (
    <div className="w-full" style={{ height: '300px' }}>
      <Velaris
        bg="#0d1b2e"
        colors={['#2d4f7c', '#60a5fa', '#1b2a47', '#3b6aa0']}
        speed={1.6}
        grain={0.28}
        height="100%"
      >
        <ScrollReveal delay={0.1} className="h-full flex flex-col items-center justify-center px-6 md:px-12 text-center space-y-6">

          {/* Label tag */}
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-sky-300/80 block">
            Trusted Worldwide
          </span>

          {/* Headline */}
          <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-tight tracking-tight max-w-3xl">
            Our Presence <span className="text-[#60a5fa] italic font-serif font-medium">Around the World</span>
          </h2>

          {/* CTA Button */}
          <button className="shiny-cta pl-6 pr-2 py-2.5 group cursor-pointer" onClick={() => navigate('/form')}>
            <span>
              Book Free Consultation
              <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center text-[#233d63] ml-3">
                <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </span>
          </button>

        </ScrollReveal>
      </Velaris>
    </div>
  );
}
