import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AppHeader({
  title = "Title",
  description,
  actions,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div
          className={cn(
            "flex flex-col ml-1.5 gap-0.5 justify-start",
            description && "mt-2",
          )}
        >
          <h1 className="text-sm lg:text-base font-semibold leading-none tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-[11px] lg:text-xs text-muted-foreground leading-none">
              {description}
            </p>
          )}
        </div>
        <div className="ml-auto flex items-center gap-2">{actions}</div>
      </div>
    </header>
  );
}
