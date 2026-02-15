"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  signinSchema,
  type SigninFormValues,
} from "@/validators/signin-schema";
import { signInAction } from "@/actions/signin-action";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();
  const { handleNavigateSignUp, handleNavigateForgotPassword } =
    useAuthNavigation();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      toast.success("Email confirmed! You can now login.");
      router.replace("/auth/sign-in");
    }
  }, [searchParams, router]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
  });

  const loginMutation = useMutation({
    mutationFn: (data: SigninFormValues) => signInAction(data),
    onSuccess: (data) => {
      if (data.role === "Admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
      toast.success("Logged in successfully!");
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: SigninFormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <FieldError>{errors.email.message}</FieldError>
                )}
              </Field>

              {/* Password */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
                    onClick={handleNavigateForgotPassword}
                  >
                    Forgot your password?
                  </a>
                </div>

                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <FieldError>{errors.password.message}</FieldError>
                )}
              </Field>

              {/* Submit */}
              <Field>
                <Button type="submit" disabled={loginMutation.isPending}>
                  {loginMutation.isPending ? "Logging in..." : "Login"}
                </Button>

                {loginMutation.isError && (
                  <FieldError className="mt-2">
                    Invalid email or password.
                  </FieldError>
                )}

                <FieldDescription className="text-center mt-3">
                  Don&apos;t have an account?{" "}
                  <a className="cursor-pointer" onClick={handleNavigateSignUp}>
                    Sign up
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
