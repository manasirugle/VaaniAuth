export default function CompanyMarquee() {
  const companies = [
    'Fintech',
    'Healthcare',
    'HR Platforms',
    'Enterprise Security',
    'Banking',
    'Insurance',
    'Government',
    'Telecom',
  ];

  // Double the list for seamless loop
  const doubled = [...companies, ...companies];

  return (
    <section className="py-16 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <p className="text-center text-sm text-vaani-muted-dark uppercase tracking-widest font-medium">
          Trusted across industries
        </p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-vaani-bg to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-vaani-bg to-transparent z-10" />

        {/* Marquee */}
        <div className="animate-marquee flex gap-12 whitespace-nowrap">
          {doubled.map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-vaani-muted-dark/60 hover:text-vaani-muted transition-colors duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-vaani-muted-dark">
                {name[0]}
              </div>
              <span className="text-lg font-semibold tracking-tight">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
