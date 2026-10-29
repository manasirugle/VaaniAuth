import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-google-blue text-white hover:bg-google-blue-hover shadow-sm',
  secondary: 'bg-white/5 border border-white/10 text-white hover:bg-white/10',
  ghost: 'text-vaani-muted hover:text-white hover:bg-white/5',
  outline: 'border border-google-blue text-[#8ab4f8] hover:bg-google-blue/10',
};

const sizes = {
  sm: 'px-4 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-lg font-medium',
  lg: 'px-6 py-3 text-base rounded-lg font-medium',
};

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon: Icon,
  iconRight: IconRight,
  ...props 
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`
        inline-flex items-center justify-center gap-2
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
      {IconRight && <IconRight size={18} />}
    </motion.button>
  );
}
