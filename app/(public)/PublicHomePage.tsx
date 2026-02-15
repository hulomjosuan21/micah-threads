"use client";
import useScroll from "@/hooks/use-scroll";
import HeroSection from "@/components/sections/HeroSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import { LayoutGroup } from "framer-motion";
import { User } from "@supabase/supabase-js";

export default function PublicHomePage({ user }: { user: User | null }) {
  const { containerRef, currentIndex, handleScroll, scrollDirect } =
    useScroll();

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
              <HeroSection
                key="section-1"
                scrollDirect={scrollDirect}
                user={user}
              />
            )}
          </section>

          <section className="h-svh w-full shrink-0 snap-start">
            {currentIndex === 1 && (
              <CategoriesSection key="section-2" user={user} />
            )}
          </section>
        </LayoutGroup>
      </main>
    </div>
  );
}
