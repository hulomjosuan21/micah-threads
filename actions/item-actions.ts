"use server";
import { ItemRow } from "@/types/item";
import { createClient } from "@/lib/supabase/server";
import { formatPostgresDateTime } from "@/lib/utils";
import { ToastResponse } from "@/types";
import { Item } from "@/types/item";

export default async function addItem(
  data: Omit<Item, "productId" | "createdAt">,
): Promise<ToastResponse> {
  const supabase = await createClient();

  const { data: newItem, error } = await supabase
    .from("items")
    .insert({
      item_name: data.itemName,
      description: data.description ?? null,
      variant_label: data.variantLabel ?? null,
      item_code: data.itemCode,
      price: data.price,
      stock: data.stock,
      category_id: data.categoryId,
      images_paths: data.imagesPaths,
    })
    .select("created_at")
    .single();

  if (error) {
    console.error("Error adding item:", error);
    throw new Error("Failed to add item");
  }

  return {
    title: data.itemName,
    description: `${formatPostgresDateTime(newItem?.created_at ?? new Date().toISOString())} - Item ${data.itemCode} added successfully!`,
  };
}

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
