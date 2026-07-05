import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/console/helpers";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/console/settings")({
  head: () => ({ meta: [{ title: "Settings — Cadre Workforce Console" }] }),
  component: () => (
    <div>
      <PageHeader title="Workspace Settings" description="Tenant-level configuration for the Cadre platform." />
      <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
        <Card className="p-5">
          <div className="text-sm font-semibold">Tenant</div>
          <div className="mt-3 space-y-2 text-sm">
            <Row k="Organization" v="State Bank of India" />
            <Row k="Environment" v="Sandbox · ap-south-1" />
            <Row k="TEE" v="Intel SGX · attested" />
            <Row k="Data residency" v="India" />
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-sm font-semibold">Governance defaults</div>
          <div className="mt-3 space-y-3">
            {["TEE Enabled", "Session-only memory", "Zero retention", "OTP for high-risk", "Multilingual on"].map((s) => (
              <div key={s} className="flex items-center justify-between">
                <Label className="text-sm">{s}</Label>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  ),
});
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-1 last:border-0">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
