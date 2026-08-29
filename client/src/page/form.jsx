import * as React from "react";
import { useNavigate } from "react-router-dom";
import testImg from "../assets/test.png";
import SEO from "../components/SEO";
import { getApiUrl } from "../lib/api";

const COUNTRIES = [
    "Australia", "Canada", "Dubai (UAE)", "France", "Germany",
    "Ireland", "New Zealand", "Singapore", "Sweden", "United Kingdom", "United States", "Other"
];

const PROGRAMS = [
    "Bachelor's Degree", "Master's Degree", "PhD / Doctorate",
    "Diploma / Certificate", "Foundation Program", "Language Course", "MBA", "Other"
];

const BUDGETS = [
    "Under ₹10 Lakhs", "₹10–20 Lakhs", "₹20–40 Lakhs", "₹40–60 Lakhs", "₹60 Lakhs+"
];

const TIMELINES = [
    "Within 3 months", "6 months", "1 year", "1–2 years", "Exploring"
];

const HEAR_FROM = [
    "Google", "Instagram", "Facebook", "YouTube", "Referral", "Other"
];

const STEPS = [
    { title: "Personal Profile", desc: "Basic contact info" },
    { title: "Study Goals",     desc: "Program & Country" },
    { title: "Preferences",     desc: "Budget & Timeline" },
    { title: "Review & Confirm", desc: "Verify application" },
];

function InputField({ id, label, required, type = "text", placeholder, value, onChange, maxLength }) {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor={id} className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {label} {required && <span className="text-[#233d63]">*</span>}
            </label>
            <input
                id={id}
                type={type}
                required={required}
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
                maxLength={maxLength}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#233d63] focus:ring-2 focus:ring-[#233d63]/10 transition-all"
            />
        </div>
    );
}

function SelectField({ id, label, required, options, placeholder, value, onChange }) {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor={id} className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {label} {required && <span className="text-[#233d63]">*</span>}
            </label>
            <div className="relative">
                <select
                    id={id}
                    required={required}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className="w-full h-11 rounded-xl border border-slate-200 bg-white pl-4 pr-10 text-sm text-slate-800 focus:outline-none focus:border-[#233d63] focus:ring-2 focus:ring-[#233d63]/10 transition-all appearance-none cursor-pointer"
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
}

