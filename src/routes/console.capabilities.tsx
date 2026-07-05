import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/console/helpers";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { capabilities } from "@/data/cadre";
import { motion } from "framer-motion";
import { KeyRound, Link2, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/console/capabilities")({
  head: () => ({ meta: [{ title: "Capabilities — Cadre Workforce Console" }] }),
  component: () => (
    <div>
      <PageHeader title="Capability Registry" description="Every capability is versioned, permission-scoped, and dependency-checked." />
      <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Card className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-mono text-muted-foreground">{c.id}</div>
                  <div className="mt-1 font-semibold">{c.name}</div>
                </div>
                <Badge variant="outline">{c.category}</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
              <div className="mt-4 space-y-2 border-t border-border pt-3 text-xs">
                <Row icon={KeyRound} label="Permissions">{c.permissions.join(", ") || "—"}</Row>
                <Row icon={Link2} label="Dependencies">{c.dependencies.join(", ") || "None"}</Row>
                <Row icon={ShieldAlert} label="Rules">
                  {c.authRequired ? "Auth required" : "No auth"} · Risk: {c.risk}
                </Row>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  ),
});

function Row({ icon: Icon, label, children }: { icon: React.ComponentType<{ className?: string }>; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 h-3.5 w-3.5 text-primary" />
      <div>
        <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
        <div className="text-foreground">{children}</div>
      </div>
    </div>
  );
}
