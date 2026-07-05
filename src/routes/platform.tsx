import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MiniArchitecture } from "./index";
import { ArrowRight, Building2, Layers, ScrollText, Shield, Users } from "lucide-react";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title: "Platform — Cadre" },
      { name: "description", content: "The pillars of the Cadre Digital Workforce Platform: identity, capabilities, policies, runtime, and audit." },
    ],
  }),
  component: () => (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">Platform</Badge>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
          One platform. A full digital workforce.
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Cadre gives banks the same primitives HR uses to run a human workforce — applied to
          governed AI Digital Employees.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <Card key={p.title} className="p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <p.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 font-semibold">{p.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
            </Card>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <Badge variant="outline">Runtime</Badge>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">
              Extend YONO, don't replace it.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Cadre plugs into your existing digital channel as a governed runtime layer. Customers
              keep the app they trust; the bank hires the employees that make it work.
            </p>
            <div className="mt-6 flex gap-3">
              <Button asChild className="bg-primary-gradient text-primary-foreground shadow-elegant">
                <Link to="/console">Launch Console <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline"><Link to="/architecture">See architecture</Link></Button>
            </div>
          </div>
          <Card className="p-6"><MiniArchitecture /></Card>
        </div>
      </section>
    </SiteShell>
  ),
});

const pillars = [
  { icon: Users, title: "Digital Employees", body: "Named identities, roles, departments, and audit trails — just like human staff." },
  { icon: Layers, title: "Capability Registry", body: "Versioned, permission-scoped banking capabilities the workforce can invoke." },
  { icon: Shield, title: "Policy Engine", body: "Deterministic governance that gates every capability call." },
  { icon: Building2, title: "TEE Runtime", body: "Zero-retention, session-only execution inside a Trusted Execution Environment." },
  { icon: ScrollText, title: "Audit & Compliance", body: "Immutable audit for every intent, decision, and outcome." },
  { icon: Layers, title: "Channel Integrations", body: "Drops into YONO, IVR, WhatsApp Banking, and internal contact-center." },
];
