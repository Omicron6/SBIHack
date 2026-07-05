import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/console/helpers";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Loader2, Rocket } from "lucide-react";

const pipeline = [
  { env: "Design", state: "ok", note: "12 templates reviewed" },
  { env: "Sandbox", state: "ok", note: "34 deployments · 0 defects" },
  { env: "Staging (TEE)", state: "run", note: "Canary · 5% traffic" },
  { env: "Production · YONO Retail", state: "ok", note: "dbo.v1.4.2 stable" },
];

export const Route = createFileRoute("/console/deployment")({
  head: () => ({ meta: [{ title: "Deployment — Cadre Workforce Console" }] }),
  component: () => (
    <div>
      <PageHeader title="Deployment Pipeline" description="Promote Digital Employees through governed environments." />
      <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-4">
        {pipeline.map((p) => (
          <Card key={p.env} className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{p.env}</span>
              {p.state === "run" ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-success" />
              )}
            </div>
            <div className="mt-2 text-sm">{p.note}</div>
            <div className="mt-4">
              <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
                <Rocket className="mr-1 h-3 w-3" /> {p.state === "run" ? "Rolling out" : "Healthy"}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  ),
});
