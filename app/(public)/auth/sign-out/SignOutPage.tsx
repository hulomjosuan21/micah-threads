"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function SignOutScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/");
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-svh grid place-items-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <LogOut
            className="h-12 w-12 animate-pulse text-primary"
            strokeWidth={1.5}
          />
        </div>

        <p className="text-lg font-medium animate-fade-in">
          Signing you out...
        </p>

        <span className="text-sm text-muted-foreground">
          Please wait while we securely log you out.
        </span>
      </div>
    </div>
  );
}
