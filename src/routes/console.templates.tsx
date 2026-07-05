import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/console/helpers";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { employees } from "@/data/cadre";

const templates = [
  { id: "tpl-dbo", title: "Digital Banking Officer", category: "Retail", capabilities: 6, policies: 8 },
  { id: "tpl-kyc", title: "Digital KYC Officer", category: "Compliance", capabilities: 3, policies: 7 },
  { id: "tpl-fraud", title: "Digital Fraud Officer", category: "Risk", capabilities: 2, policies: 7 },
  { id: "tpl-loan", title: "Digital Loan Officer", category: "Lending", capabilities: 2, policies: 4 },
  { id: "tpl-teller", title: "Digital Teller", category: "Retail", capabilities: 3, policies: 5 },
  { id: "tpl-wealth", title: "Wealth Concierge (Beta)", category: "Wealth", capabilities: 4, policies: 6 },
];

export const Route = createFileRoute("/console/templates")({
  head: () => ({ meta: [{ title: "Templates — Cadre Workforce Console" }] }),
  component: () => (
    <div>
      <PageHeader title="Employee Templates" description={`Bootstrap new Digital Employees from ${templates.length} governed templates. Currently deployed: ${employees.filter(e => e.status === "Active").length}.`} />
      <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((t) => (
          <Card key={t.id} className="p-5">
            <Badge variant="outline">{t.category}</Badge>
            <div className="mt-3 font-semibold">{t.title}</div>
            <div className="mt-1 text-xs text-muted-foreground">
              {t.capabilities} capabilities · {t.policies} policies
            </div>
          </Card>
        ))}
      </div>
    </div>
  ),
});
