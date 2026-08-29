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
    const [scrollY, setScrollY] = React.useState(0);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const testimonialsScrollRef = React.useRef(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [isHoveringTestimonials, setIsHoveringTestimonials] = React.useState(false);
    const dragStart = React.useRef({ x: 0, scrollLeft: 0 });
    const [activeTestimonialDot, setActiveTestimonialDot] = React.useState(0);
    const autoPlayRef = React.useRef(null);
    const totalTestimonials = 10;

    React.useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Trigger hero reveal animation only AFTER the page loader has exited.
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

    const [activeCategory, setActiveCategory] = React.useState('Canada');
    const [openFaq, setOpenFaq] = React.useState(null);

    const faqItems = [
        // Canada Category
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
        // UK Category
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

    const testimonials = [
        {
            name: "Anoop Krishna",
            program: "PG Diploma in Data Analytics",
            country: "Canada",
            quote: "Fair Future guided me perfectly from university selection to visa approval. Their post-arrival guidance was a lifesaver.",
            rating: 5
        },
        {
            name: "Meera Nair",
            program: "MSc in Finance",
            country: "UK",
            quote: "The certified experts made a complex UK Student Visa application feel effortless. Got my CAS and visa in record time!",
            rating: 5
        },
        {
            name: "Rahul Menon",
            program: "Master of Engineering",
            country: "Australia",
            quote: "Their fee assistance and scholarship guidance helped me secure a 25% tuition fee waiver. Highly professional team.",
            rating: 5
        },
        {
            name: "Anjali Joseph",
            program: "MBA",
            country: "Canada",
            quote: "Kerala's best study abroad consultants! Fair Future handled everything, including document vetting and GIC setup.",
            rating: 5
        },
        {
            name: "Dr. Sandra Mathew",
            program: "PhD in Biotechnology",
            country: "Germany",
            quote: "From university admission checks to blocked account opening, their Germany counselors were absolutely flawless.",
            rating: 5
        },
        {
            name: "Siddharth Verma",
            program: "MS in Computer Science",
            country: "USA",
            quote: "Excellent visa prep sessions! The mock interviews gave me the confidence to ace my F1 visa interview at the consulate.",
            rating: 5
        },
        {
            name: "Riya Elizabeth",
            program: "Master in Renewable Energy",
            country: "Sweden",
            quote: "Finding a specialized program in Scandinavia was hard, but their team structured my portfolio perfectly.",
            rating: 5
        },
        {
            name: "Mohammed Adil",
            program: "MSc in Data Science",
            country: "Ireland",
            quote: "Got admissions in three top Irish universities. The visa processing was fast and handled with absolute transparency.",
            rating: 5
        },
        {
            name: "Kavya Balakrishnan",
            program: "PG in Business Management",
            country: "New Zealand",
            quote: "Their pre-departure briefings are highly informative. Fair Future made sure I had accommodation sorted before landing.",
            rating: 5
        },
        {
            name: "Gautham S.",
            program: "LLM",
            country: "UK",
            quote: "100% satisfied with their guidance. No hidden costs, honest advice, and constant support at every milestone.",
            rating: 5
        }
    ];

    const goToTestimonial = React.useCallback((idx) => {
        const el = testimonialsScrollRef.current;
        if (!el) return;
        const cardWidth = el.querySelector('[data-[#card]]')?.offsetWidth || el.querySelector('[data-card]')?.offsetWidth + 24 || 374;
        el.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
        setActiveTestimonialDot(idx);
    }, []);

    const scrollTestimonials = (dir) => {
        setActiveTestimonialDot(prev => {
            const next = Math.max(0, Math.min(totalTestimonials - 1, prev + dir));
            goToTestimonial(next);
            return next;
        });
    };

    // Auto-play: advance every 3.5 s, pause on hover or drag
    React.useEffect(() => {
        const startAutoPlay = () => {
            autoPlayRef.current = setInterval(() => {
                setActiveTestimonialDot(prev => {
                    const next = (prev + 1) % totalTestimonials;
                    const el = testimonialsScrollRef.current;
                    if (el) {
                        const cardWidth = el.querySelector('[data-card]')?.offsetWidth + 24 || 374;
                        el.scrollTo({ left: next * cardWidth, behavior: 'smooth' });
                    }
                    return next;
                });
            }, 3500);
        };
        if (!isHoveringTestimonials && !isDragging) {
            startAutoPlay();
        }
        return () => clearInterval(autoPlayRef.current);
    }, [isHoveringTestimonials, isDragging]);

    const handleTDragStart = (e) => {
        const el = testimonialsScrollRef.current;
        if (!el) return;
        clearInterval(autoPlayRef.current);
        setIsDragging(true);
        dragStart.current = { x: e.pageX || e.touches?.[0]?.pageX, scrollLeft: el.scrollLeft };
        el.style.cursor = 'grabbing';
    };

    const handleTDragMove = (e) => {
        if (!isDragging) return;
        const el = testimonialsScrollRef.current;
        if (!el) return;
        const x = e.pageX || e.touches?.[0]?.pageX;
        const walk = (x - dragStart.current.x) * 1.5;
        el.scrollLeft = dragStart.current.scrollLeft - walk;
    };

    const handleTDragEnd = () => {
        setIsDragging(false);
        const el = testimonialsScrollRef.current;
        if (el) el.style.cursor = 'grab';
        const el2 = testimonialsScrollRef.current;
        if (!el2) return;
        const cardWidth = el2.querySelector('[data-card]')?.offsetWidth + 24 || 374;
        setActiveTestimonialDot(Math.round(el2.scrollLeft / cardWidth));
    };

    return (
        <div className="w-full bg-[#0c0f16] min-h-screen">
            <SEO
                title="Fair Future | Premier Overseas Education Consultancy & Study Abroad Guidance"
                description="Transform your global education dreams with Fair Future Education Consultancy. 18+ years of excellence, 12,000+ visa successes, expert counseling for UK, USA, Canada, Australia, Ireland & Germany."
                keywords="study abroad consultancy, overseas education counselor, foreign university admissions, student visa guidance, Fair Future, UK study visa, Canada student visa, Australia study visa"
            />

            {/* 1. Hero Section */}
            <HeroSection bgScale={bgScale} bgTransition={bgTransition} avatars={avatars} />

            {/* 2. About Us Section */}
            <AboutSection />

            {/* 3. Why Choose Us Section */}
            <WhyUsSection />

            {/* 4. Global Presence Section */}
            <GlobalPresenceSection />

            {/* 5. Consultation Process Section */}
            <ProcessSection />

            {/* 6. Experts / Counselors Section */}
            <CounselorsSection avatars={avatars} />

            {/* 7. Testimonials Section */}
            <TestimonialsSection
                testimonials={testimonials}
                testimonialsScrollRef={testimonialsScrollRef}
                isDragging={isDragging}
                setIsHoveringTestimonials={setIsHoveringTestimonials}
                activeTestimonialDot={activeTestimonialDot}
                setActiveTestimonialDot={setActiveTestimonialDot}
                scrollTestimonials={scrollTestimonials}
                goToTestimonial={goToTestimonial}
                handleTDragStart={handleTDragStart}
                handleTDragMove={handleTDragMove}
                handleTDragEnd={handleTDragEnd}
            />

            {/* 8. FAQ Section */}
            <FaqSection
                faqItems={faqItems}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                openFaq={openFaq}
                setOpenFaq={setOpenFaq}
            />

            {/* 9. Footer Section */}
            <FooterSection />
        </div>
    );
}
