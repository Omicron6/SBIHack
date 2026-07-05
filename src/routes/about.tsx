import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Cadre" },
      { name: "description", content: "Cadre exists because digital banking still fails the customers it was built to serve." },
    ],
  }),
  component: () => (
    <SiteShell>
      <section className="mx-auto max-w-3xl px-6 py-20">
        <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">About Cadre</Badge>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Every customer deserves a Digital Banking Officer.
        </h1>
        <div className="prose prose-neutral mt-6 max-w-none text-muted-foreground">
          <p>
            Cadre was built for a simple observation: banks digitized every corner of their
            infrastructure — apps, cores, payments, KYC — but never the person at the counter who
            used to walk customers through it.
          </p>
          <p>
            The result is a customer standing alone in front of a screen, hesitant to click, quick
            to give up, quick to blame themselves. The infrastructure works. The experience
            doesn't.
          </p>
          <p>
            Cadre gives banks a way to create a governed digital employee — not a chatbot, not a
            wrapper — with the same rigor they'd apply to a human hire. Identity, role, department,
            capabilities, policies, security rules, and an audit trail from day one.
          </p>
          <p>
            We built Cadre as an enterprise runtime because that's what banks need. The model is
            behind glass. The policies decide what runs. The audit knows what happened. And the
            customer, finally, gets the guidance they always deserved.
          </p>
        </div>
        <div className="mt-8 flex gap-3">
          <Button asChild className="bg-primary-gradient text-primary-foreground shadow-elegant">
            <Link to="/console/agent">Watch a Digital Employee at work</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/console">Launch Console</Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  ),
});
