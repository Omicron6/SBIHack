import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/site-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { policies } from "@/data/cadre";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/policies")({
  head: () => ({
    meta: [
      { title: "Policy Engine — Cadre" },
      { name: "description", content: "Deterministic governance rules that gate every capability invocation." },
    ],
  }),
  component: () => (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">Policy Engine</Badge>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Governance is a first-class runtime.
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Cadre's policy engine sits between intent and execution. Every capability is gated by
          deterministic policies — nothing runs without an explicit allow.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {policies.map((p) => (
            <Card key={p.id} className="p-5">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <div className="mt-3 flex items-center justify-between">
                <div className="font-semibold">{p.name}</div>
                <Badge variant="outline">{p.category}</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-3 text-xs text-muted-foreground">Default: {p.default ? "Enforced" : "Optional"}</div>
            </Card>
          ))}
        </div>
      </section>
    </SiteShell>
  ),
});
