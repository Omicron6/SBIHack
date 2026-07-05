import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/console/console-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  CheckCircle2,
  Rocket,
  Layers,
  Shield,
  Activity,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { auditEvents, capabilityUsage, dashboardMetrics, employees, journeyTrend } from "@/data/cadre";

export const Route = createFileRoute("/console/")({
  head: () => ({
    meta: [{ title: "Dashboard — Cadre Workforce Console" }],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="min-h-full">
      <PageHeader
        title="Workforce Dashboard"
        description="Real-time view of your Digital Employees, their journeys, and governance posture."
        action={
          <Button asChild className="bg-primary-gradient text-primary-foreground shadow-elegant">
            <Link to="/console/employees/new">
              <Rocket className="mr-2 h-4 w-4" /> Hire a Digital Employee
            </Link>
          </Button>
        }
      />
      <div className="space-y-6 p-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
          <Metric icon={Users} label="Digital Employees" value={dashboardMetrics.employees.toString()} delta="+2 this week" />
          <Metric icon={CheckCircle2} label="Journey Completion" value={`${dashboardMetrics.completion}%`} delta="+3.4%" tone="success" />
          <Metric icon={Rocket} label="Deployments" value={dashboardMetrics.deployments.toString()} delta="last 30d" />
          <Metric icon={Layers} label="Capability Usage" value="156k" delta="calls · 7d" />
          <Metric icon={Shield} label="Policy Violations" value={dashboardMetrics.violations.toString()} delta="all blocked" tone="warning" />
          <Metric icon={Activity} label="Employee Health" value={`${dashboardMetrics.health}%`} delta="SLO green" tone="success" />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2 p-5">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">Journey completion trend</div>
                <div className="text-xs text-muted-foreground">Started vs. completed — last 7 days</div>
              </div>
              <Badge variant="outline">SBI · Retail</Badge>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={journeyTrend}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary-glow)" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="var(--color-primary-glow)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                  <Area type="monotone" dataKey="started" stroke="var(--color-primary-glow)" fill="url(#g2)" strokeWidth={2} />
                  <Area type="monotone" dataKey="completed" stroke="var(--color-primary)" fill="url(#g1)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-sm font-semibold">Capability usage</div>
              <Badge variant="outline">7d</Badge>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={capabilityUsage}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                  <Bar dataKey="value" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="p-5 lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold">Employee health</div>
              <Link to="/console/employees" className="text-xs text-primary hover:underline">
                View all <ArrowRight className="ml-1 inline h-3 w-3" />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {employees.slice(0, 5).map((e) => (
                <div key={e.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-gradient font-semibold text-primary-foreground">
                      {e.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{e.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {e.id} · {e.role} · {e.branch}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden text-right md:block">
                      <div className="text-sm font-medium">{e.journeys.toLocaleString()}</div>
                      <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">journeys</div>
                    </div>
                    <StatusPill status={e.status} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold">Recent audit events</div>
              <Badge variant="outline">live</Badge>
            </div>
            <div className="space-y-2">
              {auditEvents.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between rounded-md border border-border bg-background/60 px-3 py-2 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-muted-foreground">{a.ts}</span>
                    <span className="font-medium">{a.intent}</span>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      a.status === "ALLOWED"
                        ? "border-success/30 bg-success/10 text-success"
                        : "border-destructive/30 bg-destructive/10 text-destructive"
                    }
                  >
                    {a.status}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  delta,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  delta?: string;
  tone?: "success" | "warning";
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        {delta && (
          <span
            className={
              tone === "success"
                ? "text-[11px] font-medium text-success"
                : tone === "warning"
                  ? "text-[11px] font-medium text-warning"
                  : "text-[11px] text-muted-foreground"
            }
          >
            {tone === "success" && <ArrowUpRight className="mr-0.5 inline h-3 w-3" />}
            {delta}
          </span>
        )}
      </div>
      <div className="mt-3 font-display text-2xl font-semibold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </Card>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: "border-success/30 bg-success/10 text-success",
    Draft: "border-muted-foreground/20 bg-muted text-muted-foreground",
    Suspended: "border-destructive/30 bg-destructive/10 text-destructive",
    "Coming Soon": "border-primary/30 bg-primary/10 text-primary",
  };
  return (
    <Badge variant="outline" className={map[status] ?? ""}>
      {status}
    </Badge>
  );
}
