# Teleprompter Pro 🎙️📹

> **The definitive studio teleprompter and video recording web app with hands-free voice control, beam-splitter mirroring, and zero subscription fees.**

![React](https://img.shields.io/badge/React-19-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)
![Vite](https://img.shields.io/badge/Vite-6-purple.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-cyan.svg)
![PWA](https://img.shields.io/badge/PWA-Ready-green.svg)
![License](https://img.shields.io/badge/License-Proprietary-gold.svg)

---

## 🌟 Key Features

- **🚀 Butter-Smooth Scrolling:** GPU-accelerated continuous scrolling engine with variable speed (1 to 100).
- **🎙️ Hands-Free Voice Control:** Control reading, speed, and playback hands-free using natural voice commands in Portuguese & English (*"Iniciar"*, *"Pausar"*, *"Mais rápido"*, *"Start"*, *"Slower"* via Web Speech API).
- **📹 Integrated HD Camera Recording:** Record your video presentations directly through your browser or phone camera while reading the script, powered by native `MediaRecorder` API.
- **🪞 Optical Beam-Splitter Mirroring:** Instant Horizontal and Vertical flip modes for professional glass teleprompter rigs and studio hardware.
- **🎯 Focus Cue Line & Reading Bands:** Multiple visual focal guides (classic red line, highlighted reading band, side arrows, vignette) positioned right next to your camera lens for natural eye contact.
- **📱 100% Responsive PWA:** Installable as a native app on Windows, macOS, Android, and iOS. Works completely offline without internet connection.
- **📂 Multi-Format Script Import:** Paste scripts or import `.txt`, `.md`, and `.docx` (Word) files with automatic title and category detection.
- **💎 Freemium & Lifetime Deal Model:** Built-in licensing and AppSumo redemption code generator (`AS-PRO-XXXXX`).

---

## 🚀 Quick Start (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/teleprompter-pro.git
cd teleprompter-pro
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory, complete with service workers and PWA manifests.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>Space</kbd> | Play / Pause |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Increase / Decrease Speed |
| <kbd>←</kbd> / <kbd>→</kbd> | Jump 10s backward / forward |
| <kbd>R</kbd> | Restart from Top |
| <kbd>F</kbd> | Toggle Fullscreen |
| <kbd>M</kbd> | Toggle Optical Mirroring (Flip H) |
| <kbd>C</kbd> | Toggle Focus Cue Line |
| <kbd>Esc</kbd> | Exit Prompter to Editor |

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 6
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **PWA:** Vite Plugin PWA + Workbox
- **APIs:** HTML5 MediaRecorder, Web Speech Recognition API, Fullscreen API, Web Storage API

---

## 📄 License

Distributed under Lifetime Commercial License. All rights reserved.
