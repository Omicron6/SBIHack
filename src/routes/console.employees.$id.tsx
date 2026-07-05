import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHeader, StatusPill } from "@/components/console/helpers";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { auditEvents, capabilities, employees, policies } from "@/data/cadre";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/console/employees/$id")({
  head: ({ params }) => ({
    meta: [{ title: `${params.id} — Digital Employee · Cadre` }],
  }),
  loader: ({ params }) => {
    const e = employees.find((x) => x.id === params.id);
    if (!e) throw notFound();
    return { employee: e };
  },
  notFoundComponent: () => (
    <div className="p-10">Employee not found. <Link to="/console/employees" className="text-primary underline">Back</Link></div>
  ),
  component: EmployeeProfile,
});

function EmployeeProfile() {
  const { employee: e } = Route.useLoaderData();
  const caps = capabilities.filter((c) => e.capabilities.includes(c.id));
  const pols = policies.filter((p) => e.policies.includes(p.id));
  return (
    <div>
      <PageHeader
        title={e.name}
        description={`${e.id} · ${e.role} · ${e.branch}`}
        action={
          <Button asChild variant="ghost">
            <Link to="/console/employees">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to employees
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-[320px_1fr]">
        <Card className="h-fit p-6 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-primary-gradient text-3xl font-semibold text-primary-foreground shadow-elegant">
            {e.avatar}
          </div>
          <div className="mt-4 font-display text-lg font-semibold">{e.name}</div>
          <div className="text-xs text-muted-foreground">{e.role}</div>
          <div className="mt-3 flex justify-center">
            <StatusPill status={e.status} />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-4 text-left text-xs">
            <Kv k="Employee ID" v={e.id} />
            <Kv k="Department" v={e.department} />
            <Kv k="Branch" v={e.branch} />
            <Kv k="Deployed" v={e.deployedAt ?? "—"} />
          </div>
        </Card>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <BigStat label="Journeys" value={e.journeys.toLocaleString()} />
            <BigStat label="Completion" value={e.status === "Active" ? `${e.completion}%` : "—"} />
            <BigStat label="Health" value={e.status === "Active" ? "99.98%" : "—"} />
          </div>

          <Tabs defaultValue="capabilities">
            <TabsList>
              <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
              <TabsTrigger value="deployments">Deployments</TabsTrigger>
              <TabsTrigger value="audit">Audit</TabsTrigger>
            </TabsList>

            <TabsContent value="capabilities">
              <Card className="p-4">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {caps.map((c) => (
                    <div key={c.id} className="rounded-lg border border-border p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{c.name}</div>
                        <Badge variant="outline">{c.category}</Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{c.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="policies">
              <Card className="p-4">
                <div className="space-y-2">
                  {pols.map((p) => (
                    <div key={p.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div>
                        <div className="text-sm font-medium">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.description}</div>
                      </div>
                      <Badge variant="outline" className="border-success/30 bg-success/10 text-success">ENFORCED</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="deployments">
              <Card className="p-4">
                <div className="space-y-2 text-sm">
                  <DeployRow ts="2026-05-14 10:14" env="Prod · YONO Retail" ver="dbo.v1.4.2" />
                  <DeployRow ts="2026-04-30 18:02" env="Prod · YONO Retail" ver="dbo.v1.4.1" />
                  <DeployRow ts="2026-04-11 09:47" env="Sandbox" ver="dbo.v1.4.0" />
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="audit">
              <Card className="p-4">
                <div className="space-y-2">
                  {auditEvents.map((a, i) => (
                    <div key={i} className="flex items-center justify-between rounded-md border border-border bg-background/60 px-3 py-2 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-muted-foreground">{a.ts}</span>
                        <span className="font-medium">{a.intent}</span>
                        <span className="text-muted-foreground">→ {a.capability}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={a.status === "ALLOWED" ? "border-success/30 bg-success/10 text-success" : "border-destructive/30 bg-destructive/10 text-destructive"}
                      >
                        {a.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function BigStat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-4">
      <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-2xl font-semibold">{value}</div>
    </Card>
  );
}
function Kv({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{k}</div>
      <div className="mt-0.5 font-medium">{v}</div>
    </div>
  );
}
function DeployRow({ ts, env, ver }: { ts: string; env: string; ver: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-border px-3 py-2">
      <div>
        <div className="text-sm font-medium">{env}</div>
        <div className="text-xs text-muted-foreground">{ts}</div>
      </div>
      <Badge variant="outline" className="font-mono">{ver}</Badge>
    </div>
  );
}
