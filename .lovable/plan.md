
# Cadre — Digital Workforce Platform for Banking

A premium enterprise SaaS prototype inspired by Stripe/Linear/Palantir, styled with SBI blue (#1B4F9C), deep navy, and white. Framer Motion throughout, shadcn/ui components, TanStack Start routes.

## Design system (src/styles.css)
- Tokens: `--primary` SBI blue, `--accent` deep navy, semantic success/warning/error, subtle gradient + glow tokens.
- Typography: Inter Tight for display headings + Inter for body (loaded via `<link>` in __root).
- Light + dark mode. Refined borders, minimal shadows, subtle grid/gradient backgrounds.

## Routes
```
/                         Landing (hero, trust, problem, DBO intro, how it works, security, impact, architecture teaser)
/platform                 Overview of platform pillars
/console                  Workforce Console layout w/ sidebar → nested routes
  /console/               Dashboard (metrics, charts, health)
  /console/employees      List (card grid of Digital Employees)
  /console/employees/new  5-step stepper (Details → Role → Capabilities → Policies → Deployment)
  /console/employees/$id  Employee profile
  /console/templates      Employee templates
  /console/capabilities   Capability registry
  /console/policies       Policy engine cards
  /console/knowledge      Knowledge base
  /console/deployment     Deployment pipeline
  /console/audit          Audit log
  /console/settings       Settings
/employees                Public "Digital Employees" catalog (DBO active, others coming soon)
/capabilities             Public capabilities page
/policies                 Public policy engine page
/agent                    Agent in Action (hero demo)
/architecture             Interactive architecture diagram
/about                    About Cadre
```

## Key page — /agent (Agent in Action)
Two-column:
- Left: Stylized SVG DBO avatar with idle/listening/thinking/speaking states (breathing, blinking, waveform). Big mic button. Scripted voice demo (uses Web Speech API if available, otherwise animated captions) with sample scripts: "Mujhe Fixed Deposit kholna hai", "I want to block my debit card".
- Right: Mocked YONO-style banking UI that auto-progresses through screens (Home → Intent → Eligibility → Policy → Capability → FD form → Confirm → Complete) synced to the officer's speech via a scripted timeline.
- Bottom: Runtime Monitor panel — Current Intent, Capability, Policy, TEE Session, Context Broker, Execution Status — live-updating pills.

## Console shell
- Collapsible shadcn sidebar with sections; top bar with search, environment switcher (Sandbox/Prod), user avatar.
- Dashboard: KPI cards, area chart (journey completion), bar chart (capability usage), employee health list, recent audit events, policy violations feed. Realistic seeded data.
- Employee stepper: progress rail, validated forms, generates DBO-00X id + JSON manifest preview at final step.
- Employee profile: header with avatar, ID, dept, role, status; tabs for Capabilities, Policies, Deployments, Audit.

## Motion & polish
- Framer Motion page transitions, staggered card reveals, hover lifts.
- Animated architecture diagram (SVG + motion paths) for landing security section and /architecture.
- Micro-interactions on buttons, tabs, stepper.

## Data
- All seed data in `src/data/` (employees, capabilities, policies, audit, dashboard metrics, agent script).
- No backend; purely frontend prototype.

## Tech notes
- Uses existing TanStack Start + Tailwind v4 + shadcn setup.
- Framer Motion via `motion` package (already common). Will `bun add motion` if not present.
- No Spline/Three.js dependency — replace hero 3D with a bespoke CSS/SVG animated "intelligence orb" (glass sphere w/ orbiting nodes) to keep bundle light and reliable. Callout in code if user later wants real Spline.
- Head metadata per route with unique titles/descriptions.

## Deliverable
A cohesive multi-page prototype with landing story, working console navigation & stepper, and a scripted Agent-in-Action demo — ready to show SBI executives.
