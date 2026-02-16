"use client";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  UpdatePasswordFormInput,
  updatePasswordSchema,
} from "@/validators/password-schema";
import { updatePasswordAction } from "@/actions/password-actions";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function UpdatePasswordForm() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const form = useForm<UpdatePasswordFormInput>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (code) {
      supabase.auth.exchangeCodeForSession(code);
    }
  }, [code]);

  const { mutate, isPending } = useMutation({
    mutationFn: updatePasswordAction,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-4">
      <Field>
        <Field>
          <FieldLabel>New Password</FieldLabel>
          <Input type="password" {...register("password")} />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel>Confirm Password</FieldLabel>
          <Input type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <FieldError>{errors.confirmPassword.message}</FieldError>
          )}
        </Field>

        <Button type="submit" className="mt-4 w-full" disabled={isPending}>
          {isPending ? "Saving..." : "Update Password"}
        </Button>
      </Field>
    </form>
  );
}
