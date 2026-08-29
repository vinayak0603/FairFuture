import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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

export default function FaqSection() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Canada');
  const [openFaq, setOpenFaq] = useState(null);

  const faqItems = [
    {
      id: 1,
      category: "Canada",
      question: "How much does it cost to study in Canada?",
      answer: "Tuition fees range from CAD 15,000 to CAD 35,000 per year for undergraduate programs. Living expenses require an additional CAD 10,000 to CAD 15,000 annually.",
      icon: "💰"
    },
    {
      id: 2,
      category: "Canada",
      question: "How long does it take to get a Canadian student visa?",
      answer: "Processing times usually range from 4 to 12 weeks. Using the Student Direct Stream (SDS) can expedite the process to under 20 calendar days for eligible countries.",
      icon: "⏱️"
    },
    {
      id: 3,
      category: "Canada",
      question: "Which tests do I need to take to study in Canada?",
      answer: "You generally need an English proficiency test like IELTS (academic) or TOEFL, or French tests like TEF. Some graduate programs may require GMAT or GRE.",
      icon: "📝"
    },
    {
      id: 4,
      category: "Canada",
      question: "Do I need a PCC/medical test to study abroad?",
      answer: "Yes, Canadian immigration requires a medical exam by an empanelled physician. A Police Clearance Certificate (PCC) is also required to prove clean record status.",
      icon: "🏥"
    },
    {
      id: 5,
      category: "Canada",
      question: "Can I get a work visa after I complete my studies in Canada?",
      answer: "Yes, you can apply for a Post-Graduation Work Permit (PGWP) which allows you to work in Canada for up to 3 years, depending on the duration of your study program.",
      icon: "💼"
    },
    {
      id: 6,
      category: "Canada",
      question: "Can I take dependents to Canada on my student visa?",
      answer: "Yes, your spouse is eligible for an Open Work Permit, and your minor children can study at public schools without needing separate study permits.",
      icon: "👨‍👩‍👧‍👦"
    },
    {
      id: 7,
      category: "UK",
      question: "How much does it cost to study in the UK?",
      answer: "International tuition fees range from £10,000 to £26,000 per year. Living costs are estimated at £12,000 to £15,000 per year, higher if residing in London.",
      icon: "💰"
    },
    {
      id: 8,
      category: "UK",
      question: "How long does it take to get a UK student visa?",
      answer: "Student visa applications are typically processed within 3 weeks if applying from outside the UK. Priority services can shorten this to 5 working days.",
      icon: "⏱️"
    },
    {
      id: 9,
      category: "UK",
      question: "Which tests do I need to take to study in the UK?",
      answer: "You need a secure English language test (SELT) such as IELTS for UKVI. Universities may specify additional academic tests depending on the course.",
      icon: "📝"
    },
    {
      id: 10,
      category: "UK",
      question: "Do I need a PCC/medical test to study abroad?",
      answer: "The UK requires a tuberculosis (TB) medical test certificate for applicants from specific countries. A PCC is not standard but may be requested for specific fields.",
      icon: "🏥"
    },
    {
      id: 11,
      category: "UK",
      question: "Can I get a work visa after I complete my studies in the UK?",
      answer: "Yes, the Graduate Route visa allows you to stay and work in the UK for up to 2 years (or 3 years for doctoral graduates) after completing your degree.",
      icon: "💼"
    },
    {
      id: 12,
      category: "UK",
      question: "Can I take dependents to the UK on my student visa?",
      answer: "Under current regulations, only students enrolled in postgraduate research programs (like PhDs or research-based Masters) can bring dependents to the UK.",
      icon: "👨‍👩‍👧‍👦"
    }
  ];

  return (
    <motion.section
      id="faq"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUpVariant}
      className="w-full bg-[#f8f9fa] py-14 lg:py-20 px-6 md:px-8 lg:px-10 border-t border-slate-100/50 text-slate-900"
    >
      <div className="w-full max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

        {/* Left Column: Sticky Header details */}
        <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">FAQ</span>
            <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
              Frequently <span className="text-[#233d63] italic font-serif font-medium">Asked Questions</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md">
              Find quick answers to common queries about study abroad services, student visa applications, tuition costs, and country guidelines.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2">
            {['Canada', 'UK'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenFaq(null);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#233d63] text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat} Guidelines
              </button>
            ))}
          </div>

          {/* Support helper card */}
          <div className="bg-white border border-slate-200/80 rounded-[24px] p-6 shadow-sm hidden lg:block space-y-3 max-w-md">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#233d63]/10 flex items-center justify-center text-[#233d63] shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h4 className="font-heading font-bold text-slate-900 text-sm">Have more specific questions?</h4>
                <p className="text-slate-500 text-xs mt-0.5">Our counselors are available for 1-on-1 calls.</p>
              </div>
            </div>

            <button
              onClick={() => navigate('/form')}
              className="shiny-cta py-2.5 w-full text-center"
            >
              <span>Book Consultation Call</span>
            </button>
          </div>
        </div>

        {/* Right Column: Accordion Questions */}
        <div className="lg:col-span-7 space-y-4">
          {faqItems
            .filter((item) => item.category === activeCategory)
            .map((item) => {
              const isOpen = openFaq === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200/80 rounded-[24px] overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : item.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center space-x-3.5">
                      <span className="text-xl shrink-0">{item.icon}</span>
                      <span className="font-heading font-bold text-slate-900 text-base sm:text-lg">
                        {item.question}
                      </span>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-[#233d63] text-white border-transparent' : ''
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/30">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
        </div>

      </div>
    </motion.section>
  );
}
