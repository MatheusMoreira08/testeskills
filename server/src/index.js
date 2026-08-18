const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuração do CORS para permitir cookies httpOnly do frontend Vite (http://localhost:5173)
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor TaskManager está ativo' });
});

// Middleware de tratamento global de erros
app.use((err, req, res, next) => {
  console.error('Erro global no servidor:', err);
  res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando na porta ${PORT} (http://localhost:${PORT})`);
});
