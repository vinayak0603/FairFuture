import React from 'react';
import { motion } from 'framer-motion';
import selectionImg from '../../assets/process/selection.png';
import processingImg from '../../assets/process/processing.png';
import visaImg from '../../assets/process/visa.png';
import moneyImg from '../../assets/process/money.png';

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

export default function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Shortlisting Universities',
      subtitle: 'Based on your profile, academic budget and country preferences.',
      img: selectionImg,
    },
    {
      number: '02',
      title: 'Application & Admission',
      subtitle: 'Complete document verification, SOP review and university submissions.',
      img: processingImg,
    },
    {
      number: '03',
      title: 'Visa Guidance & Processing',
      subtitle: 'Step-by-step guidance for visa filing, interview prep and embassy clearance.',
      img: visaImg,
    },
    {
      number: '04',
      title: 'Scholarship & Fee Assistance',
      subtitle: 'Explore available scholarships, financial grants, and loan facilitation.',
      img: moneyImg,
    },
    {
      number: '05',
      title: 'Pre-Departure Orientation',
      subtitle: 'Accommodation setup, flight booking assistance and post-arrival support.',
      img: selectionImg,
    },
  ];

  return (
    <motion.section
      id="process"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUpVariant}
      className="w-full bg-[#f8f9fa] py-14 lg:py-20 px-6 md:px-8 lg:px-10 border-t border-slate-100/50 text-slate-900 font-sans"
    >
      <div className="w-full max-w-[1720px] mx-auto flex flex-col space-y-12">

        {/* Section Header */}
        <div className="space-y-4 text-center max-w-5xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#233d63]/80 block">OUR PROCESS</span>
          <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight md:whitespace-nowrap">
            How Does the <span className="text-[#233d63] italic font-serif font-medium">Consultation Process</span> Work?
          </h2>
          <div className="text-slate-500 text-xs sm:text-sm leading-relaxed space-y-2 max-w-2xl mx-auto">
            <p>With Fair Future, say goodbye to filling lengthy forms and hello to a hassle-free five steps experience.</p>
            <p className="text-slate-400 text-[11px] sm:text-xs">As your overseas education consultant, our experts will offer step-by-step guidance when it comes to:</p>
          </div>
        </div>

        {/* 5-Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 rounded-[24px] p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#233d63] bg-[#233d63]/10 px-3 py-1 rounded-full">
                    Step {step.number}
                  </span>
                </div>

                <div className="w-full aspect-[4/3] rounded-[16px] overflow-hidden mb-5 bg-slate-50 flex items-center justify-center p-4">
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="font-heading font-bold text-slate-900 text-base sm:text-lg mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {step.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </motion.section>
  );
}
