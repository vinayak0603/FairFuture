import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroBg from '../../assets/heroBg.png';

export default function HeroSection({ isLoaded, scrollY }) {
  const navigate = useNavigate();

  const bgScale = isLoaded ? Math.min(1.3, 1 + scrollY * 0.0008) : 1.25;
  const bgTransition = isLoaded && scrollY > 0 ? 'none' : 'transform 2s cubic-bezier(0.16, 1, 0.3, 1)';

  const avatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80',
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80',
  ];

  return (
    <div className="w-full min-h-screen lg:h-screen relative overflow-hidden flex flex-col justify-between pt-24 lg:pt-6 px-4 pb-4 lg:p-6 font-sans antialiased">

      {/* Zooming Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-[75%_80%] lg:bg-[center_80%] bg-no-repeat z-0 pointer-events-none origin-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          transform: `scale(${bgScale})`,
          transition: bgTransition
        }}
      />

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none lg:bg-transparent z-0"></div>

      {/* Glassmorphic Gradient Blur */}
      <div className="progressive-blur-overlay"></div>

      {/* Content Area */}
      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mt-6 mb-6 lg:mt-8 lg:mb-4">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6 lg:space-y-0 hero-left-reveal">
          <div className="flex flex-col items-start justify-center flex-1">
            <h1 className="font-heading font-semibold text-white tracking-tight leading-[1.08] text-[2.25rem] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.75rem] max-w-full lg:max-w-[800px] hero-title-reveal">
              Want to take-off<br />in your career<br />with a global education?
            </h1>

            <p className="text-white/95 font-sans text-xs md:text-sm leading-relaxed max-w-[420px] mt-3 lg:mt-4 hero-desc-reveal">
              We are here to take care of everything.
            </p>

            <div className="hero-cta-reveal">
              <button className="shiny-cta pl-5 pr-2 py-2 mt-4 lg:mt-6" onClick={() => navigate('/form')}>
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
          </div>

          {/* Stats Widget */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-[20px] p-3.5 w-[210px] shadow-lg shadow-black/10 flex flex-col justify-between shrink-0 mb-2 lg:mb-0 hero-widget-reveal">
            <div className="flex items-center space-x-2.5 mb-3">
              <span className="text-2xl md:text-3.5xl font-bold tracking-tight text-white leading-none">12k+</span>
              <div className="text-[9px] leading-tight uppercase tracking-wider text-white/90 font-semibold">
                <div>students guided</div>
                <div>globally</div>
              </div>
            </div>

            <div className="flex items-center pl-1.5">
              {avatars.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Avatar ${i + 1}`}
                  className="w-6 h-6 md:w-7 md:h-7 rounded-full border border-white/30 -ml-1.5 shadow-sm object-cover"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-end space-y-5 pb-2 mt-8 lg:mt-0 hero-right-reveal">
          <div className="flex flex-col gap-1.5 items-start lg:items-end w-full">
            <div className="flex flex-wrap gap-1.5">
              {['Admissions', 'Student Visas'].map((tag) => (
                <span
                  key={tag}
                  className="backdrop-blur-md bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full text-[11px] md:text-xs font-semibold hover:bg-white/20 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['Scholarships', 'IELTS & TOEFL', 'Career Guidance'].map((tag) => (
                <span
                  key={tag}
                  className="backdrop-blur-md bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full text-[11px] md:text-xs font-semibold hover:bg-white/20 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="max-w-[320px] text-left lg:text-right">
            <h3 className="font-heading font-bold text-white text-sm md:text-base tracking-tight">
              Find your perfect program and country with Fair Future
            </h3>
            <p className="text-white/80 font-sans text-[11px] md:text-xs leading-relaxed mt-1.5">
              Explore university admissions, courses, and visa counseling options tailored to your educational goals.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
