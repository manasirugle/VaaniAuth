import { motion } from 'framer-motion';
import {
  UserCheck,
  ShieldCheck,
  Zap,
  RefreshCw,
  HardDrive,
  Globe,
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';

const features = [
  {
    icon: UserCheck,
    title: 'Speaker Verification',
    description: 'Compare voice fingerprints to verify identity with over 98% accuracy.',
  },
  {
    icon: ShieldCheck,
    title: 'Liveness Detection',
    description: 'Protect against playback attacks and deepfakes with real-time spoofing detection.',
  },
  {
    icon: Zap,
    title: 'Low Latency',
    description: 'Optimized models providing sub-200ms verification for a seamless user experience.',
  },
  {
    icon: RefreshCw,
    title: 'Continuous Identity',
    description: 'Ensure the speaker remains the same throughout long-duration sessions.',
  },
  {
    icon: HardDrive,
    title: 'Edge Deployment',
    description: 'Run verification locally on devices for faster response and maximum privacy.',
  },
  {
    icon: Globe,
    title: 'Global Scale',
    description: 'Infrastructure designed to handle millions of requests across worldwide regions.',
  },
];

export default function WhyVaaniAuth() {
  return (
    <section className="py-24 relative bg-black/20" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Engineered for reliability"
          subtitle="Everything you need to secure your application with voice biometrics."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass-card p-8 flex flex-col items-start text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-google-blue/10 flex items-center justify-center mb-6">
                <feature.icon size={20} className="text-google-blue" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-sm text-vaani-muted leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
