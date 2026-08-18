import React from 'react';
import { useTasks } from '../context/TaskContext';
import { TaskItem } from './TaskItem';
import { ClipboardList, Loader2 } from 'lucide-react';

export const TaskList = ({ onEditTask }) => {
  const { tasks, loading, filters } = useTasks();

  if (loading && tasks.length === 0) {
    return (
      <div className="empty-state" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
        <Loader2 className="animate-spin" size={24} color="var(--accent-primary)" />
        <span>Carregando suas tarefas...</span>
      </div>
    );
  }

  if (tasks.length === 0) {
    const hasFilters = filters.status !== 'Todos' || filters.priority !== 'Todas' || filters.search !== '';
    return (
      <div className="empty-state">
        <ClipboardList size={48} strokeWidth={1.5} />
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
          {hasFilters ? 'Nenhuma tarefa encontrada' : 'Sua lista de tarefas está vazia'}
        </h3>
        <p style={{ fontSize: '0.875rem' }}>
          {hasFilters
            ? 'Tente ajustar os filtros ou a palavra-chave de busca.'
            : 'Clique no botão "+ Nova Tarefa" acima para começar a organizar seu dia!'}
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onEdit={onEditTask} />
      ))}
    </div>
  );
};
