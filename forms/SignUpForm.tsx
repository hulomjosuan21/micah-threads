"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useAuthNavigation from "@/hooks/use-navigate-auth";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import {
  signupSchema,
  type SignupFormValues,
} from "@/validators/signup-schema";
import { signUpAction } from "@/actions/signup-action";
import { toast } from "sonner";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { handleNavigatoSignIn } = useAuthNavigation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const signupMutation = useMutation({
    mutationFn: (data: SignupFormValues) => signUpAction(data),
    onSuccess: () => {
      toast.success(
        "Account created successfully! Please check your email to verify your account.",
      );
      reset();
    },
    onError: (error) => {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again.");
    },
  });
  const onSubmit = (data: SignupFormValues) => {
    signupMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input id="name" {...register("name")} />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
          <Input id="contactNumber" {...register("contactNumber")} />
          {errors.contactNumber && (
            <FieldError>{errors.contactNumber.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="address">Address</FieldLabel>
          <Input id="address" {...register("address")} />
          {errors.address && <FieldError>{errors.address.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" {...register("email")} />
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" {...register("password")} />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <FieldError>{errors.confirmPassword.message}</FieldError>
          )}
        </Field>

        <Field>
          <Button type="submit" disabled={signupMutation.isPending}>
            {signupMutation.isPending ? "Creating..." : "Create Account"}
          </Button>
        </Field>

        {signupMutation.isError && (
          <FieldError>Something went wrong. Please try again.</FieldError>
        )}

        <FieldDescription className="px-6 text-center">
          Already have an account?{" "}
          <a className="cursor-pointer" onClick={handleNavigatoSignIn}>
            Sign in
          </a>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
