"use client";
import { useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import useScroll from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/sections/HeroSection";

export default function Home() {
  const { containerRef, isLastPage, handleScroll, scrollDirect } = useScroll();

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <main
        ref={containerRef}
        onScroll={handleScroll}
        className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar"
      >
        <section className="h-screen w-full snap-start flex items-center justify-center">
          <div className="w-full max-h-screen overflow-hidden">
            <HeroSection />
          </div>
        </section>

        <section className="h-screen w-full snap-start flex items-center justify-center">
          <h1 className="text-4xl font-light">2</h1>
        </section>

        <section className="h-screen w-full snap-start flex items-center justify-center">
          <h1 className="text-4xl font-light">3</h1>
        </section>
      </main>

      <div className="absolute bottom-8 right-8 z-20 flex flex-col gap-2">
        {!isLastPage ? (
          <button
            onClick={() => scrollDirect("down")}
            className="p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all animate-bounce"
          >
            <ChevronDown size={28} className="animate-pulse" />
          </button>
        ) : (
          <button
            onClick={() => scrollDirect("up")}
            className="p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all animate-bounce"
          >
            <ChevronUp size={28} className="animate-pulse" />
          </button>
        )}
      </div>
    </div>
  );
}
