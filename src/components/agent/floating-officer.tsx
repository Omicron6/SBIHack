import { motion, AnimatePresence } from "framer-motion";
import { Mic, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type OfficerState = "idle" | "listening" | "thinking" | "speaking";

/**
 * Floating Digital Banking Officer — pinned inside the banking phone.
 * Inspired by Gemini Live / Copilot / Apple Intelligence assistants.
 */
export function FloatingOfficer({
  state,
  say,
}: {
  state: OfficerState;
  say?: string; // transient guidance bubble
}) {
  const isListening = state === "listening";
  const isSpeaking = state === "speaking";
  const isThinking = state === "thinking";

  return (
    <div className="pointer-events-none absolute bottom-4 right-4 z-40 flex flex-col items-end gap-2">
      {/* Transient guidance bubble */}
      <AnimatePresence>
        {say && (
          <motion.div
            key={say}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="max-w-[220px] rounded-2xl rounded-br-sm bg-white/95 px-3 py-2 text-[11px] leading-snug text-slate-800 shadow-lg ring-1 ring-slate-200 backdrop-blur"
          >
            <div className="mb-0.5 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#1B4F9C]">
              <Sparkles className="h-2.5 w-2.5" /> Officer
            </div>
            {say}
          </motion.div>
        )}
      </AnimatePresence>

      {/* The orb itself */}
      <div className="relative flex h-14 w-14 items-center justify-center">
        {/* Soft glow while listening */}
        {isListening && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#1B4F9C]/25 blur-xl" />
            <span className="absolute -inset-2 rounded-full border border-[#1B4F9C]/40 animate-pulse-ring" />
            <span className="absolute -inset-4 rounded-full border border-[#1B4F9C]/25 animate-pulse-ring [animation-delay:400ms]" />
          </>
        )}
        {/* Thinking ring */}
        {isThinking && (
          <span className="absolute -inset-1 rounded-full border-2 border-transparent border-t-[#1B4F9C] border-r-[#1B4F9C]/60 animate-spin" />
        )}

        {/* Breathing orb */}
        <motion.div
          animate={
            isSpeaking
              ? { scale: [1, 1.08, 0.98, 1.05, 1] }
              : isListening
                ? { scale: [1, 1.06, 1] }
                : { scale: [1, 1.03, 1] }
          }
          transition={{
            duration: isSpeaking ? 0.9 : isListening ? 1.6 : 3.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={cn(
            "relative flex h-12 w-12 items-center justify-center rounded-full shadow-lg ring-1 ring-white/40",
            "bg-[radial-gradient(circle_at_30%_25%,#7dbfff_0%,#2c74d6_45%,#0f2f5e_100%)]",
          )}
        >
          {/* Blink eye highlight */}
          <Blink />

          {/* Waveform while speaking */}
          {isSpeaking ? (
            <Waveform />
          ) : (
            <Mic className="h-4 w-4 text-white/90" />
          )}
        </motion.div>
      </div>
    </div>
  );
}

function Blink() {
  return (
    <motion.span
      className="absolute left-2 top-2 h-2 w-2 rounded-full bg-white/70"
      animate={{ scaleY: [1, 1, 0.05, 1, 1] }}
      transition={{
        duration: 4,
        times: [0, 0.45, 0.5, 0.55, 1],
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

function Waveform() {
  const bars = [0, 1, 2, 3, 4];
  return (
    <div className="flex items-end gap-[2px]">
      {bars.map((i) => (
        <motion.span
          key={i}
          className="w-[2px] rounded-full bg-white"
          animate={{ height: ["30%", "100%", "50%", "80%", "30%"] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.08,
          }}
          style={{ height: "40%", display: "inline-block", minHeight: 4, maxHeight: 14 }}
        />
      ))}
    </div>
  );
}
