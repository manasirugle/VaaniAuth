import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Building2, Eye, EyeOff, Mic } from 'lucide-react';
import Button from '../components/ui/Button.jsx';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', company: '' });

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = '/dashboard';
  };

  const fields = [
    { key: 'name', label: 'Full Name', type: 'text', icon: User, placeholder: 'Aryan Sharma' },
    { key: 'email', label: 'Email', type: 'email', icon: Mail, placeholder: 'you@company.com' },
    { key: 'company', label: 'Company Name', type: 'text', icon: Building2, placeholder: 'Acme Inc.' },
  ];

  return (
    <div className="min-h-screen bg-vaani-bg flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background - Very subtle */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-google-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-google-blue flex items-center justify-center shadow-lg">
              <Mic size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              Vaani<span className="text-google-blue">Auth</span>
            </span>
          </Link>
          <h1 className="text-2xl font-semibold text-white mb-2">Create your account</h1>
          <p className="text-vaani-muted text-sm">Start building with voice industry leaders</p>
        </div>

        {/* Card */}
        <div className="glass-card p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map(field => (
              <div key={field.key}>
                <label className="text-xs font-semibold text-vaani-muted uppercase tracking-wider mb-2 block">{field.label}</label>
                <div className="relative">
                  <field.icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-vaani-muted-dark" />
                  <input
                    type={field.type}
                    value={form[field.key]}
                    onChange={update(field.key)}
                    placeholder={field.placeholder}
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-google-blue focus:bg-white/[0.08] transition-all"
                  />
                </div>
              </div>
            ))}

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-vaani-muted uppercase tracking-wider mb-2 block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-vaani-muted-dark" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={update('password')}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-google-blue focus:bg-white/[0.08] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-vaani-muted-dark hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="py-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-white/10 bg-white/5 accent-google-blue" />
                <span className="text-xs text-vaani-muted leading-relaxed">
                  I agree to the <a href="#" className="text-google-blue hover:underline">Terms of Service</a> and{' '}
                  <a href="#" className="text-google-blue hover:underline">Privacy Policy</a>
                </span>
              </label>
            </div>

            <Button variant="primary" size="lg" className="w-full shadow-lg shadow-google-blue/20" type="submit">
              Sign Up for Free
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-vaani-muted mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-google-blue hover:underline font-semibold tracking-tight">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
