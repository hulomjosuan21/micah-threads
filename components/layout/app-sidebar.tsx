"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChartArea, LayoutDashboard, Spool } from "lucide-react";
import { ComponentProps, useMemo } from "react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const navMain = useMemo(() => {
    return [
      {
        title: "Dashboard",
        url: `/dashboard`,
        icon: ChartArea,
      },
      {
        title: "Items",
        url: `/items`,
        icon: Spool,
      },
    ];
  }, []);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href={`/dashboard`}>
                <span className="text-base font-semibold">BeThere.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
