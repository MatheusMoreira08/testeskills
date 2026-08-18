import React from 'react';
import { useTasks } from '../context/TaskContext';
import { CheckCircle2, Circle, Edit2, Trash2, Calendar } from 'lucide-react';

export const TaskItem = ({ task, onEdit }) => {
  const { updateTask, deleteTask } = useTasks();

  const handleToggleComplete = async () => {
    const newStatus = task.status === 'Concluída' ? 'Pendente' : 'Concluída';
    try {
      await updateTask(task.id, { status: newStatus });
    } catch (err) {
      console.error('Erro ao alterar status:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Tem certeza que deseja excluir a tarefa "${task.title}"?`)) {
      try {
        await deleteTask(task.id);
      } catch (err) {
        console.error('Erro ao excluir tarefa:', err);
      }
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Concluída':
        return <span className="badge badge-completed">Concluída</span>;
      case 'Em Progresso':
        return <span className="badge badge-progress">Em Progresso</span>;
      default:
        return <span className="badge badge-pending">Pendente</span>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Alta':
        return <span className="badge badge-high">Alta</span>;
      case 'Baixa':
        return <span className="badge badge-low">Baixa</span>;
      default:
        return <span className="badge badge-medium">Média</span>;
    }
  };

  const formattedDate = new Date(task.created_at || Date.now()).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  });

  return (
    <div
      className="glass-card"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        padding: '1.25rem',
        opacity: task.status === 'Concluída' ? 0.75 : 1,
        transition: 'all 0.2s ease',
      }}
    >
      {/* Checkbox Quick Toggle */}
      <button
        onClick={handleToggleComplete}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: task.status === 'Concluída' ? '#34d399' : 'var(--text-muted)',
          marginTop: '0.2rem',
          padding: 0,
        }}
        title={task.status === 'Concluída' ? 'Marcar como pendente' : 'Marcar como concluída'}
      >
        {task.status === 'Concluída' ? <CheckCircle2 size={22} /> : <Circle size={22} />}
      </button>

      {/* Task Info */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <h4
            style={{
              fontSize: '1rem',
              color: 'var(--text-primary)',
              textDecoration: task.status === 'Concluída' ? 'line-through' : 'none',
            }}
          >
            {task.title}
          </h4>
          {getStatusBadge(task.status)}
          {getPriorityBadge(task.priority)}
        </div>

        {task.description && (
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              marginBottom: '0.5rem',
              whiteSpace: 'pre-line',
            }}
          >
            {task.description}
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <Calendar size={12} />
          <span>Criada em {formattedDate}</span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '0.35rem' }}>
        <button className="btn btn-secondary btn-icon" onClick={() => onEdit(task)} title="Editar tarefa">
          <Edit2 size={16} />
        </button>
        <button className="btn btn-danger btn-icon" onClick={handleDelete} title="Excluir tarefa">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
