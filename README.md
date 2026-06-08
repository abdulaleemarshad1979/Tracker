# 🛡️ CyberQuest

> Your personal cybersecurity progress tracker. Level up one day at a time.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-purple?logo=framer)

---

## 📁 Project Structure

```
cyberquest/
├── src/
│   ├── app/
│   │   ├── layout.tsx        ← Root layout (fonts, metadata, Toaster)
│   │   ├── page.tsx          ← Entry point (renders <App />)
│   │   └── globals.css       ← Global styles + animations
│   ├── components/
│   │   ├── App.tsx           ← Main client component, tab router
│   │   ├── Navbar.tsx        ← Sticky top nav
│   │   ├── HomeTab.tsx       ← Dashboard + today's tasks
│   │   ├── TrackerTab.tsx    ← Daily & weekly habit tracker
│   │   ├── RoadmapTab.tsx    ← Learning roadmap with checkboxes
│   │   ├── StatsTab.tsx      ← Statistics & rank progression
│   │   ├── CalendarTab.tsx   ← Monthly calendar + streak
│   │   ├── SettingsTab.tsx   ← Export/Import/Reset + XP guide
│   │   └── ui/
│   │       ├── Checkbox.tsx  ← Animated checkbox
│   │       ├── ProgressBar.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       └── Confetti.tsx  ← Celebration particles
│   └── lib/
│       ├── data.ts           ← Roadmap data, ranks, XP guide
│       └── store.ts          ← localStorage hook (useStore)
├── package.json
├── tailwind.config.js
├── next.config.mjs
├── tsconfig.json
└── vercel.json
```

---

## 🚀 Local Setup (5 minutes)

### 1. Install Node.js (if not already)
Download from https://nodejs.org (LTS version, 18+)

### 2. Clone / create project

If you downloaded the ZIP from Claude, just unzip it. Or start fresh:

```bash
# Option A — use this project directly
cd cyberquest
npm install
npm run dev
```

```bash
# Option B — create fresh and copy files
npx create-next-app@latest cyberquest --app --ts --tailwind
cd cyberquest
# Then copy src/ and config files from this project
npm install framer-motion react-hot-toast lucide-react canvas-confetti
npm run dev
```

### 3. Open in browser
```
http://localhost:3000
```

---

## ☁️ Deploy to Vercel (Free)

### Method 1 — Vercel CLI (fastest)
```bash
# Install Vercel CLI
npm i -g vercel

# From project root
vercel

# Follow the prompts:
# - Link to account? Yes
# - Project name: cyberquest
# - Framework: Next.js (auto-detected)
# Done! You get a live URL instantly.
```

### Method 2 — GitHub + Vercel Dashboard
```bash
# 1. Push to GitHub
git init
git add .
git commit -m "🛡️ CyberQuest initial commit"
git remote add origin https://github.com/YOUR_USERNAME/cyberquest.git
git push -u origin main

# 2. Go to https://vercel.com
# 3. Click "Add New Project"
# 4. Import your GitHub repo
# 5. Click Deploy — it's live!
```

---

## ✨ Features

| Feature | Description |
|---|---|
| 🏠 Home | Rank banner, XP, streak, today's tasks |
| 📅 Tracker | Daily 5-task checklist + weekly 7-day tracker |
| 🗺️ Roadmap | 6 modules, collapsible, per-topic checkboxes |
| 📊 Stats | Full breakdown, rank ladder, per-module progress |
| 📆 Calendar | Monthly view, study days, streak counter |
| ⚙️ Settings | Export/Import JSON, Reset, XP guide, deploy steps |
| 💾 Persistence | All data in localStorage — survives restarts |
| 🎉 Confetti | Fires when you complete a full week |
| 🔔 Toast | XP notifications on every action |
| 📱 Responsive | Works on mobile and desktop |

---

## 🎮 XP System

| Action | XP |
|---|---|
| Study 30 min | +10 |
| Take notes | +10 |
| Practice hands-on | +20 |
| Revision | +5 |
| Watch a video | +5 |
| Complete a topic | +20 |
| Complete a day | +50 |
| Full week bonus | +200 |

## 🏆 Ranks

| XP | Rank |
|---|---|
| 0 | 🪖 Recruit |
| 100 | 🎖️ Cadet |
| 300 | 🔍 Analyst |
| 700 | 🕵️ Investigator |
| 1500 | ⚔️ Pentester |
| 3000 | 🧪 Forensics Expert |
| 5000 | 🛡️ Cyber Warrior |
| 10000 | 👑 Cyber Master |

---

## 🔧 Customization

Want to add more topics? Open `src/lib/data.ts` and edit the `ROADMAP` array — it auto-populates the Roadmap, Stats, and progress tracking everywhere.

---

Built with ❤️ for Abdul — keep showing up every day. 🛡️
