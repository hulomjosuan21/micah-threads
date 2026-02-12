"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

import shape1 from "@/assets/shapes/rect1.svg";
import shape2 from "@/assets/shapes/rect2.svg";

import imageFeature from "@/assets/images/feature-img.jpg";
import item1Image from "@/assets/images/item1.png";
import item2Image from "@/assets/images/item2.png";
import item3Image from "@/assets/images/item3.png";

import logo from "@/assets/micah-logo.png";

function MaskedShapeImage({
  shapeSrc,
  className,
  variant,
}: {
  shapeSrc: any;
  className?: string;
  variant: "desktop" | "mobile";
}) {
  return (
    <div className={`relative ${className ?? ""}`}>
      {/* 1. Invisible shape to set aspect ratio */}
      <Image
        src={shapeSrc}
        alt="shape reference"
        className="w-full h-auto opacity-0 pointer-events-none"
      />

      {/* 2. The Image with SVG Mask */}
      <div
        className="absolute inset-0 z-10"
        style={{
          maskImage: `url(${shapeSrc.src})`,
          WebkitMaskImage: `url(${shapeSrc.src})`,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <Image
          src={imageFeature}
          alt="Feature image"
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* 3. Logo Placement (Dynamic based on variant) */}
      <div
        className="absolute z-20 flex items-center justify-center transform translate-x-1/2"
        style={{
          right: "14%",
          top: variant === "desktop" ? "-8%" : "-2%",
        }}
      >
        <div
          className={`${variant === "desktop" ? "w-20 h-20 md:w-24 md:h-24" : "w-16 h-16"}`}
        >
          <Image
            src={logo}
            alt="Micah Threads"
            className="w-full h-full rounded-full shadow-sm"
          />
        </div>
      </div>

      {/* 4. Desktop "New" Text (Bottom-Left Cutout) */}
      {variant === "desktop" && (
        <div className="absolute bottom-[1%] left-[4%] z-20 w-[30%] h-[15%] flex items-end justify-center">
          <span className="text-black font-black text-6xl lg:text-[5rem] tracking-tighter leading-none">
            New
          </span>
        </div>
      )}

      {/* 5. Mobile "New" Text (Bottom-Right Overlay) */}
      {variant === "mobile" && (
        <div className="absolute bottom-5 right-18 z-20">
          <span className="text-white font-black text-4xl leading-none drop-shadow-md tracking-tight">
            New
          </span>
        </div>
      )}

      {/* 6. Mobile Thumbnails (Bottom-Left Cutout) */}
      {variant === "mobile" && (
        <div className="absolute bottom-2 left-2 z-30">
          <ThumbsRow />
        </div>
      )}
    </div>
  );
}

function ThumbsRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {[item1Image, item2Image, item3Image].map((img, idx) => (
        <Image
          key={idx}
          src={img}
          alt={`Thumb ${idx + 1}`}
          className="w-10 h-10 rounded-lg object-cover border border-gray-100 shadow-sm"
        />
      ))}
    </div>
  );
}

function DesktopHero() {
  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
          <div className="flex flex-col items-start space-y-8">
            <ThumbsRow />
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-black leading-[0.9] text-black tracking-tight">
                Where Purpose
                <br />
                <span className="text-[#b37a97]">Meets Style.</span>
              </h1>
              <p className="max-w-lg text-lg text-gray-600 leading-relaxed">
                Thoughtfully crafted apparel designed for comfort, confidence,
                and conscious living. Micah Threads blends timeless aesthetics
                with modern craftsmanship.
              </p>
            </div>
            <div className="flex gap-4">
              <Button className="rounded-full bg-[#b37a97] px-8 py-6 text-lg hover:bg-[#a96b8b] text-white shadow-lg shadow-pink-900/10 transition-transform hover:scale-105">
                Shop Now
              </Button>
              <Button
                variant="ghost"
                className="rounded-full bg-gray-100 px-8 py-6 text-lg text-black hover:bg-gray-200 transition-colors"
              >
                Explore Our Story
              </Button>
            </div>
          </div>

          <div className="relative w-full flex justify-end">
            <div className="w-full max-w-xl xl:max-w-2xl pt-12">
              <MaskedShapeImage shapeSrc={shape1} variant="desktop" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileHero() {
  return (
    <section className="w-full bg-white pb-12">
      <div className="flex flex-col">
        {/* Full width container for Mobile Mask */}
        <div className="relative w-full px-4 pt-10">
          <MaskedShapeImage shapeSrc={shape2} variant="mobile" />
        </div>

        <div className="px-6 mt-6">
          <h1 className="text-4xl font-black leading-[1] text-black tracking-tight">
            Where Purpose <br />{" "}
            <span className="text-[#b37a97]">Meets Style.</span>
          </h1>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Thoughtfully crafted apparel designed for comfort, confidence, and
            conscious living.
          </p>

          <div className="mt-8 flex gap-3 w-full">
            <Button className="flex-1 rounded-full bg-[#b37a97] py-6 text-white hover:bg-[#a96b8b] text-base">
              Shop Now
            </Button>
            <Button
              variant="secondary"
              className="flex-1 rounded-full bg-gray-100 py-6 text-black hover:bg-gray-200 text-base"
            >
              Explore Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HeroSection() {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopHero />
      </div>
      <div className="block lg:hidden">
        <MobileHero />
      </div>
    </>
  );
}
