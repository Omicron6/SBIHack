import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/console/helpers";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { auditEvents } from "@/data/cadre";

export const Route = createFileRoute("/console/audit")({
  head: () => ({ meta: [{ title: "Audit — Cadre Workforce Console" }] }),
  component: () => (
    <div>
      <PageHeader title="Audit Log" description="Every intent, capability, and policy decision — signed and immutable." />
      <div className="p-6">
        <Card className="overflow-hidden p-0">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Employee</th>
                <th className="px-4 py-3 text-left">Intent</th>
                <th className="px-4 py-3 text-left">Capability</th>
                <th className="px-4 py-3 text-left">Policy</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[...auditEvents, ...auditEvents].map((a, i) => (
                <tr key={i} className="hover:bg-muted/30">
                  <td className="px-4 py-2 font-mono text-muted-foreground">{a.ts}</td>
                  <td className="px-4 py-2 font-mono">{a.employee}</td>
                  <td className="px-4 py-2">{a.intent}</td>
                  <td className="px-4 py-2 font-mono text-muted-foreground">{a.capability}</td>
                  <td className="px-4 py-2 font-mono text-muted-foreground">{a.policy}</td>
                  <td className="px-4 py-2">
                    <Badge variant="outline" className={a.status === "ALLOWED" ? "border-success/30 bg-success/10 text-success" : "border-destructive/30 bg-destructive/10 text-destructive"}>
                      {a.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  ),
});
