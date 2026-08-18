import React from 'react';
import { useTasks } from '../context/TaskContext';
import { CheckCircle2, Clock, ListTodo, AlertCircle, TrendingUp } from 'lucide-react';

export const DashboardStats = () => {
  const { stats } = useTasks();

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
        {/* Total Tasks */}
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem' }}>
          <div style={{ padding: '0.75rem', background: 'rgba(99, 102, 241, 0.15)', borderRadius: 'var(--radius-md)', color: '#818cf8' }}>
            <ListTodo size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Total de Tarefas</span>
            <h3 style={{ fontSize: '1.5rem', marginTop: '0.1rem' }}>{stats.total}</h3>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem' }}>
          <div style={{ padding: '0.75rem', background: 'var(--status-pending-bg)', borderRadius: 'var(--radius-md)', color: 'var(--status-pending-text)' }}>
            <Clock size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Pendentes</span>
            <h3 style={{ fontSize: '1.5rem', marginTop: '0.1rem' }}>{stats.pending}</h3>
          </div>
        </div>

        {/* In Progress Tasks */}
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem' }}>
          <div style={{ padding: '0.75rem', background: 'var(--status-progress-bg)', borderRadius: 'var(--radius-md)', color: 'var(--status-progress-text)' }}>
            <AlertCircle size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Em Progresso</span>
            <h3 style={{ fontSize: '1.5rem', marginTop: '0.1rem' }}>{stats.in_progress}</h3>
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem' }}>
          <div style={{ padding: '0.75rem', background: 'var(--status-completed-bg)', borderRadius: 'var(--radius-md)', color: 'var(--status-completed-text)' }}>
            <CheckCircle2 size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Concluídas</span>
            <h3 style={{ fontSize: '1.5rem', marginTop: '0.1rem' }}>{stats.completed}</h3>
          </div>
        </div>
      </div>

      {/* Progress & Priority Bar Card */}
      <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={18} color="var(--accent-primary)" />
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Taxa de Conclusão</span>
          </div>
          <span style={{ fontWeight: 700, color: 'var(--accent-primary)', fontSize: '1rem' }}>{stats.completion_rate}%</span>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-full)', overflow: 'hidden', marginBottom: '1rem' }}>
          <div
            style={{
              height: '100%',
              width: `${stats.completion_rate}%`,
              background: 'var(--accent-gradient)',
              borderRadius: 'var(--radius-full)',
              transition: 'width 0.4s ease-out',
            }}
          />
        </div>

        {/* Priority Breakdown */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', fontSize: '0.8rem' }}>
          <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Por Prioridade:</span>
          <span className="badge badge-high">Alta: {stats.by_priority?.high || 0}</span>
          <span className="badge badge-medium">Média: {stats.by_priority?.medium || 0}</span>
          <span className="badge badge-low">Baixa: {stats.by_priority?.low || 0}</span>
        </div>
      </div>
    </div>
  );
};
