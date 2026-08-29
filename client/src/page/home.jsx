import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroBg from '../assets/heroBg.png';
import testImg from '../assets/test.png';
import moneyImg from '../assets/process/money.png';
import visaImg from '../assets/process/visa.png';
import processingImg from '../assets/process/processing.png'
import selectionImg from '../assets/process/selection.png'

import Velaris from '../components/Velaris';
import SEO from '../components/SEO';

export default function Home() {
    const [scrollY, setScrollY] = React.useState(0);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const navigate = useNavigate();
    const processScrollRef = React.useRef(null);
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
        // This ensures the zoom/fade animations play when the user actually sees the page.
        const triggerReveal = () => setIsLoaded(true);

        if (window.__loaderDone) {
            // Loader already finished (e.g. on client-side navigation back to home)
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
        const cardWidth = el.querySelector('[data-card]')?.offsetWidth + 24 || 374;
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

            {/* Hero Section Container — overflow-hidden always so scaled bg image can't cause horizontal scroll */}
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

                {/* Subtle dark overlay for readability on mobile screens */}
                <div className="absolute inset-0 bg-black/10 pointer-events-none lg:bg-transparent z-0"></div>

                {/* Glassmorphic gradient blur and fade at the bottom */}
                <div className="progressive-blur-overlay"></div>

                {/* Content Area */}
                <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mt-6 mb-6 lg:mt-8 lg:mb-4">
                    {/* Left Column */}
                    <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6 lg:space-y-0 hero-left-reveal">
                        {/* Title & Description */}
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

                        {/* Bottom-Left Stats Widget */}
                        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-[20px] p-3.5 w-[210px] shadow-lg shadow-black/10 flex flex-col justify-between shrink-0 mb-2 lg:mb-0 hero-widget-reveal">
                            <div className="flex items-center space-x-2.5 mb-3">
                                <span className="text-2xl md:text-3.5xl font-bold tracking-tight text-white leading-none">12k+</span>
                                <div className="text-[9px] leading-tight uppercase tracking-wider text-white/90 font-semibold">
                                    <div>students guided</div>
                                    <div>globally</div>
                                </div>
                            </div>

                            {/* Overlapping Avatars */}
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
                        {/* Pills / Tags exactly grouped */}
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

                        {/* Right Card Text */}
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

            {/* About Us Section */}
            <section id="about" className="w-full bg-[#f8f9fa] py-14 lg:py-20 px-6 md:px-12 lg:px-24 min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden text-slate-900 font-sans">
                {/* Left Floating Image (Desktop) */}
                <div className="absolute left-8 xl:left-16 top-16 w-[180px] xl:w-[220px] aspect-[4/5] rounded-[24px] overflow-hidden shadow-lg hidden lg:block border border-slate-100 hover:scale-[1.02] transition-transform duration-300">
                    <img
                        src="https://images.pexels.com/photos/8962372/pexels-photo-8962372.jpeg"
                        alt="About us patient smiling"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Center: Main Content Card */}
                <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center space-y-6 lg:space-y-8">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">ABOUT US</span>

                    <h2 className="font-heading font-semibold text-slate-900 text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.12] tracking-tight max-w-2xl">
                        About <span className="text-[#233d63] italic font-serif font-medium">Fair Future</span>
                    </h2>

                    <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
                        Fair Future is one of the oldest overseas education consultancy based in Kerala. Having achieved the milestone of 18 plus years of service in providing consultation to top ranked universities in Canada, the U.S.A, Australia, New Zealand, the U.K, Ireland, France, Germany and Switzerland for international students recruitment as their official representative.
                    </p>

                    <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
                        Fair Future has provided counseling to more than <span className="font-heading font-bold text-[#233d63]">100,000 students</span> from Kerala in fulfilling their dream of studying abroad till date. That's not all! Fair Future is also officially representing more than <span className="font-heading font-bold text-[#233d63]">500 institutes</span> from around the world.
                    </p>

                    {/* Stats Bar */}
                    <div className="w-full mt-0 pt-3 border-t border-slate-200/60 z-20">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-6 md:gap-x-4 w-full">
                            {[
                                { value: '500+', label: 'Institutions Worldwide' },
                                { value: '10', label: 'Countries' },
                                { value: '1L+', label: 'Students Counselled' },
                                { value: '12k', label: 'Students Abroad' },
                                { value: '18+', label: 'Years Experience' }
                            ].map((stat, i) => (
                                <div
                                    key={i}
                                    className={`flex flex-col items-center text-center ${i === 4 ? 'col-span-2 md:col-span-1' : 'col-span-1'
                                        }`}
                                >
                                    <span
                                        className="text-4xl sm:text-5xl text-[#233d63] tracking-tight leading-none mb-1.5 font-bold"
                                        style={{ fontFamily: 'cursive' }}
                                    >
                                        {stat.value}
                                    </span>
                                    <span className="text-slate-500 text-[10px] sm:text-xs font-semibold leading-tight tracking-wide uppercase">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Floating Image (Desktop) */}
                <div className="absolute right-8 xl:right-16 bottom-16 w-[180px] xl:w-[220px] aspect-[4/5] rounded-[24px] overflow-hidden shadow-xl hidden lg:block border border-slate-100 hover:scale-[1.02] transition-transform duration-300">
                    <img
                        src="https://images.pexels.com/photos/5965863/pexels-photo-5965863.jpeg"
                        alt="About us counselor smiling"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Mobile Floating Images Row (visible only below desktop) */}
                <div className="mt-12 flex justify-center space-x-4 lg:hidden w-full">
                    <div className="w-[140px] aspect-[4/5] rounded-[16px] overflow-hidden shadow-md">
                        <img
                            src="https://images.pexels.com/photos/8962372/pexels-photo-8962372.jpeg"
                            alt="About us patient smiling"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-[140px] aspect-[4/5] rounded-[16px] overflow-hidden shadow-md">
                        <img
                            src="https://images.pexels.com/photos/5965863/pexels-photo-5965863.jpeg"
                            alt="About us counselor smiling"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section id="why" className="w-full bg-[#f8f9fa] py-14 lg:py-20 px-6 md:px-8 lg:px-10 border-t border-slate-100/60 text-slate-900 font-sans">
                <div className="w-full max-w-[1720px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                        {/* Left Column: Heading, Description & Action Links */}
                        <div className="lg:col-span-4 space-y-6 text-left">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">WHY FAIR FUTURE?</span>

                            <h2 className="font-heading font-extrabold text-slate-900 text-4xl sm:text-5xl lg:text-[3.5rem] tracking-tight leading-[1.08]">
                                The <span className="text-[#233d63] italic font-serif font-medium">Fair Future</span> Difference
                            </h2>

                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                                For over 18 years, we've been Kerala's most trusted overseas education consultancy, earning and maintaining the trust of thousands of students and parents across top global destinations.
                            </p>

                            <div className="pt-2">
                                <button
                                    onClick={() => navigate('/form')}
                                    className="shiny-cta pl-5 pr-2 py-2"
                                >
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

                        {/* Right Column: 2 Staggered Feature Columns with Dividers */}
                        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-0">

                            {/* Middle Column (Column 1 of features) */}
                            <div className="flex flex-col justify-start md:pr-4 lg:pr-6">

                                {/* Item 1 */}
                                <div className="p-4 sm:p-5 lg:p-4 xl:p-5 pb-8 lg:pb-10 border-b border-slate-200/80 flex items-start gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-[#233d63]/10 border border-[#233d63]/20 flex items-center justify-center text-[#233d63] flex-shrink-0 shadow-sm">
                                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                        </svg>
                                    </div>
                                    <div className="space-y-1.5 text-left flex-1 min-w-0 max-w-none">
                                        <h3 className="font-heading font-bold text-slate-900 text-lg sm:text-xl tracking-tight">
                                            12,000+ Success Stories
                                        </h3>
                                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                            Experience proven results without breaking the bank—we offer transparent, fair, and high-success guidance.
                                        </p>
                                    </div>
                                </div>

                                {/* Item 2 */}
                                <div className="p-4 sm:p-5 lg:p-4 xl:p-5 pt-8 lg:pt-10 border-b md:border-b-0 border-slate-200/80 flex items-start gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-[#233d63]/10 border border-[#233d63]/20 flex items-center justify-center text-[#233d63] flex-shrink-0 shadow-sm">
                                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                                        </svg>
                                    </div>
                                    <div className="space-y-1.5 text-left flex-1 min-w-0 max-w-none">
                                        <h3 className="font-heading font-bold text-slate-900 text-lg sm:text-xl tracking-tight">
                                            Certified Experts
                                        </h3>
                                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                            Choose Fair Future for proven excellence backed by certified overseas education counselors.
                                        </p>
                                    </div>
                                </div>

                            </div>

                            {/* Rightmost Column (Column 2 of features - Staggered downwards) */}
                            <div className="flex flex-col justify-start md:border-l border-slate-200/80 md:pl-4 lg:pl-6 md:pt-14 lg:pt-18">

                                {/* Item 3 */}
                                <div className="p-4 sm:p-5 lg:p-4 xl:p-5 pb-8 lg:pb-10 border-b border-slate-200/80 flex items-start gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-[#233d63]/10 border border-[#233d63]/20 flex items-center justify-center text-[#233d63] flex-shrink-0 shadow-sm">
                                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                        </svg>
                                    </div>
                                    <div className="space-y-1.5 text-left flex-1 min-w-0 max-w-none">
                                        <h3 className="font-heading font-bold text-slate-900 text-lg sm:text-xl tracking-tight">
                                            500+ Top Institutes
                                        </h3>
                                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                            Don't let budget constraints stop you—explore top university admissions, scholarships, and fee assistance.
                                        </p>
                                    </div>
                                </div>

                                {/* Item 4 */}
                                <div className="p-4 sm:p-5 lg:p-4 xl:p-5 pt-8 lg:pt-10 flex items-start gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-[#233d63]/10 border border-[#233d63]/20 flex items-center justify-center text-[#233d63] flex-shrink-0 shadow-sm">
                                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="space-y-1.5 text-left flex-1 min-w-0 max-w-none">
                                        <h3 className="font-heading font-bold text-slate-900 text-lg sm:text-xl tracking-tight">
                                            100% Satisfaction
                                        </h3>
                                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                            Don't just take our word for it—see why over 12k students recommend Fair Future for stress-free visa approval.
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* Velaris Animated Gradient CTA Banner */}
            <div className="w-full" style={{ height: '300px' }}>
                <Velaris
                    bg="#0d1b2e"
                    colors={['#2d4f7c', '#60a5fa', '#1b2a47', '#3b6aa0']}
                    speed={1.6}
                    grain={0.28}
                    height="100%"
                >
                    <div className="h-full flex flex-col items-center justify-center px-6 md:px-12 text-center space-y-6">

                        {/* Label tag */}
                        <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-sky-300/80 block">
                            Trusted Worldwide
                        </span>

                        {/* Headline */}
                        <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-tight tracking-tight max-w-3xl">
                            Our Presence <span className="text-[#60a5fa] italic font-serif font-medium">Around the World</span>
                        </h2>

                        {/* CTA Button */}
                        <button className="shiny-cta pl-6 pr-2 py-2.5 group" onClick={() => navigate('/form')}>
                            <span>
                                Book Free Consultation
                                <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center text-[#233d63] ml-3">
                                    <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </span>
                        </button>

                    </div>
                </Velaris>
            </div>

            {/* Consultation Process Section */}
            <section id="process" className="w-full bg-[#f8f9fa] py-14 lg:py-20 px-6 md:px-8 lg:px-10 border-t border-slate-100/50 text-slate-900 font-sans">
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

                    {/* Timeline Container with Side Navigation Arrows */}
                    <div className="relative w-full">
                        {/* Left Arrow Button (Mobile/Tablet) */}
                        <button
                            onClick={() => {
                                if (processScrollRef.current) {
                                    const scrollAmount = processScrollRef.current.clientWidth * 0.85;
                                    processScrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                                }
                            }}
                            aria-label="Previous step"
                            className="lg:hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-30 w-11 h-11 rounded-full bg-white/75 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-center text-[#233d63] hover:bg-white active:scale-95 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Right Arrow Button (Mobile/Tablet) */}
                        <button
                            onClick={() => {
                                if (processScrollRef.current) {
                                    const scrollAmount = processScrollRef.current.clientWidth * 0.85;
                                    processScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                                }
                            }}
                            aria-label="Next step"
                            className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-30 w-11 h-11 rounded-full bg-white/75 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-center text-[#233d63] hover:bg-white active:scale-95 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Steps Carousel / Grid */}
                        <div
                            ref={processScrollRef}
                            className="flex lg:grid lg:grid-cols-5 gap-6 overflow-x-auto lg:overflow-visible py-4 lg:py-0 px-1 scroll-smooth snap-x snap-mandatory relative z-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {[
                                {
                                    step: "STEP 1",
                                    title: "Selection",
                                    desc: "Program, University and Country Selection",
                                    img: selectionImg
                                },
                                {
                                    step: "STEP 2",
                                    title: "Processing",
                                    desc: "University Application Processing",
                                    img: processingImg
                                },
                                {
                                    step: "STEP 3",
                                    title: "Tuition Fees",
                                    desc: "Tuition Fee Payment Assistance",
                                    img: moneyImg
                                },
                                {
                                    step: "STEP 4",
                                    title: "Visa Approval",
                                    desc: "Visa Application and Approval guidance",
                                    img: visaImg
                                },
                                {
                                    step: "STEP 5",
                                    title: "Departure",
                                    desc: "Travel and Accommodation assistance",
                                    img: testImg
                                }
                            ].map((stepObj, i) => (
                                <div
                                    key={i}
                                    className="w-[calc(100vw-56px)] max-w-[340px] sm:w-[320px] lg:w-full flex-shrink-0 snap-center aspect-[1/1.24] sm:aspect-[1/1.45] rounded-[16px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 group relative z-10"
                                >
                                    <Velaris
                                        bg="#0f1827"
                                        colors={['#142033', '#16243a', '#121d2d', '#152236']}
                                        speed={0.6}
                                        grain={0.15}
                                        height="100%"
                                    >
                                        <div className="h-full p-6 flex flex-col justify-between text-white relative z-10 border border-white/10 rounded-[16px]">

                                            {/* Top Content: Step & Title */}
                                            <div className="space-y-1 text-center">
                                                <span className="text-[10px] font-bold text-sky-300/90 uppercase tracking-widest block">
                                                    {stepObj.step}
                                                </span>
                                                <h3 className="font-heading font-extrabold text-white text-lg sm:text-xl tracking-tight leading-tight">
                                                    {stepObj.title}
                                                </h3>
                                            </div>

                                            {/* Middle Content: Icon & Wave Grid Divider */}
                                            <div className="w-full flex flex-col items-center justify-center py-2 relative">
                                                <div className="w-full flex items-center justify-center overflow-visible group-hover:scale-110 transition-transform duration-300">
                                                    <img
                                                        src={stepObj.img}
                                                        alt="Process Icon"
                                                        className="w-48 h-48 sm:w-32 sm:h-32 object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.55)]"
                                                    />
                                                </div>
                                            </div>

                                            {/* Bottom Content: Step Description */}
                                            <p className="text-white/80 text-[11px] sm:text-xs leading-relaxed text-center font-normal mb-2 mx-auto max-w-[190px]">
                                                {stepObj.desc}
                                            </p>

                                        </div>
                                    </Velaris>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* Experts Section */}
            <section id="counselors" className="w-full bg-[#f8f9fa] py-14 lg:py-20 px-6 md:px-8 lg:px-10 flex items-center justify-center text-slate-900 font-sans border-t border-slate-100/50">
                <div className="w-full max-w-[1720px] mx-auto">

                    {/* Title & Description (Mobile Only) */}
                    <div className="space-y-3 max-w-2xl text-left lg:hidden block mb-8">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">OUR COUNSELORS</span>

                        <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
                            Meet Our Certified <span className="text-[#233d63] italic font-serif font-medium">Education Counselors</span>
                        </h2>

                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl">
                            Our team of experienced overseas education consultants bring in-depth knowledge and genuine care to help you find the right university, country, and program.
                        </p>
                    </div>

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
                            <div className="space-y-3 hidden lg:block">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">OUR COUNSELORS</span>

                                <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
                                    Meet Our Certified <span className="text-[#233d63] italic font-serif font-medium">Education Counselors</span>
                                </h2>

                                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-lg">
                                    Our team of experienced overseas education consultants bring in-depth knowledge and genuine care to help you find the right university, country, and program.
                                </p>
                            </div>

                            {/* Profile Cards Grid */}
                            <div className="space-y-4">

                                {/* Row 1: Taller cards */}
                                <div className="grid grid-cols-2 gap-4">

                                    {/* Card 1: Emily Roberts */}
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

                                    {/* Card 2: Dr. Daniel Hoque */}
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

                                    {/* Card 4: Guy Hawkins */}
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

            {/* Testimonials Section */}
            <section
                id="testimonials"
                className="w-full bg-[#f8f9fa] py-14 lg:py-20 border-t border-slate-100/50 font-sans"
                onMouseEnter={() => setIsHoveringTestimonials(true)}
                onMouseLeave={() => setIsHoveringTestimonials(false)}
            >
                <div className="w-full max-w-[1720px] mx-auto px-6 md:px-8 lg:px-10 flex flex-col space-y-10">

                    {/* Section Header + Nav Arrows Row */}
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                        <div className="space-y-3 max-w-2xl">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">TESTIMONIALS</span>
                            <h2 className="font-heading font-bold text-slate-900 text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
                                What Our <span className="text-[#233d63] italic font-serif font-medium">Successful Students</span> Say
                            </h2>
                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                                Over 12,000+ students guided globally. Hear directly from our alumni.
                            </p>
                        </div>

                        {/* Arrow Nav */}
                        <div className="flex items-center gap-3 shrink-0">
                            <button
                                onClick={() => scrollTestimonials(-1)}
                                aria-label="Previous testimonial"
                                className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-[#233d63] hover:border-[#233d63] hover:text-white text-slate-600 flex items-center justify-center shadow-sm transition-all duration-200 active:scale-95"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button
                                onClick={() => scrollTestimonials(1)}
                                aria-label="Next testimonial"
                                className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-[#233d63] hover:border-[#233d63] hover:text-white text-slate-600 flex items-center justify-center shadow-sm transition-all duration-200 active:scale-95"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    </div>

                    {/* Drag-scrollable Cards Row */}
                    <div className="relative w-full">
                        {/* Left/Right edge fade overlays */}
                        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#f8f9fa] to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#f8f9fa] to-transparent z-10 pointer-events-none" />

                        <div
                            ref={testimonialsScrollRef}
                            onMouseDown={handleTDragStart}
                            onMouseMove={handleTDragMove}
                            onMouseUp={handleTDragEnd}
                            onMouseLeave={handleTDragEnd}
                            onTouchStart={handleTDragStart}
                            onTouchMove={handleTDragMove}
                            onTouchEnd={handleTDragEnd}
                            onScroll={() => {
                                const el = testimonialsScrollRef.current;
                                if (!el) return;
                                const cardWidth = el.querySelector('[data-card]')?.offsetWidth + 24 || 374;
                                setActiveTestimonialDot(Math.round(el.scrollLeft / cardWidth));
                            }}
                            className="flex gap-6 overflow-x-auto py-4 px-1 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden select-none"
                            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                        >
                            {testimonials.map((t, idx) => (
                                <div
                                    key={idx}
                                    data-card
                                    className="w-[280px] sm:w-[350px] shrink-0 snap-start bg-white border border-slate-200/70 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:border-[#233d63]/30 hover:shadow-md transition-all duration-300 text-slate-800 group"
                                >
                                    <div className="space-y-4">
                                        {/* Stars */}
                                        <div className="flex items-center gap-0.5 text-amber-500 text-base">
                                            {Array.from({ length: t.rating }).map((_, i) => (
                                                <svg key={i} className="w-4 h-4 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                            ))}
                                        </div>
                                        {/* Quote */}
                                        <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-medium">
                                            &ldquo;{t.quote}&rdquo;
                                        </p>
                                    </div>

                                    {/* Author */}
                                    <div className="flex items-center gap-3.5 mt-6 pt-4 border-t border-slate-200/60">
                                        <div className="w-10 h-10 rounded-full bg-[#233d63]/10 border border-[#233d63]/20 flex items-center justify-center text-[#233d63] font-bold text-sm shrink-0 group-hover:bg-[#233d63]/15 transition-colors">
                                            {t.name[0]}
                                        </div>
                                        <div className="flex flex-col items-start min-w-0">
                                            <span className="font-heading font-bold text-xs sm:text-sm text-slate-900 truncate w-full">{t.name}</span>
                                            <span className="text-[10px] sm:text-xs text-slate-500 truncate w-full mt-0.5">{t.program} &bull; {t.country}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dot Indicators */}
                    <div className="flex items-center justify-center gap-2">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => goToTestimonial(idx)}
                                className={`rounded-full transition-all duration-300 ${
                                    activeTestimonialDot === idx
                                        ? 'w-6 h-2 bg-[#233d63]'
                                        : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                                }`}
                                aria-label={`Go to testimonial ${idx + 1}`}
                            />
                        ))}
                    </div>

                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="w-full bg-[#f8f9fa] py-14 lg:py-20 px-6 md:px-8 lg:px-10 border-t border-slate-100/50 text-slate-900">
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

                        {/* Organized Category Buttons */}
                        <div className="flex flex-row gap-3 w-full">
                            {['Canada', 'UK'].map((category) => {
                                const isActive = activeCategory === category;
                                return (
                                    <button
                                        key={category}
                                        onClick={() => {
                                            setActiveCategory(category);
                                            setOpenFaq(null); // Close active FAQ when switching categories
                                        }}
                                        className={`px-4 py-3 rounded-xl font-heading font-bold text-xs sm:text-sm text-center transition-all border cursor-pointer flex items-center justify-center space-x-2 w-1/2 sm:w-auto sm:px-6 ${isActive
                                            ? 'bg-[#233d63] text-white border-transparent shadow-md'
                                            : 'bg-white border-slate-100 text-slate-700 hover:bg-[#233d63]/5 hover:text-[#233d63] shadow-sm'
                                            }`}
                                    >
                                        <span>{category === 'Canada' ? 'Canada' : 'United Kingdom'}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Helpful support helper card (Desktop only) */}
                        <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm max-w-sm text-slate-900 hidden lg:block">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-[#233d63]/10 flex items-center justify-center text-[#233d63]">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-slate-900 text-sm">Still have questions?</h4>
                                    <p className="text-[11px] text-slate-500 mt-0.5">We are available 24/7 to help you.</p>
                                </div>
                            </div>

                            <button className="shiny-cta py-2.5 w-full text-center" onClick={() => navigate('/form')}>
                                <span>Contact Support</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column: FAQ Accordion list */}
                    <div className="lg:col-span-7 space-y-4">

                        {/* Filtered Accordion List */}
                        {faqItems
                            .filter((item) => item.category === activeCategory)
                            .map((item) => {
                                const isOpen = openFaq === item.id;
                                return (
                                    <div key={item.id} className="border-b border-slate-200/60 pb-4">
                                        <button
                                            onClick={() => setOpenFaq(isOpen ? null : item.id)}
                                            className="flex w-full items-center justify-between text-left focus:outline-none group py-2"
                                        >
                                            <div className={`relative flex-1 flex items-center space-x-3 rounded-xl px-4 py-2.5 border transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] min-w-0 ${isOpen ? 'bg-[#233d63]/15 border-transparent text-[#233d63]' : 'bg-white border-slate-100 hover:bg-[#233d63]/10 text-slate-800'}`}>
                                                <span className="font-heading font-bold text-sm sm:text-base md:text-lg leading-tight break-words">
                                                    {item.question}
                                                </span>
                                            </div>

                                            <span className={`shrink-0 ml-4 rounded-full w-7 h-7 flex items-center justify-center border transition-all ${isOpen ? 'bg-[#233d63]/10 border-[#233d63]/25 text-[#233d63]' : 'border-slate-200 text-slate-400 group-hover:border-slate-300 group-hover:text-slate-600'}`}>
                                                {isOpen ? (
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                                    </svg>
                                                )}
                                            </span>
                                        </button>

                                        {/* Transitionable Accordion Content */}
                                        <div
                                            className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0 pointer-events-none'}`}
                                        >
                                            <div className="ml-3 sm:ml-5 mt-1">
                                                <div className="bg-[#233d63] text-white rounded-2xl px-4 py-2.5 text-xs sm:text-sm w-fit max-w-full md:max-w-md leading-relaxed shadow-sm">
                                                    {item.answer}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                        {/* Helpful support helper card (Mobile only) */}
                        <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm w-full text-slate-900 block lg:hidden mt-6">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-[#233d63]/10 flex items-center justify-center text-[#233d63] shrink-0">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-slate-900 text-sm">Still have questions?</h4>
                                    <p className="text-[11px] text-slate-500 mt-0.5">We are available 24/7 to help you.</p>
                                </div>
                            </div>

                            <button className="shiny-cta py-2.5 w-full text-center">
                                <span>Contact Support</span>
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            {/* Footer Section */}
            <footer className="w-full text-white font-sans border-t border-white/10 relative overflow-hidden z-10">
                <Velaris
                    bg="#0d1b2e"
                    colors={['#2d4f7c', '#60a5fa', '#1b2a47', '#3b6aa0']}
                    speed={1.2}
                    grain={0.25}
                    height="100%"
                >
                    {/* Main Quadrant Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 relative z-10">

                        {/* Quadrant 1: Top-Left */}
                        <div className="p-8 md:p-12 lg:p-16 border-b md:border-r border-white/10 flex flex-col justify-between space-y-8">

                            {/* Logo and Description */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2.5">
                                    <div className="w-7 h-7 relative flex items-center justify-center">
                                        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
                                            <circle cx="12" cy="12" r="10" fill="currentColor" className="text-white" />
                                            <rect x="2" y="10.8" width="20" height="2.4" fill="#1b2a47" />
                                            <rect x="10.8" y="2" width="2.4" height="20" fill="#1b2a47" />
                                            <circle cx="12" cy="12" r="4.2" fill="#1b2a47" />
                                            <circle cx="12" cy="12" r="2.2" fill="currentColor" className="text-white" />
                                        </svg>
                                    </div>
                                    <span className="font-heading font-bold text-lg md:text-xl text-white tracking-tight">Fair Future</span>
                                </div>

                                <p className="text-white/60 text-xs sm:text-sm max-w-sm leading-relaxed font-normal">
                                    Kerala's most trusted overseas education consultancy — helping students turn their global education dreams into reality for over 18 years.
                                </p>
                            </div>

                            {/* CTA Button */}
                            <button className="shiny-cta py-3 w-full max-w-md mt-6" onClick={() => navigate('/form')}>
                                <span>Book Free Consultation</span>
                            </button>
                        </div>

                        {/* Quadrant 2: Top-Right */}
                        <div className="p-8 md:p-12 lg:p-16 border-b border-white/10 flex flex-col justify-between space-y-6">

                            {/* Title & Newsletter Description */}
                            <div className="space-y-3">
                                <h2 className="font-heading font-semibold text-white text-xl sm:text-2xl md:text-3xl max-w-md leading-tight tracking-tight">
                                    Your Gateway to a <span className="text-[#60a5fa] italic font-serif font-medium">World-Class Education</span> Starts Here
                                </h2>
                                <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                                    Subscribe for study abroad tips, scholarship alerts, visa updates, and destination guides — delivered to your inbox.
                                </p>
                            </div>

                            {/* Newsletter Subscription Form */}
                            <form onSubmit={(e) => e.preventDefault()} className="flex items-center border border-white/20 rounded-full p-1 pl-4 bg-transparent max-w-md hover:border-white/35 transition-colors">
                                <input
                                    type="email"
                                    placeholder="Enter Your Email"
                                    className="bg-transparent text-white placeholder-white/30 text-xs sm:text-sm focus:outline-none flex-1 pr-2"
                                />
                                <button type="submit" className="shiny-cta px-5 py-2 shrink-0">
                                    <span>Subscribe</span>
                                </button>
                            </form>
                        </div>

                        {/* Quadrant 3: Bottom-Left */}
                        <div className="p-8 md:p-12 lg:p-16 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between space-y-12">

                            {/* Link Directories */}
                            <div className="grid grid-cols-3 gap-6">

                                {/* Directory 1 */}
                                <div>
                                    <h4 className="font-heading font-bold text-white text-xs sm:text-sm uppercase tracking-wider mb-4">Quick Links</h4>
                                    <ul className="flex flex-col space-y-2.5 text-white/60 text-xs sm:text-sm">
                                        <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                                        <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                                        <li><a href="#" className="hover:text-white transition-colors">Our Services</a></li>
                                        <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                                        <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                                    </ul>
                                </div>

                                {/* Directory 2 */}
                                <div>
                                    <h4 className="font-heading font-bold text-white text-xs sm:text-sm uppercase tracking-wider mb-4">Destinations</h4>
                                    <ul className="flex flex-col space-y-2.5 text-white/60 text-xs sm:text-sm">
                                        <li><a href="#" className="hover:text-white transition-colors">Canada</a></li>
                                        <li><a href="#" className="hover:text-white transition-colors">United Kingdom</a></li>
                                        <li><a href="#" className="hover:text-white transition-colors">Australia</a></li>
                                        <li><a href="#" className="hover:text-white transition-colors">Germany</a></li>
                                        <li><a href="#" className="hover:text-white transition-colors">USA</a></li>
                                    </ul>
                                </div>

                                {/* Directory 3 */}
                                <div>
                                    <h4 className="font-heading font-bold text-white text-xs sm:text-sm uppercase tracking-wider mb-4">Support</h4>
                                    <ul className="flex flex-col space-y-2.5 text-white/60 text-xs sm:text-sm">
                                        <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                                        <li><a href="/form" className="hover:text-white transition-colors">Free Consultation</a></li>
                                        <li><a href="#" className="hover:text-white transition-colors">Visa Guidance</a></li>
                                        <li><a href="#" className="hover:text-white transition-colors">Scholarship Info</a></li>
                                        <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                    </ul>
                                </div>

                            </div>

                            {/* Copyright */}
                            <span className="text-white/40 text-xs mt-auto font-sans">
                                © 2025 Fair Future. All rights reserved.
                            </span>
                        </div>

                        {/* Quadrant 4: Bottom-Right */}
                        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-between space-y-10">

                            {/* Phone & Email Section */}
                            <div className="space-y-1.5">
                                <a href="tel:18004191210" className="text-white font-heading font-bold text-lg sm:text-xl block hover:text-white/80 transition-colors">
                                    Toll Free: 1800 419 1210
                                </a>
                                <a href="tel:+917558090909" className="text-white/70 hover:text-white text-xs sm:text-sm font-sans transition-colors block">
                                    Mob: +91 7558 09 09 09
                                </a>
                                <a href="mailto:info@fairfutureonline.com" className="text-white/70 hover:text-white text-xs sm:text-sm font-sans underline transition-colors block mt-1">
                                    info@fairfutureonline.com
                                </a>
                            </div>

                            {/* Office Locations */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                                {/* Location 1 — Main Office */}
                                <div>
                                    <span className="font-heading font-bold text-white/50 text-[10px] sm:text-xs tracking-wider uppercase mb-2 block">Kochi — Head Office</span>
                                    <p className="text-white/60 text-[11px] sm:text-xs leading-relaxed">
                                        Fair Future Edifice, East of Ravipuram Junction off M.G. Road, Near Ravipuram Sree Krishna Swami Temple, Cochin 682016, Kerala, India.
                                    </p>
                                </div>

                                {/* Location 2 — Branch */}
                                <div>
                                    <span className="font-heading font-bold text-white/50 text-[10px] sm:text-xs tracking-wider uppercase mb-2 block">Thrissur — Branch</span>
                                    <p className="text-white/60 text-[11px] sm:text-xs leading-relaxed">
                                        2nd Floor, Marvel Tower, Round South, Near KSRTC Bus Stand, Thrissur 680001, Kerala, India.
                                    </p>
                                </div>

                            </div>

                            {/* Social Icons */}
                            <div className="flex items-center space-x-3 mt-auto">
                                {/* X */}
                                <a href="#" className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all">
                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                {/* Facebook */}
                                <a href="#" className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all">
                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                                    </svg>
                                </a>
                                {/* Instagram */}
                                <a href="#" className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all">
                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                    </svg>
                                </a>
                                {/* YouTube */}
                                <a href="#" className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all">
                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                    </div>
                </Velaris>
            </footer>

        </div>
    );
}
