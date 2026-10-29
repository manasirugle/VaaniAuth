import { motion } from 'framer-motion';
import { Mic, UserCheck, ShieldCheck, KeyRound, ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';

const steps = [
  {
    icon: Mic,
    number: '01',
    title: 'Capture',
    description: 'User provides a voice sample through your app.',
  },
  {
    icon: UserCheck,
    number: '02',
    title: 'Verify',
    description: 'Neural models analyze and match the voiceprint.',
  },
  {
    icon: ShieldCheck,
    number: '03',
    title: 'Protect',
    description: 'Live signals are checked for replay or deepfakes.',
  },
  {
    icon: KeyRound,
    number: '04',
    title: 'Authenticate',
    description: 'Secure token is returned upon successful match.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-vaani-bg" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Simple integration"
          subtitle="Integrate voice authentication into any workspace with a single API call."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-start text-left group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-google-blue/30 transition-colors">
                <step.icon size={22} className="text-google-blue" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-bold text-google-blue uppercase tracking-widest">{step.number}</span>
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
              </div>
              <p className="text-sm text-vaani-muted leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