function PillSelector({ label, options, selected, onChange, required }) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {label} {required && <span className="text-[#233d63]">*</span>}
            </span>
            <div className="flex flex-wrap gap-2">
                {options.map(opt => {
                    const active = selected === opt;
                    return (
                        <button
                            key={opt}
                            type="button"
                            onClick={() => onChange(opt)}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                                active
                                    ? 'bg-[#233d63] text-white border-[#233d63] shadow-sm'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#233d63]/40'
                            }`}
                        >
                            {opt}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function CountryMultiSelector({ selected, onChange }) {
    const toggle = (c) => {
        onChange(selected.includes(c) ? selected.filter(v => v !== c) : [...selected, c]);
    };
    return (
        <div className="flex flex-col gap-2 w-full">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Preferred Destination Countries <span className="text-[#233d63]">*</span>
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {COUNTRIES.map(c => {
                    const checked = selected.includes(c);
                    return (
                        <div
                            key={c}
                            onClick={() => toggle(c)}
                            className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 cursor-pointer text-xs font-semibold transition-all select-none ${
                                checked
                                    ? 'border-[#233d63] bg-[#233d63]/8 text-[#233d63]'
                                    : 'border-slate-200 bg-white text-slate-600 hover:border-[#233d63]/40'
                            }`}
                        >
                            <div className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 transition-all ${
                                checked ? 'bg-[#233d63] border-[#233d63]' : 'border-slate-300'
                            }`}>
                                {checked && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                            </div>
                            {c}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function ConsultationForm() {
    const navigate = useNavigate();
    const [step, setStep] = React.useState(0);
    const [submitted, setSubmitted] = React.useState(false);
    const [submitting, setSubmitting] = React.useState(false);
    const [submitError, setSubmitError] = React.useState("");

    const [form, setForm] = React.useState({
        // Step 1
        firstName: "", lastName: "", email: "", phone: "", city: "", state: "",
        // Step 2
        destCountries: [], program: "", fieldOfStudy: "", currentEducation: "", yearOfPassout: "",
        // Step 3
        budget: "", timeline: "", hasPassport: "In Process", needsScholarship: "Not Sure", hearFrom: "Other", notes: ""
    });

    const set = (key) => (val) => {
        setSubmitError("");
        setForm(f => ({ ...f, [key]: val }));
    };

    const next = (e) => {
        if (e) e.preventDefault();
        setStep(s => Math.min(s + 1, 3));
    };

    const prev = () => {
        setStep(s => Math.max(s - 1, 0));
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setSubmitError("");
        setSubmitting(true);
        try {
            const res = await fetch(getApiUrl("/api/applications"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.message || "Failed to submit application. Please check your details.");
            }
            setSubmitting(false);
            setSubmitted(true);
        } catch (err) {
            console.error("Form Submission Error:", err);
            setSubmitError(err.message || "Server connection error. Please try again.");
            setSubmitting(false);
        }
    };

    return (
        <div className="w-full min-h-screen lg:h-screen bg-[#faf9f7] font-sans flex flex-col lg:flex-row overflow-hidden">
            <SEO
                title="Book Free Overseas Education Consultation | Fair Future Consultancy"
                description="Schedule a free 1-on-1 session with certified study abroad counselors. Explore top universities, scholarships, budget options & student visas for UK, USA, Canada & Australia."
                keywords="study abroad consultation form, free counseling session, university application assistance, overseas study admission, Fair Future booking"
            />

            {/* ── LEFT SIDEBAR (Brand Navy #16243a) ── */}
            <div className="lg:w-[350px] xl:w-[380px] bg-[#16243a] text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between shrink-0 relative overflow-hidden">
                    
                    {/* Top: Brand Header & Mobile Return to Home */}
                    <div>
                        <div className="flex items-center justify-between w-full">
                            <button onClick={() => navigate('/')} className="flex items-center space-x-3 text-left cursor-pointer group">
                                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-white">
                                        <circle cx="12" cy="12" r="10" fill="currentColor" />
                                        <rect x="2" y="10.8" width="20" height="2.4" fill="#16243a" />
                                        <rect x="10.8" y="2" width="2.4" height="20" fill="#16243a" />
                                        <circle cx="12" cy="12" r="4.2" fill="#16243a" />
                                        <circle cx="12" cy="12" r="2.2" fill="currentColor" />
                                    </svg>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-heading font-extrabold text-sm text-white tracking-widest uppercase">FAIR FUTURE</span>
                                    <span className="text-[10px] text-white/50 tracking-wider">EDUCATION CONSULTANCY</span>
                                </div>
                            </button>

                            {/* Return to Home button on Mobile */}
                            <button
                                onClick={() => navigate('/')}
                                className="lg:hidden text-xs font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors flex items-center space-x-1 cursor-pointer"
                            >
                                <span>← Return to Home</span>
                            </button>
                        </div>

                        {/* Vertical Step Timeline (Desktop) */}
                        <div className="mt-8 hidden lg:flex flex-col space-y-6 relative pl-3">
                            {/* Vertical Line */}
                            <div className="absolute left-[29px] top-3 bottom-3 w-0.5 bg-white/15 -z-0" />

                            {STEPS.map((sObj, idx) => {
                                const isCurrent = step === idx;
                                const isDone = step > idx;
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => { if (idx < step) setStep(idx); }}
                                        className={`flex items-center space-x-3.5 relative z-10 transition-all ${
                                            idx <= step ? 'cursor-pointer' : 'opacity-50'
                                        }`}
                                    >
                                        {/* Step Circle */}
                                        <div
                                            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                                                isCurrent
                                                    ? 'bg-white text-[#16243a] ring-4 ring-white/20'
                                                    : isDone
                                                    ? 'bg-[#60a5fa] text-white'
                                                    : 'bg-[#16243a] border-2 border-white/30 text-white/60'
                                            }`}
                                        >
                                            {isDone ? (
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                            ) : (
                                                idx + 1
                                            )}
                                        </div>

                                        {/* Label */}
                                        <div className="flex flex-col text-left">
                                            <span className={`text-sm sm:text-base font-bold ${isCurrent ? 'text-white' : 'text-white/70'}`}>
                                                {sObj.title}
                                            </span>
                                            <span className="text-xs sm:text-sm text-white/40 font-medium">
                                                {sObj.desc}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Bottom Sidebar Area (Desktop Only) */}
                    <div className="mt-6 pt-4 border-t border-white/10 hidden lg:flex flex-col justify-end">
                        <div className="flex items-center space-x-3.5 mb-4">
                            <div className="w-16 h-16 shrink-0 flex items-center justify-center">
                                <img
                                    src={testImg}
                                    alt="Fair Future Consultation"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-bold text-white">18+ Years Excellence</p>
                                <p className="text-[11px] text-white/60 leading-tight mt-0.5">Over 12,000+ successful visas granted globally.</p>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/')}
                            className="text-left text-xs font-semibold text-white/50 hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
                        >
                            ← Return to homepage
                        </button>
                    </div>

                </div>

                {/* ── RIGHT MAIN PANEL (Soft Light #faf9f7) ── */}
                <div className="flex-1 bg-[#faf9f7] p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-y-auto">

                    {submitted ? (
                        /* Success Screen */
                        <div className="my-auto flex flex-col items-center text-center space-y-5 py-8">
                            <div className="w-16 h-16 rounded-full bg-[#233d63] flex items-center justify-center shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <h2 className="font-heading font-extrabold text-slate-900 text-2xl sm:text-3xl">
                                Application Submitted!
                            </h2>
                            <p className="text-slate-600 text-sm max-w-md leading-relaxed">
                                Thank you <strong>{form.firstName}</strong>! Our certified counselors will analyze your profile and contact you within <strong>24 hours</strong>.
                            </p>
                            <button
                                onClick={() => navigate('/')}
                                className="mt-4 px-8 py-3 rounded-full bg-[#233d63] text-white font-semibold text-sm hover:bg-[#16243a] transition-all shadow-md"
                            >
                                Back to Home Page
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="space-y-1.5 mb-6">
                                <h1 className="font-heading font-extrabold text-slate-900 text-2xl sm:text-3xl tracking-tight">
                                    {step === 0 && "Start your global education journey."}
                                    {step === 1 && "Where & what do you want to study?"}
                                    {step === 2 && "Tell us your budget & timeline."}
                                    {step === 3 && "Review your application details."}
                                </h1>
                                <p className="text-slate-500 text-xs sm:text-sm">
                                    {step === 0 && "Provide your basic contact information to get started."}
                                    {step === 1 && "Select your preferred destinations and program levels."}
                                    {step === 2 && "Help us match you with top universities and scholarships."}
                                    {step === 3 && "Verify all details before submitting to our counselors."}
                                </p>
                            </div>

                            {/* Mobile Step Indicator */}
                            <div className="flex lg:hidden items-center justify-between mb-6 bg-white p-3 rounded-xl border border-slate-200">
                                <span className="text-xs font-bold text-[#233d63]">
                                    Step {step + 1} of 4: {STEPS[step].title}
                                </span>
                                <div className="flex gap-1">
                                    {STEPS.map((_, i) => (
                                        <div key={i} className={`w-2 h-2 rounded-full ${step === i ? 'bg-[#233d63]' : 'bg-slate-200'}`} />
                                    ))}
                                </div>
                            </div>

                            {/* ── STEP 0: Personal Profile ── */}
                            {step === 0 && (
                                <form id="form-step-0" onSubmit={next} className="space-y-4 my-auto">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <InputField id="firstName" label="First Name" required placeholder="e.g. Anoop" value={form.firstName} onChange={set('firstName')} />
                                        <InputField id="lastName" label="Last Name" required placeholder="e.g. Krishna" value={form.lastName} onChange={set('lastName')} />
                                    </div>
                                    <InputField id="email" label="Email Address" required type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} />
                                    <InputField id="phone" label="Phone / WhatsApp" required type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} maxLength={15} />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <InputField id="city" label="City" required placeholder="e.g. Kochi" value={form.city} onChange={set('city')} />
                                        <InputField id="state" label="State" required placeholder="e.g. Kerala" value={form.state} onChange={set('state')} />
                                    </div>
                                </form>
                            )}

                            {/* ── STEP 1: Study Goals ── */}
                            {step === 1 && (
                                <form id="form-step-1" onSubmit={next} className="space-y-4 my-auto">
                                    <CountryMultiSelector selected={form.destCountries} onChange={set('destCountries')} />
                                    {form.destCountries.length === 0 && <p className="text-xs text-red-500">Please select at least 1 country.</p>}

                                    <SelectField id="program" label="Program Level" required options={PROGRAMS} placeholder="Select program degree" value={form.program} onChange={set('program')} />
                                    <InputField id="fieldOfStudy" label="Field of Study" required placeholder="e.g. Computer Science, Business" value={form.fieldOfStudy} onChange={set('fieldOfStudy')} />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <InputField id="qualification" label="Highest Qualification" required placeholder="e.g. B.Tech, 12th" value={form.currentEducation} onChange={set('currentEducation')} />
                                        <InputField id="passout" label="Passout Year" required type="number" placeholder="e.g. 2024" value={form.yearOfPassout} onChange={set('yearOfPassout')} />
                                    </div>
                                </form>
                            )}

                            {/* ── STEP 2: Preferences ── */}
                            {step === 2 && (
                                <form id="form-step-2" onSubmit={next} className="space-y-5 my-auto">
                                    <PillSelector label="Annual Budget" required options={BUDGETS} selected={form.budget} onChange={set('budget')} />
                                    <PillSelector label="Target Intake Timeline" required options={TIMELINES} selected={form.timeline} onChange={set('timeline')} />
                                    <PillSelector label="Do you have a valid Passport?" required options={["Yes", "No", "In Process"]} selected={form.hasPassport} onChange={set('hasPassport')} />
                                    <PillSelector label="Need Scholarship Assistance?" required options={["Yes", "No", "Not Sure"]} selected={form.needsScholarship} onChange={set('needsScholarship')} />
                                    <SelectField id="hearFrom" label="How did you hear about us?" options={HEAR_FROM} placeholder="Select an option" value={form.hearFrom} onChange={set('hearFrom')} />
                                </form>
                            )}

                            {/* ── STEP 3: Review & Submit ── */}
                            {step === 3 && (
                                <form id="form-step-3" onSubmit={handleSubmit} className="space-y-4 my-auto">
                                    <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                                        {[
                                            {
                                                title: "Personal Info",
                                                stepIdx: 0,
                                                details: [
                                                    ["Name", `${form.firstName} ${form.lastName}`],
                                                    ["Contact", `${form.email} • ${form.phone}`],
                                                    ["Location", `${form.city}, ${form.state}`],
                                                ]
                                            },
                                            {
                                                title: "Study Goals",
                                                stepIdx: 1,
                                                details: [
                                                    ["Countries", form.destCountries.join(", ") || "—"],
                                                    ["Program", `${form.program} (${form.fieldOfStudy})`],
                                                    ["Education", `${form.currentEducation} (${form.yearOfPassout})`],
                                                ]
                                            },
                                            {
                                                title: "Preferences",
                                                stepIdx: 2,
                                                details: [
                                                    ["Budget", form.budget || "—"],
                                                    ["Timeline", form.timeline || "—"],
                                                    ["Passport & Aid", `Passport: ${form.hasPassport || '—'} • Aid: ${form.needsScholarship || '—'}`],
                                                ]
                                            }
                                        ].map(({ title, stepIdx, details }) => (
                                            <div key={title} className="bg-white border border-slate-200/80 rounded-xl p-3.5 text-xs shadow-sm">
                                                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                                                    <span className="font-bold text-slate-700 uppercase tracking-wider">{title}</span>
                                                    <button type="button" onClick={() => setStep(stepIdx)} className="text-[#233d63] font-semibold hover:underline">Edit</button>
                                                </div>
                                                <div className="space-y-1 text-slate-600">
                                                    {details.map(([k, v]) => (
                                                        <div key={k} className="flex gap-2">
                                                            <span className="text-slate-400 w-24 shrink-0">{k}:</span>
                                                            <span className="font-medium text-slate-800 truncate">{v}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {submitError && (
                                        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl flex items-center gap-2 font-medium">
                                            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                            <span>{submitError}</span>
                                        </div>
                                    )}
                                    <p className="text-[10px] text-slate-400 leading-tight">
                                        By submitting this form, you agree to be contacted by Fair Future's counselors. Your privacy is 100% respected.
                                    </p>
                                </form>
                            )}

                            {/* ── BOTTOM BUTTON BAR (Matching Reference UI: Back pill left, Next pill right) ── */}
                            <div className="pt-6 mt-4 border-t border-slate-200/70 flex items-center justify-between">
                                {step > 0 ? (
                                    <button
                                        type="button"
                                        onClick={prev}
                                        className="px-7 py-2.5 rounded-full border border-slate-300 bg-white text-slate-700 text-xs font-bold hover:bg-slate-100 transition-all cursor-pointer shadow-sm"
                                    >
                                        Back
                                    </button>
                                ) : (
                                    <div />
                                )}

                                {step < 3 ? (
                                    <button
                                        type="button"
                                        disabled={step === 1 && form.destCountries.length === 0}
                                        onClick={() => {
                                            const formEl = document.getElementById(`form-step-${step}`);
                                            if (formEl && formEl.checkValidity()) {
                                                next();
                                            } else if (formEl) {
                                                formEl.reportValidity();
                                            }
                                        }}
                                        className="px-9 py-2.5 rounded-full bg-[#16243a] text-white text-xs font-bold hover:bg-[#233d63] transition-all cursor-pointer shadow-md disabled:opacity-40"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        disabled={submitting}
                                        onClick={handleSubmit}
                                        className="px-9 py-2.5 rounded-full bg-[#16243a] text-white text-xs font-bold hover:bg-[#233d63] transition-all cursor-pointer shadow-md disabled:opacity-50"
                                    >
                                        {submitting ? "Submitting..." : "Submit Application"}
                                    </button>
                                )}
                            </div>
                        </>
                    )}

                </div>

        </div>
    );
}
