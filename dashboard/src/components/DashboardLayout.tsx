import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { userApi } from '../api/client';
import { 
  LayoutDashboard, 
  Globe, 
  Settings, 
  LogOut, 
  Plus, 
  ChevronDown,
  Building2
} from 'lucide-react';

interface DashboardLayoutProps {
  user: any;
  onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user, onLogout }) => {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<any>(null);
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const response = await userApi.get('/organizations');
      setOrganizations(response.data);
      
      const storedOrgId = localStorage.getItem('selectedOrgId');
      const currentOrg = response.data.find((o: any) => o.id === storedOrgId) || response.data[0];
      
      if (currentOrg) {
        selectOrganization(currentOrg);
      }
    } catch (err) {
      console.error('Failed to fetch organizations', err);
    }
  };

  const selectOrganization = (org: any) => {
    setSelectedOrg(org);
    localStorage.setItem('selectedOrgId', org.id);
    setShowOrgDropdown(false);
    // Refresh the page or trigger a reload of child components
    window.dispatchEvent(new Event('storage'));
  };

  const handleCreateOrg = async () => {
    const name = prompt('Enter organization name:');
    if (name) {
      try {
        const response = await userApi.post('/organizations', { name });
        setOrganizations([...organizations, response.data]);
        selectOrganization(response.data);
      } catch (err) {
        alert('Failed to create organization');
      }
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      {/* Sidebar */}
      <aside className="glass-card" style={{ width: '280px', margin: '1rem', display: 'flex', flexDirection: 'column', border: '1px solid var(--border)' }}>
        <div style={{ padding: '2rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '700', fontSize: '1.25rem' }} className="brand">
            <div style={{ padding: '0.5rem', background: 'var(--primary)', borderRadius: '0.5rem' }}>
              <Globe size={24} color="white" />
            </div>
            FakeKong 2.0
          </div>
        </div>

        {/* Org Switcher */}
        <div style={{ padding: '1rem', position: 'relative' }}>
          <button 
            onClick={() => setShowOrgDropdown(!showOrgDropdown)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.05)', textAlign: 'left' }}
          >
            <div style={{ width: '32px', height: '32px', background: 'var(--bg-card)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={18} color="var(--primary)" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Organization</div>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {selectedOrg?.name || 'Select Org'}
              </div>
            </div>
            <ChevronDown size={16} />
          </button>

          {showOrgDropdown && (
            <div className="glass-card animate-fade-in" style={{ position: 'absolute', top: '100%', left: '1rem', right: '1rem', zIndex: 10, marginTop: '0.5rem', padding: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)' }}>
              {organizations.map(org => (
                <button 
                  key={org.id} 
                  onClick={() => selectOrganization(org)}
                  style={{ width: '100%', padding: '0.75rem', textAlign: 'left', borderRadius: '0.5rem', background: selectedOrg?.id === org.id ? 'rgba(99, 102, 241, 0.1)' : 'transparent', color: selectedOrg?.id === org.id ? 'var(--primary)' : 'inherit', marginBottom: '0.25rem' }}
                >
                  {org.name}
                </button>
              ))}
              <div style={{ height: '1px', background: 'var(--border)', margin: '0.5rem 0' }} />
              <button 
                onClick={handleCreateOrg}
                style={{ width: '100%', padding: '0.75rem', textAlign: 'left', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}
              >
                <Plus size={16} /> Create Organization
              </button>
            </div>
          )}
        </div>

        <nav style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <NavLink to="/" end className={({isActive}) => `btn ${isActive ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'flex-start' }}>
            <LayoutDashboard size={18} /> Overview
          </NavLink>
          <NavLink to="/apis" className={({isActive}) => `btn ${isActive ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', justifyContent: 'flex-start' }}>
            <Globe size={18} /> API Management
          </NavLink>
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid var(--border)' }}>
          <button onClick={onLogout} className="btn btn-outline" style={{ width: '100%', color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <div className="animate-fade-in">
          <Outlet context={{ selectedOrg }} />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
