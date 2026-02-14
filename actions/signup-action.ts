"use server";
import { createClient } from "@/lib/supabase/server";
import { SignupFormValues } from "@/validators/signup-schema";

export async function signUpAction(data: SignupFormValues) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error || !user) {
    console.error("Signup error:", error);
    throw new Error("Signup failed: " + error?.message);
  }

  const { error: insertError } = await supabase.from("users").insert({
    user_id: user.id,
    full_name: data.name,
    email: data.email,
    address: data.address,
    contact_number: data.contactNumber,
  });

  if (insertError) {
    console.error("User table insert error:", insertError);
    throw new Error("Failed to save user profile");
  }
}
