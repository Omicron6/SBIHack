import { createFileRoute } from "@tanstack/react-router";
import { ConsoleShell } from "@/components/console/console-shell";

export const Route = createFileRoute("/console")({
  head: () => ({
    meta: [
      { title: "Workforce Console — Cadre" },
      {
        name: "description",
        content: "Create, govern, and deploy Digital Banking Officers from the Cadre Workforce Console.",
      },
    ],
  }),
  component: ConsoleShell,
});
