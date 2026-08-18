const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { dbGet, dbRun } = require('../db/database');
const { JWT_SECRET } = require('../middlewares/authMiddleware');

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Por favor, preencha todos os campos obrigatórios.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'A senha deve conter no mínimo 6 caracteres.' });
    }

    // Verificar se e-mail já está em uso
    const existingUser = await dbGet('SELECT id FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (existingUser) {
      return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
    }

    // Hash da senha
    const password_hash = await bcrypt.hash(password, 10);

    // Inserir usuário
    const result = await dbRun(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name.trim(), email.toLowerCase().trim(), password_hash]
    );

    const user = { id: result.lastID, name: name.trim(), email: email.toLowerCase().trim() };

    // Gerar JWT e Cookie
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, COOKIE_OPTIONS);

    return res.status(201).json({ user, message: 'Conta criada com sucesso!' });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    return res.status(500).json({ error: 'Erro interno ao criar conta.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Por favor, forneça e-mail e senha.' });
    }

    const userInDb = await dbGet('SELECT * FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (!userInDb) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const isMatch = await bcrypt.compare(password, userInDb.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const user = { id: userInDb.id, name: userInDb.name, email: userInDb.email };

    // Gerar JWT e Cookie
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, COOKIE_OPTIONS);

    return res.json({ user, message: 'Login realizado com sucesso!' });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Erro interno ao realizar login.' });
  }
};

const logout = (req, res) => {
  res.clearCookie('token', COOKIE_OPTIONS);
  return res.json({ message: 'Logout realizado com sucesso.' });
};

const getMe = async (req, res) => {
  try {
    const userInDb = await dbGet('SELECT id, name, email, created_at FROM users WHERE id = ?', [req.user.id]);
    if (!userInDb) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    return res.json({ user: userInDb });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar dados do usuário.' });
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe,
};
