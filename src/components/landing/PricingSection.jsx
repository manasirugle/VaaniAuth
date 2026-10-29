import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading.jsx';
import Button from '../ui/Button.jsx';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for prototyping and small projects.',
    features: [
      '1,000 requests / month',
      '1 API key',
      'Speaker verification',
      'Basic fraud detection',
      'Community support',
      'Standard latency',
    ],
    cta: 'Get Started',
    variant: 'secondary',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/ month',
    description: 'For growing teams shipping to production.',
    features: [
      '100,000 requests / month',
      'Unlimited API keys',
      'Speaker verification',
      'Advanced fraud detection',
      'Liveness detection',
      'Continuous authentication',
      'Priority support',
      'Custom webhooks',
      '< 100ms latency',
    ],
    cta: 'Start Pro Trial',
    variant: 'primary',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations with advanced requirements.',
    features: [
      'Unlimited requests',
      'Dedicated infrastructure',
      'On-premise deployment',
      'Custom model training',
      'Offline edge support',
      'SSO & RBAC',
      'SLA guarantee (99.99%)',
      'Dedicated account manager',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
    variant: 'secondary',
    highlighted: false,
  },
];

export default function PricingSection() {
  return (
    <section className="py-24 relative" id="pricing">
      {/* Background - Very subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-google-blue/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Simple, transparent pricing"
          subtitle="Start for free. Scale as you grow. No hidden fees."
        />

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex"
            >
              <div className={`glass-card p-8 flex-1 flex flex-col border border-white/5 ${
                plan.highlighted ? 'ring-2 ring-google-blue/30 scale-105 z-10' : ''
              }`}>
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-google-blue text-white text-[10px] font-bold uppercase tracking-wider">
                    <Sparkles size={10} />
                    Recommended
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-sm text-vaani-muted leading-relaxed mb-6">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period && (
                      <span className="text-vaani-muted text-sm">{plan.period}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check size={16} className="text-google-green flex-shrink-0 mt-0.5" />
                      <span className="text-vaani-muted">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/signup">
                  <Button variant={plan.variant} size="lg" className="w-full" iconRight={ArrowRight}>
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
