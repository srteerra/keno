<div align="center">

# 🎯 Keno

**Daily productivity tips for developers, powered by AI**

*Work smarter. Ship faster. Learn every day.*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

[Live Demo](https://keno-nine.vercel.app/) · [Report a Bug](https://github.com/srteerra/keno/issues) · [Request Feature](https://github.com/srteerra/keno/issues)

</div>

---

## 📌 What is Keno?

Keno is a web app that delivers **fresh, AI-generated productivity tips** every day — tailored for developers. No fluff. Just practical, copy-paste-ready advice across the tools you already use.

> 💡 Think of it as a daily standup with a senior dev who always has a useful trick up their sleeve.

---

## ✨ Features at a Glance

| Feature | Description |
|---|---|
| 🤖 **AI-Powered Tips** | Fresh insights generated daily via OpenAI |
| 🗂️ **6 Categories** | Git · Terminal · Editor · React · CSS · TypeScript |
| 🌙 **Dark Mode** | Easy on the eyes, day or night |
| 📱 **Responsive** | Works on desktop, tablet, and mobile |
| 🖍️ **Syntax Highlighting** | Code snippets rendered with Prism.js |
| 🔄 **Daily Refresh** | New content every day to keep learning |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** `>= 20.0.0` — [Download](https://nodejs.org/)
- A package manager: `npm`, `yarn`, `pnpm`, or `bun`

### 1 · Clone & Install

```bash
git clone https://github.com/srteerra/keno.git
cd keno
npm install
```

### 2 · Set Up Environment Variables

Create a `.env.local` file in the project root:

```env
# .env.local
NEXT_PUBLIC_API_URL=https://your-api-url.com/api
```

> ⚠️ Without this variable, the app won't be able to fetch AI-generated tips.

### 3 · Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you're good to go! 🎉

---

## 🛠️ Tech Stack

```
keno/
├── Framework     →  Next.js 15 (App Router)
├── Language      →  TypeScript 5.x
├── Styling       →  Tailwind CSS
├── UI Components →  Radix UI / shadcn/ui
├── Markdown      →  react-markdown
├── Highlighting  →  Prism.js
├── Icons         →  Lucide Icons
└── Deployment    →  Vercel
```

---

## 📖 Available Scripts

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Lint with ESLint
npm run type-check   # Run TypeScript type check
```

---

## 📁 Project Structure

```
keno/
├── app/                # Next.js App Router pages & layouts
├── components/         # Reusable UI components
├── lib/                # Utilities and helpers
├── public/             # Static assets
└── .env.local          # Environment variables (create this!)
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to your branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 🙏 Built With

- [Next.js](https://nextjs.org/) — React framework
- [OpenAI](https://openai.com/) — AI model provider
- [Vercel](https://vercel.com/) — Hosting & deployment
- [shadcn/ui](https://ui.shadcn.com/) — UI component system

---

<div align="center">

⭐ **Found this useful? Give it a star!** ⭐

*Made with ❤️ by developers, for developers*

</div>
