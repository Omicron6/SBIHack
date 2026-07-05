import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function IntelligenceOrb({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-square w-full max-w-[520px]", className)}>
      {/* Ambient glow */}
      <div className="absolute inset-0 rounded-full bg-primary-gradient opacity-20 blur-3xl" />
      {/* Rotating rings */}
      <div className="absolute inset-6 rounded-full border border-primary/25 animate-orbit" />
      <div
        className="absolute inset-14 rounded-full border border-primary/20"
        style={{ animation: "orbit 30s linear infinite reverse" }}
      />
      <div className="absolute inset-24 rounded-full border border-primary/15 animate-orbit" />

      {/* Core sphere */}
      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[28%] rounded-full bg-primary-gradient shadow-elegant"
        style={{
          boxShadow:
            "inset 0 0 60px oklch(1 0 0 / 0.35), 0 30px 80px -20px oklch(0.44 0.14 258 / 0.55)",
        }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent" />
        <div className="absolute inset-6 rounded-full border border-white/20" />
      </motion.div>

      {/* Orbiting nodes */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <div
          key={i}
          className="absolute inset-0 animate-orbit"
          style={{ animationDuration: `${18 + i * 2}s`, animationDirection: i % 2 ? "reverse" : "normal" }}
        >
          <div
            className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_20px_var(--color-primary)]"
            style={{ top: `${8 + (i % 3) * 6}%`, transform: `rotate(${deg}deg) translateX(0)` }}
          />
        </div>
      ))}

      {/* Corner label */}
      <div className="absolute bottom-4 left-4 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground backdrop-blur">
        TEE · Governed Runtime
      </div>
    </div>
  );
}
