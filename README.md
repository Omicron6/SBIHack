# Cadre

> Every customer deserves a Digital Banking Officer.

Cadre is an enterprise SaaS prototype for building **governed AI Digital Banking Officers (DBOs)** — digital employees that guide customers through banking journeys with policy enforcement, capability controls, and security-by-design architecture.

---

## Overview

Banks digitized apps, cores, and payments — but not the person at the counter who walked customers through it. Cadre fills that gap: a platform to create, deploy, and manage digital employees with the same rigor applied to a human hire.

**Identity. Role. Capabilities. Policies. Audit trail. From day one.**

This repo is a fully navigable frontend prototype — no backend required.

---

## What's Inside

| Area | Description |
| --- | --- |
| **Landing** | Hero, trust signals, security narrative, business impact |
| **Workforce Console** | Dashboard, employee CRUD, templates, policies, audit, deployment |
| **Agent in Action** | Live DBO demo with voice interaction + mocked banking UI |
| **Public Pages** | Digital employees catalog, capabilities, policy engine, architecture |

---

## Quick Start

**Requirements:** [Bun](https://bun.sh) or Node.js 20+

```bash
bun install
bun run dev
```

Visit **http://localhost:5173**

```bash
bun run build    # production build
bun run preview  # preview build
bun run lint     # lint
bun run format   # format
```

---

## Routes

```
/                         Landing
/platform                 Platform overview
/console                  Workforce Console
  /console/employees      Digital employee list
  /console/employees/new  5-step onboarding stepper
  /console/employees/:id  Employee profile
/agent                    Agent in Action demo
/architecture             Interactive architecture diagram
/employees                Public employee catalog
/capabilities             Capability registry
/policies                 Policy engine
/about                    About Cadre
```

---

## Tech Stack

- **Framework** — TanStack Start, React 19, TanStack Router
- **UI** — Tailwind CSS v4, shadcn/ui, Framer Motion
- **Language** — TypeScript
- **Runtime** — Bun

---

## Project Structure

```
src/
├── routes/       # File-based pages
├── components/   # UI + feature components
├── data/         # Seeded mock data
├── lib/          # Utilities
└── styles.css    # Design tokens
```

---

## Note

Frontend prototype with seeded data. Built with [TanStack Start](https://tanstack.com/start).
