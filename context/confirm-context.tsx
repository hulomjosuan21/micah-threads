"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { LucideIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmOptions {
  title: string;
  message: string;
  icon?: LucideIcon; // Added Icon property
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  isOpen: boolean;
}

export const ConfirmContext = createContext<ConfirmContextType | undefined>(
  undefined,
);

export const ConfirmProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [confirmState, setConfirmState] = useState<{
    options: ConfirmOptions;
    resolver: (confirmed: boolean) => void;
  } | null>(null);

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setConfirmState({ options, resolver: resolve });
    });
  }, []);

  const handleClose = (value: boolean) => {
    if (confirmState) {
      confirmState.resolver(value);
      setConfirmState(null);
    }
  };

  const Icon = confirmState?.options.icon;

  return (
    <ConfirmContext.Provider
      value={{
        confirm,
        isOpen: confirmState !== null,
      }}
    >
      {children}

      <AlertDialog
        open={confirmState !== null}
        onOpenChange={(open) => !open && handleClose(false)}
      >
        <AlertDialogContent className="flex flex-col items-center text-center">
          {/* Large Icon Container */}
          {Icon && (
            <div
              className={`mb-2 rounded-full p-4 ${
                confirmState?.options.variant === "destructive"
                  ? "bg-destructive/10 text-destructive"
                  : "bg-primary/10 text-primary"
              }`}
            >
              <Icon size={48} strokeWidth={1.5} />
            </div>
          )}

          <AlertDialogHeader className="items-center">
            <AlertDialogTitle className="text-xl">
              {confirmState?.options.title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmState?.options.message}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-4 w-full sm:justify-center">
            <AlertDialogCancel onClick={() => handleClose(false)}>
              {confirmState?.options.cancelText || "Cancel"}
            </AlertDialogCancel>
            <AlertDialogAction
              className={
                confirmState?.options.variant === "destructive"
                  ? "bg-destructive hover:bg-destructive/90 text-white"
                  : ""
              }
              onClick={() => handleClose(true)}
            >
              {confirmState?.options.confirmText || "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmContext.Provider>
  );
};
