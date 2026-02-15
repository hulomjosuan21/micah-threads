"use server";
import { createClient } from "@/lib/supabase/server";
import {
  Category,
  CategoryWithItemCountRow,
  CategoryWithItemImagePaths,
} from "@/types/category";
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

export async function updateCategory(
  categoryId: string,
  data: { label: string },
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("categories")
    .update({ label: data.label })
    .eq("category_id", categoryId);

  if (error) {
    console.error("Error updating category:", error);
    throw new Error("Failed to update category");
  }
}

export async function deleteCategory(categoryId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("category_id", categoryId);

  if (error) {
    console.error("Error deleting category:", error);
    throw new Error("Failed to delete category");
  }
}

export async function fetchAvailableCategorieWithItem(): Promise<
  CategoryWithItemImagePaths[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select(
      `
      category_id,
      label,
      items (
        images_paths,
        stock
      )
    `,
    )
    .gt("items.stock", 0);

  if (error) {
    console.error("Error fetching categories with available items:", error);
    throw new Error(error.message);
  }

  if (!data) return [];

  const formatted: CategoryWithItemImagePaths[] = data.map((category) => {
    const allImagePaths =
      category.items?.flatMap((item) => item.images_paths ?? []) ?? [];

    return {
      categoryId: category.category_id,
      label: category.label,
      itemImagePaths: allImagePaths,
    };
  });

  return formatted;
}
