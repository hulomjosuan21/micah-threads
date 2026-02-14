import { ImageBucket } from "@/constants";
import { SupabaseClient } from "@supabase/supabase-js";

export const supabaseUploadFile = async (
  supabase: SupabaseClient,
  file: File,
  folder: string = "",
  bucket: ImageBucket = "inventory-media",
): Promise<string | null> => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const path = folder ? `${folder}/${fileName}` : fileName;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        contentType: file.type,
        upsert: false,
      });

    if (error) throw error;

    return data.path;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
};
