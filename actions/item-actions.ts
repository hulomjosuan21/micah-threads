"use server";
import { createClient } from "@/lib/supabase/server";
import { ItemRow } from "@/types/item";

export async function fetchInventoryItems(): Promise<ItemRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("items").select(
    `itemId: item_id,
      itemName: item_name,
      description,
      variantLabel: variant_label,
      itemCode: item_code,
      price,
      stock,
      createdAt: created_at,
      imagesPaths: images_paths,
      categoryId: category_id,
      category: categories (
        categoryId: category_id,
        label
      )`,
  );

  if (error) {
    console.error("Error fetching items:", error);
    throw new Error("Failed to fetch items");
  }

  const result = data ?? [];

  return result as unknown as ItemRow[];
}
