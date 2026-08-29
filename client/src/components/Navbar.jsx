import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('');

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Only perform scroll spy on the Home page
      if (location.pathname !== '/') return;

      if (window.scrollY < 250) {
        setActiveSection('');
        return;
      }

      const sections = [
        { id: 'about', el: document.getElementById('about') },
        { id: 'why', el: document.getElementById('why') },
        { id: 'process', el: document.getElementById('process') },
        { id: 'testimonials', el: document.getElementById('testimonials') },
      ];

      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.el && scrollPosition >= sec.el.offsetTop) {
          setActiveSection(sec.id);
          return;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close menu on Escape key
  React.useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setMobileMenuOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  // Scroll to a section anchor on the home page; if on another page, navigate home first then scroll
  const scrollToSection = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLogoClick = () => {
    setActiveSection('');
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const links = [
    { id: 'about',        label: 'About Us',     action: () => scrollToSection('about') },
    { id: 'why',          label: 'Why Us',       action: () => scrollToSection('why') },
    { id: 'process',      label: 'Our Process',  action: () => scrollToSection('process') },
    { id: 'testimonials', label: 'Testimonials', action: () => scrollToSection('testimonials') },
  ];

  const isHome = location.pathname === '/';

  // Hide Navbar completely on /form and /admin pages (placed after all hooks to observe React Rules of Hooks)
  if (location.pathname === '/form' || location.pathname === '/admin') {
    return null;
  }

  return (
    /* Fixed wrapper — always visible on top of all page content */
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 lg:px-6 flex justify-center navbar-reveal pointer-events-none">

      <div className="w-full max-w-[1720px] flex flex-col items-center pointer-events-auto">

        {/* Main bar with smooth width, background, blur, and border transitions */}
        <div
          className={`w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between ${
            scrolled
              ? 'max-w-4xl bg-white/75 backdrop-blur-xl shadow-lg border border-white/50 py-2 px-5 rounded-full'
              : 'max-w-full bg-white shadow-md border border-slate-100/50 py-3 px-4 rounded-2xl'
          }`}
        >

          {/* Logo -> Clicking logo takes user smoothly to Hero section */}
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-2.5 cursor-pointer group"
            title="Return to Hero Section"
          >
            <div className="w-7 h-7 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <circle cx="12" cy="12" r="10" fill="currentColor" className="text-slate-900" />
                <rect x="2" y="10.8" width="20" height="2.4" fill="white" />
                <rect x="10.8" y="2" width="2.4" height="20" fill="white" />
                <circle cx="12" cy="12" r="4.2" fill="white" />
                <circle cx="12" cy="12" r="2.2" fill="currentColor" className="text-slate-900" />
              </svg>
            </div>
            <span className="font-heading font-bold text-lg text-slate-900 tracking-tight">Fair Future</span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-semibold text-slate-600">
            {links.map(({ id, label, action }) => {
              const active = isHome && activeSection === id;
              return (
                <button
                  key={label}
                  onClick={action}
                  className={`transition-colors cursor-pointer ${
                    active ? 'flex items-center text-slate-900 font-bold' : 'hover:text-slate-900'
                  }`}
                >
                  {active && <span className="mr-1.5 text-xs text-slate-900">•</span>}
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex">
            <button className="shiny-cta pl-5 pr-2 py-2" onClick={() => navigate('/form')}>
              <span>
                Book Free Consultation
                <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center text-[#233d63] ml-2.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </span>
            </button>
          </div>

          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex flex-col items-center justify-center w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors gap-1.5 cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={`block w-5 h-0.5 bg-slate-900 rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-slate-900 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-slate-900 rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`lg:hidden w-full max-w-4xl overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-[520px] opacity-100 mt-2' : 'max-h-0 opacity-0 pointer-events-none'}`}
        >
          <nav className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 px-4 py-4 flex flex-col space-y-1">
            {links.map(({ id, label, action }) => {
              const active = isHome && activeSection === id;
              return (
                <button
                  key={label}
                  onClick={action}
                  className={`text-left px-3 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer flex items-center ${
                    active
                      ? 'text-[#233d63] bg-[#233d63]/8 font-bold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {active && <span className="mr-1.5 text-xs text-[#233d63]">•</span>}
                  {label}
                </button>
              );
            })}

            {/* Divider + Book Consultation CTA */}
            <div className="pt-3 mt-1 border-t border-slate-100">
              <button
                className="shiny-cta py-3 w-full"
                onClick={() => { setMobileMenuOpen(false); navigate('/form'); }}
              >
                <span>Book Free Consultation</span>
              </button>
            </div>
          </nav>
        </div>

      </div>
    </div>
  );
}
