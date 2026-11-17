# Decision Readiness Board — SI Capstone Web Application

**Mohammad Ferdinand Valliandra (5026231159)** · Information Systems Capstone (Fall 2026/2027)

Production-ready modular web application (**React 19 + TypeScript + Vite**) unifying the SI Capstone Evidence Hub, the isolated **Q3.03 Clickable Prototype**, and the persistent **Q3.04 Core MVP Build** with full **Bahasa Indonesia (`ID`) / English (`EN`)** switching.

---

## Architecture & Routes

| Route | Purpose | Isolation & Persistence |
| --- | --- | --- |
| `/` | **Capstone Evidence & Artifact Hub** — Cross-phase journey (`Q1` → `Q5`), interactive Retina/SVG diagram viewer with pan-zoom lightbox, and design iteration history. | Read-only showcase portal |
| `/q3-03` | **Q3.03 Clickable Prototype (AGY Redesign)** — Isolated single-flow simulation for unguided usability reviews without scenario spoilers. | In-memory session state |
| `/q3-04-core` | **Q3.04 MVP Core Build (*Make It Work. Prove It!*)** — Real proposal builder, strict validation, multi-proposal `localStorage` persistence, and shareable UTF-8 Base64URL `#snapshot=` links. | Persistent `localStorage` (`drb_q304_core_v2`) |
| `/arsip/q3-03-v1/` & `/arsip/q3-03-v2/` | Preserved static snapshots of earlier Q3.03 design iterations for transparent grading audit. | Static HTML archives |

## Tech Stack & Design System

- **Framework:** React 19, React Router v7, TypeScript 5 (`strict: true`), Vite 6
- **Typography:** Exclusively `Space Grotesk` (headings & UI) + `JetBrains Mono` (metrics, timestamps, protocol codes)
- **Internationalization (`src/i18n/`):** Instant `ID` / `EN` language toggle persisted in `localStorage` (`drb_capstone_locale`); all domain states store language-neutral enum keys so switching languages dynamically translates live proposals, audit trails, and WhatsApp message drafts without data loss.
- **Multi-Device Ergonomics:** Verified across `360px` Android, `393px` iPhone, `768px`–`1024px` iPad, and `1440px+` Desktop (`44px` coarse-pointer targets, `16px` mobile form inputs to prevent iOS Safari auto-zoom, safe-area insets, and floating mobile decision dock).

## Local Development & Deployment

```bash
npm install
npm run dev      # Start local Vite dev server
npm run build    # Run strict TypeScript check (tsc -b) + production bundle (dist/)
npm run preview  # Preview production build locally
```

Configured out-of-the-box for **GitHub → Vercel** (`vercel.json` handles SPA routing while preserving `/arsip/*` and `/assets/*`). Zero external API keys, credentials, or raw participant personal data are stored in this repository.
