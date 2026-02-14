"use server";
import { createClient } from "@/lib/supabase/server";
import { SigninFormValues } from "@/validators/signin-schema";

export async function signInAction(data: SigninFormValues) {
  const supabase = await createClient();
  const { email, password } = data;

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data: userProfile, error: profileError } = await supabase
    .from("users")
    .select("role")
    .eq("user_id", authData.user.id)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  return {
    role: userProfile.role,
  };
}
