import React, { useState } from 'react';
import { X, Plus, AlertCircle } from 'lucide-react';
import { getApiUrl } from '../../lib/api';

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

export default function AddLeadModal({ onClose, onAddLead }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    destCountries: ['United Kingdom'],
    program: "Master's Degree",
    fieldOfStudy: '',
    currentEducation: '',
    yearOfPassout: new Date().getFullYear().toString(),
    budget: '₹20–40 Lakhs',
    timeline: '6 months',
    hasPassport: 'In Process',
    needsScholarship: 'Yes',
    hearFrom: 'Direct Intake',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (key) => (val) => {
    setError('');
    setForm((f) => ({ ...f, [key]: val }));
  };

  const toggleCountry = (c) => {
    setError('');
    const current = form.destCountries;
    if (current.includes(c)) {
      if (current.length === 1) return; // Must have at least 1
      setForm((f) => ({ ...f, destCountries: current.filter((item) => item !== c) }));
    } else {
      setForm((f) => ({ ...f, destCountries: [...current, c] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.destCountries || form.destCountries.length === 0) {
      setError('Please select at least one preferred destination country');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch(getApiUrl('/api/applications'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to create lead entry');
      }

      onAddLead(data.data);
      onClose();
    } catch (err) {
      console.error('Add lead error:', err);
      setError(err.message || 'Error creating application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] font-sans my-auto">
        
        {/* Header */}
        <div className="bg-[#16243a] text-white p-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div>
            <h2 className="font-heading font-bold text-lg text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#60a5fa]" /> Add New Consultation Lead
            </h2>
            <p className="text-xs text-slate-400">Enter applicant details to save lead directly into system</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs text-slate-800">
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-500 uppercase tracking-wider block mb-1">First Name *</label>
              <input
                type="text"
                required
                value={form.firstName}
                onChange={(e) => set('firstName')(e.target.value)}
                placeholder="e.g. Anish"
                className="w-full h-10 px-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#16243a]"
              />
            </div>
            <div>
              <label className="font-bold text-slate-500 uppercase tracking-wider block mb-1">Last Name *</label>
              <input
                type="text"
                required
                value={form.lastName}
                onChange={(e) => set('lastName')(e.target.value)}
                placeholder="e.g. Mehta"
                className="w-full h-10 px-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#16243a]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-500 uppercase tracking-wider block mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => set('email')(e.target.value)}
                placeholder="anish@example.com"
                className="w-full h-10 px-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#16243a]"
              />
            </div>
            <div>
              <label className="font-bold text-slate-500 uppercase tracking-wider block mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => set('phone')(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full h-10 px-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#16243a]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-500 uppercase tracking-wider block mb-1">City *</label>
              <input
                type="text"
                required
                value={form.city}
                onChange={(e) => set('city')(e.target.value)}
                placeholder="Mumbai"
                className="w-full h-10 px-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#16243a]"
              />
            </div>
            <div>
              <label className="font-bold text-slate-500 uppercase tracking-wider block mb-1">State *</label>
              <input
                type="text"
                required
                value={form.state}
                onChange={(e) => set('state')(e.target.value)}
                placeholder="Maharashtra"
                className="w-full h-10 px-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#16243a]"
              />
            </div>
          </div>

          {/* Preferred Countries */}
          <div>
            <label className="font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Preferred Destination Countries *
            </label>
            <div className="flex flex-wrap gap-1.5">
              {COUNTRIES.map((c) => {
                const active = form.destCountries.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleCountry(c)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      active
                        ? 'bg-[#16243a] text-white border-[#16243a]'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-[#16243a]/30'
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Academic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-500 uppercase tracking-wider block mb-1">Program Level *</label>
              <select
                value={form.program}
                onChange={(e) => set('program')(e.target.value)}
                className="w-full h-10 px-3 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:border-[#16243a]"
              >
                {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-500 uppercase tracking-wider block mb-1">Field of Study *</label>
              <input
                type="text"
                required
                value={form.fieldOfStudy}
                onChange={(e) => set('fieldOfStudy')(e.target.value)}
                placeholder="Data Science, Management..."
                className="w-full h-10 px-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#16243a]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-500 uppercase tracking-wider block mb-1">Highest Qualification *</label>
              <input
                type="text"
                required
                value={form.currentEducation}
                onChange={(e) => set('currentEducation')(e.target.value)}
                placeholder="B.Sc, B.Tech..."
                className="w-full h-10 px-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#16243a]"
              />
            </div>
            <div>
              <label className="font-bold text-slate-500 uppercase tracking-wider block mb-1">Passout Year *</label>
              <input
                type="number"
                required
                value={form.yearOfPassout}
                onChange={(e) => set('yearOfPassout')(e.target.value)}
                placeholder="2024"
                className="w-full h-10 px-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#16243a]"
              />
            </div>
          </div>

          {/* Budget & Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-500 uppercase tracking-wider block mb-1">Annual Budget *</label>
              <select
                value={form.budget}
                onChange={(e) => set('budget')(e.target.value)}
                className="w-full h-10 px-3 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:border-[#16243a]"
              >
                {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-500 uppercase tracking-wider block mb-1">Intake Timeline *</label>
              <select
                value={form.timeline}
                onChange={(e) => set('timeline')(e.target.value)}
                className="w-full h-10 px-3 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:border-[#16243a]"
              >
                {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Footer actions */}
          <div className="pt-4 border-t border-slate-200 flex justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-[#16243a] hover:bg-[#233d63] text-white text-xs font-semibold transition-all cursor-pointer shadow-md disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Lead Entry'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
