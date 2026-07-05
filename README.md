# Cadre

**Digital Workforce Platform for Banking** — an enterprise SaaS prototype for governed AI Digital Banking Officers (DBOs).

Cadre demonstrates how banks can deploy AI agents that guide customers through digital journeys with policy enforcement, capability controls, and security-by-design architecture.

## Features

- **Landing & marketing pages** — hero, trust signals, security narrative, and architecture overview
- **Workforce Console** — dashboard, employee management, templates, policies, audit logs, and deployment pipeline
- **Agent in Action** — scripted DBO demo with voice interaction and a mocked banking UI (YONO-style)
- **Digital Employees catalog** — public-facing capability and policy pages
- **Light & dark mode** — SBI-inspired design system with Framer Motion animations

## Tech Stack

| Layer | Tools |
| --- | --- |
| Framework | [TanStack Start](https://tanstack.com/start) + React 19 |
| Routing | TanStack Router |
| Styling | Tailwind CSS v4, shadcn/ui |
| Animation | Framer Motion |
| Language | TypeScript |
| Runtime | Bun |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 20+

### Install & run

```bash
bun install
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other scripts

```bash
bun run build    # Production build
bun run preview  # Preview production build
bun run lint     # ESLint
bun run format   # Prettier
```

## Project Structure

```
src/
├── routes/          # File-based routes (landing, console, agent demo, etc.)
├── components/      # UI components (shadcn) and feature modules
├── data/            # Seeded mock data (employees, policies, audit logs)
├── lib/             # Utilities
└── styles.css       # Design tokens and global styles
```

## Key Routes

| Route | Description |
| --- | --- |
| `/` | Landing page |
| `/console` | Workforce Console dashboard |
| `/console/employees` | Digital employee management |
| `/agent` | Agent in Action live demo |
| `/architecture` | Interactive architecture diagram |
| `/capabilities` | Public capabilities overview |
| `/policies` | Policy engine overview |

## Notes

This is a **frontend prototype** with seeded data — no backend is required. Built with [Lovable](https://lovable.dev) and TanStack Start.

## License

Private / prototype — not licensed for production use.
