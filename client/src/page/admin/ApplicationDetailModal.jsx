import React, { useState } from 'react';
import { X, Calendar, Mail, Phone, MapPin, Globe, GraduationCap, DollarSign, Clock, MessageSquare, Send, CheckCircle2, AlertCircle, Shield } from 'lucide-react';

export default function ApplicationDetailModal({ application, onClose, onUpdateStatus, onAddNote }) {
  const [newNote, setNewNote] = useState('');
  const [addingNote, setAddingNote] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  if (!application) return null;

  const STATUSES = ['Pending', 'Contacted', 'In Review', 'Approved', 'Closed'];

  const handleStatusChange = async (newStatus) => {
    if (newStatus === application.status) return;
    setStatusLoading(true);
    await onUpdateStatus(application._id, newStatus);
    setStatusLoading(false);
  };

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setAddingNote(true);
    await onAddNote(application._id, newNote.trim());
    setNewNote('');
    setAddingNote(false);
  };

  const formattedDate = new Date(application.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] font-sans my-auto">
        
        {/* Header */}
        <div className="bg-[#16243a] text-white p-5 sm:p-6 flex items-start justify-between border-b border-white/10 shrink-0">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="font-heading font-bold text-xl text-white">
                {application.firstName} {application.lastName}
              </h2>
              <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                application.status === 'Approved' || application.status === 'Enrolled'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : application.status === 'Contacted' || application.status === 'In Review'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : application.status === 'Closed'
                  ? 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
                  : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              }`}>
                {application.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> Submitted on {formattedDate}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-sm">
          
          {/* Quick Status Updater Bar */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Update Lead Status
            </span>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((st) => (
                <button
                  key={st}
                  disabled={statusLoading}
                  onClick={() => handleStatusChange(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                    application.status === st
                      ? 'bg-[#16243a] text-white border-[#16243a] shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-[#16243a]/40'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Section 1: Contact & Personal Info */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-[#233d63]" /> Personal & Contact Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-xs text-slate-400 block">Email Address</span>
                <span className="font-semibold text-slate-900 flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> {application.email}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Phone / WhatsApp</span>
                <span className="font-semibold text-slate-900 flex items-center gap-1.5 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> {application.phone}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Location</span>
                <span className="font-semibold text-slate-900 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {application.city}, {application.state}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Referral Source</span>
                <span className="font-semibold text-slate-900 mt-0.5 block">
                  {application.hearFrom || 'Not specified'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Study Preferences */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-[#233d63]" /> Study Preferences & Goals
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-4 rounded-xl border border-slate-200">
              <div className="sm:col-span-2">
                <span className="text-xs text-slate-400 block">Preferred Destination Countries</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {application.destCountries?.map((c) => (
                    <span key={c} className="px-2.5 py-1 rounded-md bg-[#233d63]/10 text-[#233d63] text-xs font-bold border border-[#233d63]/20 flex items-center gap-1">
                      <Globe className="w-3 h-3" /> {c}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Program Level</span>
                <span className="font-semibold text-slate-900 block mt-0.5">{application.program}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Field of Study</span>
                <span className="font-semibold text-slate-900 block mt-0.5">{application.fieldOfStudy}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Highest Qualification</span>
                <span className="font-semibold text-slate-900 block mt-0.5">{application.currentEducation}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Passout Year</span>
                <span className="font-semibold text-slate-900 block mt-0.5">{application.yearOfPassout}</span>
              </div>
            </div>
          </div>

          {/* Section 3: Budget, Timeline & Status */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-[#233d63]" /> Budget, Timeline & Readiness
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-xs text-slate-400 block">Annual Budget</span>
                <span className="font-bold text-[#233d63] block mt-0.5">{application.budget}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Target Timeline</span>
                <span className="font-semibold text-slate-900 block mt-0.5">{application.timeline}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Passport Status</span>
                <span className="font-semibold text-slate-900 block mt-0.5">{application.hasPassport || 'N/A'}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Needs Scholarship</span>
                <span className="font-semibold text-slate-900 block mt-0.5">{application.needsScholarship || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Section 4: Internal Admin Notes */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-[#233d63]" /> Internal Admin Notes ({application.adminNotes?.length || 0})
            </h3>
            
            {/* Notes List */}
            <div className="space-y-2 mb-3 max-h-40 overflow-y-auto pr-1">
              {application.adminNotes && application.adminNotes.length > 0 ? (
                application.adminNotes.map((n, i) => (
                  <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-1">
                      <span className="font-bold text-slate-800">{n.author || 'Admin'}</span>
                      <span>{new Date(n.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-slate-700">{n.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic p-3 bg-slate-50 rounded-xl border border-slate-100">
                  No internal notes added yet. Use the form below to record notes.
                </p>
              )}
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleNoteSubmit} className="flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a remark or counseling notes..."
                className="flex-1 h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#233d63]"
              />
              <button
                type="submit"
                disabled={addingNote || !newNote.trim()}
                className="h-10 px-4 bg-[#16243a] text-white rounded-xl text-xs font-semibold hover:bg-[#233d63] transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
              >
                <Send className="w-3.5 h-3.5" /> Add Note
              </button>
            </form>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}
