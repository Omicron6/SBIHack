import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/console/helpers";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

const docs = [
  { title: "FD Products — Retail", type: "Product", updated: "2d ago", size: "42 pages" },
  { title: "UPI Limits & Rules", type: "Policy", updated: "6d ago", size: "18 pages" },
  { title: "Card Blocking Procedures", type: "SOP", updated: "1w ago", size: "9 pages" },
  { title: "KYC Refresh Guidelines", type: "Compliance", updated: "2w ago", size: "24 pages" },
  { title: "Nominee Update Flow", type: "SOP", updated: "3w ago", size: "6 pages" },
  { title: "Fraud Response Playbook", type: "Security", updated: "1mo ago", size: "31 pages" },
];

export const Route = createFileRoute("/console/knowledge")({
  head: () => ({ meta: [{ title: "Knowledge Base — Cadre Workforce Console" }] }),
  component: () => (
    <div>
      <PageHeader title="Knowledge Base" description="Grounded content Digital Employees can cite. Versioned, reviewed, and TEE-loaded." />
      <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
        {docs.map((d) => (
          <Card key={d.title} className="p-5">
            <BookOpen className="h-5 w-5 text-primary" />
            <div className="mt-3 font-semibold">{d.title}</div>
            <div className="mt-1 text-xs text-muted-foreground">Updated {d.updated} · {d.size}</div>
            <div className="mt-3"><Badge variant="outline">{d.type}</Badge></div>
          </Card>
        ))}
      </div>
    </div>
  ),
});
