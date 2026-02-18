"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User } from "@supabase/supabase-js";
import { ShoppingBag, Heart, LogIn, ListCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuthNavigation from "@/hooks/use-navigate-auth";
import { ThumbsRow } from "./ThumbsRow";
import { MaskedShapeImageDesktop, MaskedShapeImageMobile } from "./MaskImage";

export default function HeroSection({
  scrollDirect,
  user,
}: {
  scrollDirect: (direction: "up" | "down") => void;
  user: User | null;
}) {
  const [mounted, setMounted] = useState(false);
  const { handleNavigateSignUp, handleNavigatoSignIn } = useAuthNavigation();

  useEffect(() => setMounted(true), []);

  const containerVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08, delayChildren: 0.08 },
    },
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
    <section className="relative min-h-svh w-full flex items-center overflow-x-hidden bg-white py-4 lg:py-0">
      <div className="relative mx-auto w-full max-w-250 px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
          <motion.div
            className="order-1 lg:order-2 flex justify-center shrink-0"
            variants={fromRight}
            initial={mounted ? "hidden" : false}
            animate={mounted ? "show" : undefined}
          >
            <div className="hidden lg:block w-full">
              <MaskedShapeImageDesktop />
            </div>
            <div className="lg:hidden w-full flex justify-center">
              <div className="w-full">
                <MaskedShapeImageMobile />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="order-2 lg:order-1 flex flex-col gap-3 lg:gap-8 text-center lg:text-left z-10"
            variants={containerVariants}
            initial={mounted ? "hidden" : false}
            animate={mounted ? "show" : undefined}
          >
            <div className="hidden lg:block">
              <ThumbsRow />
            </div>

            <motion.div variants={fromTop}>
              <motion.h1
                layout
                layoutId="shared-title"
                className="font-black leading-[0.95] lg:leading-[0.92] tracking-tight text-[clamp(1.5rem,7vw,4rem)]"
              >
                Where Purpose
                <br className="hidden lg:block" />
                <span className="text-primary lg:block"> Meets Style.</span>
              </motion.h1>
            </motion.div>

            <motion.p
              className="text-[11px] lg:text-[17px] leading-relaxed text-gray-600 max-w-md lg:max-w-lg mx-auto lg:mx-0"
              variants={fromBottom}
            >
              Thoughtfully crafted apparel designed for comfort, confidence, and
              conscious living.
            </motion.p>

            <div className="flex gap-3 pt-1 justify-center lg:justify-start">
              {user != null ? (
                <>
                  <Button
                    className="flex-1 lg:flex-none rounded-full px-8 py-5 text-xs lg:text-sm font-medium"
                    onClick={() => scrollDirect("down")}
                  >
                    <ShoppingBag size={14} className="mr-2" /> Shop Now
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex-1 lg:flex-none rounded-full px-8 py-5 text-xs lg:text-sm font-medium"
                  >
                    <Heart size={14} className="mr-2" /> Explore
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="flex-1 lg:flex-none rounded-full px-8 py-5 text-xs lg:text-sm font-medium"
                    onClick={handleNavigatoSignIn}
                  >
                    <LogIn size={14} className="mr-2" /> Sign in
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex-1 lg:flex-none rounded-full px-8 py-5 text-xs lg:text-sm font-medium"
                    onClick={handleNavigateSignUp}
                  >
                    <ListCheck size={14} className="mr-2" /> Sign up
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
