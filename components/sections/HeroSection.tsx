"use client";
import { DesktopHero } from "./HeroSectionDesktop";
import { MobileHero } from "./HeroSectionMobile";

export default function HeroSection({
  scrollDirect,
}: {
  scrollDirect: (direction: "up" | "down") => void;
}) {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopHero scrollDirect={scrollDirect} />
      </div>
      <div className="block lg:hidden">
        <MobileHero scrollDirect={scrollDirect} />
      </div>
    </>
  );
}
