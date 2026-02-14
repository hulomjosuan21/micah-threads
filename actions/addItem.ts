"use server";

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
      images_patchs: data.imagesPatchs,
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
