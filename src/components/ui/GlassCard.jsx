import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hover = true, glow = false, delay = 0, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={hover ? {
        y: -6,
        transition: { duration: 0.3 }
      } : {}}
      className={`
        glass-card
        ${hover ? 'glass-card-hover' : ''}
        ${glow ? 'glow-blue' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}
