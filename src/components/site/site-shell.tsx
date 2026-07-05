import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Landing" },
  { to: "/platform", label: "Platform" },
  { to: "/employees", label: "Digital Employees" },
  { to: "/capabilities", label: "Capabilities" },
  { to: "/policies", label: "Policies" },
  { to: "/agent", label: "Agent in Action" },
  { to: "/architecture", label: "Architecture" },
  { to: "/about", label: "About" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <LogoMark />
          <span className="font-display text-lg font-semibold tracking-tight">Cadre</span>
          <span className="ml-1 hidden text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:inline">
            Digital Workforce
          </span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l.label}
                {active && (
                  <motion.div
                    layoutId="nav-underline"
                    className="mx-3 mt-1 h-px bg-primary"
                  />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <Link to="/console/agent">Watch Prototype</Link>
          </Button>
          <Button asChild size="sm" className="bg-primary-gradient text-primary-foreground shadow-elegant">
            <Link to="/console">Launch Console</Link>
          </Button>
        </div>
        <button
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background/95 px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <Button asChild size="sm" className="flex-1 bg-primary-gradient text-primary-foreground">
                <Link to="/console" onClick={() => setOpen(false)}>Launch Console</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex h-9 w-9 items-center justify-center", className)}>
      <img src="/sbi-hack-logo.png" alt="SBI Hack" className="h-9 w-9 object-contain" />
    </span>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4">
        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <LogoMark />
            <span className="font-display text-lg font-semibold">Cadre</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            The Digital Workforce Platform for banking. Create, govern, and deploy AI Digital
            Banking Officers with enterprise-grade security and compliance.
          </p>
          <p className="mt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Cadre. Reference implementation for enterprise banking.
          </p>
        </div>
        <FooterCol
          title="Platform"
          items={[
            { label: "Workforce Console", to: "/console" },
            { label: "Digital Employees", to: "/employees" },
            { label: "Capabilities", to: "/capabilities" },
            { label: "Policies", to: "/policies" },
          ]}
        />
        <FooterCol
          title="Company"
          items={[
            { label: "Agent in Action", to: "/agent" },
            { label: "Architecture", to: "/architecture" },
            { label: "About", to: "/about" },
          ]}
        />
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; to: string }[] }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </div>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((i) => (
          <li key={i.to}>
            <Link to={i.to} className="text-foreground/80 hover:text-foreground">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
