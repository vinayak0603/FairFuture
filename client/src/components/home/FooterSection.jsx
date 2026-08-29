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
                className="bg-transparent text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none flex-1 pr-2"
              />
              <button type="submit" className="shiny-cta px-5 py-2 shrink-0 cursor-pointer">
                <span>Subscribe</span>
              </button>
            </form>
          </div>

          {/* Quadrant 3: Bottom-Left */}
          <div className="p-8 md:p-12 lg:p-16 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between space-y-12">

            {/* Link Directories */}
            <div className="grid grid-cols-3 gap-6">

              {/* Directory 1 */}
              <div>
                <h4 className="font-heading font-bold text-white text-xs sm:text-sm uppercase tracking-wider mb-4">Quick Links</h4>
                <ul className="flex flex-col space-y-2.5 text-white/60 text-xs sm:text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Our Services</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>

              {/* Directory 2 */}
              <div>
                <h4 className="font-heading font-bold text-white text-xs sm:text-sm uppercase tracking-wider mb-4">Destinations</h4>
                <ul className="flex flex-col space-y-2.5 text-white/60 text-xs sm:text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Canada</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">United Kingdom</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Australia</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Germany</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">USA</a></li>
                </ul>
              </div>

              {/* Directory 3 */}
              <div>
                <h4 className="font-heading font-bold text-white text-xs sm:text-sm uppercase tracking-wider mb-4">Support</h4>
                <ul className="flex flex-col space-y-2.5 text-white/60 text-xs sm:text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                  <li><a href="/form" className="hover:text-white transition-colors">Free Consultation</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Visa Guidance</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Scholarship Info</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                </ul>
              </div>

            </div>

            {/* Copyright */}
            <span className="text-white/40 text-xs mt-auto font-sans">
              © 2025 Fair Future. All rights reserved.
            </span>
          </div>

          {/* Quadrant 4: Bottom-Right */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-between space-y-10">

            {/* Phone & Email Section */}
            <div className="space-y-1.5">
              <a href="tel:18004191210" className="text-white font-heading font-bold text-lg sm:text-xl block hover:text-white/80 transition-colors">
                Toll Free: 1800 419 1210
              </a>
              <a href="tel:+917558090909" className="text-white/70 hover:text-white text-xs sm:text-sm font-sans transition-colors block">
                Mob: +91 7558 09 09 09
              </a>
              <a href="mailto:info@fairfutureonline.com" className="text-white/70 hover:text-white text-xs sm:text-sm font-sans underline transition-colors block mt-1">
                info@fairfutureonline.com
              </a>
            </div>

            {/* Office Locations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Location 1 — Main Office */}
              <div>
                <span className="font-heading font-bold text-white/50 text-[10px] sm:text-xs tracking-wider uppercase mb-2 block">Kochi — Head Office</span>
                <p className="text-white/60 text-[11px] sm:text-xs leading-relaxed">
                  Fair Future Edifice, East of Ravipuram Junction off M.G. Road, Near Ravipuram Sree Krishna Swami Temple, Cochin 682016, Kerala, India.
                </p>
              </div>

              {/* Location 2 — Branch */}
              <div>
                <span className="font-heading font-bold text-white/50 text-[10px] sm:text-xs tracking-wider uppercase mb-2 block">Thrissur — Branch</span>
                <p className="text-white/60 text-[11px] sm:text-xs leading-relaxed">
                  2nd Floor, Marvel Tower, Round South, Near KSRTC Bus Stand, Thrissur 680001, Kerala, India.
                </p>
              </div>

            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 mt-auto">
              {/* X */}
              <a href="#" className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </Velaris>
    </footer>
  );
}
