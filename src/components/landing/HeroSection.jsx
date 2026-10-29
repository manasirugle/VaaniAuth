import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button.jsx';

function SoundwaveVisualization() {
  const bars = 40;
  return (
    <div className="flex items-center justify-center gap-[2px] h-12">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[2px] rounded-full bg-google-blue"
          animate={{
            height: ['8px', `${Math.random() * 32 + 8}px`, '8px'],
          }}
          transition={{
            duration: 0.8 + Math.random() * 0.8,
            repeat: Infinity,
            delay: i * 0.03,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

function AuthStep({ label, value, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/[0.02] border border-white/5"
    >
      <span className="text-xs text-vaani-muted">{label}</span>
      <span className={`text-xs font-medium ${color}`}>{value}</span>
    </motion.div>
  );
}

function AuthFlowAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="glass-card p-6 space-y-3 w-full max-w-sm mx-auto shadow-2xl"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg bg-google-blue flex items-center justify-center">
          <Mic size={16} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">Voice Identity</p>
          <p className="text-[10px] text-vaani-muted uppercase tracking-wider">Verifying...</p>
        </div>
      </div>

      <div className="py-2">
        <SoundwaveVisualization />
      </div>

      <div className="space-y-2">
        <AuthStep label="Biometric Match" value="98.4%" color="text-google-green" delay={0.8} />
        <AuthStep label="Liveness" value="Verified" color="text-google-green" delay={0.9} />
        <AuthStep label="Integrity" value="High" color="text-google-blue" delay={1.0} />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="mt-3 py-2 px-3 rounded-lg bg-google-green/10 border border-google-green/20 text-center"
      >
        <span className="text-google-green font-medium text-xs">Identity Authenticated</span>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex flex-col justify-center">
      {/* Background - Very subtle */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-google-blue/5 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 w-full text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-google-blue/10 border border-google-blue/20 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-google-blue animate-pulse" />
          <span className="text-[11px] text-google-blue font-semibold uppercase tracking-widest">Enterprise API Portal</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.15] mb-8 text-white max-w-4xl mx-auto"
        >
          Authenticate security with <span className="text-google-blue">your voice.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-vaani-muted leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          The developer platform for secure, voice-based identity. 
          Deploy passwordless authentication in minutes.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-20"
        >
          <Link to="/signup">
            <Button variant="primary" size="lg">
              Start Building
            </Button>
          </Link>
          <Link to="/docs">
            <Button variant="secondary" size="lg" icon={BookOpen}>
              Documentation
            </Button>
          </Link>
        </motion.div>

        {/* Auth Visualization */}
        <div className="max-w-md mx-auto">
          <AuthFlowAnimation />
        </div>
      </div>
    </section>
  );
}
