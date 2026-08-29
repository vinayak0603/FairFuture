import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroBg from '../../assets/heroBg.png';

export default function HeroSection() {
  const [scrollY, setScrollY] = React.useState(0);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const triggerReveal = () => setIsLoaded(true);

    if (window.__loaderDone) {
      triggerReveal();
    } else {
      window.addEventListener('loaderDone', triggerReveal, { once: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('loaderDone', triggerReveal);
    };
  }, []);

  const bgScale = isLoaded ? Math.min(1.3, 1 + scrollY * 0.0008) : 1.25;
  const bgTransition = isLoaded && scrollY > 0 ? 'none' : 'transform 2s cubic-bezier(0.16, 1, 0.3, 1)';

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-[#0c0f16]">

      {/* Dynamic Background Image with Smooth Entry & Parallax Zoom */}
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        style={{
          transform: `scale(${bgScale})`,
          transition: bgTransition,
          willChange: 'transform',
        }}
      >
        <img
          src={heroBg}
          alt="Fair Future Study Abroad"
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
        />
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f16] via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Main Hero Container */}
      <main className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 flex flex-col justify-between flex-grow">

        {/* Floating Top Badge */}
        <div
          className={`self-start transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-semibold tracking-wide shadow-sm hover:bg-white/15 transition-colors cursor-default">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Kerala's #1 Overseas Education Consultancy</span>
          </div>
        </div>

        {/* Center Headline & Content */}
        <div className="my-auto py-8 sm:py-12 max-w-4xl">
          <h1
            className={`font-heading font-extrabold text-white text-4xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] leading-[1.05] tracking-tight transition-all duration-1000 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Shape Your Global <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-white">
              Future Today
            </span>
          </h1>

          <p
            className={`mt-6 text-slate-300 text-base sm:text-lg lg:text-xl font-normal max-w-2xl leading-relaxed transition-all duration-1000 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            18+ Years of Excellence in guiding students to top universities across the UK, USA, Canada, Australia, Ireland & Germany.
          </p>

          {/* Action CTAs */}
          <div
            className={`mt-8 flex flex-wrap items-center gap-4 transition-all duration-1000 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button
              onClick={() => navigate('/form')}
              className="shiny-cta pl-6 pr-2.5 py-3 text-base shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <span>
                Book Free Consultation
                <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center text-[#233d63] ml-3">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </span>
            </button>

            <a
              href="#about"
              className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300 cursor-pointer"
            >
              Explore Programs
            </a>
          </div>
        </div>

        {/* Bottom Metrics Quick Grid */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-white/10 transition-all duration-1000 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { value: '18+', label: 'Years Experience' },
            { value: '12,000+', label: 'Visa Successes' },
            { value: '500+', label: 'Partner Universities' },
            { value: '99%', label: 'Visa Approval Rate' },
          ].map((metric, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-heading font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl tracking-tight">
                {metric.value}
              </span>
              <span className="text-slate-400 text-xs sm:text-sm font-medium mt-0.5">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
