import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { getApiUrl } from '../../lib/api';

export default function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('admin@fairfuture.com');
  const [password, setPassword] = useState('Admin@123456');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(getApiUrl('/api/admin/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid admin credentials');
      }

      // Save token and admin details
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.admin));

      onLoginSuccess(data.admin);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Unable to connect to login server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0f16] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#233d63]/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#60a5fa]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#16243a] border border-white/10 shadow-xl mb-4 text-[#60a5fa]">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-white">
              <circle cx="12" cy="12" r="10" fill="currentColor" />
              <rect x="2" y="10.8" width="20" height="2.4" fill="#16243a" />
              <rect x="10.8" y="2" width="2.4" height="20" fill="#16243a" />
              <circle cx="12" cy="12" r="4.2" fill="#16243a" />
              <circle cx="12" cy="12" r="2.2" fill="currentColor" />
            </svg>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            FAIR FUTURE
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">
            Admin Management Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#16243a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#60a5fa]" /> Sign In to Admin Dashboard
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Enter your authorized admin credentials to access applications.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@fairfuture.com"
                  className="w-full h-11 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#60a5fa] focus:ring-2 focus:ring-[#60a5fa]/20 transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-11 bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#60a5fa] focus:ring-2 focus:ring-[#60a5fa]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Demo Credentials Tip Box */}
            <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-[11px] text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">Default Admin Credentials:</p>
              <p>Email: <span className="font-mono text-[#60a5fa]">admin@fairfuture.com</span></p>
              <p>Password: <span className="font-mono text-[#60a5fa]">Admin@123456</span></p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 mt-2 bg-[#233d63] hover:bg-[#2c4b7a] text-white font-semibold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Access Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          © {new Date().getFullYear()} Fair Future Education Consultancy. All Rights Reserved.
        </p>

      </div>
    </div>
  );
}
