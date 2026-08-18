import React from 'react';
import { useTasks } from '../context/TaskContext';
import { Search, Plus, Filter } from 'lucide-react';

export const TaskControls = ({ onOpenCreateModal }) => {
  const { filters, setFilters } = useTasks();

  const handleStatusChange = (newStatus) => {
    setFilters((prev) => ({ ...prev, status: newStatus }));
  };

  const handlePriorityChange = (e) => {
    setFilters((prev) => ({ ...prev, priority: e.target.value }));
  };

  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '1.25rem' }}>Suas Tarefas</h2>
        <button className="btn btn-primary" onClick={onOpenCreateModal}>
          <Plus size={18} />
          Nova Tarefa
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Search Bar */}
        <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="input-control"
            style={{ paddingLeft: '2.25rem' }}
            placeholder="Buscar tarefas pelo título ou descrição..."
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>

        {/* Status Pills */}
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {['Todos', 'Pendente', 'Em Progresso', 'Concluída'].map((st) => (
            <button
              key={st}
              className={`btn ${filters.status === st ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', borderRadius: 'var(--radius-full)' }}
              onClick={() => handleStatusChange(st)}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Priority Filter Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={16} color="var(--text-muted)" />
          <select
            className="input-control"
            style={{ width: 'auto', padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
            value={filters.priority}
            onChange={handlePriorityChange}
          >
            <option value="Todas">Todas as Prioridades</option>
            <option value="Alta">Prioridade Alta</option>
            <option value="Média">Prioridade Média</option>
            <option value="Baixa">Prioridade Baixa</option>
          </select>
        </div>
      </div>
    </div>
  );
};
