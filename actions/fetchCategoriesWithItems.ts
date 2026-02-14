"use server";

import { createClient } from "@/lib/supabase/server";
import { Category } from "@/types/category";

export async function fetchCategoriesWithItems() {}

export async function fetchCategoriesOptions(): Promise<Category[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("categoryId:category_id, label");

  if (error) {
    throw error;
  }

  return (data ?? []) as Category[];
}
