import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Copy, Check, RefreshCw, Eye, EyeOff,
  Activity, Shield, AlertTriangle, Users,
  ArrowUpRight, ArrowDownRight,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import DashboardSidebar from '../components/layout/DashboardSidebar.jsx';
import GlassCard from '../components/ui/GlassCard.jsx';
import Button from '../components/ui/Button.jsx';

/* ─── Mock Data ─── */
function generateTrafficData() {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push({
      time: `${i.toString().padStart(2, '0')}:00`,
      requests: Math.floor(Math.random() * 800 + 200),
      success: Math.floor(Math.random() * 700 + 200),
    });
  }
  return hours;
}

const riskData = [
  { name: 'Low Risk', value: 72, color: '#22c55e' },
  { name: 'Medium Risk', value: 18, color: '#f59e0b' },
  { name: 'High Risk', value: 7, color: '#ef4444' },
  { name: 'Blocked', value: 3, color: '#8b5cf6' },
];

const recentLogs = [
  { id: 'req_8f2a', user: 'user_4521', status: 'success', confidence: 0.97, risk: 8, time: '2 min ago' },
  { id: 'req_7c1b', user: 'user_1893', status: 'success', confidence: 0.94, risk: 15, time: '5 min ago' },
  { id: 'req_6d3e', user: 'user_7204', status: 'blocked', confidence: 0.31, risk: 89, time: '8 min ago' },
  { id: 'req_5a4f', user: 'user_3367', status: 'success', confidence: 0.98, risk: 4, time: '12 min ago' },
  { id: 'req_4b5c', user: 'user_9912', status: 'suspicious', confidence: 0.62, risk: 54, time: '15 min ago' },
  { id: 'req_3c6d', user: 'user_5578', status: 'success', confidence: 0.91, risk: 11, time: '22 min ago' },
  { id: 'req_2d7e', user: 'user_2241', status: 'success', confidence: 0.96, risk: 6, time: '31 min ago' },
];

const statCards = [
  { label: 'Requests Today', value: '12,847', change: '+14.2%', up: true, icon: Activity, color: 'text-vaani-blue' },
  { label: 'Success Rate', value: '97.3%', change: '+0.8%', up: true, icon: Users, color: 'text-green-400' },
  { label: 'Fraud Blocked', value: '347', change: '-12.1%', up: false, icon: Shield, color: 'text-vaani-purple' },
  { label: 'Avg Latency', value: '142ms', change: '-8.3%', up: false, icon: AlertTriangle, color: 'text-vaani-cyan' },
];

/* ─── Custom tooltip ─── */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload) return null;
  return (
    <div className="glass-card px-4 py-3 text-sm">
      <p className="text-vaani-muted-dark text-xs mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color }} className="font-semibold">
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

/* ─── Status badge ─── */
function StatusBadge({ status }) {
  const styles = {
    success: 'bg-green-500/10 text-green-400',
    blocked: 'bg-red-500/10 text-red-400',
    suspicious: 'bg-yellow-500/10 text-yellow-400',
  };
  return (
    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}

export default function DashboardPage() {
  const [apiKey] = useState('va_live_sk_8f2a7c1b6d3e5a4f3c6d2d7e');
  const [showKey, setShowKey] = useState(false);
  const [keyCopied, setKeyCopied] = useState(false);

  const [trafficData, setTrafficData] = useState(generateTrafficData());

  // Simulate live traffic updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficData(prev => {
        const newData = [...prev.slice(1)];
        const lastTime = parseInt(prev[prev.length - 1].time);
        newData.push({
          time: `${((lastTime + 1) % 24).toString().padStart(2, '0')}:00`,
          requests: Math.floor(Math.random() * 800 + 200),
          success: Math.floor(Math.random() * 700 + 200),
        });
        return newData;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setKeyCopied(true);
    setTimeout(() => setKeyCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-vaani-bg flex">
      <DashboardSidebar />

      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-sm text-vaani-muted mt-1">Monitor your voice authentication traffic</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-medium">All Systems Operational</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, i) => (
            <GlassCard key={stat.label} hover={false} delay={i * 0.05} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-green-400' : 'text-vaani-cyan'}`}>
                  {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-vaani-muted">{stat.label}</p>
            </GlassCard>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Traffic Chart */}
          <GlassCard hover={false} className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Authentication Traffic</h3>
              <span className="text-xs text-vaani-muted-dark">Last 24 hours (live)</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData}>
                  <defs>
                    <linearGradient id="reqGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="sucGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="requests" stroke="#3b82f6" fill="url(#reqGrad)" strokeWidth={2} name="Total" />
                  <Area type="monotone" dataKey="success" stroke="#22c55e" fill="url(#sucGrad)" strokeWidth={2} name="Success" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Risk Pie Chart */}
          <GlassCard hover={false} className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Risk Distribution</h3>
            <div className="h-48 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    dataKey="value"
                    stroke="none"
                  >
                    {riskData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) =>
                      active && payload?.[0] ? (
                        <div className="glass-card px-3 py-2 text-sm">
                          <span style={{ color: payload[0].payload.color }}>
                            {payload[0].payload.name}: {payload[0].value}%
                          </span>
                        </div>
                      ) : null
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {riskData.map(item => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                    <span className="text-vaani-muted">{item.name}</span>
                  </div>
                  <span className="text-white font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* API Key Card */}
        <GlassCard hover={false} className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">API Key</h3>
            <Button variant="primary" size="sm" icon={RefreshCw}>
              Generate New Key
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 px-4 py-3 bg-white/5 rounded-xl font-mono text-sm text-vaani-muted">
              {showKey ? apiKey : '•'.repeat(apiKey.length)}
            </div>
            <button
              onClick={() => setShowKey(!showKey)}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-vaani-muted hover:text-white transition-all cursor-pointer"
            >
              {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <button
              onClick={copyKey}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-vaani-muted hover:text-white transition-all cursor-pointer"
            >
              {keyCopied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
            </button>
          </div>
          <p className="text-xs text-vaani-muted-dark mt-3">
            Keep this key secret. Do not share it publicly or commit it to version control.
          </p>
        </GlassCard>

        {/* Recent Logs */}
        <GlassCard hover={false} className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Recent Authentication Logs</h3>
            <span className="text-xs text-vaani-muted-dark">Updated in real-time</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left py-3 px-4 text-vaani-muted-dark font-medium">Request ID</th>
                  <th className="text-left py-3 px-4 text-vaani-muted-dark font-medium">User</th>
                  <th className="text-left py-3 px-4 text-vaani-muted-dark font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-vaani-muted-dark font-medium">Confidence</th>
                  <th className="text-left py-3 px-4 text-vaani-muted-dark font-medium">Risk Score</th>
                  <th className="text-left py-3 px-4 text-vaani-muted-dark font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentLogs.map((log, i) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3 px-4 font-mono text-vaani-muted">{log.id}</td>
                    <td className="py-3 px-4 text-white">{log.user}</td>
                    <td className="py-3 px-4"><StatusBadge status={log.status} /></td>
                    <td className="py-3 px-4 text-vaani-muted">{log.confidence.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${
                        log.risk > 60 ? 'text-red-400' : log.risk > 30 ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {log.risk}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-vaani-muted-dark">{log.time}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </main>
    </div>
  );
}
