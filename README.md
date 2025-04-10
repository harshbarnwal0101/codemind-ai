# 🧠 Codemind AI – Frontend

A sleek, dark-themed AI-powered code review tool built with **React + Tailwind CSS**, styled like a developer terminal, and powered by an OpenRouter-connected FastAPI backend.

---

## 🚀 Tech Stack

- ⚛️ React + Vite
- 🎨 Tailwind CSS
- 🌙 Dark mode (devtool-style aesthetic)
- 💬 FastAPI backend using OpenRouter API
- 🧠 Models: DeepSeek, Mistral, Claude, LLaMA, and more (via OpenRouter)

---

## 🛠️ Getting Started (Local)

### 1. Clone the frontend repo

```bash
git clone https://github.com/YOUR_USERNAME/codemind-frontend.git
cd codemind-ai

# Install dependencies
npm install

#Start the dev server
npm run dev
```

### 2. Connect to the Backend API

```javascript
fetch("https://codemind-backend-2tln.onrender.com", { ... })
```

### Deploying to Vercel
Push this project to a public GitHub repo

Go to https://vercel.com

Click “New Project” → Import your repo

Framework preset: Vite

Build command: npm run build

Output directory: dist

Deploy 🎉

Your app will be available at: https://your-app-name.vercel.app

---

Example Usage
Paste any code snippet into the editor and click Review Code to get instant, AI-generated feedback.

Reviews cover:

✅ Bugs

🎯 Best Practices

🎨 Style & Formatting

🔐 Security Issues

🧠 Optimizations

