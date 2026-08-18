const express = require('express');
const { getTasks, createTask, updateTask, deleteTask, getStats } = require('../controllers/taskController');
const { requireAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

// Todas as rotas de tarefas são protegidas por autenticação
router.use(requireAuth);

router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

router.get('/stats', getStats);

module.exports = router;
