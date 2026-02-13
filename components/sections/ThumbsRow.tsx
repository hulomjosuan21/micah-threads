import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import Image, { StaticImageData } from "next/image";
import item1Image from "@/assets/images/item1.png";
import item2Image from "@/assets/images/item2.png";
import item3Image from "@/assets/images/item3.png";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  className?: string;
};

const images: StaticImageData[] = [item1Image, item2Image, item3Image];

export function ThumbsRow({ className = "" }: Props) {
  const [active, setActive] = useState<StaticImageData | null>(null);
  const [highlightIndex, setHighlightIndex] = useState(0);

  const sizes = ["w-8 h-8", "w-10 h-10", "w-12 h-12"];

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % images.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={`flex items-center gap-3 ${className} `}>
      {images.map((img, idx) => {
        const isActive = highlightIndex === idx;

        return (
          <Dialog key={idx}>
            <DialogTrigger asChild>
              <motion.div
                onClick={() => setActive(img)}
                animate={{
                  scale: isActive ? 1.35 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
                whileHover={{
                  scale: 1.4,
                }}
                className="cursor-pointer rounded-md"
              >
                <Image
                  src={img}
                  alt={`Thumb ${idx + 1}`}
                  className={`
                    ${sizes[idx]}
                    rounded-md
                    object-cover
                    border border-gray-200
                  `}
                />
              </motion.div>
            </DialogTrigger>

            <DialogContent className="">
              <DialogTitle className="sr-only">Image preview</DialogTitle>
              {active && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="relative w-full max-w-md mx-auto mt-4"
                >
                  <Image
                    src={active}
                    alt="Preview"
                    className="w-full h-auto rounded-xl shadow-2xl object-cover"
                    priority
                  />
                </motion.div>
              )}
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
}
