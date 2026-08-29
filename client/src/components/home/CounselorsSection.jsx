import React from 'react';
import { useNavigate } from 'react-router-dom';
import Velaris from '../Velaris';
import ScrollReveal from '../ScrollReveal';

export default function CounselorsSection({ avatars }) {
  const navigate = useNavigate();

  return (
    <section id="counselors" className="w-full bg-[#f8f9fa] py-14 lg:py-20 px-6 md:px-8 lg:px-10 flex items-center justify-center text-slate-900 font-sans border-t border-slate-100/50">
      <div className="w-full max-w-[1720px] mx-auto">

        {/* Title & Description (Mobile Only) */}
        <ScrollReveal delay={0.1} className="space-y-3 max-w-2xl text-left lg:hidden block mb-8">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">OUR COUNSELORS</span>

          <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
            Meet Our Certified <span className="text-[#233d63] italic font-serif font-medium">Education Counselors</span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl">
            Our team of experienced overseas education consultants bring in-depth knowledge and genuine care to help you find the right university, country, and program.
          </p>
        </ScrollReveal>

        {/* Columns grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start w-full">

          {/* Left Column (Images Group) */}
          <div className="lg:col-span-6 flex flex-col space-y-4 lg:space-y-6">

            {/* Top Large Image */}
            <div className="w-full aspect-[1.5/1] rounded-[20px] overflow-hidden shadow-sm border border-slate-100 relative">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&h=400&q=80"
                alt="Dr. Rajesh Varma"
                className="w-full h-full object-cover"
              />
              {/* Glassmorphic Badge */}
              <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-4 backdrop-blur-md bg-black/40 border border-white/20 rounded-xl p-3 text-white">
                <div className="font-bold text-xs sm:text-sm">Dr. Rajesh Varma</div>
                <div className="text-[10px] sm:text-xs text-white/80">Chief Academic Director & Founder</div>
              </div>
            </div>

            {/* Bottom Row of 2 Cards */}
            <div className="grid grid-cols-2 gap-4 lg:gap-6">

              {/* Card A: Small counseling session card */}
              <div className="w-full aspect-[1.25/1] rounded-[16px] overflow-hidden shadow-sm border border-slate-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=350&h=250&q=80"
                  alt="Therapy session"
                  className="w-full h-full object-cover"
                />
                {/* Glassmorphic Badge */}
                <div className="absolute bottom-2 left-2 right-2 backdrop-blur-md bg-black/35 border border-white/20 rounded-lg p-2.5 text-white">
                  <div className="font-bold text-[11px] sm:text-xs">Anjali Nair</div>
                  <div className="text-[9px] text-white/80">Senior Education Counselor</div>
                </div>
              </div>

              {/* Card B: Blue "Meet Your Doctors" Card */}
              <div className="w-full aspect-[1.25/1] rounded-[16px] overflow-hidden shadow-md relative z-10">
                <Velaris
                  bg="#1b2a47"
                  colors={['#2d4f7c', '#60a5fa', '#1b2a47', '#3b6aa0']}
                  speed={1.0}
                  grain={0.2}
                  height="100%"
                >
                  <div className="h-full p-4 lg:p-5 xl:p-6 flex flex-col justify-between text-white relative z-10">
                    <h4 className="font-heading font-bold text-sm sm:text-base lg:text-lg xl:text-xl leading-tight">
                      Talk to Our Expert Counselors
                    </h4>

                    {/* Avatars & Text */}
                    <div className="flex items-center space-x-2.5 lg:space-x-3.5">
                      <div className="flex items-center -space-x-2.5 lg:-space-x-3">
                        {avatars.slice(0, 4).map((url, i) => (
                          <img
                            key={i}
                            src={url}
                            alt="Expert Avatar"
                            className="w-6.5 h-6.5 sm:w-7 sm:h-7 lg:w-9.5 lg:h-9.5 xl:w-10 xl:h-10 rounded-full border-2 border-[#1b2a47] object-cover shadow-sm"
                          />
                        ))}
                      </div>
                      <div className="text-[10px] sm:text-xs lg:text-sm text-white/95 font-semibold leading-tight">
                        <div className="font-bold text-xs sm:text-sm lg:text-base xl:text-lg text-white">50+</div>
                        <div className="text-[9px] text-white/80 font-normal lg:text-xs xl:text-sm">Counselors</div>
                      </div>
                    </div>
                  </div>
                </Velaris>
              </div>

            </div>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6 lg:space-y-8">

            {/* Title & Description (Desktop Only) */}
            <ScrollReveal delay={0.1} className="space-y-3 hidden lg:block">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">OUR COUNSELORS</span>

              <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
                Meet Our Certified <span className="text-[#233d63] italic font-serif font-medium">Education Counselors</span>
              </h2>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-lg">
                Our team of experienced overseas education consultants bring in-depth knowledge and genuine care to help you find the right university, country, and program.
              </p>
            </ScrollReveal>

            {/* Profile Cards Grid */}
            <div className="space-y-4">

              {/* Row 1: Taller cards */}
              <div className="grid grid-cols-2 gap-4">

                {/* Card 1: Priya Menon */}
                <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-[120px] sm:h-[130px]">
                  <div className="flex items-center justify-between">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80"
                      alt="Emily Roberts"
                      className="w-10 h-10 rounded-full object-cover border border-slate-100"
                    />
                    <div className="flex items-center space-x-1">
                      <a href="#" className="w-6 h-6 rounded-md border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
                        <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                      </a>
                      <a href="#" className="w-6 h-6 rounded-md border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
                        <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col items-start mt-2">
                    <span className="font-heading font-bold text-xs sm:text-sm text-slate-900">Priya Menon</span>
                    <span className="text-[10px] sm:text-xs text-slate-500 mt-0.5">Canada & UK Specialist</span>
                  </div>
                </div>

                {/* Card 2: Rajan Thomas */}
                <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-[120px] sm:h-[130px]">
                  <div className="flex items-center justify-between">
                    <img
                      src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=100&h=100&q=80"
                      alt="Dr. Daniel Hoque"
                      className="w-10 h-10 rounded-full object-cover border border-slate-100"
                    />
                    <div className="flex items-center space-x-1">
                      <a href="#" className="w-6 h-6 rounded-md border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
                        <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                      </a>
                      <a href="#" className="w-6 h-6 rounded-md border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
                        <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col items-start mt-2">
                    <span className="font-heading font-bold text-xs sm:text-sm text-slate-900">Rajan Thomas</span>
                    <span className="text-[10px] sm:text-xs text-slate-500 mt-0.5">Australia & NZ Specialist</span>
                  </div>
                </div>

              </div>

              {/* Row 2: Shorter horizontal cards */}
              <div className="grid grid-cols-2 gap-4">

                {/* Card 3: Meera Krishnan */}
                <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow flex items-center space-x-3 h-[65px] sm:h-[75px]">
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
                    alt="Meera Krishnan"
                    className="w-10 h-10 rounded-full object-cover border border-slate-100 shrink-0"
                  />
                  <div className="flex flex-col items-start min-w-0">
                    <span className="font-heading font-bold text-xs sm:text-sm text-slate-900 truncate w-full">Meera Krishnan</span>
                    <span className="text-[9px] sm:text-xs text-slate-500 truncate w-full mt-0.5">Germany & Europe Expert</span>
                  </div>
                </div>

                {/* Card 4: Arun Sajan */}
                <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow flex items-center space-x-3 h-[65px] sm:h-[75px]">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Guy Hawkins"
                    className="w-10 h-10 rounded-full object-cover border border-slate-100 shrink-0"
                  />
                  <div className="flex flex-col items-start min-w-0">
                    <span className="font-heading font-bold text-xs sm:text-sm text-slate-900 truncate w-full">Arun Sajan</span>
                    <span className="text-[9px] sm:text-xs text-slate-500 truncate w-full mt-0.5">Visa & Immigration Advisor</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Meet Our Experts Capsule CTA */}
            <button className="shiny-cta pl-5 pr-2 py-2 w-fit group" onClick={() => navigate('/form')}>
              <span>
                Meet Our Experts
                <div className="bg-white rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-[#233d63] ml-2.5">
                  <svg className="w-3 h-3 md:w-3.5 md:h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </span>
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}
