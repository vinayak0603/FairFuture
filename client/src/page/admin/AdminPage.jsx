import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import SEO from '../../components/SEO';

export default function AdminPage() {
  const [admin, setAdmin] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const savedUser = localStorage.getItem('adminUser');

    if (token && savedUser) {
      try {
        setAdmin(JSON.parse(savedUser));
      } catch (err) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
      }
    }
    setCheckingAuth(false);
  }, []);

  const handleLoginSuccess = (adminData) => {
    setAdmin(adminData);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setAdmin(null);
  };

  return (
    <>
      <SEO
        title="Admin Management Portal | Fair Future Consultancy"
        description="Secure Admin Lead Management Portal for Fair Future Education Consultancy."
        noindex={true}
      />
      {checkingAuth ? (
        <div className="min-h-screen bg-[#0c0f16] flex items-center justify-center text-white font-sans">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-[#60a5fa] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-slate-400 font-semibold">Verifying session...</span>
          </div>
        </div>
      ) : !admin ? (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      ) : (
        <AdminDashboard admin={admin} onLogout={handleLogout} />
      )}
    </>
  );
}
