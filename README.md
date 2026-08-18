# 🚀 TaskManager AI — Demonstrativo de Agente & Agentic Skills

> **Um projeto Full-Stack de alta performance desenvolvido como laboratório prático para testes de Agentes de IA e workflows de Agentic Skills.**

---

## 🌟 Sobre o Projeto

O **TaskManager AI** é uma aplicação completa de gerenciamento de tarefas e métricas de produtividade, desenvolvida para demonstrar o potencial da colaboração entre humanos e **Agentes de IA** guiados por **Skills Inteligentes** (utilizando a skill `@brainstorming` do repositório *Agentic Awesome Skills* / *Antigravity System*).

Todo o ciclo de vida da aplicação — desde o levantamento de requisitos interativo, modelagem de banco de dados relacional, arquitetura de API REST com cookies seguros até o Design System responsivo — foi orquestrado em tempo real por um Agente Inteligente.

---

## ✨ Destaques & Funcionalidades

- 🧠 **Desenvolvimento Orientado a Skills**: Planejamento iterativo utilizando metodologias de design facilitation e trava de requisitos (*Understanding Lock*).
- 🔐 **Autenticação Segura com HTTP-Only Cookies**: Sistema completo de cadastro e login com criptografia de senhas (`bcrypt`) e tokens JWT mantidos em cookies seguros contra ataques XSS.
- 📊 **Dashboard de Produtividade Inteligente**: Indicadores numéricos, porcentagem de conclusão em tempo real e distribuição por prioridades (`Alta`, `Média`, `Baixa`).
- ⚡ **CRUD de Tarefas & Filtros Reativos**: Interface dinâmica com busca textual instantânea, filtros por status e badges visuais coloridas.
- 🎨 **Design System em Vanilla CSS**: Estética premium em modo escuro com variáveis HSL, glassmorphism, sombras suaves e micro-animações de interatividade.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Frontend** | React 18 + Vite | SPA reativa, modular e de altíssimo desempenho |
| **Backend** | Node.js + Express | API RESTful com rotas autenticadas e middlewares |
| **Banco de Dados** | SQLite (`sqlite3`) | Armazenamento relacional com suporte a FKs e cascatas |
| **Estilização** | Vanilla CSS moderno | CSS Variables, Flexbox/Grid, Glassmorphism sem dependências extras |
| **Segurança** | JWT + Cookie Parser + Bcrypt | Sessões persistentes e isolamento de dados por usuário |

---

## 📁 Estrutura do Repositório (Monorepo Simples)

```text
testeskills/
├── .agents/
│   └── skills/
│       └── brainstorming/     # Skill de facilitação e planejamento de arquitetura
├── client/                     # Aplicação Frontend React + Vite
│   ├── src/
│   │   ├── components/         # Navbar, AuthCard, DashboardStats, TaskControls, TaskList, Modals
│   │   ├── context/            # AuthContext e TaskContext
│   │   ├── index.css           # Design System & Tokens CSS
│   │   ├── App.jsx             # Componente raiz da aplicação
│   │   └── main.jsx            # Entry point do React
│   ├── index.html              # HTML5 semântico com fontes Google (Outfit / Inter)
│   └── vite.config.js          # Proxy de API para o backend
├── server/                     # API REST Node.js + Express
│   ├── src/
│   │   ├── controllers/        # Controladores de Autenticação, Tarefas e Estatísticas
│   │   ├── db/                 # Conexão SQLite e inicialização de tabelas
│   │   ├── middlewares/        # Validador de JWT em cookies httpOnly
│   │   ├── routes/             # Rotas /api/auth e /api/tasks
│   │   └── index.js            # Servidor Express principal
│   └── database.sqlite         # Banco de dados local SQLite
└── README.md                   # Documentação do projeto
```

---

## 🚀 Como Executar o Projeto Localmente

### 1. Clonar o Repositório
```bash
git clone git@github.com:MatheusMoreira08/testeskills.git
cd testeskills
```

### 2. Iniciar o Servidor Backend
```bash
cd server
npm install
npm run dev
```
> Servidor ativo em: `http://localhost:5000`

### 3. Iniciar o Frontend React
Em outro terminal:
```bash
cd client
npm install
npm run dev
```
> Aplicação ativa em: `http://localhost:5173`

---

## 📜 Licença & Propósito

Este repositório serve como uma **Proof of Concept (PoC)** e vitrine de testes para agentic skills, demonstrando a capacidade de arquitetar, codificar e implantar aplicações prontas para produção através de inteligência artificial pareada.

*Desenvolvido com 💜 e suporte de Agentes Inteligentes.*
