import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { AuthCard } from './components/AuthCard';
import { DashboardStats } from './components/DashboardStats';
import { TaskControls } from './components/TaskControls';
import { TaskList } from './components/TaskList';
import { TaskFormModal } from './components/TaskFormModal';
import { Loader2 } from 'lucide-react';

export const AppContent = () => {
  const { user, loading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleOpenCreate = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--accent-primary)', gap: '0.75rem' }}>
        <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />
        <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>Iniciando TaskManager...</span>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar />

      <main style={{ flex: 1, padding: '2rem 0' }}>
        {!user ? (
          <AuthCard />
        ) : (
          <div className="container">
            <DashboardStats />
            <TaskControls onOpenCreateModal={handleOpenCreate} />
            <TaskList onEditTask={handleOpenEdit} />
          </div>
        )}
      </main>

      <footer style={{ padding: '1.5rem 0', textAlign: 'center', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <div className="container">
          TaskManager App — Desenvolvido com React + Vite & Express + SQLite
        </div>
      </footer>

      <TaskFormModal isOpen={isModalOpen} onClose={handleCloseModal} taskToEdit={taskToEdit} />
    </div>
  );
};

export function App() {
  return <AppContent />;
}

export default App;
