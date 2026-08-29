import React from 'react';
import { motion } from 'framer-motion';
import testImg from '../../assets/test.png';

const appleEase = [0.16, 1, 0.3, 1];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 45, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: appleEase }
  }
};

export default function CounselorsSection() {
  const counselors = [
    {
      name: "Dr. Rajesh Varma",
      role: "Senior Overseas Education Specialist",
      experience: "14+ Years Experience",
      expertise: "UK, USA & Canada Admissions",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=500&q=80"
    },
    {
      name: "Priya Sundaram",
      role: "Lead Visa & Immigration Advisor",
      experience: "11+ Years Experience",
      expertise: "Australia & New Zealand Visas",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=500&q=80"
    },
    {
      name: "Arun K. Nambiar",
      role: "European Admissions Counselor",
      experience: "9+ Years Experience",
      expertise: "Germany, Sweden & Ireland",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=500&q=80"
    }
  ];

  return (
    <motion.section
      id="counselors"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUpVariant}
      className="w-full bg-[#f8f9fa] py-14 lg:py-20 px-6 md:px-8 lg:px-10 flex items-center justify-center text-slate-900 font-sans border-t border-slate-100/50"
    >
      <div className="w-full max-w-[1720px] mx-auto">

        {/* Mobile Title */}
        <div className="space-y-3 max-w-2xl text-left lg:hidden block mb-8">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">OUR COUNSELORS</span>
          <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
            Meet Our Certified <span className="text-[#233d63] italic font-serif font-medium">Education Counselors</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl">
            Our team of experienced overseas education consultants bring in-depth knowledge and genuine care to help you find the right university, country, and program.
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

          {/* Left Column (Desktop Header) */}
          <div className="lg:col-span-5 hidden lg:flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4 max-w-lg">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">OUR COUNSELORS</span>
              <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
                Meet Our Certified <span className="text-[#233d63] italic font-serif font-medium">Education Counselors</span>
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-lg">
                Our team of experienced overseas education consultants bring in-depth knowledge and genuine care to help you find the right university, country, and program.
              </p>
            </div>

            {/* Testimonial highlight badge */}
            <div className="bg-white border border-slate-200/80 rounded-[24px] p-6 shadow-sm flex items-start gap-4">
              <img src={testImg} alt="Counselor badge" className="w-12 h-12 object-contain" />
              <div>
                <h4 className="font-heading font-bold text-slate-900 text-sm">Official Representative</h4>
                <p className="text-slate-500 text-xs leading-relaxed mt-1">
                  Officially representing over 500+ top universities across Canada, UK, Australia, USA & Europe.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Counselors Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {counselors.map((person, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group hover:-translate-y-1"
              >
                <div className="w-full aspect-[4/5] overflow-hidden bg-slate-100 relative">
                  <img
                    src={person.img}
                    alt={person.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#233d63] border border-white/40">
                    {person.experience}
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1 space-y-2">
                  <div>
                    <h3 className="font-heading font-bold text-slate-900 text-base sm:text-lg">
                      {person.name}
                    </h3>
                    <p className="text-[#233d63] text-xs font-semibold mt-0.5">
                      {person.role}
                    </p>
                  </div>
                  <p className="text-slate-400 text-[11px] pt-2 border-t border-slate-100">
                    Expertise: {person.expertise}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </motion.section>
  );
}
