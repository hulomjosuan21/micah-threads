"use server";

import { createClient } from "@/lib/supabase/server";
import { NewCategoryFormValues } from "@/validators/category-schema";

export async function addCategory(data: NewCategoryFormValues) {
  const supabase = await createClient();

  const { label } = data;

  const { error } = await supabase.from("categories").insert({
    label,
  });

  if (error) {
    console.error("Error adding category:", error);
    throw new Error("Failed to add category");
  }

  return {
    title: label,
    description: `Added successfully!`,
  };
}
