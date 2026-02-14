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
import { ArrowLeftRight, ChartArea, Spool } from "lucide-react";
import { ComponentProps, useMemo } from "react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/micah-logo.png";

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
      {
        title: "Orders",
        url: `/orders`,
        icon: ArrowLeftRight,
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
                <div className="w-8 h-8">
                  <Image src={logo} alt="Micah Threads" />
                </div>
                <span className="text-base font-semibold">Micah Threads</span>
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
