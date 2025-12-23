import React from 'react';
import { LoginForm } from '../components/LoginForm';
export function LoginPage() {
  return <main className="min-h-screen w-full flex items-center justify-center bg-[#001f3f] p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#003366] via-[#001f3f] to-black opacity-80" />

      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] animate-pulse delay-1000" />

      {/* Card Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Glass Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10 p-8 sm:p-10 relative overflow-hidden">
          {/* Top Gradient Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-50" />

          <LoginForm />
        </div>

        {/* Decorative Elements */}
        <div className="absolute -z-10 -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full blur-2xl opacity-20" />
        <div className="absolute -z-10 -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full blur-2xl opacity-20" />
      </div>
    </main>;
}