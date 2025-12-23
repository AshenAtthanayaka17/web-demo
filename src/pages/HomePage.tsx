import React from 'react';
import { logout } from '../lib/firebaseAuth';
import { useNavigate } from 'react-router-dom';
export function HomePage() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };
  return <main className="min-h-screen w-full bg-[#001f3f] text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#003366] via-[#001f3f] to-black opacity-80" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

      <div className="relative z-10 max-w-4xl w-full space-y-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-300 to-white animate-pulse">
          Welcome Home
        </h1>

        <p className="text-xl text-sky-200/80 max-w-2xl mx-auto leading-relaxed">
          You have successfully authenticated. This is the protected dashboard
          area. Explore your portfolio, gallery, and personal settings.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-12">
          <button onClick={handleLogout} className="group relative px-8 py-4 bg-black/40 backdrop-blur-md border border-sky-500/30 rounded-xl overflow-hidden transition-all hover:border-sky-400 hover:shadow-[0_0_30px_rgba(135,206,235,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative font-medium text-sky-100">Sign Out</span>
          </button>
        </div>
      </div>
    </main>;
}