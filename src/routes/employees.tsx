import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/site-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { employees } from "@/data/cadre";
import { StatusPill } from "./console.index";
import { motion } from "framer-motion";

export const Route = createFileRoute("/employees")({
  head: () => ({
    meta: [
      { title: "Digital Employees — Cadre" },
      { name: "description", content: "Meet the current and upcoming Digital Employees you can hire on Cadre." },
    ],
  }),
  component: EmployeesPage,
});

function EmployeesPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">Workforce Catalog</Badge>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Meet your Digital Workforce.
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Hire from a growing catalog of governed Digital Employees. Each one arrives with
          identity, capabilities, and policies pre-configured for the bank.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {employees.map((e, i) => (
            <motion.div key={e.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Card className="h-full p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-gradient text-xl font-semibold text-primary-foreground shadow-elegant">
                    {e.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{e.name}</div>
                    <div className="text-xs text-muted-foreground">{e.department}</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{e.role}</span>
                  <StatusPill status={e.status} />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  {e.capabilities.length} capabilities · {e.policies.length} policies · {e.branch}
                </p>
                <div className="mt-5">
                  {e.status === "Active" ? (
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/console/employees/$id" params={{ id: e.id }}>View profile</Link>
                    </Button>
                  ) : (
                    <Button variant="ghost" disabled className="w-full">Coming soon</Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
