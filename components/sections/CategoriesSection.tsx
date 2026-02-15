"use client";
import { motion } from "framer-motion";
import { ScrollArea } from "../ui/scroll-area";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Footer } from "../shared/footer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CircleUserRound, LogOut, MoreVertical, Settings } from "lucide-react";
import AccountSettingsDialog from "@/forms/AccountSettingsDialogForm";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import useUser from "@/hooks/useUser";

export default function CategoriesSection({ user }: { user: User | null }) {
  const router = useRouter();
  const mockItemsCount = 12;
  const { isLoading } = useUser();

  const fromTopRight = {
    hidden: { opacity: 0, x: 80, y: -40 },
    show: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <div className="h-svh flex flex-col">
      <div className="p-4 shrink-0">
        <div className="max-w-200 w-full mx-auto flex items-center justify-between">
          <div>
            <motion.h1
              layout
              layoutId="shared-title"
              className="text-lg font-black tracking-tight"
              initial={false}
              transition={{ type: "spring", stiffness: 240, damping: 28 }}
            >
              Categories
            </motion.h1>

            <motion.p
              className="text-xs text-muted-foreground mt-1"
              initial="hidden"
              animate="show"
              variants={fromTopRight}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Browse items by category
            </motion.p>
          </div>
          <div className="">
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={isLoading || !user}
                  >
                    <span className="sr-only">Open menu</span>
                    <Settings size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <AccountSettingsDialog
                    trigger={
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <CircleUserRound className="mr-2 size-4" />
                        Account
                      </DropdownMenuItem>
                    }
                  />
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive cursor-pointer"
                    onSelect={() => router.push("/auth/sign-out")}
                  >
                    <LogOut className="mr-2 size-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden pl-6 pr-2 pb-6 max-w-200 justify-center w-full mx-auto">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <Card
                    key={`skeleton-${index}`}
                    className="h-20 p-0 overflow-hidden rounded-md shadow-none border-0"
                  >
                    <Skeleton className="h-full w-full rounded-md" />
                  </Card>
                ))
              : Array.from({ length: mockItemsCount }).map((_, index) => (
                  <Card
                    key={index}
                    className="h-20 flex items-center px-4 text-base font-medium rounded-md shadow-none"
                  >
                    Category {index + 1}
                  </Card>
                ))}
          </div>
        </ScrollArea>
      </div>

      <Footer />
    </div>
  );
}
