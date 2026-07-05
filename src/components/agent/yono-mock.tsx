import { motion, AnimatePresence } from "framer-motion";
import { Bell, ChevronRight, CreditCard, Home, PieChart, QrCode, Search, Send, User, CheckCircle2, ShieldCheck, Loader2, Wallet, ArrowUpRight, Landmark, Fingerprint, Receipt, Sparkles } from "lucide-react";

export type YonoScreen = "home" | "intent" | "eligibility" | "policy" | "capability" | "form" | "confirm" | "done";

// Tap coordinates for the animated "officer pointer" — relative to the phone content area (280x520)
const tapCoords: Partial<Record<YonoScreen, { x: number; y: number; label: string }>> = {
  intent: { x: 140, y: 280, label: "Deposits" },
  form: { x: 140, y: 470, label: "Continue" },
  confirm: { x: 140, y: 380, label: "Confirm with OTP" },
};

export function YonoMock({ screen, size = "md", overlay }: { screen: YonoScreen; size?: "md" | "lg"; overlay?: React.ReactNode }) {
  const tap = tapCoords[screen];
  const dims = size === "lg"
    ? "h-[760px] w-[380px] rounded-[52px] border-[14px]"
    : "h-[640px] w-[320px] rounded-[44px] border-[12px]";
  return (
    <div className={`relative mx-auto flex ${dims} flex-col overflow-hidden border-[#0a0a1a] bg-[#0a0a1a] shadow-elegant`}>

      {/* Notch */}
      <div className="absolute left-1/2 top-1 z-20 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-[#0a0a1a]" />
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pb-1 pt-2 text-[10px] font-medium text-white/90">
        <span>9:41</span>
        <span className="flex items-center gap-1">● 5G · 100%</span>
      </div>

      <div className="relative flex flex-1 flex-col overflow-hidden rounded-[28px] bg-[#f4f6fb]">
        <YonoTopBar />

        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="h-full overflow-y-auto"
            >
              {screen === "home" && <HomeScreen />}
              {screen === "intent" && <IntentScreen />}
              {screen === "eligibility" && <EligibilityScreen />}
              {screen === "policy" && <PolicyScreen />}
              {screen === "capability" && <CapabilityScreen />}
              {screen === "form" && <FDForm />}
              {screen === "confirm" && <ConfirmScreen />}
              {screen === "done" && <DoneScreen />}
            </motion.div>
          </AnimatePresence>

          {/* Officer pointer — visualizes the DBO tapping the screen */}
          <AnimatePresence>
            {tap && (
              <motion.div
                key={"pointer-" + screen}
                initial={{ opacity: 0, x: 20, y: 20, scale: 1.2 }}
                animate={{ opacity: 1, x: tap.x, y: tap.y, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute left-0 top-0 z-30"
              >
                <div className="relative">
                  <span className="absolute -inset-3 rounded-full border-2 border-primary/70 animate-pulse-ring" />
                  <span className="block h-6 w-6 rounded-full bg-primary/90 shadow-elegant ring-4 ring-white/60" />
                  <span className="absolute left-8 top-1 whitespace-nowrap rounded-md bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground shadow">
                    DBO · {tap.label}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating DBO / other overlays from parent */}
          {overlay}


        </div>

        <YonoBottomBar />
      </div>
    </div>
  );
}

function YonoTopBar() {
  return (
    <div className="relative flex items-center justify-between overflow-hidden bg-gradient-to-br from-[#1B4F9C] via-[#2563b7] to-[#3b82c9] px-4 py-3 text-white">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
      <div className="absolute -left-4 -bottom-8 h-20 w-20 rounded-full bg-white/5" />
      <div className="relative flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[10px] font-black text-[#1B4F9C]">SBI</div>
        <div>
          <div className="text-[9px] font-medium uppercase tracking-[0.18em] opacity-80">YONO · Retail</div>
          <div className="text-[13px] font-semibold leading-tight">Namaste, Rahul</div>
        </div>
      </div>
      <div className="relative flex items-center gap-3 opacity-95">
        <Search className="h-4 w-4" />
        <Bell className="h-4 w-4" />
      </div>
    </div>
  );
}

function HomeScreen() {
  return (
    <div className="space-y-3 p-3">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f2f5e] to-[#1B4F9C] p-4 text-white shadow-md">
        <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10" />
        <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/70">Savings · XXXX 4821</div>
        <div className="mt-1 font-display text-[22px] font-bold leading-none">₹ 4,86,220<span className="text-xs font-normal opacity-80">.44</span></div>
        <div className="mt-3 flex gap-2 text-[10px]">
          <MiniChip icon={Send}>Send</MiniChip>
          <MiniChip icon={ArrowUpRight}>Request</MiniChip>
          <MiniChip icon={Receipt}>Statement</MiniChip>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {([["Pay", Send], ["Scan", QrCode], ["Cards", CreditCard], ["More", User]] as const).map(([label, Icon]) => (
          <div key={label} className="flex flex-col items-center rounded-xl bg-white p-2 shadow-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf1fb] text-[#1B4F9C]">
              <Icon className="h-4 w-4" />
            </span>
            <span className="mt-1 text-[10px] font-medium text-slate-700">{label}</span>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-3 shadow-sm">
        <div className="mb-2 flex items-center justify-between text-[11px]">
          <span className="font-semibold text-slate-800">Banking Services</span>
          <span className="text-[#1B4F9C]">See all</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {([["Deposits", Landmark], ["Loans", Wallet], ["UPI", QrCode], ["Insure", ShieldCheck]] as const).map(([l, I]) => (
            <div key={l} className="flex flex-col items-center gap-1 rounded-lg p-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f0f6ff] text-[#1B4F9C]">
                <I className="h-4 w-4" />
              </span>
              <span className="text-[10px] text-slate-700">{l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-3 shadow-sm">
        <div className="mb-1 flex items-center justify-between text-[11px]">
          <span className="font-semibold text-slate-800">Recent activity</span>
          <span className="text-slate-400">This week</span>
        </div>
        {[
          ["UPI · Zomato", "-₹ 428.00", false],
          ["Salary · SBI Bank", "+₹ 82,000.00", true],
          ["Netflix", "-₹ 499.00", false],
        ].map(([a, b, credit]) => (
          <div key={a as string} className="flex items-center justify-between border-t border-slate-100 py-1.5 text-[11px]">
            <span className="text-slate-700">{a}</span>
            <span className={credit ? "font-medium text-emerald-600" : "font-medium text-slate-800"}>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntentScreen() {
  return (
    <div className="space-y-3 p-3">
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#1B4F9C]">Deposits</div>
        <div className="mt-1 font-display text-base font-semibold text-slate-800">Open a Fixed Deposit</div>
        <div className="mt-2 text-[11px] leading-relaxed text-slate-600">
          Earn up to <span className="font-semibold text-[#1B4F9C]">7.10% p.a.</span> on tenures from 7 days to 10 years. Officer will guide you.
        </div>
      </div>
      <div className="space-y-2">
        {[
          { t: "Fixed Deposit", d: "Lump-sum, up to 7.10% p.a.", hot: true },
          { t: "Recurring Deposit", d: "Monthly savings, up to 6.90% p.a." },
          { t: "Tax Saver FD", d: "5-year lock, up to 6.75% p.a." },
        ].map((o) => (
          <div key={o.t} className={`flex items-center justify-between rounded-2xl bg-white p-3 shadow-sm ${o.hot ? "ring-2 ring-[#1B4F9C]/60" : ""}`}>
            <div>
              <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-800">
                {o.t}
                {o.hot && <span className="rounded-full bg-[#1B4F9C]/10 px-1.5 py-0.5 text-[9px] font-semibold text-[#1B4F9C]">Recommended</span>}
              </div>
              <div className="text-[10px] text-slate-500">{o.d}</div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </div>
        ))}
      </div>
    </div>
  );
}

function EligibilityScreen() {
  return (
    <FullMessage icon={Loader2} spin title="Checking eligibility" body="Verifying your savings balance and KYC status with SBI core." tone="primary" />
  );
}
function PolicyScreen() {
  return (
    <FullMessage icon={ShieldCheck} title="Policy validated" body="OTP + consent policy applied. Zero-retention session started." tone="primary" />
  );
}
function CapabilityScreen() {
  return (
    <FullMessage icon={Loader2} spin title="Invoking capability" body="cap.fd → core.fd.book — running inside TEE." tone="primary" />
  );
}

function FullMessage({ icon: Icon, spin, title, body, tone }: { icon: typeof Loader2; spin?: boolean; title: string; body: string; tone?: "primary" }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf1fb] text-[#1B4F9C]">
        <Icon className={`h-7 w-7 ${spin ? "animate-spin" : ""}`} />
      </div>
      <div className={tone === "primary" ? "text-[#1B4F9C]" : "text-slate-800"}>
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em]">{title}</div>
      </div>
      <div className="font-display text-base font-semibold text-slate-800">{body}</div>
      <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-500"><Fingerprint className="h-3 w-3" /> TEE session · Cadre Runtime v1</div>
    </div>
  );
}

function FDForm() {
  return (
    <div className="space-y-3 p-3">
      <div className="rounded-2xl bg-gradient-to-br from-[#1B4F9C] to-[#2563b7] p-3 text-white shadow-md">
        <div className="text-[9px] font-semibold uppercase tracking-[0.16em] opacity-80">Fixed Deposit · Booking</div>
        <div className="mt-1 font-display text-base font-semibold">Officer has pre-filled your FD</div>
      </div>
      <div className="rounded-2xl bg-white p-3 shadow-sm">
        <FormRow label="Source" value="Savings · ***4821" />
        <FormRow label="Amount" value="₹ 1,00,000" highlight />
        <FormRow label="Tenure" value="12 months" />
        <FormRow label="Interest" value="7.10% p.a." />
        <FormRow label="Maturity" value="₹ 1,07,340" />
        <FormRow label="Payout" value="On maturity" />
        <FormRow label="Nominee" value="Priya Sharma" />
      </div>
      <div className="rounded-2xl border border-[#1B4F9C]/30 bg-[#eaf1fb] p-3 text-[11px] text-slate-700">
        <div className="flex items-center gap-2 font-semibold text-[#1B4F9C]">
          <ShieldCheck className="h-3.5 w-3.5" /> Officer speaking
        </div>
        <p className="mt-1 leading-relaxed">
          "Aap ₹1,00,000 par 12 mahine ke liye ₹7,340 interest earn karenge. Continue karein?"
        </p>
      </div>
      <button className="w-full rounded-2xl bg-gradient-to-r from-[#1B4F9C] to-[#2563b7] py-3 text-[12px] font-semibold text-white shadow-md">
        Continue
      </button>
    </div>
  );
}

function ConfirmScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-5 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf1fb] text-[#1B4F9C]">
        <ShieldCheck className="h-7 w-7" />
      </div>
      <div className="font-display text-base font-semibold text-slate-800">Confirm your FD</div>
      <div className="w-full max-w-[240px] rounded-2xl bg-white p-3 text-[11px] shadow-sm">
        <div className="flex justify-between border-b border-slate-100 py-1"><span className="text-slate-500">Amount</span><span className="font-semibold">₹ 1,00,000</span></div>
        <div className="flex justify-between border-b border-slate-100 py-1"><span className="text-slate-500">Tenure</span><span className="font-semibold">12 months</span></div>
        <div className="flex justify-between border-b border-slate-100 py-1"><span className="text-slate-500">Rate</span><span className="font-semibold">7.10%</span></div>
        <div className="flex justify-between py-1"><span className="text-slate-500">Maturity</span><span className="font-semibold text-[#1B4F9C]">₹ 1,07,340</span></div>
      </div>
      <button className="rounded-full bg-gradient-to-r from-[#1B4F9C] to-[#2563b7] px-5 py-2.5 text-[11px] font-semibold text-white shadow-md">
        Confirm with OTP
      </button>
      <div className="text-[9px] text-slate-500">OTP sent to +91 ••••• 4482</div>
    </div>
  );
}

function DoneScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
      <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }} className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
        <CheckCircle2 className="h-9 w-9" />
      </motion.div>
      <div className="font-display text-base font-semibold text-slate-800">FD Booked Successfully</div>
      <div className="w-full max-w-[240px] rounded-2xl bg-white p-3 text-[11px] shadow-sm">
        <Row k="Reference" v="FD-2026-0918-4482" />
        <Row k="Amount" v="₹ 1,00,000" />
        <Row k="Maturity" v="₹ 1,07,340" />
        <Row k="Date" v="05 Jul 2026" />
      </div>
      <div className="text-[10px] text-slate-500">Completed by DBO-001 · Aarav · Cadre Runtime</div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-slate-100 py-1 last:border-0">
      <span className="text-slate-500">{k}</span>
      <span className="font-medium text-slate-800">{v}</span>
    </div>
  );
}

function FormRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-1.5 text-[11px] last:border-0">
      <span className="text-slate-500">{label}</span>
      <span className={highlight ? "font-mono font-semibold text-[#1B4F9C]" : "font-mono text-slate-800"}>{value}</span>
    </div>
  );
}

function MiniChip({ children, icon: Icon }: { children: React.ReactNode; icon: typeof Send }) {
  return (
    <span className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 backdrop-blur">
      <Icon className="h-3 w-3" /> {children}
    </span>
  );
}

function YonoBottomBar() {
  const items = [
    { I: Home, l: "Home", active: true },
    { I: Send, l: "Pay" },
    { I: QrCode, l: "Scan" },
    { I: PieChart, l: "Insights" },
    { I: User, l: "Profile" },
  ];
  return (
    <div className="flex items-center justify-around border-t border-slate-200 bg-white px-2 py-2">
      {items.map(({ I, l, active }) => (
        <div key={l} className={`flex flex-col items-center gap-0.5 ${active ? "text-[#1B4F9C]" : "text-slate-400"}`}>
          <I className="h-4 w-4" />
          <span className="text-[9px] font-medium">{l}</span>
        </div>
      ))}
    </div>
  );
}
