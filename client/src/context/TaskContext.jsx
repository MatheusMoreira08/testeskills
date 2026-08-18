import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    in_progress: 0,
    completed: 0,
    completion_rate: 0,
    by_priority: { low: 0, medium: 0, high: 0 },
  });
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: 'Todos',
    priority: 'Todas',
    search: '',
  });

  const fetchTasks = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const query = new URLSearchParams();
      if (filters.status !== 'Todos') query.append('status', filters.status);
      if (filters.priority !== 'Todas') query.append('priority', filters.priority);
      if (filters.search) query.append('search', filters.search);

      const res = await fetch(`/api/tasks?${query.toString()}`, {
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks);
      }
    } catch (err) {
      console.error('Erro ao buscar tarefas:', err);
    } finally {
      setLoading(false);
    }
  }, [user, filters]);

  const fetchStats = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch('/api/stats', {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Erro ao buscar estatísticas:', err);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchTasks();
      fetchStats();
    } else {
      setTasks([]);
    }
  }, [user, fetchTasks, fetchStats]);

  const createTask = async (taskData) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(taskData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao criar tarefa');

      fetchTasks();
      fetchStats();
      return data.task;
    } catch (err) {
      throw err;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(taskData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao atualizar tarefa');

      fetchTasks();
      fetchStats();
      return data.task;
    } catch (err) {
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao deletar tarefa');

      fetchTasks();
      fetchStats();
    } catch (err) {
      throw err;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        stats,
        loading,
        filters,
        setFilters,
        fetchTasks,
        fetchStats,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks deve ser usado dentro de um TaskProvider');
  }
  return context;
};
