import { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';

const sections = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', id: 'introduction' },
      { label: 'Quick Start', id: 'quickstart' },
      { label: 'Installation', id: 'installation' },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { label: 'Authentication API', id: 'auth-api' },
      { label: 'Register Voice API', id: 'register-api' },
      { label: 'Verify Voice API', id: 'verify-api' },
      { label: 'Fraud Detection API', id: 'fraud-api' },
      { label: 'Continuous Auth API', id: 'continuous-api' },
    ],
  },
  {
    title: 'SDKs & Libraries',
    items: [
      { label: 'JavaScript SDK', id: 'js-sdk' },
      { label: 'Python SDK', id: 'python-sdk' },
      { label: 'REST API', id: 'rest-api' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Error Codes', id: 'errors' },
      { label: 'Rate Limits', id: 'rate-limits' },
      { label: 'Changelog', id: 'changelog' },
    ],
  },
];

export default function DocsSidebar({ activeSection, onSectionClick }) {
  const [search, setSearch] = useState('');

  const filteredSections = sections.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.label.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(section => section.items.length > 0);

  return (
    <aside className="w-64 h-screen bg-vaani-surface border-r border-white/5 flex flex-col fixed left-0 top-16 pt-4">
      {/* Search */}
      <div className="px-4 mb-4">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-vaani-muted-dark" />
          <input
            type="text"
            placeholder="Search docs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/5 rounded-xl text-sm text-white placeholder:text-vaani-muted-dark focus:outline-none focus:border-vaani-blue/30 transition-colors"
          />
        </div>
      </div>

      {/* Sections */}
      <nav className="flex-1 px-3 overflow-y-auto space-y-6 pb-8">
        {filteredSections.map(section => (
          <div key={section.title}>
            <h4 className="px-3 text-xs font-semibold text-vaani-muted uppercase tracking-wider mb-2">
              {section.title}
            </h4>
            <div className="space-y-0.5">
              {section.items.map(item => (
                <button
                  key={item.id}
                  onClick={() => onSectionClick?.(item.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 cursor-pointer text-left group ${
                    activeSection === item.id
                      ? 'bg-vaani-blue/10 text-vaani-blue'
                      : 'text-vaani-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex-1">{item.label}</span>
                  <ChevronRight size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
