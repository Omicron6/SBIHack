import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  Radio,
  Cpu,
  Database,
  GitBranch,
  Zap,
  ScrollText,
  Compass,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { YonoMock, type YonoScreen } from "@/components/agent/yono-mock";
import { FloatingOfficer, type OfficerState } from "@/components/agent/floating-officer";
import { agentScriptFD, type AgentStep } from "@/data/cadre";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/console/agent")({
  head: () => ({
    meta: [
      { title: "Agent in Action — Cadre Workforce Console" },
      {
        name: "description",
        content:
          "A Digital Banking Officer quietly accompanies a customer inside YONO — voice-first, policy-governed, running on the Cadre runtime.",
      },
    ],
  }),
  component: AgentInAction,
});

// ————————————————————————————————————————————————————————
// Runtime pipeline (subtle telemetry only judges care about)
// ————————————————————————————————————————————————————————
type PipelineStage = {
  id: string;
  label: string;
  icon: typeof Zap;
  activeFrom: number;
  activeTo: number;
};

const pipeline: PipelineStage[] = [
  { id: "intent", label: "Intent Detection", icon: Compass, activeFrom: 1, activeTo: 3 },
  { id: "journey", label: "Journey Planning", icon: GitBranch, activeFrom: 2, activeTo: 3.5 },
  { id: "capability", label: "Capability Invocation", icon: Layers, activeFrom: 3, activeTo: 6 },
  { id: "policy", label: "Policy Validation", icon: ShieldCheck, activeFrom: 4, activeTo: 5 },
  { id: "tee", label: "TEE Runtime", icon: Cpu, activeFrom: 0.5, activeTo: 16 },
  { id: "context", label: "Context Broker", icon: Database, activeFrom: 2, activeTo: 14 },
  { id: "execution", label: "Execution", icon: Zap, activeFrom: 5, activeTo: 14 },
  { id: "audit", label: "Audit Ledger", icon: ScrollText, activeFrom: 14, activeTo: 16 },
];

type ToolCall = { t: number; tool: string; args: string };
const toolCallScript: ToolCall[] = [
  { t: 1.4, tool: "asr.transcribe", args: "lang=hi-IN" },
  { t: 2.0, tool: "nlu.classify_intent", args: "intent=open_fd" },
  { t: 2.6, tool: "journey.plan", args: "flow=fd.book" },
  { t: 3.2, tool: "core.kyc.status", args: "cid=CUS-88231" },
  { t: 3.8, tool: "core.accounts.getBalance", args: "acct=***4821" },
  { t: 4.4, tool: "policy.evaluate", args: "pol.otp, pol.consent" },
  { t: 4.9, tool: "consent.capture", args: "scope=fd.book" },
  { t: 5.6, tool: "core.fd.eligibility", args: "amt=100000, tenure=12" },
  { t: 6.4, tool: "tts.speak", args: "voice=aarav" },
  { t: 10.2, tool: "policy.evaluate", args: "pol.otp challenge" },
  { t: 13.2, tool: "core.auth.otp", args: "channel=sms" },
  { t: 14.0, tool: "core.fd.book", args: "ref=FD-2026-0918-4482" },
  { t: 14.4, tool: "audit.emit", args: "event=fd.booked" },
];

// ————————————————————————————————————————————————————————

