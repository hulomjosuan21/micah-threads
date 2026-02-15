"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldSet,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import queryClient from "@/lib/queryClient";
import useUser from "@/hooks/useUser";
import {
  AccountSettingsFormValues,
  accountSettingsSchema,
} from "@/validators/account-settings-schema";
import { updateAccountSettings } from "@/actions/user-actions";

interface Props {
  trigger?: React.ReactNode;
}

export default function AccountSettingsDialog({ trigger }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AccountSettingsFormValues>({
    resolver: zodResolver(accountSettingsSchema),
  });

  useEffect(() => {
    if (isOpen && user) {
      reset({
        fullName: user.fullName,
        contactNumber: user.contactNumber,
        address: user.address,
        email: user.email,
        password: "",
        confirmPassword: "",
      });
    }
  }, [isOpen, user, reset]);

  const mutation = useMutation({
    mutationFn: updateAccountSettings,
    onSuccess: async ({ title, description }) => {
      toast.success(title, { description });

      await queryClient.invalidateQueries({
        queryKey: ["current-user"],
      });

      setIsOpen(false);
    },
    onError: () => {
      toast.error("Failed to update account");
    },
  });

  const onSubmit = (data: AccountSettingsFormValues) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button variant="outline">Account Settings</Button>}
      </DialogTrigger>

      <DialogContent className="p-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle>Account Settings</DialogTitle>
          </DialogHeader>

          <div className="px-6 py-6 space-y-6 max-h-[70vh] overflow-y-auto">
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input {...register("fullName")} />
                  <FieldError>{errors.fullName?.message}</FieldError>
                </Field>

                <Field>
                  <FieldLabel>Contact Number</FieldLabel>
                  <Input {...register("contactNumber")} />
                </Field>

                <Field>
                  <FieldLabel>Address</FieldLabel>
                  <Input {...register("address")} />
                </Field>

                <Field>
                  <FieldLabel>New Password</FieldLabel>
                  <Input type="password" {...register("password")} />
                  <FieldError>{errors.password?.message}</FieldError>
                </Field>

                <Field>
                  <FieldLabel>Confirm Password</FieldLabel>
                  <Input type="password" {...register("confirmPassword")} />
                  <FieldError>{errors.confirmPassword?.message}</FieldError>
                </Field>
              </FieldGroup>
            </FieldSet>
          </div>

          <DialogFooter className="px-6 py-4 border-t">
            <DialogClose asChild>
              <Button
                variant="outline"
                type="button"
                disabled={mutation.isPending}
              >
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending && <Spinner />}
              {mutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
