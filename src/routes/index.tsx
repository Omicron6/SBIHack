import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Lock,
  Mic,
  Globe,
  ScrollText,
  Building2,
  UserRound,
  Sparkles,
  AlertTriangle,
  Users,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Play,
} from "lucide-react";
import { SiteShell } from "@/components/site/site-shell";
import { IntelligenceOrb } from "@/components/site/intelligence-orb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cadre — Building the Digital Workforce for Banking" },
      {
        name: "description",
        content:
          "Cadre enables banks to create governed AI Digital Banking Officers that guide customers through digital journeys with TEE, policy, and zero-retention by default.",
      },
      { property: "og:title", content: "Cadre — Digital Workforce for Banking" },
      {
        property: "og:description",
        content: "Every customer deserves a Digital Banking Officer.",
      },
    ],
  }),
  component: Landing,
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function Landing() {
  return (
    <SiteShell>
      <Hero />
      <TrustStrip />
      <ProblemSection />
      <WhyFails />
      <IntroDBO />
      <HowItWorks />
      <SecurityByDesign />
      <BusinessImpact />
      <ArchitectureTeaser />
      <CTASection />
    </SiteShell>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-2">
        <motion.div {...fadeUp}>
          <Badge variant="outline" className="mb-6 border-primary/30 bg-primary/5 text-primary">
            <Sparkles className="mr-1 h-3 w-3" /> Digital Workforce Platform
          </Badge>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-[68px]">
            Building the{" "}
            <span className="text-gradient-primary">Digital Workforce</span> for Banking.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Banks have successfully digitized banking infrastructure. What they haven't digitized is
            the employee. Cadre enables banks to create trusted Digital Banking Officers that guide
            customers through digital banking journeys — with enterprise-grade governance, security,
            and privacy.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="bg-primary-gradient text-primary-foreground shadow-elegant">
              <Link to="/console/agent">
                <Play className="mr-2 h-4 w-4" /> Watch Prototype
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/console">
                Launch Workforce Console <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link to="/architecture">Explore Architecture</Link>
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span>Designed for</span>
            <span className="font-semibold text-foreground">SBI · Retail Banking</span>
            <span className="hidden h-3 w-px bg-border md:block" />
            <span className="hidden md:inline">Enterprise Reference</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <IntelligenceOrb />
        </motion.div>
      </div>
    </section>
  );
}

const trust = [
  { icon: Shield, label: "TEE Ready" },
  { icon: Mic, label: "Voice First" },
  { icon: Building2, label: "Enterprise Ready" },
  { icon: ScrollText, label: "Policy Driven" },
  { icon: Lock, label: "Zero Data Retention" },
  { icon: UserRound, label: "Governed AI" },
  { icon: Globe, label: "Multilingual" },
];

