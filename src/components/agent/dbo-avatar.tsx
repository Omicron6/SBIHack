import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type AvatarState = "idle" | "listening" | "thinking" | "speaking";

export function DBOAvatar({ state, className }: { state: AvatarState; className?: string }) {
  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[360px]", className)}>
      {/* Ambient glow */}
      <div className="absolute inset-0 rounded-full bg-primary-gradient opacity-20 blur-3xl" />
      {/* Pulse rings when listening */}
      {state === "listening" && (
        <>
          <div className="absolute inset-6 rounded-full border border-primary/40 animate-pulse-ring" />
          <div className="absolute inset-6 rounded-full border border-primary/30 animate-pulse-ring" style={{ animationDelay: "0.6s" }} />
        </>
      )}
      {/* Thinking orbit */}
      {state === "thinking" && (
        <div className="absolute inset-4 rounded-full border border-primary/40 border-dashed animate-orbit" />
      )}

      <motion.div
        animate={{
          scale: state === "speaking" ? [1, 1.02, 1] : [1, 1.015, 1],
        }}
        transition={{ duration: state === "speaking" ? 0.6 : 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[10%] overflow-hidden rounded-full bg-navy-gradient shadow-elegant"
      >
        {/* Halo top */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/25 via-transparent to-transparent" />
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full text-primary-foreground">
          {/* Suit collar */}
          <path d="M40 200 C 60 150, 80 140, 100 140 C 120 140, 140 150, 160 200 Z" fill="oklch(0.24 0.06 258)" />
          <path d="M92 140 L100 170 L108 140 Z" fill="oklch(0.44 0.14 258)" />
          {/* Shirt */}
          <path d="M85 140 L100 170 L115 140 Z" fill="white" />
          {/* Neck */}
          <ellipse cx="100" cy="132" rx="15" ry="10" fill="oklch(0.72 0.08 60)" />
          {/* Head */}
          <ellipse cx="100" cy="95" rx="34" ry="40" fill="oklch(0.75 0.07 60)" />
          {/* Hair */}
          <path d="M66 92 C 65 60, 90 50, 100 50 C 120 50, 135 65, 134 92 C 130 75, 118 68, 100 68 C 82 68, 72 78, 66 92 Z" fill="oklch(0.2 0.02 40)" />
          {/* Eyes */}
          <Eye cx={88} state={state} />
          <Eye cx={112} state={state} />
          {/* Brows */}
          <rect x="82" y="86" width="12" height="1.6" fill="oklch(0.2 0.02 40)" rx="1" />
          <rect x="106" y="86" width="12" height="1.6" fill="oklch(0.2 0.02 40)" rx="1" />
          {/* Nose */}
          <path d="M100 100 L96 112 L100 114 L104 112 Z" fill="oklch(0.65 0.07 60)" opacity="0.6" />
          {/* Mouth */}
          <Mouth state={state} />
        </svg>

        {/* SBI badge */}
        <div className="absolute right-4 top-4 rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur">
          DBO · SBI
        </div>
      </motion.div>

      {/* Waveform */}
      <div className="absolute -bottom-2 left-1/2 flex h-10 w-40 -translate-x-1/2 items-end justify-center gap-1">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              height:
                state === "speaking"
                  ? [4, 6 + ((i * 7) % 22), 4]
                  : state === "listening"
                    ? [3, 8, 3]
                    : 3,
            }}
            transition={{ duration: 0.6 + (i % 5) * 0.05, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 rounded-full bg-primary/70"
          />
        ))}
      </div>
    </div>
  );
}

function Eye({ cx, state }: { cx: number; state: AvatarState }) {
  return (
    <g>
      <motion.ellipse
        cx={cx}
        cy={94}
        rx={4}
        animate={{ ry: state === "idle" ? [4, 4, 0.4, 4] : 4 }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.95, 1] }}
        fill="oklch(0.2 0.03 260)"
      />
    </g>
  );
}
function Mouth({ state }: { state: AvatarState }) {
  if (state === "speaking") {
    return (
      <motion.ellipse
        cx={100}
        cy={120}
        rx={7}
        animate={{ ry: [1.5, 3.5, 2, 4, 1.5] }}
        transition={{ duration: 0.7, repeat: Infinity }}
        fill="oklch(0.3 0.04 20)"
      />
    );
  }
  return <path d={state === "thinking" ? "M92 122 Q100 120 108 122" : "M92 121 Q100 125 108 121"} stroke="oklch(0.3 0.04 20)" strokeWidth={1.5} fill="none" strokeLinecap="round" />;
}
