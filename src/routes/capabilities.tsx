import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/site-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { capabilities } from "@/data/cadre";
import { KeyRound, Link2, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/capabilities")({
  head: () => ({
    meta: [
      { title: "Capability Registry — Cadre" },
      { name: "description", content: "Governed, versioned banking capabilities that Digital Employees may invoke." },
    ],
  }),
  component: () => (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">Capabilities</Badge>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Every action a Digital Employee can take.
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Capabilities are the only surface between a Digital Employee and the bank's core. Each
          one is versioned, permission-scoped, and dependency-checked.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <Card key={c.id} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-mono text-muted-foreground">{c.id}</div>
                  <div className="mt-1 font-semibold">{c.name}</div>
                </div>
                <Badge variant="outline">{c.category}</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
              <div className="mt-4 space-y-2 border-t border-border pt-3 text-xs">
                <div className="flex items-center gap-2"><KeyRound className="h-3.5 w-3.5 text-primary" /> {c.permissions.join(", ") || "—"}</div>
                <div className="flex items-center gap-2"><Link2 className="h-3.5 w-3.5 text-primary" /> Deps: {c.dependencies.join(", ") || "None"}</div>
                <div className="flex items-center gap-2"><ShieldAlert className="h-3.5 w-3.5 text-primary" /> {c.authRequired ? "Auth required" : "No auth"} · Risk {c.risk}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </SiteShell>
  ),
});
