"use client";
import { useEffect, useState } from "react";
import { DesktopHero } from "./HeroSectionDesktop";
import { MobileHero } from "./HeroSectionMobile";
import { User } from "@supabase/supabase-js";

export default function HeroSection({
  scrollDirect,
  user,
}: {
  scrollDirect: (direction: "up" | "down") => void;
  user: User | null;
}) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isDesktop === null) return null;

  return isDesktop ? (
    <DesktopHero scrollDirect={scrollDirect} user={user} />
  ) : (
    <MobileHero scrollDirect={scrollDirect} user={user} />
  );
}
