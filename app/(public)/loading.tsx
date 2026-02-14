"use client";
import Image from "next/image";
import logo from "@/assets/micah-logo.png";

export default function LoadingPage() {
  return (
    <div className="h-svh grid place-content-center">
      <div className="">
        <div className="w-12 h-12 lg:w-18 lg:h-18 animate-spin transition-all duration-300">
          <Image src={logo} alt="Micah Threads" />
        </div>
      </div>
    </div>
  );
}
