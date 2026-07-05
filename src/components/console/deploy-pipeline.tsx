import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Loader2, Package, ShieldCheck, FileText, Copy, Download, FileCode, FileJson, Folder, FolderOpen, KeyRound, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const deploySteps = [
  { key: "package", label: "Packaging Runtime", detail: "cadre-runtime@1.4.2 · 12.4 MB" },
  { key: "policy", label: "Embedding Policies", detail: "8 policies · TEE-signed" },
  { key: "identity", label: "Signing Employee Identity", detail: "ed25519 · issuer=cadre.sbi" },
  { key: "bundle", label: "Generating Runtime Bundle", detail: "wasm + capability map + manifest" },
  { key: "sdk", label: "Creating Integration SDK", detail: "react · android · ios · java" },
  { key: "publish", label: "Publishing Employee", detail: "channel=YONO · env=sandbox" },
];

export type DeployPayload = {
  empId: string;
  name: string;
  role: string;
  department: string;
  branch: string;
  capabilities: string[];
  policies: string[];
};

export function DeployPipeline({ payload, onComplete }: { payload: DeployPayload; onComplete: () => void }) {
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (idx >= deploySteps.length) {
      setDone(true);
      onComplete();
      return;
    }
    const timer = setTimeout(() => setIdx((i) => i + 1), 700 + Math.random() * 400);
    return () => clearTimeout(timer);
  }, [idx, done, onComplete]);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[oklch(0.14_0.02_258)] text-white/90">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary-gradient">
            <Package className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <div>
            <div className="font-display text-sm font-semibold text-white">Deploying {payload.empId}</div>
            <div className="font-mono text-[10px] text-white/50">cadre deploy --employee {payload.empId} --channel yono</div>
          </div>
        </div>
        <Badge variant="outline" className="border-white/20 bg-white/10 font-mono text-[10px] text-white/80">
          {done ? "COMPLETE" : "BUILDING"}
        </Badge>
      </div>

      <div className="space-y-1.5 p-4 font-mono text-xs">
        {deploySteps.map((s, i) => {
          const state = i < idx ? "done" : i === idx ? "running" : "pending";
          return (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3"
            >
              <span className="w-4">
                {state === "done" ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : state === "running" ? (
                  <Loader2 className="h-4 w-4 animate-spin text-primary-glow" />
                ) : (
                  <Circle className="h-4 w-4 text-white/20" />
                )}
              </span>
              <span className={cn("flex-1", state === "pending" ? "text-white/30" : state === "running" ? "text-white" : "text-white/70")}>
                {s.label}
              </span>
              <span className="hidden text-[10px] text-white/40 md:inline">{s.detail}</span>
            </motion.div>
          );
        })}

        <AnimatePresence>
          {done && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3 text-success">
              <CheckCircle2 className="h-4 w-4" />
              <span>Deployment complete · {payload.empId}.sdk published to sandbox</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const packageFiles: { path: string; type: "file" | "dir"; kind?: "yaml" | "id" | "bin" | "json" | "pem" | "md" | "code"; size?: string }[] = [
  { path: "manifest.yaml", type: "file", kind: "yaml", size: "1.2 KB" },
  { path: "employee.identity", type: "file", kind: "id", size: "412 B" },
  { path: "runtime.bundle", type: "file", kind: "bin", size: "11.8 MB" },
  { path: "capability.map", type: "file", kind: "json", size: "3.4 KB" },
  { path: "policy.bundle", type: "file", kind: "json", size: "8.1 KB" },
  { path: "signature.pem", type: "file", kind: "pem", size: "684 B" },
  { path: "README.md", type: "file", kind: "md", size: "2.9 KB" },
  { path: "integrations/", type: "dir" },
  { path: "integrations/react/", type: "dir" },
  { path: "integrations/android/", type: "dir" },
  { path: "integrations/ios/", type: "dir" },
  { path: "integrations/java/", type: "dir" },
];

function FileIcon({ kind }: { kind?: string }) {
  const cls = "h-3.5 w-3.5";
  if (kind === "yaml" || kind === "json") return <FileJson className={cn(cls, "text-primary-glow")} />;
  if (kind === "id" || kind === "pem") return <KeyRound className={cn(cls, "text-warning")} />;
  if (kind === "md") return <BookOpen className={cn(cls, "text-white/60")} />;
  if (kind === "code") return <FileCode className={cn(cls, "text-primary-glow")} />;
  return <FileText className={cn(cls, "text-white/60")} />;
}

export function SdkPackageExplorer({ empId }: { empId: string }) {
  const [tab, setTab] = useState<"files" | "manifest" | "integrate">("files");
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-navy-gradient px-4 py-3 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
            <Package className="h-5 w-5 text-primary-glow" />
          </div>
          <div>
            <div className="font-display text-sm font-semibold">{empId}.sdk</div>
            <div className="text-[10px] text-white/60">Digital Banking Officer · Runtime Package · v1.4.2</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="border-success/40 bg-success/10 text-success">
            <ShieldCheck className="mr-1 h-3 w-3" /> Signed
          </Badge>
          <Badge variant="outline" className="border-white/20 bg-white/10 text-white/80">TEE Enabled</Badge>
          <Badge variant="outline" className="border-white/20 bg-white/10 text-white/80">Verified</Badge>
          <Button size="sm" className="bg-primary-gradient text-primary-foreground shadow-elegant">
            <Download className="mr-1.5 h-3.5 w-3.5" /> Download SDK
          </Button>
        </div>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
        <div className="border-b border-border px-4">
          <TabsList className="h-10 bg-transparent p-0">
            <TabsTrigger value="files" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none">Package</TabsTrigger>
            <TabsTrigger value="manifest" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none">Manifest</TabsTrigger>
            <TabsTrigger value="integrate" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none">Integrate</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="files" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-[320px_1fr]">
            <div className="border-r border-border bg-[oklch(0.14_0.02_258)] p-3 font-mono text-xs text-white/85">
              <div className="mb-2 flex items-center gap-1.5 text-white/70">
                <FolderOpen className="h-3.5 w-3.5" /> {empId.toLowerCase()}.sdk/
              </div>
              <ul className="space-y-0.5">
                {packageFiles.map((f) => {
                  const depth = f.path.split("/").filter(Boolean).length - 1;
                  const name = f.path.replace(/\/$/, "").split("/").pop();
                  return (
                    <li key={f.path} style={{ paddingLeft: 12 + depth * 14 }} className="flex items-center gap-2 rounded px-1 py-0.5 hover:bg-white/5">
                      {f.type === "dir" ? <Folder className="h-3.5 w-3.5 text-primary-glow" /> : <FileIcon kind={f.kind} />}
                      <span className={cn(f.type === "dir" ? "text-white" : "text-white/80")}>{name}{f.type === "dir" ? "/" : ""}</span>
                      {f.size && <span className="ml-auto text-[10px] text-white/40">{f.size}</span>}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="p-4">
              <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                <FileText className="h-3.5 w-3.5" /> README.md
              </div>
              <div className="space-y-3 text-sm leading-relaxed text-foreground">
                <p><span className="font-semibold">{empId}</span> is a governed Digital Banking Officer packaged as a self-contained runtime bundle. It runs inside a Trusted Execution Environment and exposes only the capabilities and policies enumerated in <span className="font-mono">manifest.yaml</span>.</p>
                <p className="text-muted-foreground">Load the SDK into any supported channel (YONO, Internet Banking, WhatsApp Banking, native mobile) using the provided integration adapters. The bundle is cryptographically signed — hosts must verify <span className="font-mono">signature.pem</span> before execution.</p>
                <div className="grid grid-cols-2 gap-3 pt-2 md:grid-cols-4">
                  <MiniPill label="Runtime" value="Cadre v1" />
                  <MiniPill label="Version" value="1.4.2" />
                  <MiniPill label="Signature" value="ed25519" />
                  <MiniPill label="Attestation" value="TEE-verified" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="manifest" className="mt-0 p-4">
          <ManifestViewer empId={empId} />
        </TabsContent>

        <TabsContent value="integrate" className="mt-0 p-4">
          <IntegrationPanel empId={empId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MiniPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-muted/30 p-2">
      <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
      <div className="mt-0.5 font-mono text-xs font-semibold">{value}</div>
    </div>
  );
}

function ManifestViewer({ empId }: { empId: string }) {
  const rows: [string, React.ReactNode][] = [
    ["Employee Name", "Aarav — Digital Banking Officer"],
    ["Employee ID", <span className="font-mono">{empId}</span>],
    ["Runtime", "Cadre Runtime v1"],
    ["Version", <span className="font-mono">1.4.2</span>],
    ["Capabilities", <div className="flex flex-wrap gap-1.5">{["Guide Journey", "Open FD", "Debit Card", "UPI"].map((c) => <Badge key={c} variant="outline" className="text-[10px]">{c}</Badge>)}</div>],
    ["Policies", <div className="flex flex-wrap gap-1.5">{["Zero Retention", "TEE", "Consent Required", "OTP", "Full Audit"].map((c) => <Badge key={c} variant="outline" className="border-primary/30 bg-primary/5 text-[10px] text-primary">{c}</Badge>)}</div>],
    ["Supported Channels", <div className="flex flex-wrap gap-1.5">{["YONO", "Internet Banking", "WhatsApp Banking", "SBI Mobile SDK"].map((c) => <Badge key={c} variant="outline" className="text-[10px]">{c}</Badge>)}</div>],
    ["Digital Signature", <span className="flex items-center gap-1.5 text-success"><ShieldCheck className="h-3.5 w-3.5" /> Verified · ed25519</span>],
    ["Issuer", <span className="font-mono">cn=cadre.sbi, ou=digital-workforce</span>],
  ];
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2 text-xs">
        <div className="flex items-center gap-2 font-mono">
          <FileJson className="h-3.5 w-3.5 text-primary" /> manifest.yaml
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">v1.4.2 · signed</span>
      </div>
      <div className="divide-y divide-border">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[180px_1fr] gap-4 px-4 py-3 text-sm">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{k}</div>
            <div className="text-foreground">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const snippets: Record<string, string> = {
  React: `import { Cadre } from "@cadre/react";

export default function App() {
  return (
    <Cadre.Provider
      employee="DBO-001.sdk"
      channel="yono"
      attestation="tee"
    >
      <YonoApp />
    </Cadre.Provider>
  );
}`,
  Android: `// build.gradle
implementation("dev.cadre:runtime:1.4.2")

// MainActivity.kt
val employee = Cadre.load(this, "DBO-001.sdk")
employee.attach(yonoNavHost)
employee.start()`,
  iOS: `// Package.swift
.package(url: "https://pkg.cadre.dev/ios", from: "1.4.2")

// AppDelegate.swift
let employee = try Cadre.load(bundle: "DBO-001.sdk")
employee.attach(to: yonoRootController)
employee.start()`,
  Java: `// Spring Boot
DigitalEmployee employee =
    Cadre.load("DBO-001.sdk");

employee.bind(YonoChannel.retail());
employee.start();`,
  Node: `import { Cadre } from "@cadre/node";

const employee = await Cadre.load("./DBO-001.sdk", {
  channel: "whatsapp",
  attestation: "tee",
});

await employee.serve({ port: 8443 });`,
};

function IntegrationPanel({ empId }: { empId: string }) {
  const [lang, setLang] = useState<keyof typeof snippets>("React");
  const channels = ["YONO", "Internet Banking", "WhatsApp Banking", "SBI Mobile SDK"];
  return (
    <div className="space-y-4">
      <div>
        <div className="font-display text-lg font-semibold">Integrate into existing banking infrastructure</div>
        <p className="mt-1 text-sm text-muted-foreground">
          {empId} is a deployable runtime — not another API. Load it into any supported channel and the employee becomes an in-app officer.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {channels.map((c) => (
          <div key={c} className="flex items-center gap-2 rounded-md border border-success/30 bg-success/5 px-3 py-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span className="font-medium">{c}</span>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-border">
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-3 py-1.5">
          <div className="flex flex-wrap gap-1">
            {Object.keys(snippets).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l as keyof typeof snippets)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition",
                  lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            onClick={() => navigator.clipboard?.writeText(snippets[lang])}
            className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"
          >
            <Copy className="h-3 w-3" /> Copy
          </button>
        </div>
        <pre className="overflow-x-auto bg-[oklch(0.14_0.02_258)] p-4 font-mono text-[12px] leading-relaxed text-white/90">
{snippets[lang]}
        </pre>
      </div>
    </div>
  );
}
