"use client";
import Image from "next/image";
import shape2 from "@/assets/shapes/rect2.svg";
import imageFeature from "@/assets/images/feature-img.jpg";
import item1Image from "@/assets/images/item1.png";
import item2Image from "@/assets/images/item2.png";
import item3Image from "@/assets/images/item3.png";
import { Button } from "@/components/ui/button";
import logo from "@/assets/micah-logo.png";

export default function HeroMobile() {
  return (
    <section className="w-full px-6 text-center">
      {/* LOGO TOP */}
      <div className="flex justify-center mb-6">
        <Image src={logo} alt="Micah Threads Logo" className="h-10 w-auto" />
      </div>

      {/* IMAGE WITH MOBILE SHAPE */}
      <div className="relative flex justify-center mb-6">
        <div className="relative w-full max-w-xs">
          <Image src={shape2} alt="shape mobile" className="w-full h-auto" />

          {/* Masked Image */}
          <div
            className="absolute inset-0"
            style={{
              maskImage: `url(${shape2.src})`,
              WebkitMaskImage: `url(${shape2.src})`,
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
              alt="Feature"
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* NEW inside shape */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full text-sm font-bold">
            NEW
          </div>
        </div>
      </div>

      {/* SMALL ITEM IMAGES */}
      <div className="flex justify-center space-x-3 mb-4">
        <Image
          src={item1Image}
          alt="Item 1"
          className="w-10 h-10 rounded-lg object-cover"
        />
        <Image
          src={item2Image}
          alt="Item 2"
          className="w-10 h-10 rounded-lg object-cover"
        />
        <Image
          src={item3Image}
          alt="Item 3"
          className="w-10 h-10 rounded-lg object-cover"
        />
      </div>

      <h1 className="text-3xl font-bold leading-tight text-black mb-3">
        Where Purpose <span className="text-[#c58aa5]">Meets Style.</span>
      </h1>

      <p className="text-gray-600 mb-4">
        Thoughtfully crafted apparel designed for comfort, confidence, and
        conscious living. Micah Threads blends timeless aesthetics with modern
        craftsmanship—because what you wear should feel as good as it looks.
      </p>

      <div className="flex flex-col gap-3">
        <Button className="bg-[#c58aa5] hover:bg-[#b17994] text-white rounded-full px-6">
          Shop Now
        </Button>
        <Button variant="outline" className="rounded-full px-6">
          Explore Our Story
        </Button>
      </div>
    </section>
  );
}
