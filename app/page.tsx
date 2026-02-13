"use client";
import useScroll from "@/hooks/use-scroll";
import HeroSection from "@/components/sections/HeroSection";
import SectionTwo from "@/components/sections/SectionTwo";
import { LayoutGroup, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import SplashScreen from "@/components/sections/SplashScreen";

export default function Home() {
  const { containerRef, isLastPage, currentIndex, handleScroll, scrollDirect } =
    useScroll();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Optionally skip splash on subsequent navigations within session
    const seen = sessionStorage.getItem("seenSplash") === "true";
    if (seen) {
      setShowSplash(false);
    } else {
      // SplashScreen will call setShowSplash(false) via onFinish
      // and mark sessionStorage flag
      setShowSplash(true);
    }
  }, []);

  return (
    <div className="relative h-svh w-full overflow-hidden">
      {/* Splash overlay */}
      <SplashScreen
        onFinish={() => {
          sessionStorage.setItem("seenSplash", "true");
          setShowSplash(false);
        }}
        // Provide animationData when available (Lottie JSON)
        // animationData={require("@/assets/test/splash.json")}
        minDurationMs={1000}
        backgroundClass="bg-white"
      />

      <main
        ref={containerRef}
        onScroll={handleScroll}
        className="flex md:block h-svh w-full overflow-x-auto md:overflow-y-auto snap-x md:snap-y snap-mandatory scroll-smooth no-scrollbar"
      >
        <LayoutGroup>
          <section className="h-svh w-full shrink-0 snap-start">
            <AnimatePresence mode="wait" initial={false}>
              {currentIndex === 0 && (
                <HeroSection key="section-1" scrollDirect={scrollDirect} />
              )}
            </AnimatePresence>
          </section>

          <section className="h-svh w-full shrink-0 snap-start">
            <AnimatePresence mode="wait" initial={false}>
              {currentIndex === 1 && <SectionTwo key="section-2" />}
            </AnimatePresence>
          </section>
        </LayoutGroup>
      </main>
    </div>
  );
}
