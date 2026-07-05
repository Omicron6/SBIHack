import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, StatusPill } from "@/components/console/helpers";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { employees } from "@/data/cadre";
import { Rocket, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/console/employees/")({
  head: () => ({ meta: [{ title: "Employees — Cadre Workforce Console" }] }),
  component: EmployeesList,
});

function EmployeesList() {
  return (
    <div>
      <PageHeader
        title="Digital Employees"
        description="Every Digital Employee has an identity, department, role, and audit trail."
        action={
          <Button asChild className="bg-primary-gradient text-primary-foreground shadow-elegant">
            <Link to="/console/employees/new">
              <Rocket className="mr-2 h-4 w-4" /> Hire a Digital Employee
            </Link>
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
        {employees.map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="group relative overflow-hidden p-5 transition-shadow hover:shadow-elegant">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-gradient text-lg font-semibold text-primary-foreground shadow-elegant">
                    {e.avatar}
                  </div>
                  <div>
                    <div className="font-semibold leading-tight">{e.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {e.id} · {e.department}
                    </div>
                  </div>
                </div>
                <button className="opacity-0 transition-opacity group-hover:opacity-100">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{e.role}</span>
                <StatusPill status={e.status} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs">
                <Stat label="Capabilities" value={e.capabilities.length} />
                <Stat label="Policies" value={e.policies.length} />
                <Stat label="Journeys" value={e.journeys.toLocaleString()} />
                <Stat label="Completion" value={e.status === "Active" ? `${e.completion}%` : "—"} />
              </div>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {e.branch}
                </span>
                <Link to="/console/employees/$id" params={{ id: e.id }} className="text-xs text-primary hover:underline">
                  View profile →
                </Link>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="font-display text-base font-semibold">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
    </div>
  );
}
