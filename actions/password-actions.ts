"use server";

import { createClient } from "@/lib/supabase/server";
import {
  ForgotPasswordInput,
  UpdatePasswordFormInput,
} from "@/validators/password-schema";

import { redirect } from "next/navigation";

export async function sendPasswordResetEmailAction(
  data: ForgotPasswordInput,
  token: string | null,
) {
  if (!token) {
    throw new Error("Security check required: CAPTCHA token is missing");
  }

  const formData = new FormData();
  formData.append("secret", process.env.TURNSTILE_SECRET_KEY!);
  formData.append("response", token!);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: formData,
    },
  );

  const outcome = await res.json();

  if (!outcome.success) {
    throw new Error("Security verification failed: Invalid CAPTCHA token");
  }

  const { email } = data;
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/update-password`,
  });
  if (error) {
    throw new Error(error.message);
  }
  const message = encodeURIComponent("Check your email for a reset link");
  redirect(`/forgot-password?success=true&message=${message}`);
}

export async function updatePasswordAction(data: UpdatePasswordFormInput) {
  const { password } = data;
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.error("Error updating password:", error);
    throw new Error("Update password failed");
  }

  await supabase.auth.signOut();

  const message = encodeURIComponent(
    "Password updated successfully. Please sign in.",
  );

  redirect(`/auth/sign-in?success=true&message=${message}`);
}
