import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/console/helpers";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { policies } from "@/data/cadre";

export const Route = createFileRoute("/console/policies")({
  head: () => ({ meta: [{ title: "Policies — Cadre Workforce Console" }] }),
  component: () => (
    <div>
      <PageHeader title="Policy Engine" description="Deterministic governance rules applied at every capability invocation." />
      <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
        {policies.map((p) => (
          <Card key={p.id} className="p-5">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-muted-foreground">{p.id}</div>
              <Switch defaultChecked={p.default} />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="font-semibold">{p.name}</div>
              <Badge variant="outline">{p.category}</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
          </Card>
        ))}
      </div>
    </div>
  ),
});
