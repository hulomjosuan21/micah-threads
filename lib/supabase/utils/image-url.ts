import { ImageBucket } from "@/constants";

export function getStorageUrl(
  path: string | null | undefined,
  bucket: ImageBucket = "inventory-media",
  fallback: string = "/placeholder-user.png",
): string {
  if (!path) return fallback;

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const rawBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const baseUrl = rawBaseUrl.replace(/\/$/, "");

  const cleanPath = path.startsWith("/") ? path.substring(1) : path;

  return `${baseUrl}/storage/v1/object/public/${bucket}/${cleanPath}`;
}

export const getItemImageUrl = (path?: string | null) =>
  getStorageUrl(path, "inventory-media", "/placeholder-image.png");
