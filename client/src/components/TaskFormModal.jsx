import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import { X, Check } from 'lucide-react';

export const TaskFormModal = ({ isOpen, onClose, taskToEdit = null }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pendente');
  const [priority, setPriority] = useState('Média');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { createTask, updateTask } = useTasks();

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || '');
      setDescription(taskToEdit.description || '');
      setStatus(taskToEdit.status || 'Pendente');
      setPriority(taskToEdit.priority || 'Média');
    } else {
      setTitle('');
      setDescription('');
      setStatus('Pendente');
      setPriority('Média');
    }
    setError('');
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('O título da tarefa é obrigatório.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      if (taskToEdit) {
        await updateTask(taskToEdit.id, { title, description, status, priority });
      } else {
        await createTask({ title, description, status, priority });
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Erro ao salvar tarefa.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ fontSize: '1.25rem' }}>{taskToEdit ? 'Editar Tarefa' : 'Nova Tarefa'}</h3>
          <button className="btn btn-secondary btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {error && (
          <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.15)', borderRadius: 'var(--radius-sm)', color: '#fca5a5', fontSize: '0.85rem', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título da Tarefa *</label>
            <input
              type="text"
              className="input-control"
              placeholder="Ex: Finalizar protótipo do Dashboard"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Descrição (opcional)</label>
            <textarea
              className="input-control"
              placeholder="Adicione detalhes ou notas sobre esta tarefa..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Status</label>
              <select className="input-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Pendente">Pendente</option>
                <option value="Em Progresso">Em Progresso</option>
                <option value="Concluída">Concluída</option>
              </select>
            </div>

            <div className="form-group">
              <label>Prioridade</label>
              <select className="input-control" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              <Check size={18} />
              {submitting ? 'Salvando...' : taskToEdit ? 'Salvar Alterações' : 'Criar Tarefa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
