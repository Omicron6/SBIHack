import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/console/helpers";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { capabilities, policies } from "@/data/cadre";
import { ArrowLeft, ArrowRight, Check, Cog, Package, Rocket, ShieldCheck, User } from "lucide-react";
import { DeployPipeline, SdkPackageExplorer } from "@/components/console/deploy-pipeline";

export const Route = createFileRoute("/console/employees/new")({
  head: () => ({ meta: [{ title: "Hire a Digital Employee — Cadre" }] }),
  component: NewEmployee,
});

const steps = [
  { id: 1, title: "Details", icon: User },
  { id: 2, title: "Role", icon: Cog },
  { id: 3, title: "Capabilities", icon: Cog },
  { id: 4, title: "Policies", icon: ShieldCheck },
  { id: 5, title: "Deploy", icon: Rocket },
  { id: 6, title: "SDK & Integrate", icon: Package },
];

const departments = ["Retail Banking", "Compliance", "Risk & Fraud", "Lending", "Wealth"];
const roles = ["Digital Banking Officer", "Digital KYC Officer", "Digital Fraud Officer", "Digital Loan Officer", "Digital Teller"];
const branches = ["Digital Branch · Mumbai", "Digital Branch · Delhi", "Digital Branch · Bengaluru", "Digital Branch · Kolkata", "Digital Branch · Hyderabad"];

