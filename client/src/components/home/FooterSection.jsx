import React from 'react';
import { useNavigate } from 'react-router-dom';
import Velaris from '../Velaris';

export default function FooterSection() {
  const navigate = useNavigate();

  return (
    <footer className="w-full text-white font-sans border-t border-white/10 relative overflow-hidden z-10">
      <Velaris
        bg="#0d1b2e"
        colors={['#2d4f7c', '#60a5fa', '#1b2a47', '#3b6aa0']}
        speed={1.2}
        grain={0.25}
        height="auto"
      >
        <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-10 space-y-16">

          {/* Top Newsletter & CTA Glass Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center lg:text-left">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-300">
                START YOUR JOURNEY
              </span>
              <h2 className="font-heading font-semibold text-white text-xl sm:text-2xl md:text-3xl leading-tight tracking-tight">
                Your Gateway to a <span className="text-[#60a5fa] italic font-serif font-medium">World-Class Education</span> Starts Here
              </h2>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                Subscribe for study abroad tips, scholarship alerts, visa updates, and destination guides—delivered to your inbox.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full sm:w-80 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 text-xs sm:text-sm focus:outline-none focus:border-white/50 transition-colors"
              />
              <button
                className="shiny-cta py-3.5 px-7 w-full sm:w-auto text-center shrink-0 cursor-pointer"
                onClick={() => navigate('/form')}
              >
                <span>Subscribe Now</span>
              </button>
            </div>
          </div>

          {/* Navigation Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-left pt-6">

            {/* Brand Col */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-7 h-7">
                    <circle cx="12" cy="12" r="10" fill="white" />
                    <rect x="2" y="10.8" width="20" height="2.4" fill="#0d1b2e" />
                    <rect x="10.8" y="2" width="2.4" height="20" fill="#0d1b2e" />
                    <circle cx="12" cy="12" r="4.2" fill="#0d1b2e" />
                    <circle cx="12" cy="12" r="2.2" fill="white" />
                  </svg>
                </div>
                <span className="font-heading font-bold text-xl text-white tracking-tight">Fair Future</span>
              </div>
              <p className="text-white/60 text-xs leading-relaxed max-w-sm">
                Kerala's leading overseas education consultancy with 18+ years of expertise. Officially representing 500+ global universities across 10 top study destinations.
              </p>
            </div>

            {/* Col 2 */}
            <div className="space-y-3">
              <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Destinations</h4>
              <ul className="space-y-2 text-xs text-white/70">
                {['Study in Canada', 'Study in UK', 'Study in Australia', 'Study in USA', 'Study in Germany', 'Study in Ireland'].map(item => (
                  <li key={item}>
                    <button onClick={() => navigate('/form')} className="hover:text-white transition-colors cursor-pointer text-left">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 */}
            <div className="space-y-3">
              <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Services</h4>
              <ul className="space-y-2 text-xs text-white/70">
                {['University Admissions', 'Student Visa Guidance', 'Scholarships & Grants', 'IELTS & Test Prep', 'Pre-Departure Briefings', 'Post-Arrival Support'].map(item => (
                  <li key={item}>
                    <button onClick={() => navigate('/form')} className="hover:text-white transition-colors cursor-pointer text-left">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 */}
            <div className="space-y-3">
              <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Contact Us</h4>
              <div className="space-y-2 text-xs text-white/70">
                <p>📍 Main Branch: Kochi, Kerala, India</p>
                <p>📞 Phone: +91 98470 12345</p>
                <p>✉️ Email: info@fairfutureonline.com</p>
                <p>⏰ Mon - Sat: 9:00 AM - 6:00 PM</p>
              </div>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
            <p>© {new Date().getFullYear()} Fair Future Education Consultancy. All rights reserved.</p>
            <div className="flex space-x-6">
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
              <span className="hover:text-white transition-colors cursor-pointer">Sitemap</span>
            </div>
          </div>

        </div>
      </Velaris>
    </footer>
  );
}
