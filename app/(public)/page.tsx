"use client";
import useScroll from "@/hooks/use-scroll";
import HeroSection from "@/components/sections/HeroSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import { LayoutGroup, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import SplashScreen from "@/components/sections/SplashScreen";

export default function Home() {
  const { containerRef, currentIndex, handleScroll, scrollDirect } =
    useScroll();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem("seenSplash") === "true";
    setShowSplash(!seen);
  }, []);

  if (showSplash) {
    return (
      <SplashScreen
        onFinish={() => {
          sessionStorage.setItem("seenSplash", "true");
          setShowSplash(false);
        }}
        minDurationMs={1000}
      />
    );
  }

  return (
    <div className="relative h-svh w-full overflow-hidden">
      <main
        ref={containerRef}
        onScroll={handleScroll}
        className="flex md:block h-svh w-full overflow-x-auto md:overflow-y-auto snap-x md:snap-y snap-mandatory scroll-smooth no-scrollbar"
      >
        <LayoutGroup>
          <section className="h-svh w-full shrink-0 snap-start font-stylish">
            {currentIndex === 0 && (
              <HeroSection key="section-1" scrollDirect={scrollDirect} />
            )}
          </section>

          <section className="h-svh w-full shrink-0 snap-start">
            {currentIndex === 1 && <CategoriesSection key="section-2" />}
          </section>
        </LayoutGroup>
      </main>
    </div>
  );
}
