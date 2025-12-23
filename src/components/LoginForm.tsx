import React, { useState } from 'react';
import { ArrowRight, Phone, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { loginWithGoogle, loginWithEmail, loginAsGuest, loginWithPhone, setupRecaptcha } from '../lib/firebaseAuth';
import { ConfirmationResult } from 'firebase/auth';
type LoginMethod = 'email' | 'mobile';
export function LoginForm() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<LoginMethod>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/home');
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleGuestLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginAsGuest();
      navigate('/home');
    } catch (err) {
      setError('Guest login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      navigate('/home');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const verifier = setupRecaptcha('recaptcha-container');
      const confirmation = await loginWithPhone(phone, verifier);
      setConfirmationResult(confirmation);
      setShowVerification(true);
    } catch (err) {
      setError('Phone verification failed. Please check the number and try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (confirmationResult) {
        await confirmationResult.confirm(verificationCode);
        navigate('/home');
      }
    } catch (err) {
      setError('Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return <div className="w-full space-y-8 relative z-10">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-[0_0_10px_rgba(135,206,235,0.5)]">
          Access Portal
        </h1>
        <p className="text-sm text-sky-200/70 font-light">
          Authenticate to enter secure system
        </p>
      </div>

      {/* Error Display */}
      {error && <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 backdrop-blur-md animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm text-red-200">{error}</p>
            {error.includes('password') && <p className="text-xs text-red-300/70 mt-2 border-t border-red-500/20 pt-2">
                Forgot password? Contact admin via WhatsApp or SMS: <br />
                <span className="font-mono select-all hover:text-white transition-colors">
                  +44 7418 315820
                </span>
              </p>}
          </div>
        </div>}

      {/* Google Button */}
      <button type="button" onClick={handleGoogleLogin} disabled={loading} className="group relative w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        {loading ? <Loader2 className="w-5 h-5 animate-spin text-sky-400" /> : <>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span>Initialize Google Auth</span>
          </>}
      </button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-widest">
          <span className="px-4 bg-[#001f3f]/50 backdrop-blur-xl text-sky-200/50">
            System Login
          </span>
        </div>
      </div>

      {/* Method Toggle */}
      <div className="p-1 bg-black/20 rounded-xl flex border border-white/5">
        <button type="button" onClick={() => {
        setMethod('email');
        setShowVerification(false);
        setError(null);
      }} className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${method === 'email' ? 'bg-sky-500/20 text-sky-300 shadow-[0_0_15px_rgba(14,165,233,0.2)] border border-sky-500/30' : 'text-gray-400 hover:text-gray-200'}`}>
          <Mail className="w-4 h-4" />
          Email
        </button>
        <button type="button" onClick={() => {
        setMethod('mobile');
        setShowVerification(false);
        setError(null);
      }} className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${method === 'mobile' ? 'bg-sky-500/20 text-sky-300 shadow-[0_0_15px_rgba(14,165,233,0.2)] border border-sky-500/30' : 'text-gray-400 hover:text-gray-200'}`}>
          <Phone className="w-4 h-4" />
          Mobile
        </button>
      </div>

      {/* Dynamic Form */}
      <div className="min-h-[200px]">
        {method === 'email' ? <form className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500" onSubmit={handleEmailLogin}>
            <div className="space-y-4">
              <div className="group relative">
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder=" " className="peer w-full px-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 focus:outline-none transition-all duration-300" />
                <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-sky-400 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-sky-400 bg-[#001f3f] px-1 pointer-events-none">
                  Email Address
                </label>
              </div>
              <div className="group relative">
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder=" " className="peer w-full px-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 focus:outline-none transition-all duration-300" />
                <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-sky-400 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-sky-400 bg-[#001f3f] px-1 pointer-events-none">
                  Password
                </label>
              </div>
            </div>

            <button type="submit" disabled={loading} className="group w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>
                  <span>Authenticate</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>}
            </button>
          </form> : <form className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500" onSubmit={showVerification ? handleVerifyCode : handleSendCode}>
            {!showVerification ? <div className="group relative">
                <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder=" " className="peer w-full px-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 focus:outline-none transition-all duration-300" />
                <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-sky-400 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-sky-400 bg-[#001f3f] px-1 pointer-events-none">
                  Mobile Number (e.g., +15550000000)
                </label>
              </div> : <div className="group relative">
                <input type="text" required value={verificationCode} onChange={e => setVerificationCode(e.target.value)} placeholder=" " className="peer w-full px-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-transparent focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 focus:outline-none transition-all duration-300 tracking-widest text-center text-lg" />
                <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-sky-400 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-sky-400 bg-[#001f3f] px-1 pointer-events-none w-full text-center">
                  Enter Verification Code
                </label>
              </div>}

            <div id="recaptcha-container"></div>

            <button type="submit" disabled={loading} className="group w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>
                  <span>
                    {showVerification ? 'Verify Code' : 'Send Verification Code'}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>}
            </button>
          </form>}
      </div>

      {/* Guest Link */}
      <div className="text-center pt-4 border-t border-white/5">
        <button type="button" onClick={handleGuestLogin} disabled={loading} className="text-sm text-sky-200/50 hover:text-sky-300 font-medium transition-colors duration-200 hover:underline decoration-sky-500/30 underline-offset-4">
          Initialize Guest Session
        </button>
      </div>
    </div>;
}