function AgentInAction() {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(true);
  const raf = useRef<number | null>(null);
  const last = useRef<number>(0);

  useEffect(() => {
    const kick = setTimeout(() => setPlaying(true), 400);
    return () => clearTimeout(kick);
  }, []);

  useEffect(() => {
    if (!playing) return;
    last.current = performance.now();
    const loop = (now: number) => {
      const dt = (now - last.current) / 1000;
      last.current = now;
      setT((prev) => {
        const next = prev + dt;
        if (next >= 17) return 0;
        return next;
      });
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [playing]);

  const current: AgentStep = useMemo(() => {
    let step = agentScriptFD[0];
    for (const s of agentScriptFD) if (t + 0.001 >= s.t) step = s;
    return step;
  }, [t]);

  const screen: YonoScreen = current.screen;

  const officerState: OfficerState = useMemo(() => {
    if (!playing && t === 0) return "idle";
    if (current.customer) return "listening";
    if (current.officer) return "speaking";
    return "thinking";
  }, [current, playing, t]);

  // Show transient guidance bubble only while the officer is speaking / on key screens
  const say = useMemo(() => {
    if (current.officer) return current.officer;
    // Short proactive hints per screen (fall back)
    if (screen === "intent") return "Choose Fixed Deposit — I'll pre-fill it for you.";
    if (screen === "eligibility") return "Verifying your KYC and balance…";
    if (screen === "policy") return "Applying OTP + consent policy.";
    if (screen === "form") return "Review the amount and tenure I selected.";
    if (screen === "confirm") return "I'll request confirmation before submitting.";
    if (screen === "done") return "Your FD is booked. Reference has been logged.";
    return undefined;
  }, [current, screen]);

  const emittedCalls = useMemo(
    () => toolCallScript.filter((c) => c.t <= t + 0.001),
    [t],
  );

  const reset = () => {
    setPlaying(false);
    setT(0);
  };

  return (
    <div className="min-h-full bg-[oklch(0.98_0.005_260)] dark:bg-background">
      {/* Slim status ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 bg-background px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            <Activity className="h-3 w-3 text-success" /> Live Demo · Agent in Action
          </div>
          <Badge variant="outline" className="font-mono text-[10px]">
            DBO-001 · Aarav · v1.4.2
          </Badge>
          <span className="hidden text-[11px] text-muted-foreground md:inline">
            Customer inside <span className="font-semibold text-foreground">SBI YONO</span>. Officer runs inside the phone.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={reset}>
            <RotateCcw className="mr-2 h-3.5 w-3.5" /> Reset
          </Button>
          <Button
            size="sm"
            onClick={() => setPlaying((p) => !p)}
            className="bg-primary-gradient text-primary-foreground"
          >
            {playing ? <Pause className="mr-2 h-3.5 w-3.5" /> : <Play className="mr-2 h-3.5 w-3.5" />}
            {playing ? "Pause" : t === 0 ? "Start journey" : "Resume"}
          </Button>
        </div>
      </div>

      {/* Main stage: LEFT monitor (20%) · CENTER phone (rest) */}
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-6 px-6 py-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        {/* LEFT — Runtime Monitor (subtle) */}
        <aside className="lg:sticky lg:top-4 lg:self-start">
          <RuntimeMonitor
            t={t}
            current={current}
            emittedCalls={emittedCalls}
          />
        </aside>

        {/* CENTER — the phone is the hero */}
        <section className="flex min-h-[820px] items-center justify-center rounded-3xl bg-[radial-gradient(ellipse_at_top,oklch(0.94_0.03_255)_0%,transparent_60%)] p-6">
          <div className="relative">
            {/* Ambient halo behind the phone */}
            <div className="pointer-events-none absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(ellipse,oklch(0.75_0.14_255/0.18)_0%,transparent_65%)] blur-2xl" />
            <YonoMock
              screen={screen}
              size="lg"
              overlay={<FloatingOfficer state={officerState} say={say} />}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

// ————————————————————————————————————————————————————————
// Runtime Monitor — enterprise telemetry, visually subtle
// ————————————————————————————————————————————————————————
function RuntimeMonitor({
  t,
  current,
  emittedCalls,
}: {
  t: number;
  current: AgentStep;
  emittedCalls: ToolCall[];
}) {
  const journeyState = t === 0 ? "READY" : t >= 14 ? "COMPLETED" : "IN_PROGRESS";
  const latest = emittedCalls[emittedCalls.length - 1];

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card/80 shadow-sm backdrop-blur">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-3 py-2">
        <div className="flex items-center gap-2">
          <Radio className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Runtime Monitor
          </span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">
          t={t.toFixed(1)}s
        </span>
      </div>

      <div className="space-y-3 p-3">
        <div className="rounded-md border border-dashed border-border/70 bg-background/60 p-2 text-[10px] text-muted-foreground">
          Judge-only telemetry. The customer never sees this panel.
        </div>

        {/* State readouts */}
        <div className="space-y-1.5">
          <TelemetryRow label="Journey" value={journeyState} tone={journeyState === "COMPLETED" ? "success" : journeyState === "IN_PROGRESS" ? "primary" : "muted"} />
          <TelemetryRow label="Intent" value={current.intent ?? (t === 0 ? "—" : "guide")} mono />
          <TelemetryRow label="Capability" value={current.capability ?? "cap.guide"} mono />
          <TelemetryRow label="Policy" value={current.policy ?? "pol.default"} mono tone="success" />
          <TelemetryRow label="TEE" value={t === 0 ? "closed" : "attested"} mono tone={t === 0 ? "muted" : "success"} />
          <TelemetryRow label="Context Broker" value={t === 0 ? "idle" : "brokering"} mono tone={t === 0 ? "muted" : "primary"} />
          <TelemetryRow
            label="Current Tool"
            value={latest?.tool ?? "—"}
            mono
            tone={latest ? "primary" : "muted"}
          />
        </div>

        {/* Execution timeline */}
        <div>
          <div className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Execution Timeline
          </div>
          <ol className="space-y-1">
            {pipeline.map((s) => {
              const active = t >= s.activeFrom && t <= s.activeTo;
              const done = t > s.activeTo;
              const Icon = s.icon;
              return (
                <li
                  key={s.id}
                  className={cn(
                    "flex items-center gap-2 rounded-md border px-2 py-1.5 transition-colors",
                    active && "border-primary/40 bg-primary/5",
                    done && "border-success/30 bg-success/5",
                    !active && !done && "border-border/60 bg-background/40",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-md",
                      active && "bg-primary text-primary-foreground",
                      done && "bg-success/20 text-success",
                      !active && !done && "bg-muted text-muted-foreground",
                    )}
                  >
                    <Icon className="h-3 w-3" />
                  </span>
                  <span
                    className={cn(
                      "text-[11px] font-medium",
                      active ? "text-foreground" : done ? "text-foreground/80" : "text-muted-foreground",
                    )}
                  >
                    {s.label}
                  </span>
                  {active && (
                    <span className="ml-auto h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  )}
                  {done && !active && (
                    <span className="ml-auto text-[9px] font-semibold uppercase tracking-wider text-success">
                      ok
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        {/* Tool call stream */}
        <div>
          <div className="mb-1 flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <span>Tool Stream</span>
            <span>{emittedCalls.length}</span>
          </div>
          <div className="max-h-[160px] space-y-1 overflow-hidden rounded-md border border-border bg-[oklch(0.14_0.02_258)] p-2 font-mono text-[10px] text-white/85">
            <AnimatePresence initial={false}>
              {emittedCalls.slice(-6).map((c, i) => (
                <motion.div
                  key={c.t + c.tool + i}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-white/40">{c.t.toFixed(1)}s</span>
                  <span className="text-primary-glow">→</span>
                  <span className="truncate">
                    {c.tool}
                    <span className="text-white/40">({c.args})</span>
                  </span>
                  <span className="ml-auto text-success">✓</span>
                </motion.div>
              ))}
              {emittedCalls.length === 0 && (
                <div className="text-white/40">// runtime idle — awaiting intent</div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function TelemetryRow({
  label,
  value,
  tone,
  mono,
}: {
  label: string;
  value: string;
  tone?: "success" | "primary" | "muted";
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-md bg-background/60 px-2 py-1">
      <span className="text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      <span
        className={cn(
          "text-[11px] font-semibold",
          mono && "font-mono",
          tone === "success" && "text-success",
          tone === "primary" && "text-primary",
          tone === "muted" && "text-muted-foreground",
        )}
      >
        {value}
      </span>
    </div>
  );
}
