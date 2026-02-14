"use server";
import { createClient } from "@/lib/supabase/server";
import { CategoryWithItemCountRow } from "@/types/category";

export async function fetchCategoriesWithItemCount(): Promise<
  CategoryWithItemCountRow[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("categories").select(`
      categoryId: category_id,
      label,
      items(count)
    `);

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch categories");
  }

  return data.map((category) => ({
    categoryId: category.categoryId,
    label: category.label,
    itemCount: category.items?.[0]?.count ?? 0,
  }));
}
