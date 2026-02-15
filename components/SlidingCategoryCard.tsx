"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { CategoryWithItemImagePaths } from "@/types/category";
import { getItemImageUrl } from "@/lib/supabase/utils/image-url";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: CategoryWithItemImagePaths;
}

export function SlidingCategoryCard({ category }: CategoryCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = category.itemImagePaths ?? [];

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <Card className="relative aspect-square w-full overflow-hidden rounded-xl border shadow-sm group">
      {/* Background Image */}
      {images.length > 0 && (
        <Image
          key={images[currentIndex]}
          src={getItemImageUrl(images[currentIndex])}
          alt={category.label}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={false}
        />
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute inset-0 flex items-end p-4">
        <div className="flex w-full items-end gap-3">
          <span
            className="
        text-white
        text-base
        sm:text-lg
        font-semibold
        tracking-wide
        leading-tight
        line-clamp-2
        flex-1
      "
          >
            {category.label}
          </span>

          <Button
            size="icon"
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-0 shrink-0"
          >
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
