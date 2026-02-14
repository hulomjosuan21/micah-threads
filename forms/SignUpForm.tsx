"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useAuthNavigation from "@/hooks/use-navigate-auth";
import { ScrollArea } from "@/components/ui/scroll-area";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { handleNavigatoSignIn } = useAuthNavigation();
  return (
    <form className={cn("flex flex-col gap-4", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input id="name" type="text" placeholder="John Doe" />
        </Field>
        <Field>
          <FieldLabel htmlFor="contact-number">Contact Number</FieldLabel>
          <Input id="contact-number" type="tel" placeholder="09680000000" />
        </Field>
        <Field>
          <FieldLabel htmlFor="address">Address</FieldLabel>
          <Input
            id="address"
            type="text"
            placeholder="Purok 1, Barangay 2, City"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" />
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" required />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input id="confirm-password" type="password" required />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>
        <Field>
          <Button type="submit">Create Account</Button>
        </Field>
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