function NewEmployee() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [dept, setDept] = useState(departments[0]);
  const [desc, setDesc] = useState("");
  const [role, setRole] = useState(roles[0]);
  const [branch, setBranch] = useState(branches[0]);
  const [caps, setCaps] = useState<string[]>(capabilities.slice(0, 4).map((c) => c.id));
  const [pols, setPols] = useState<string[]>(policies.filter((p) => p.default).map((p) => p.id));
  const [deployed, setDeployed] = useState(false);

  const empId = `DBO-${String(6 + Math.floor(Math.random() * 90)).padStart(3, "0")}`;

  return (
    <div>
      <PageHeader
        title="Hire a Digital Employee"
        description="Configure identity, role, capabilities, and policies. Deploy to a digital channel."
        action={
          <Button asChild variant="ghost">
            <Link to="/console/employees">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to employees
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-[240px_1fr]">
        <Card className="h-fit p-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Onboarding
          </div>
          <ol className="mt-3 space-y-1">
            {steps.map((s) => {
              const active = s.id === step;
              const done = s.id < step;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => setStep(s.id)}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition ${
                      active ? "bg-primary/10 text-foreground" : done ? "text-foreground/80 hover:bg-muted" : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${
                        done
                          ? "bg-success text-success-foreground"
                          : active
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {done ? <Check className="h-3 w-3" /> : s.id}
                    </span>
                    <span className="font-medium">{s.title}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </Card>

        <Card className="p-6">
          <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {step === 1 && (
              <StepShell title="Employee details" hint="Give your Digital Employee an identity and a home department.">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Employee name">
                    <Input placeholder="e.g. Aarav — Digital Banking Officer" value={name} onChange={(e) => setName(e.target.value)} />
                  </Field>
                  <Field label="Department">
                    <select className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm" value={dept} onChange={(e) => setDept(e.target.value)}>
                      {departments.map((d) => <option key={d}>{d}</option>)}
                    </select>
                  </Field>
                  <Field label="Description" className="md:col-span-2">
                    <Textarea rows={3} placeholder="What this Digital Employee is trained to do…" value={desc} onChange={(e) => setDesc(e.target.value)} />
                  </Field>
                  <Field label="Avatar">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-gradient text-lg font-semibold text-primary-foreground">
                        {name ? name.charAt(0).toUpperCase() : "A"}
                      </div>
                      <span className="text-xs text-muted-foreground">Auto-generated from name</span>
                    </div>
                  </Field>
                </div>
              </StepShell>
            )}
            {step === 2 && (
              <StepShell title="Role & assignment" hint="Where inside the bank does this employee report?">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Role">
                    <select className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm" value={role} onChange={(e) => setRole(e.target.value)}>
                      {roles.map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </Field>
                  <Field label="Line of business">
                    <Input value="Retail Banking" readOnly />
                  </Field>
                  <Field label="Branch">
                    <select className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm" value={branch} onChange={(e) => setBranch(e.target.value)}>
                      {branches.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </Field>
                  <Field label="Digital channel">
                    <Input value="YONO · Retail" readOnly />
                  </Field>
                </div>
              </StepShell>
            )}
            {step === 3 && (
              <StepShell title="Capabilities" hint="What is this Digital Employee permitted to do?">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {capabilities.map((c) => {
                    const checked = caps.includes(c.id);
                    return (
                      <label key={c.id} className={`flex cursor-pointer gap-3 rounded-lg border p-4 transition ${checked ? "border-primary/50 bg-primary/5" : "border-border hover:bg-muted/40"}`}>
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(v) =>
                            setCaps((cur) => (v ? [...cur, c.id] : cur.filter((x) => x !== c.id)))
                          }
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{c.name}</span>
                            <Badge variant="outline" className="text-[10px]">{c.category}</Badge>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">{c.description}</p>
                          <div className="mt-2 flex gap-2 text-[10px] text-muted-foreground">
                            <span>Auth: {c.authRequired ? "Required" : "None"}</span>
                            <span>·</span>
                            <span>Risk: {c.risk}</span>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </StepShell>
            )}
            {step === 4 && (
              <StepShell title="Policies" hint="Governance rules applied at every capability invocation.">
                <div className="space-y-3">
                  {policies.map((p) => {
                    const on = pols.includes(p.id);
                    return (
                      <div key={p.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                        <div>
                          <div className="text-sm font-medium">{p.name}</div>
                          <div className="text-xs text-muted-foreground">{p.description}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-[10px]">{p.category}</Badge>
                          <Switch checked={on} onCheckedChange={(v) => setPols((cur) => (v ? [...cur, p.id] : cur.filter((x) => x !== p.id)))} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </StepShell>
            )}
            {step === 5 && (
              <StepShell title="Deploy Digital Employee" hint="Package the runtime, sign the identity, and publish to the digital channel.">
                {!deployed ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      <ManifestPill k="Employee" v={empId} />
                      <ManifestPill k="Role" v={role} />
                      <ManifestPill k="Capabilities" v={`${caps.length} enabled`} />
                      <ManifestPill k="Policies" v={`${pols.length} enforced`} />
                    </div>
                    <DeployPipeline
                      payload={{ empId, name: name || "New Digital Employee", role, department: dept, branch, capabilities: caps, policies: pols }}
                      onComplete={() => setDeployed(true)}
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 rounded-lg border border-success/30 bg-success/5 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/15 text-success">
                        <Check className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-display text-sm font-semibold text-foreground">{empId}.sdk is live</div>
                        <div className="text-xs text-muted-foreground">Runtime bundle signed and published to <span className="font-mono">yono · sandbox</span></div>
                      </div>
                      <Button size="sm" className="bg-primary-gradient text-primary-foreground" onClick={() => setStep(6)}>
                        View SDK <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                )}
              </StepShell>
            )}
            {step === 6 && (
              <StepShell title="SDK & Integration" hint="Ship the employee into any banking channel — like a real deployable artifact.">
                <SdkPackageExplorer empId={empId} />
                <div className="mt-6 flex justify-end">
                  <Button variant="outline" onClick={() => navigate({ to: "/console/employees" })}>
                    Finish · view workforce <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </div>
              </StepShell>
            )}

            <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
              <Button variant="ghost" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              {step < 4 ? (
                <Button className="bg-primary-gradient text-primary-foreground" onClick={() => setStep(step + 1)}>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : step === 4 ? (
                <Button className="bg-primary-gradient text-primary-foreground" onClick={() => setStep(5)}>
                  <Rocket className="mr-2 h-4 w-4" /> Deploy employee
                </Button>
              ) : step === 5 && deployed ? (
                <Button className="bg-primary-gradient text-primary-foreground" onClick={() => setStep(6)}>
                  Open SDK package <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <span className="text-xs text-muted-foreground">{step === 5 ? "Deployment in progress…" : "Final step"}</span>
              )}
            </div>
          </motion.div>
        </Card>
      </div>
    </div>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Label className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function StepShell({ title, hint, children }: { title: string; hint: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function ManifestPill({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-md border border-border bg-muted/30 p-3">
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{k}</div>
      <div className="mt-0.5 font-mono text-xs font-semibold">{v}</div>
    </div>
  );
}
