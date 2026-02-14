import { ReactNode } from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import { AppHeader } from "./app-header";

export default function AppContent({
  children,
  title,
  description,
  actions,
}: {
  children?: ReactNode;
  title?: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <SidebarInset className="flex flex-col h-screen overflow-hidden dark:border">
      <AppHeader title={title} description={description} actions={actions} />
      <main className="flex-1 overflow-y-auto px-4 md:px-6">
        <div className="mx-auto w-full max-w-7xl">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
      </main>
    </SidebarInset>
  );
}
