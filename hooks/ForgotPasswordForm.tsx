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
import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { CheckCircle2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ForgotPasswordInput,
  forgotPasswordSchema,
} from "@/validators/password-schema";
import { sendPasswordResetEmailAction } from "@/actions/password-actions";

export default function ForgotPasswordForm({
  message,
  isSuccess,
}: {
  message?: string;
  isSuccess?: boolean;
}) {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ForgotPasswordInput) =>
      sendPasswordResetEmailAction(data, captchaToken),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-4">
      {isSuccess && (
        <Alert>
          <CheckCircle2Icon />
          <AlertTitle>Success! Your changes have been saved</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      <Field>
        <FieldLabel>Email Address</FieldLabel>
        <Input
          type="email"
          placeholder="name@example.com"
          {...register("email")}
        />
        {errors.email && <FieldError>{errors.email.message}</FieldError>}
        <FieldDescription>
          We&apos;ll send a secure link to this email.
        </FieldDescription>
      </Field>

      <div className="flex justify-center">
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={(token) => setCaptchaToken(token)}
          onExpire={() => setCaptchaToken(null)}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Sending..." : "Send Reset Link"}
      </Button>
    </form>
  );
}
