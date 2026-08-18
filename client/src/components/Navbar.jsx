import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckSquare, LogOut, User } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="container navbar-content">
        <div className="brand">
          <CheckSquare size={26} color="#6366f1" />
          <span>TaskManager</span>
        </div>

        {user && (
          <div className="user-profile">
            <div className="user-avatar" title={user.email}>
              {user.name ? user.name.charAt(0).toUpperCase() : <User size={18} />}
            </div>
            <div className="user-info" style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.name}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</span>
            </div>
            <button className="btn btn-secondary btn-icon" onClick={logout} title="Sair da conta">
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
