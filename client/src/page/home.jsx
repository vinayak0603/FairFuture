import React from 'react';
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
  return (
    <div className="w-full min-h-screen bg-[#0c0f16] font-sans selection:bg-[#233d63] selection:text-white relative">
      <SEO />

      {/* Hero Landing Section */}
      <HeroSection />

      {/* About Us Section */}
      <AboutSection />

      {/* Why Choose Us Section */}
      <WhyUsSection />

      {/* Global Presence Section */}
      <GlobalPresenceSection />

      {/* Consultation Process Section */}
      <ProcessSection />

      {/* Certified Counselors Section */}
      <CounselorsSection />

      {/* Student Testimonials Section */}
      <TestimonialsSection />

      {/* Frequently Asked Questions Section */}
      <FaqSection />

      {/* Footer Banner & Navigation Section */}
      <FooterSection />
    </div>
  );
}
