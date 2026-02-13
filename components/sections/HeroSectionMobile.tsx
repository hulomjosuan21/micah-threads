"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import shape2 from "@/assets/shapes/rect2.svg";
import imageFeature from "@/assets/images/feature-img.jpg";
import logo from "@/assets/micah-logo.png";
import { ThumbsRow } from "./ThumbsRow";
import { Heart, ShoppingCart } from "lucide-react";
import useScroll from "@/hooks/use-scroll";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function MaskedShapeImageMobile({ className }: { className?: string }) {
  return (
    <motion.div
      layoutId="shared-image"
      className={`relative w-full pointer-events-none ${className ?? ""}`}
    >
      <Image
        src={shape2}
        alt="shape reference"
        className="w-full h-auto opacity-0 pointer-events-none"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: `url(${shape2.src})`,
          WebkitMaskImage: `url(${shape2.src})`,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
        }}
      >
        <Image
          src={imageFeature}
          alt="Feature image"
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute right-[1%] -top-[8%] z-20 pointer-events-none">
        <div className="w-16 h-16">
          <Image src={logo} alt="Micah Threads" className="rounded-full" />
        </div>
      </div>

      <div className="absolute bottom-2 right-10 z-20 pointer-events-none">
        <span className="font-black text-3xl drop-shadow-md text-white tracking-tight">
          New
        </span>
      </div>

      <div className="absolute bottom-[-4%] left-2 z-30 pointer-events-auto">
        <ThumbsRow />
      </div>
    </motion.div>
  );
}

export function MobileHero({
  scrollDirect,
}: {
  scrollDirect: (direction: "up" | "down") => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const handleShowNow = () => {
    scrollDirect("down");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08, delayChildren: 0.08 },
    },
  };

  const fromLeft = {
    hidden: { opacity: 0, x: -24 },
    show: { opacity: 1, x: 0 },
  };

  const fromRight = {
    hidden: { opacity: 0, x: 24 },
    show: { opacity: 1, x: 0 },
  };

  const fromTop = {
    hidden: { opacity: 0, y: -24 },
    show: { opacity: 1, y: 0 },
  };

  const fromBottom = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="">
      {/* Changed to Grid Layout */}
      <div className="grid grid-cols-1 w-full">
        <motion.div
          className="relative w-full px-10 pt-12"
          variants={fromLeft}
          initial={mounted ? "hidden" : false}
          animate={mounted ? "show" : undefined}
          key={mounted ? "hero-img-mounted" : "hero-img-ssr"}
        >
          <MaskedShapeImageMobile />
        </motion.div>

        <motion.div
          className="relative z-50 px-6 mt-8"
          variants={containerVariants}
          initial={mounted ? "hidden" : false}
          animate={mounted ? "show" : undefined}
          key={mounted ? "hero-mobile-mounted" : "hero-mobile-ssr"}
        >
          <motion.div variants={fromTop}>
            <motion.h1
              layout
              layoutId="shared-title"
              initial={false}
              transition={{ type: "spring", stiffness: 240, damping: 28 }}
              className="text-2xl text-center font-black leading-none text-black tracking-tight"
            >
              Where Purpose
              <span className="text-primary"> Meets Style.</span>
            </motion.h1>
          </motion.div>

          <motion.p
            className="mt-4 text-slate-600 leading-relaxed text-center text-sm"
            variants={fromBottom}
          >
            Thoughtfully crafted apparel designed for comfort, confidence, and
            conscious living.
          </motion.p>

          <motion.div className="mt-8 flex gap-3 w-full" variants={fromRight}>
            <Button
              className="flex-1 rounded-full py-6 text-base cursor-pointer"
              onClick={() => {
                console.log("Shop Now clicked");
                scrollDirect("down");
              }}
            >
              <ShoppingCart size={16} />
              Shop Now
            </Button>
            <Button
              variant="secondary"
              className="flex-1 rounded-full py-6 text-base cursor-pointer"
            >
              <Heart size={16} />
              Explore Story
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
