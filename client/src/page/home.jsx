import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import WhyUsSection from '../components/home/WhyUsSection';
import GlobalPresenceSection from '../components/home/GlobalPresenceSection';
import ProcessSection from '../components/home/ProcessSection';
import CounselorsSection from '../components/home/CounselorsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FaqSection from '../components/home/FaqSection';
import FooterSection from '../components/home/FooterSection';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
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

  return (
    <div className="w-full bg-[#0c0f16] min-h-screen">
      <SEO
        title="Fair Future | Premier Overseas Education Consultancy & Study Abroad Guidance"
        description="Transform your global education dreams with Fair Future Education Consultancy. 18+ years of excellence, 12,000+ visa successes, expert counseling for UK, USA, Canada, Australia, Ireland & Germany."
        keywords="study abroad consultancy, overseas education counselor, foreign university admissions, student visa guidance, Fair Future, UK study visa, Canada student visa, Australia study visa"
      />

      <HeroSection isLoaded={isLoaded} scrollY={scrollY} />
      <AboutSection />
      <WhyUsSection />
      <GlobalPresenceSection />
      <ProcessSection />
      <CounselorsSection />
      <TestimonialsSection />
      <FaqSection />
      <FooterSection />
    </div>
  );
}
