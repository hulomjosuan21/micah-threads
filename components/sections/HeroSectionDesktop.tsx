import Image from "next/image";
import { Button } from "@/components/ui/button";
import shape1 from "@/assets/shapes/rect1.svg";
import imageFeature from "@/assets/images/feature-img.jpg";
import logo from "@/assets/micah-logo.png";
import { ThumbsRow } from "./ThumbsRow";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart, ListCheck, LogIn, ShoppingBag } from "lucide-react";
import { User } from "@supabase/supabase-js";
import useAuthNavigation from "@/hooks/use-navigate-auth";

function MaskedShapeImageDesktop({ className }: { className?: string }) {
  return (
    <motion.div
      layoutId="shared-image"
      className={`relative mx-auto ${className ?? ""}`}
      style={{
        height: "min(72vh, 640px)",
        aspectRatio: "1 / 1",
      }}
    >
      <Image
        src={shape1}
        alt="shape reference"
        className="w-full h-full opacity-0 pointer-events-none select-none"
        draggable={false}
      />

      <div
        className="absolute inset-0"
        style={{
          maskImage: `url(${shape1.src})`,
          WebkitMaskImage: `url(${shape1.src})`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        <Image
          src={imageFeature}
          alt="Feature image"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="absolute right-[14%] -top-[10%] z-20">
        <div className="w-12 h-12 lg:w-18 lg:h-18">
          <Image src={logo} alt="Micah Threads" />
        </div>
      </div>

      <div className="absolute bottom-[0.2%] left-[18%] z-20">
        <span className="font-black text-2xl lg:text-4xl tracking-tight">
          New
        </span>
      </div>
    </motion.div>
  );
}

export function DesktopHero({
  scrollDirect,
  user,
}: {
  scrollDirect: (direction: "up" | "down") => void;
  user: User | null;
}) {
  const { handleNavigateSignUp, handleNavigatoSignIn } = useAuthNavigation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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
    <section className="h-screen flex items-center">
      <div className="relative mx-auto w-full max-w-250 px-8">
        <div className="max-w-140 pr-30">
          <motion.div
            className="flex flex-col gap-8"
            variants={containerVariants}
            initial={mounted ? "hidden" : false}
            animate={mounted ? "show" : undefined}
            key={mounted ? "hero-mounted" : "hero-ssr"}
          >
            <motion.div variants={fromLeft}>
              <ThumbsRow />
            </motion.div>

            <motion.div variants={fromTop}>
              <motion.h1
                layout
                layoutId="shared-title"
                initial={false}
                transition={{ type: "spring", stiffness: 240, damping: 28 }}
                className="
                font-black leading-[0.92] tracking-[-0.02em]
                text-[clamp(2rem,4vw,4rem)]
              "
              >
                Where Purpose
                <br />
                <span className="text-primary">Meets Style.</span>
              </motion.h1>
            </motion.div>

            <motion.p
              className="text-[17px] leading-relaxed text-gray-600"
              variants={fromBottom}
            >
              Thoughtfully crafted apparel designed for comfort, confidence, and
              conscious living. Micah Threads blends timeless aesthetics with
              modern craftsmanship.
            </motion.p>

            <motion.div className="flex gap-4 pt-2" variants={fromRight}>
              {user != null ? (
                <>
                  <Button className="rounded-full px-9 py-6 text-sm font-medium transition">
                    <ShoppingBag size={16} />
                    Shop Now
                  </Button>

                  <Button
                    variant="secondary"
                    className="rounded-full px-9 py-6 text-sm font-medium"
                  >
                    <Heart size={16} />
                    Explore Our Story
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="rounded-full px-9 py-6 text-sm font-medium transition"
                    onClick={handleNavigatoSignIn}
                  >
                    <LogIn size={16} />
                    Sign in
                  </Button>

                  <Button
                    variant="secondary"
                    className="rounded-full px-9 py-6 text-sm font-medium"
                    onClick={handleNavigateSignUp}
                  >
                    <ListCheck size={16} />
                    Sign up
                  </Button>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="
          absolute top-1/2 right-0 -translate-y-1/2
          w-105 xl:w-120
        "
          variants={fromRight}
          initial={mounted ? "hidden" : false}
          animate={mounted ? "show" : undefined}
        >
          <MaskedShapeImageDesktop />
        </motion.div>
      </div>
    </section>
  );
}
