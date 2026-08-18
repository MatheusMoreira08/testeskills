const { dbQuery, dbRun, dbGet } = require('../db/database');

const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, priority, search } = req.query;

    let sql = 'SELECT * FROM tasks WHERE user_id = ?';
    const params = [userId];

    if (status && status !== 'Todos') {
      sql += ' AND status = ?';
      params.push(status);
    }

    if (priority && priority !== 'Todas') {
      sql += ' AND priority = ?';
      params.push(priority);
    }

    if (search && search.trim() !== '') {
      sql += ' AND (title LIKE ? OR description LIKE ?)';
      const term = `%${search.trim()}%`;
      params.push(term, term);
    }

    sql += ' ORDER BY CASE priority WHEN "Alta" THEN 1 WHEN "Média" THEN 2 WHEN "Baixa" THEN 3 END ASC, updated_at DESC';

    const tasks = await dbQuery(sql, params);
    return res.json({ tasks });
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    return res.status(500).json({ error: 'Erro interno ao buscar tarefas.' });
  }
};

const createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, status = 'Pendente', priority = 'Média' } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'O título da tarefa é obrigatório.' });
    }

    const validStatuses = ['Pendente', 'Em Progresso', 'Concluída'];
    const validPriorities = ['Baixa', 'Média', 'Alta'];

    const taskStatus = validStatuses.includes(status) ? status : 'Pendente';
    const taskPriority = validPriorities.includes(priority) ? priority : 'Média';

    const result = await dbRun(
      'INSERT INTO tasks (user_id, title, description, status, priority) VALUES (?, ?, ?, ?, ?)',
      [userId, title.trim(), description ? description.trim() : '', taskStatus, taskPriority]
    );

    const newTask = await dbGet('SELECT * FROM tasks WHERE id = ?', [result.lastID]);
    return res.status(201).json({ task: newTask, message: 'Tarefa criada com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    return res.status(500).json({ error: 'Erro interno ao criar tarefa.' });
  }
};

const updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;
    const { title, description, status, priority } = req.body;

    // Verificar existência e pertencimento
    const existingTask = await dbGet('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId]);
    if (!existingTask) {
      return res.status(404).json({ error: 'Tarefa não encontrada ou não autorizada.' });
    }

    const newTitle = title !== undefined ? title.trim() : existingTask.title;
    const newDescription = description !== undefined ? description.trim() : existingTask.description;
    const newStatus = status || existingTask.status;
    const newPriority = priority || existingTask.priority;

    await dbRun(
      `UPDATE tasks 
       SET title = ?, description = ?, status = ?, priority = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ? AND user_id = ?`,
      [newTitle, newDescription, newStatus, newPriority, taskId, userId]
    );

    const updatedTask = await dbGet('SELECT * FROM tasks WHERE id = ?', [taskId]);
    return res.json({ task: updatedTask, message: 'Tarefa atualizada com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    return res.status(500).json({ error: 'Erro interno ao atualizar tarefa.' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;

    const existingTask = await dbGet('SELECT id FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId]);
    if (!existingTask) {
      return res.status(404).json({ error: 'Tarefa não encontrada ou não autorizada.' });
    }

    await dbRun('DELETE FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId]);
    return res.json({ message: 'Tarefa removida com sucesso!' });
  } catch (error) {
    console.error('Erro ao remover tarefa:', error);
    return res.status(500).json({ error: 'Erro interno ao remover tarefa.' });
  }
};

const getStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalRow = await dbGet('SELECT COUNT(*) as count FROM tasks WHERE user_id = ?', [userId]);
    const pendingRow = await dbGet('SELECT COUNT(*) as count FROM tasks WHERE user_id = ? AND status = "Pendente"', [userId]);
    const inProgressRow = await dbGet('SELECT COUNT(*) as count FROM tasks WHERE user_id = ? AND status = "Em Progresso"', [userId]);
    const completedRow = await dbGet('SELECT COUNT(*) as count FROM tasks WHERE user_id = ? AND status = "Concluída"', [userId]);

    const lowRow = await dbGet('SELECT COUNT(*) as count FROM tasks WHERE user_id = ? AND priority = "Baixa"', [userId]);
    const mediumRow = await dbGet('SELECT COUNT(*) as count FROM tasks WHERE user_id = ? AND priority = "Média"', [userId]);
    const highRow = await dbGet('SELECT COUNT(*) as count FROM tasks WHERE user_id = ? AND priority = "Alta"', [userId]);

    const total = totalRow ? totalRow.count : 0;
    const pending = pendingRow ? pendingRow.count : 0;
    const in_progress = inProgressRow ? inProgressRow.count : 0;
    const completed = completedRow ? completedRow.count : 0;

    const completion_rate = total > 0 ? Number(((completed / total) * 100).toFixed(1)) : 0;

    return res.json({
      stats: {
        total,
        pending,
        in_progress,
        completed,
        completion_rate,
        by_priority: {
          low: lowRow ? lowRow.count : 0,
          medium: mediumRow ? mediumRow.count : 0,
          high: highRow ? highRow.count : 0,
        },
      },
    });
  } catch (error) {
    console.error('Erro ao calcular estatísticas:', error);
    return res.status(500).json({ error: 'Erro interno ao calcular estatísticas.' });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getStats,
};
