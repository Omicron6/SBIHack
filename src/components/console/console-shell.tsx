import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Layers,
  Shield,
  BookOpen,
  Rocket,
  ScrollText,
  Settings,
  FileText,
  Search,
  ChevronsUpDown,
  Server,
  Radio,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { LogoMark } from "@/components/site/site-shell";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const items = [
  { title: "Dashboard", url: "/console", icon: LayoutDashboard, exact: true },
  { title: "Agent in Action", url: "/console/agent", icon: Radio },
  { title: "Employees", url: "/console/employees", icon: Users },
  { title: "Templates", url: "/console/templates", icon: FileText },
  { title: "Capabilities", url: "/console/capabilities", icon: Layers },
  { title: "Policies", url: "/console/policies", icon: Shield },
  { title: "Knowledge Base", url: "/console/knowledge", icon: BookOpen },
  { title: "Deployment", url: "/console/deployment", icon: Rocket },
  { title: "Audit", url: "/console/audit", icon: ScrollText },
  { title: "Settings", url: "/console/settings", icon: Settings },
];

export function ConsoleShell() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <ConsoleSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <ConsoleTopbar />
          <main className="flex-1 overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function ConsoleSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (url: string, exact?: boolean) =>
    exact ? pathname === url : pathname === url || pathname.startsWith(url + "/");

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarContent>
        <div className={cn("flex items-center gap-2 px-3 pb-2 pt-4", collapsed && "justify-center px-0")}>
          <LogoMark />
          {!collapsed && (
            <div>
              <div className="font-display text-sm font-semibold leading-none">Cadre</div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Workforce Console
              </div>
            </div>
          )}
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url, item.exact)}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Environment</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className={cn("mx-2 rounded-md border border-sidebar-border bg-sidebar-accent/40 p-2 text-xs", collapsed && "hidden")}>
              <div className="flex items-center justify-between">
                <span className="font-medium">SBI · Sandbox</span>
                <ChevronsUpDown className="h-3 w-3 text-muted-foreground" />
              </div>
              <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                <Server className="h-3 w-3" /> ap-south-1 · TEE
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function ConsoleTopbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const crumb = crumbFromPath(pathname);
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur">
      <SidebarTrigger />
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Workforce Console</span>
        <span className="text-border">/</span>
        <span className="font-medium text-foreground">{crumb}</span>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search employees, capabilities…"
            className="h-8 w-72 pl-8 text-sm"
          />
        </div>
        <Badge variant="outline" className="border-success/30 bg-success/10 text-success">
          ● TEE Live
        </Badge>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary-gradient text-primary-foreground">SB</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

function crumbFromPath(pathname: string) {
  if (pathname === "/console") return "Dashboard";
  const seg = pathname.replace("/console/", "").split("/")[0];
  return seg.charAt(0).toUpperCase() + seg.slice(1);
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-border/60 bg-card/40 px-6 py-6 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
