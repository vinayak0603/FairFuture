import React from 'react';
import { useNavigate } from 'react-router-dom';
import Velaris from '../Velaris';
import ScrollReveal from '../ScrollReveal';

export default function FooterSection() {
  const navigate = useNavigate();

  return (
    <footer className="w-full text-white font-sans border-t border-white/10 relative overflow-hidden z-10">
      <Velaris
        bg="#0d1b2e"
        colors={['#2d4f7c', '#60a5fa', '#1b2a47', '#3b6aa0']}
        speed={1.2}
        grain={0.25}
        height="100%"
      >
        {/* Main Quadrant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 relative z-10">

          {/* Quadrant 1: Top-Left */}
          <div className="p-8 md:p-12 lg:p-16 border-b md:border-r border-white/10 flex flex-col justify-between space-y-8">

            {/* Logo and Description */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 relative flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
                    <circle cx="12" cy="12" r="10" fill="currentColor" className="text-white" />
                    <rect x="2" y="10.8" width="20" height="2.4" fill="#1b2a47" />
                    <rect x="10.8" y="2" width="2.4" height="20" fill="#1b2a47" />
                    <circle cx="12" cy="12" r="4.2" fill="#1b2a47" />
                    <circle cx="12" cy="12" r="2.2" fill="currentColor" className="text-white" />
                  </svg>
                </div>
                <span className="font-heading font-bold text-lg md:text-xl text-white tracking-tight">Fair Future</span>
              </div>

              <p className="text-white/60 text-xs sm:text-sm max-w-sm leading-relaxed font-normal">
                Kerala's most trusted overseas education consultancy — helping students turn their global education dreams into reality for over 18 years.
              </p>
            </div>

            {/* CTA Button */}
            <button className="shiny-cta py-3 w-full max-w-md mt-6 cursor-pointer" onClick={() => navigate('/form')}>
              <span>Book Free Consultation</span>
            </button>
          </div>

          {/* Quadrant 2: Top-Right */}
          <div className="p-8 md:p-12 lg:p-16 border-b border-white/10 flex flex-col justify-between space-y-6">

            {/* Title & Newsletter Description */}
            <ScrollReveal delay={0.1} className="space-y-3">
              <h2 className="font-heading font-semibold text-white text-xl sm:text-2xl md:text-3xl max-w-md leading-tight tracking-tight">
                Your Gateway to a <span className="text-[#60a5fa] italic font-serif font-medium">World-Class Education</span> Starts Here
              </h2>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                Subscribe for study abroad tips, scholarship alerts, visa updates, and destination guides — delivered to your inbox.
              </p>
            </ScrollReveal>

            {/* Newsletter Subscription Form */}
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center border border-white/20 rounded-full p-1 pl-4 bg-transparent max-w-md hover:border-white/35 transition-colors">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="bg-transparent border-none outline-none text-xs sm:text-sm text-white placeholder-white/40 flex-1 min-w-0"
              />
              <button type="submit" className="bg-[#60a5fa] hover:bg-[#3b82f6] text-[#0c0f16] font-bold px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm transition-colors cursor-pointer shrink-0">
                Subscribe
              </button>
            </form>

          </div>

          {/* Quadrant 3: Bottom-Left */}
          <div className="p-8 md:p-12 lg:p-16 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">Headquarters & Contact</span>
              <div className="text-white/70 text-xs sm:text-sm space-y-2 leading-relaxed">
                <p className="font-semibold text-white">Fair Future Overseas Education Consultancy</p>
                <p>Kochi & Trivandrum Offices, Kerala, India</p>
                <p className="pt-2 text-white/90">Email: info@fairfuture.com | Phone: +91 98470 00000</p>
              </div>
            </div>
          </div>

          {/* Quadrant 4: Bottom-Right */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-between space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-white/50 gap-4">
              <p>&copy; {new Date().getFullYear()} Fair Future Education Consultancy. All rights reserved.</p>
              <div className="flex items-center space-x-4 text-xs text-white/60">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <span>&bull;</span>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>

        </div>
      </Velaris>
    </footer>
  );
}
