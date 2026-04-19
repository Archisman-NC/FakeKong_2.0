import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Shield, Zap, Activity, Users } from 'lucide-react';

const Overview: React.FC = () => {
  const { selectedOrg } = useOutletContext<{ selectedOrg: any }>();

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          Hello! 👋
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>
          Welcome back to the {selectedOrg?.name || 'FakeKong'} dashboard.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <StatCard icon={<Zap color="#f59e0b" />} label="Total APIs" value="12" delta="+2 since last week" />
        <StatCard icon={<Activity color="#10b981" />} label="Requests" value="45.2k" delta="+12% vs yesterday" />
        <StatCard icon={<Shield color="#6366f1" />} label="Security" value="99.9%" delta="Stable" />
        <StatCard icon={<Users color="#ec4899" />} label="Members" value="5" delta="+1 today" />
      </div>

      <div className="glass-card" style={{ padding: '2rem', minHeight: '300px' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Recent Activity</h3>
        <p style={{ color: 'var(--text-muted)' }}>No recent activity found for this organization.</p>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, delta }: { icon: any, label: string, value: string, delta: string }) => (
  <div className="glass-card" style={{ padding: '1.5rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
      <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem' }}>{icon}</div>
      <span style={{ fontSize: '0.75rem', color: delta.includes('+') ? 'var(--success)' : 'var(--text-muted)', fontWeight: '600' }}>{delta}</span>
    </div>
    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{label}</div>
    <div style={{ fontSize: '2rem', fontWeight: '700' }}>{value}</div>
  </div>
);

export default Overview;
