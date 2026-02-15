"use server";

import { createClient } from "@/lib/supabase/server";
import { User } from "@/types/user";

export async function fetchCurrentUser(): Promise<User | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("users")
    .select(
      `
        userId:user_id,
        fullName:full_name,
        email,
        address,
        contactNumber:contact_number,
        role
      `,
    )
    .eq("user_id", user.id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateAccountSettings(data: {
  fullName: string;
  contactNumber: string;
  address: string;
  email: string;
  password?: string;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { error: profileError } = await supabase
    .from("users")
    .update({
      full_name: data.fullName,
      contact_number: data.contactNumber,
      address: data.address,
    })
    .eq("user_id", user.id);

  if (profileError) {
    console.error("Error updating profile:", profileError);
    throw new Error("Failed to update profile");
  }

  if (data.email !== user.email) {
    const { error: emailError } = await supabase.auth.updateUser({
      email: data.email,
    });

    if (emailError) throw emailError;
  }

  if (data.password) {
    const { error: passwordError } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (passwordError) throw passwordError;
  }

  return {
    title: "Account Updated",
    description: "Your account settings have been updated successfully.",
  };
}
