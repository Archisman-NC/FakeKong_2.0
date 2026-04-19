import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { apiService } from '../api/client';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Trash2, 
  Edit3, 
  ExternalLink,
  Shield,
  Clock
} from 'lucide-react';

const ApiManagement: React.FC = () => {
  const { selectedOrg } = useOutletContext<{ selectedOrg: any }>();
  const [apis, setApis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingApi, setEditingApi] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    baseUrl: ''
  });

  useEffect(() => {
    if (selectedOrg) {
      fetchApis();
    }
    
    // Listen for org changes
    const handleOrgChange = () => fetchApis();
    window.addEventListener('storage', handleOrgChange);
    return () => window.removeEventListener('storage', handleOrgChange);
  }, [selectedOrg]);

  const fetchApis = async () => {
    setLoading(true);
    try {
      const response = await apiService.get('/api');
      setApis(response.data);
    } catch (err) {
      console.error('Failed to fetch APIs', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingApi) {
        const response = await apiService.put(`/api/${editingApi.id}`, formData);
        setApis(apis.map(a => a.id === editingApi.id ? response.data : a));
      } else {
        const response = await apiService.post('/api', formData);
        setApis([response.data, ...apis]);
      }
      closeModal();
    } catch (err) {
      alert('Operation failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this API?')) {
      try {
        await apiService.delete(`/api/${id}`);
        setApis(apis.filter(a => a.id !== id));
      } catch (err) {
        alert('Failed to delete API');
      }
    }
  };

  const openModal = (api: any = null) => {
    if (api) {
      setEditingApi(api);
      setFormData({
        name: api.name,
        description: api.description || '',
        baseUrl: api.baseUrl
      });
    } else {
      setEditingApi(null);
      setFormData({ name: '', description: '', baseUrl: '' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingApi(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>API Management</h1>
          <p style={{ color: 'var(--text-muted)' }}>Configure and monitor your API endpoints</p>
        </div>
        <button onClick={() => openModal()} className="btn btn-primary">
          <Plus size={18} /> Create API
        </button>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Search size={20} color="var(--text-muted)" />
        <input 
          type="text" 
          placeholder="Search APIs..." 
          style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', flex: 1, fontSize: '1rem' }}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>Loading APIs...</div>
      ) : apis.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
          <Globe size={48} color="var(--border)" style={{ marginBottom: '1rem' }} />
          <h3>No APIs found</h3>
          <p style={{ color: 'var(--text-muted)' }}>Get started by creating your first API configuration.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {apis.map(api => (
            <div key={api.id} className="glass-card animate-fade-in" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '40px', height: '40px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Globe size={20} color="var(--primary)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: '600' }}>{api.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--success)', background: 'rgba(16, 185, 129, 0.1)', padding: '0.125rem 0.5rem', borderRadius: '1rem' }}>Active</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => openModal(api)} className="btn btn-outline" style={{ padding: '0.5rem' }}><Edit3 size={16} /></button>
                  <button onClick={() => handleDelete(api.id)} className="btn btn-outline" style={{ padding: '0.5rem', color: 'var(--danger)' }}><Trash2 size={16} /></button>
                </div>
              </div>
              
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', height: '42px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {api.description || 'No description provided.'}
              </p>

              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-muted)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', wordBreak: 'break-all' }}>
                <ExternalLink size={14} /> {api.baseUrl}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={14} /> Created {new Date(api.createdAt).toLocaleDateString()}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Shield size={14} color="var(--primary)" /> API Key Required
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{editingApi ? 'Edit API' : 'Create New API'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label className="input-label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>API Name</label>
                <input 
                  className="input-field" 
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Payment Gateway"
                  required
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label className="input-label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Base URL</label>
                <input 
                  className="input-field" 
                  value={formData.baseUrl}
                  onChange={e => setFormData({ ...formData, baseUrl: e.target.value })}
                  placeholder="https://api.example.com"
                  required
                />
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label className="input-label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Description</label>
                <textarea 
                  className="input-field" 
                  style={{ minHeight: '100px', resize: 'vertical' }}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Briefly describe what this API does..."
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={closeModal} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">{editingApi ? 'Save Changes' : 'Create API'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiManagement;
