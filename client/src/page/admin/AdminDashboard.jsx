import React, { useState, useEffect, useCallback } from 'react';
import {
  Users, Clock, CheckCircle2, GraduationCap, Search, Filter,
  Download, Plus, RefreshCw, Eye, Trash2, LogOut, Globe, ChevronLeft, ChevronRight,
  Shield, ArrowUpDown, ChevronDown, Sparkles
} from 'lucide-react';
import ApplicationDetailModal from './ApplicationDetailModal';
import AddLeadModal from './AddLeadModal';

const STATUS_LIST = ['All', 'Pending', 'Contacted', 'In Review', 'Approved', 'Closed'];

const COUNTRY_OPTIONS = [
  "All", "Australia", "Canada", "Dubai (UAE)", "France", "Germany",
  "Ireland", "New Zealand", "Singapore", "Sweden", "United Kingdom", "United States"
];

const PROGRAM_OPTIONS = [
  "All", "Bachelor's Degree", "Master's Degree", "PhD / Doctorate",
  "Diploma / Certificate", "Foundation Program", "Language Course", "MBA"
];

export default function AdminDashboard({ admin, onLogout }) {
  const [applications, setApplications] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  // Analytics stats
  const [analytics, setAnalytics] = useState({
    totalApplications: 0,
    pendingCount: 0,
    contactedCount: 0,
    approvedCount: 0,
  });

  // Filters & Search
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');
  const [programFilter, setProgramFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('desc');

  // Loading & Modals State
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [actionError, setActionError] = useState('');

  // Fetch applications list
  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setActionError('');
    try {
      const token = localStorage.getItem('adminToken');
      const queryParams = new URLSearchParams({
        page,
        limit,
        status: statusFilter,
        country: countryFilter,
        program: programFilter,
        sortOrder,
      });

      if (search.trim()) {
        queryParams.append('search', search.trim());
      }

      const res = await fetch(`/api/applications?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        if (res.status === 401) {
          onLogout();
          return;
        }
        throw new Error(data.message || 'Failed to fetch applications');
      }

      setApplications(data.data || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error('Fetch error:', err);
      setActionError(err.message || 'Server error loading data');
    } finally {
      setLoading(false);
    }
  }, [page, limit, statusFilter, countryFilter, programFilter, sortOrder, search, onLogout]);

  // Fetch analytics overview
  const fetchAnalytics = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/applications/analytics/overview', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setAnalytics(data.data);
      }
    } catch (err) {
      console.error('Analytics error:', err);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
    fetchAnalytics();
  }, [fetchApplications, fetchAnalytics]);

  // Update Status
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/applications/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      // Update state locally
      setApplications((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
      );

      if (selectedApp && selectedApp._id === id) {
        setSelectedApp((prev) => ({ ...prev, status: newStatus }));
      }

      fetchAnalytics();
    } catch (err) {
      alert(`Error updating status: ${err.message}`);
    }
  };

  // Add Internal Admin Note
  const handleAddNote = async (id, text) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/applications/${id}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      if (selectedApp && selectedApp._id === id) {
        setSelectedApp(data.data);
      }

      setApplications((prev) =>
        prev.map((item) => (item._id === id ? data.data : item))
      );
    } catch (err) {
      alert(`Error adding note: ${err.message}`);
    }
  };

  // Delete Application
  const handleDeleteApplication = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/applications/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      setDeleteConfirmId(null);
      if (selectedApp?._id === id) setSelectedApp(null);
      fetchApplications();
      fetchAnalytics();
    } catch (err) {
      alert(`Error deleting application: ${err.message}`);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (applications.length === 0) {
      alert('No application data available to export');
      return;
    }

    const headers = [
      'ID', 'First Name', 'Last Name', 'Email', 'Phone', 'City', 'State',
      'Preferred Countries', 'Program', 'Field of Study', 'Education', 'Passout Year',
      'Budget', 'Timeline', 'Passport', 'Scholarship', 'Status', 'Submitted Date'
    ];

    const rows = applications.map((a) => [
      a._id,
      `"${a.firstName}"`,
      `"${a.lastName}"`,
      `"${a.email}"`,
      `"${a.phone}"`,
      `"${a.city}"`,
      `"${a.state}"`,
      `"${a.destCountries?.join(', ')}"`,
      `"${a.program}"`,
      `"${a.fieldOfStudy}"`,
      `"${a.currentEducation}"`,
      `"${a.yearOfPassout}"`,
      `"${a.budget}"`,
      `"${a.timeline}"`,
      `"${a.hasPassport}"`,
      `"${a.needsScholarship}"`,
      `"${a.status}"`,
      `"${new Date(a.createdAt).toISOString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `FairFuture_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] font-sans text-slate-800 flex flex-col">
      
      {/* ── TOP ADMIN NAV HEADER (Brand Navy #16243a) ── */}
      <header className="bg-[#16243a] text-white px-4 sm:px-6 py-4 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Brand Name */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#60a5fa]">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-white">
                <circle cx="12" cy="12" r="10" fill="currentColor" />
                <rect x="2" y="10.8" width="20" height="2.4" fill="#16243a" />
                <rect x="10.8" y="2" width="2.4" height="20" fill="#16243a" />
                <circle cx="12" cy="12" r="4.2" fill="#16243a" />
                <circle cx="12" cy="12" r="2.2" fill="currentColor" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-base text-white tracking-widest uppercase">
                  FAIR FUTURE
                </span>
                <span className="bg-[#60a5fa]/20 text-[#60a5fa] border border-[#60a5fa]/30 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase">
                  Admin Panel
                </span>
              </div>
              <span className="text-xs text-white/50 block">Education Consultancy Lead Portal</span>
            </div>
          </div>

          {/* Admin User Info & Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-white">{admin?.name || 'Administrator'}</span>
              <span className="text-[11px] text-white/60">{admin?.email || 'admin@fairfuture.com'}</span>
            </div>
            
            <button
              onClick={onLogout}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-red-500/20 hover:text-red-300 text-white/80 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer border border-white/10"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* ── MAIN DASHBOARD CONTAINER ── */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* ── METRICS STATS CARDS (Different Shades of Blue) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Total Applications - Dark Navy Blue */}
          <div className="bg-[#16243a] text-white p-5 rounded-2xl border border-blue-900/50 shadow-md flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-blue-200/80 uppercase tracking-wider block">Total Applications</span>
              <span className="font-heading font-extrabold text-2xl text-white mt-1 block">
                {analytics.totalApplications}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/10 text-[#60a5fa] flex items-center justify-center border border-white/10">
              <Users className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Pending Review - Deep Royal Blue */}
          <div className="bg-[#1e3a8a] text-white p-5 rounded-2xl border border-blue-800/50 shadow-md flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-blue-200/80 uppercase tracking-wider block">Pending Review</span>
              <span className="font-heading font-extrabold text-2xl text-white mt-1 block">
                {analytics.pendingCount}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/10 text-[#93c5fd] flex items-center justify-center border border-white/10">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Contacted / Active - Bright Sapphire Blue */}
          <div className="bg-[#2563eb] text-white p-5 rounded-2xl border border-blue-500/50 shadow-md flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-blue-100/90 uppercase tracking-wider block">Contacted / Active</span>
              <span className="font-heading font-extrabold text-2xl text-white mt-1 block">
                {analytics.contactedCount}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/15 text-white flex items-center justify-center border border-white/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: Approved / Enrolled - Vibrant Sky Blue */}
          <div className="bg-[#0284c7] text-white p-5 rounded-2xl border border-sky-500/50 shadow-md flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-sky-100/90 uppercase tracking-wider block">Approved / Enrolled</span>
              <span className="font-heading font-extrabold text-2xl text-white mt-1 block">
                {analytics.approvedCount}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/15 text-white flex items-center justify-center border border-white/20">
              <GraduationCap className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* ── TOOLBAR: SEARCH, FILTERS & ACTIONS ── */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          
          {/* Top Controls Row */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by student name, email, phone, city..."
                className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#233d63] focus:bg-white transition-all"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setShowAddModal(true)}
                className="h-10 px-4 rounded-xl bg-[#16243a] hover:bg-[#233d63] text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4 text-[#60a5fa]" /> Add New Lead
              </button>

              <button
                onClick={handleExportCSV}
                className="h-10 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4 text-slate-500" /> Export CSV
              </button>

              <button
                onClick={() => {
                  fetchApplications();
                  fetchAnalytics();
                }}
                className="h-10 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                title="Reload Data"
              >
                <RefreshCw className={`w-4 h-4 text-slate-500 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>

          </div>

          {/* Filter Options Row */}
          <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            
            {/* Status Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Status:</span>
              {STATUS_LIST.map((st) => {
                const active = statusFilter === st;
                return (
                  <button
                    key={st}
                    onClick={() => {
                      setStatusFilter(st);
                      setPage(1);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? 'bg-[#233d63] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                );
              })}
            </div>

            {/* Dropdown Filters (Country & Program) */}
            <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
              {/* Country Select */}
              <div className="relative flex-1 md:w-40">
                <select
                  value={countryFilter}
                  onChange={(e) => {
                    setCountryFilter(e.target.value);
                    setPage(1);
                  }}
                  className="w-full h-9 pl-3 pr-8 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:border-[#233d63] appearance-none cursor-pointer"
                >
                  <option value="All">All Countries</option>
                  {COUNTRY_OPTIONS.filter((c) => c !== 'All').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Program Select */}
              <div className="relative flex-1 md:w-40">
                <select
                  value={programFilter}
                  onChange={(e) => {
                    setProgramFilter(e.target.value);
                    setPage(1);
                  }}
                  className="w-full h-9 pl-3 pr-8 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:border-[#233d63] appearance-none cursor-pointer"
                >
                  <option value="All">All Programs</option>
                  {PROGRAM_OPTIONS.filter((p) => p !== 'All').map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Sort Toggle */}
              <button
                onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                className="h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-semibold flex items-center gap-1 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Toggle Date Sort Order"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                <span>{sortOrder === 'desc' ? 'Newest' : 'Oldest'}</span>
              </button>
            </div>

          </div>

        </div>

        {/* ── APPLICATIONS TABLE / CARDS SECTION ── */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          
          {loading ? (
            /* Skeleton Loading State */
            <div className="p-12 text-center text-slate-400 space-y-3">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#233d63]" />
              <p className="text-xs font-semibold">Loading student applications...</p>
            </div>
          ) : applications.length === 0 ? (
            /* Empty State */
            <div className="p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">No Applications Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No lead records matched your filter criteria. Try resetting filters or adding a new lead manually.
              </p>
            </div>
          ) : (
            <>
              {/* DESKTOP DATA TABLE (Visible on md+) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                      <th className="py-3.5 px-4">Applicant</th>
                      <th className="py-3.5 px-4">Contact Info</th>
                      <th className="py-3.5 px-4">Destinations</th>
                      <th className="py-3.5 px-4">Program & Budget</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Submitted</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.map((app) => (
                      <tr key={app._id} className="hover:bg-slate-50/80 transition-colors">
                        
                        {/* Name & ID */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">
                            {app.firstName} {app.lastName}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            #{app._id.slice(-6)}
                          </span>
                        </td>

                        {/* Contact */}
                        <td className="py-3.5 px-4">
                          <div className="text-slate-800 font-medium">{app.email}</div>
                          <div className="text-slate-500 text-[11px]">{app.phone} • {app.city}</div>
                        </td>

                        {/* Preferred Countries */}
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1 max-w-[180px]">
                            {app.destCountries?.slice(0, 2).map((c) => (
                              <span key={c} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
                                {c}
                              </span>
                            ))}
                            {(app.destCountries?.length || 0) > 2 && (
                              <span className="text-[10px] text-slate-400 font-semibold self-center">
                                +{app.destCountries.length - 2} more
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Program & Budget */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-800">{app.program}</div>
                          <div className="text-slate-500 text-[11px]">{app.budget}</div>
                        </td>

                        {/* Status Switcher */}
                        <td className="py-3.5 px-4">
                          <select
                            value={app.status}
                            onChange={(e) => handleUpdateStatus(app._id, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer focus:outline-none ${
                              app.status === 'Approved' || app.status === 'Enrolled'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : app.status === 'Contacted' || app.status === 'In Review'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : app.status === 'Closed'
                                ? 'bg-slate-100 text-slate-600 border-slate-200'
                                : 'bg-blue-50 text-blue-700 border-blue-200'
                            }`}
                          >
                            {STATUS_LIST.filter((s) => s !== 'All').map((st) => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                        </td>

                        {/* Date */}
                        <td className="py-3.5 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                          {new Date(app.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedApp(app)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#233d63] hover:text-white text-slate-600 transition-colors cursor-pointer"
                              title="View Full Details & Notes"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(app._id)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-500 hover:text-white text-slate-600 transition-colors cursor-pointer"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARDS VIEW (Visible on mobile screens) */}
              <div className="block md:hidden divide-y divide-slate-100">
                {applications.map((app) => (
                  <div key={app._id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {app.firstName} {app.lastName}
                        </h4>
                        <p className="text-xs text-slate-500">{app.email} • {app.phone}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{app.city}, {app.state}</p>
                      </div>
                      
                      <select
                        value={app.status}
                        onChange={(e) => handleUpdateStatus(app._id, e.target.value)}
                        className={`px-2 py-1 rounded-lg text-xs font-bold border ${
                          app.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        {STATUS_LIST.filter((s) => s !== 'All').map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs space-y-1">
                      <p><span className="text-slate-400">Program:</span> <span className="font-medium text-slate-800">{app.program}</span></p>
                      <p><span className="text-slate-400">Destinations:</span> <span className="font-medium text-slate-800">{app.destCountries?.join(', ')}</span></p>
                      <p><span className="text-slate-400">Budget:</span> <span className="font-semibold text-[#233d63]">{app.budget}</span></p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-slate-400">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="px-3 py-1.5 rounded-lg bg-[#16243a] text-white text-xs font-semibold flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> Details
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(app._id)}
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── PAGINATION BAR ── */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-500">
              Showing {applications.length} of <span className="font-bold text-slate-800">{total}</span> total applications
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>
              
              <span className="font-semibold text-slate-700 px-2">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>

        </div>

      </main>

      {/* ── DETAIL MODAL ── */}
      {selectedApp && (
        <ApplicationDetailModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
          onUpdateStatus={handleUpdateStatus}
          onAddNote={handleAddNote}
        />
      )}

      {/* ── ADD LEAD MODAL ── */}
      {showAddModal && (
        <AddLeadModal
          onClose={() => setShowAddModal(false)}
          onAddLead={() => {
            fetchApplications();
            fetchAnalytics();
          }}
        />
      )}

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Delete Application?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to permanently delete this lead record? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteApplication(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 cursor-pointer"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
