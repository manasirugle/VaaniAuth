import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Key,
  Activity,
  Shield,
  FileText,
  Settings,
  LogOut,
  Mic,
  ChevronRight,
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
  { icon: Key, label: 'API Keys', path: '/dashboard' },
  { icon: Activity, label: 'Analytics', path: '/dashboard' },
  { icon: Shield, label: 'Security', path: '/dashboard' },
  { icon: FileText, label: 'Logs', path: '/dashboard' },
  { icon: Settings, label: 'Settings', path: '/dashboard' },
];

export default function DashboardSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-vaani-surface border-r border-white/5 flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="px-5 h-16 flex items-center border-b border-white/5">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-google-blue flex items-center justify-center">
            <Mic size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold">
            Vaani<span className="text-google-blue">Auth</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {menuItems.map(item => {
          const isActive = location.pathname === item.path && item.label === 'Overview';
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-google-blue/10 text-google-blue'
                  : 'text-vaani-muted hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} />
              <span className="flex-1">{item.label}</span>
              <ChevronRight size={14} className={`transition-all ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`} />
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/5 space-y-1">
        <Link
          to="/docs"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-vaani-muted hover:text-white hover:bg-white/5 transition-all"
        >
          <FileText size={18} />
          <span>Documentation</span>
        </Link>
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-vaani-muted hover:text-google-red hover:bg-google-red/5 transition-all"
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </Link>
      </div>

      {/* User Card */}
      <div className="px-4 py-6 border-t border-white/5 bg-white/[0.01]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-google-blue flex items-center justify-center text-xs font-bold text-white shadow-sm">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">Aryan Dev</p>
            <p className="text-[11px] text-vaani-muted truncate">aryan@vaaniauth.io</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
