"use client";
import Image from "next/image";
import shape1 from "@/assets/shapes/rect1.svg";
import imageFeature from "@/assets/images/feature-img.jpg";
import item1Image from "@/assets/images/item1.png";
import item2Image from "@/assets/images/item2.png";
import item3Image from "@/assets/images/item3.png";
import { Button } from "@/components/ui/button";
import logo from "@/assets/micah-logo.png";

export default function HeroDesktop() {
  return (
    <section className="w-full max-w-6xl px-6">
      {/* LOGO AT TOP */}
      <div className="flex justify-center lg:justify-start mb-6">
        <Image src={logo} alt="Micah Threads Logo" className="h-10 w-auto" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div className="flex flex-col space-y-6 text-left">
          <div className="flex space-x-3">
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

          <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-black">
            Where Purpose <span className="text-[#c58aa5]">Meets Style.</span>
          </h1>

          <p className="text-gray-600 max-w-xl">
            Thoughtfully crafted apparel designed for comfort, confidence, and
            conscious living. Micah Threads blends timeless aesthetics with
            modern craftsmanship—because what you wear should feel as good as it
            looks.
          </p>

          <div className="flex gap-4">
            <Button className="bg-[#c58aa5] hover:bg-[#b17994] text-white rounded-full px-6">
              Shop Now
            </Button>
            <Button variant="outline" className="rounded-full px-6">
              Explore Our Story
            </Button>
          </div>
        </div>

        {/* RIGHT IMAGE WITH SHAPE */}
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-md lg:max-w-lg">
            <Image src={shape1} alt="shape desktop" className="w-full h-auto" />

            {/* Masked Image */}
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
                alt="Feature"
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* NEW inside shape (like your screenshot) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full text-sm font-bold">
              NEW
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
