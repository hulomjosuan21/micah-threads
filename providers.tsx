"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import queryClient from "./lib/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfirmProvider } from "./context/confirm-context";
import { Toaster } from "./components/ui/sonner";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfirmProvider>
        {children}
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </ConfirmProvider>
    </QueryClientProvider>
  );
}