function TrustStrip() {
  return (
    <section className="border-y border-border/60 bg-card">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {trust.map((t) => (
            <div key={t.label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-primary">
                <t.icon className="h-4 w-4" />
              </span>
              <span className="font-medium text-foreground">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <motion.div {...fadeUp} className="max-w-3xl">
        <Kicker>The Problem</Kicker>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Banks digitized banking. Not the banker.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Digital banking replaced physical infrastructure — but not the trusted branch officer who
          used to walk customers through every step. The result: rising abandonment, growing branch
          dependency, and stalled digital adoption.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <FlowCard
          title="Traditional Branch"
          tone="muted"
          steps={["Customer walks in", "Human officer guides", "Doubts resolved", "Journey completed"]}
        />
        <FlowCard
          title="Today's Digital Banking"
          tone="danger"
          steps={[
            "Customer opens app",
            "No human guidance",
            "Confusion & fear",
            "Branch visit or drop-off",
          ]}
        />
      </div>
    </section>
  );
}

function FlowCard({
  title,
  steps,
  tone,
}: {
  title: string;
  steps: string[];
  tone: "muted" | "danger";
}) {
  return (
    <motion.div
      {...fadeUp}
      className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-soft"
    >
      <div className="flex items-center gap-2">
        <span
          className={
            tone === "danger"
              ? "flex h-8 w-8 items-center justify-center rounded-md bg-destructive/10 text-destructive"
              : "flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary"
          }
        >
          {tone === "danger" ? <XCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
        </span>
        <h3 className="font-display text-xl font-semibold">{title}</h3>
      </div>
      <ol className="mt-6 space-y-3">
        {steps.map((s, i) => (
          <li key={s} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
              {i + 1}
            </span>
            <span className="text-sm text-foreground">{s}</span>
          </li>
        ))}
      </ol>
    </motion.div>
  );
}

const fails = [
  { icon: AlertTriangle, title: "Fear of mistakes", body: "Users worry about wrong buttons on money screens." },
  { icon: Users, title: "No human guidance", body: "Nobody walks the customer through the journey." },
  { icon: Shield, title: "Digital fraud", body: "Rising phishing, mule accounts, and social engineering." },
  { icon: Globe, title: "Language barriers", body: "English-first flows lose Bharat customers." },
  { icon: TrendingUp, title: "Low confidence", body: "New products go unused because they feel opaque." },
  { icon: Building2, title: "Branch dependency", body: "Digital journeys still end at a branch counter." },
];

function WhyFails() {
  return (
    <section className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp} className="max-w-3xl">
          <Kicker>Why current digital banking still fails</Kicker>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            The infrastructure works. The experience doesn't.
          </h2>
        </motion.div>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {fails.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1"
            >
              <f.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IntroDBO() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <motion.div {...fadeUp} className="max-w-3xl">
        <Kicker>Introducing</Kicker>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          The Digital Banking Officer.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Not a chatbot. Not a support agent. Not a financial advisor. A governed Digital Employee
          your bank hires, trains, and deploys — with the same rigor as a human officer.
        </p>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-destructive">
            This is not
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <NotItem>An AI Chatbot</NotItem>
            <NotItem>A Customer Support Bot</NotItem>
            <NotItem>A Financial Advisor</NotItem>
            <NotItem>A general LLM behind a login</NotItem>
          </ul>
        </div>
        <div className="rounded-2xl border border-success/30 bg-success/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-success">
            This is
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <IsItem>A Governed Digital Employee</IsItem>
            <IsItem>With identity, department & role</IsItem>
            <IsItem>Bound by policies & permissions</IsItem>
            <IsItem>Auditable end-to-end</IsItem>
          </ul>
        </div>
      </div>
    </section>
  );
}

function NotItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      <XCircle className="h-4 w-4 text-destructive" />
      <span>{children}</span>
    </li>
  );
}
function IsItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      <CheckCircle2 className="h-4 w-4 text-success" />
      <span>{children}</span>
    </li>
  );
}

const steps = [
  "Bank creates a Digital Employee",
  "Assigns policies",
  "Assigns banking capabilities",
  "Deploys employee",
  "Integrates with digital channel (YONO)",
  "Customer interacts naturally",
  "Journey completed & audited",
];

function HowItWorks() {
  return (
    <section className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp} className="max-w-3xl">
          <Kicker>How Cadre works</Kicker>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Hire, govern, deploy — like a real employee.
          </h2>
        </motion.div>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          {steps.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative rounded-xl border border-border bg-card p-4 shadow-soft"
            >
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                Step {i + 1}
              </div>
              <div className="mt-2 text-sm font-medium leading-snug">{s}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const security = [
  { title: "Trusted Execution Environment", body: "All customer computation runs inside a TEE with attested runtime." },
  { title: "Privacy Context Broker", body: "Mediates every PII exchange with explicit consent and scope." },
  { title: "Policy Engine", body: "Deterministic policy checks precede every capability invocation." },
  { title: "Governed Banking Capabilities", body: "Only permitted, versioned capabilities can be called." },
  { title: "Official Banking APIs", body: "Cadre never touches core systems — it calls the bank's own APIs." },
];

function SecurityByDesign() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <motion.div {...fadeUp} className="max-w-3xl">
        <Kicker>Security by design</Kicker>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Session-only memory. Zero retention. Policy-controlled execution.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Cadre is architected so that a Digital Employee cannot access, remember, or act on
          customer data beyond what a policy explicitly allows for a single session.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-5">
        {security.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-xl border border-border bg-card p-6 shadow-soft"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Shield className="h-4 w-4" />
            </div>
            <h3 className="mt-4 font-semibold leading-tight">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const impacts = [
  { k: "+38%", v: "Digital adoption uplift", d: "Guided journeys move customers past friction points that used to trigger drop-off." },
  { k: "−42%", v: "Branch dependency", d: "Journeys that used to end at a branch now complete on the app." },
  { k: "−31%", v: "Support ticket volume", d: "Officers resolve doubts inline before they become tickets." },
  { k: "+2.1x", v: "Customer confidence", d: "Verbal guidance in the user's language builds trust." },
  { k: "100%", v: "Enterprise governance", d: "Every action is policy-checked, TEE-executed, and audited." },
  { k: "Future", v: "Ready workforce", d: "Add new Digital Employees without rewriting the bank's stack." },
];

function BusinessImpact() {
  return (
    <section className="bg-navy-gradient py-24 text-navy-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp} className="max-w-3xl">
          <Kicker className="text-primary-glow">Business impact</Kicker>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            Measurable outcomes for banking leadership.
          </h2>
        </motion.div>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {impacts.map((i, idx) => (
            <motion.div
              key={i.v}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <div className="font-display text-4xl font-bold text-white">{i.k}</div>
              <div className="mt-1 text-sm font-medium text-white/90">{i.v}</div>
              <div className="mt-2 text-sm text-white/60">{i.d}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchitectureTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <motion.div {...fadeUp} className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div>
          <Kicker>Architecture</Kicker>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            An enterprise runtime, not a wrapper around an LLM.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Cadre sits between your digital channel and your core banking APIs. The model never
            talks to the bank directly — the policy engine and capability layer do.
          </p>
          <div className="mt-6">
            <Button asChild variant="outline">
              <Link to="/architecture">
                Explore the architecture <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <MiniArchitecture />
        </div>
      </motion.div>
    </section>
  );
}

export function MiniArchitecture() {
  const rows = [
    { label: "Customer · Digital Channel (YONO)", tone: "muted" },
    { label: "Digital Employee Runtime · TEE", tone: "primary" },
    { label: "Privacy Context Broker", tone: "navy" },
    { label: "Policy Engine", tone: "navy" },
    { label: "Capability Layer", tone: "navy" },
    { label: "Official Banking APIs · Core", tone: "muted" },
  ];
  return (
    <div className="space-y-3">
      {rows.map((r, i) => (
        <motion.div
          key={r.label}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className={
            r.tone === "primary"
              ? "rounded-lg bg-primary-gradient px-4 py-3 text-primary-foreground shadow-elegant"
              : r.tone === "navy"
                ? "rounded-lg border border-border bg-navy-gradient px-4 py-3 text-navy-foreground"
                : "rounded-lg border border-border bg-secondary px-4 py-3 text-foreground"
          }
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{r.label}</span>
            <span className="text-[10px] uppercase tracking-[0.16em] opacity-70">
              layer {i + 1}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="overflow-hidden rounded-3xl border border-border bg-primary-gradient p-10 text-primary-foreground shadow-elegant md:p-14">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h3 className="font-display text-3xl font-bold md:text-4xl">
              Every customer deserves a Digital Banking Officer.
            </h3>
            <p className="mt-3 text-primary-foreground/80">
              Launch the Workforce Console, or see a Digital Banking Officer complete a real journey
              live.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/console">Launch Console</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10">
              <Link to="/console/agent">Watch Agent in Action</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Kicker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`text-xs font-semibold uppercase tracking-[0.18em] text-primary ${className}`}>
      {children}
    </div>
  );
}
