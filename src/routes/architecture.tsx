import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/site-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const layers = [
  {
    name: "Customer Channel",
    body: "YONO · IVR · WhatsApp Banking. The customer never leaves the app they trust.",
    tone: "muted",
  },
  {
    name: "Digital Employee Runtime · TEE",
    body: "Governed inference inside a Trusted Execution Environment with attested boot.",
    tone: "primary",
  },
  {
    name: "Privacy Context Broker",
    body: "Every PII exchange is scoped, consented, and observable.",
    tone: "navy",
  },
  {
    name: "Policy Engine",
    body: "Deterministic allow / deny decisions before any capability runs.",
    tone: "navy",
  },
  {
    name: "Capability Layer",
    body: "Only versioned, permission-scoped capabilities can call the bank.",
    tone: "navy",
  },
  {
    name: "Official Banking APIs",
    body: "Cadre never touches core — it calls the bank's own APIs like any other client.",
    tone: "muted",
  },
];

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: "Architecture — Cadre" },
      { name: "description", content: "Cadre is an enterprise runtime for Digital Employees, not a wrapper around an LLM." },
    ],
  }),
  component: () => (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">Architecture</Badge>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
          A governed runtime, not a wrapper.
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Hover any layer to see what it does. Traffic flows top-down; every layer is
          policy-controlled and audited.
        </p>

        <div className="mt-12 space-y-3">
          {layers.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card
                className={
                  "group cursor-default overflow-hidden p-0 transition-transform hover:-translate-y-0.5"
                }
              >
                <div
                  className={
                    l.tone === "primary"
                      ? "flex items-center justify-between bg-primary-gradient px-6 py-5 text-primary-foreground"
                      : l.tone === "navy"
                        ? "flex items-center justify-between bg-navy-gradient px-6 py-5 text-navy-foreground"
                        : "flex items-center justify-between bg-secondary px-6 py-5"
                  }
                >
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] opacity-70">Layer {i + 1}</div>
                    <div className="mt-1 font-display text-lg font-semibold">{l.name}</div>
                  </div>
                  <div className="max-w-md text-right text-sm opacity-90">{l.body}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </SiteShell>
  ),
});
