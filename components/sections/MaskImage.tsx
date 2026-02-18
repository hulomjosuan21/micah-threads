import Image from "next/image";
import logo from "@/assets/micah-logo.png";
import shape1 from "@/assets/shapes/rect1.svg";
import imageFeature from "@/assets/images/feature-img.jpg";
import { ThumbsRow } from "./ThumbsRow";
import { motion } from "framer-motion";
import shape2 from "@/assets/shapes/rect2.svg";

export function MaskedShapeImageDesktop({ className }: { className?: string }) {
  return (
    <motion.div
      layoutId="shared-image"
      className={`relative mx-auto ${className ?? ""}`}
      style={{
        height: "min(72vh, 640px)",
        aspectRatio: "1 / 1",
      }}
    >
      <Image
        src={shape1}
        alt="shape reference"
        className="w-full h-full opacity-0 pointer-events-none select-none"
        draggable={false}
      />

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
          alt="Feature image"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="absolute right-[14%] -top-[10%] z-20">
        <div className="w-12 h-12 lg:w-18 lg:h-18">
          <Image src={logo} alt="Micah Threads" />
        </div>
      </div>

      <div className="absolute bottom-[0.2%] left-[18%] z-20">
        <span className="font-black text-2xl lg:text-4xl tracking-tight">
          New
        </span>
      </div>
    </motion.div>
  );
}

export function MaskedShapeImageMobile({ className }: { className?: string }) {
  return (
    <motion.div
      layoutId="shared-image"
      className={`relative w-full pointer-events-none ${className ?? ""}`}
    >
      <Image
        src={shape2}
        alt="shape reference"
        className="w-full h-auto opacity-0 pointer-events-none"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: `url(${shape2.src})`,
          WebkitMaskImage: `url(${shape2.src})`,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
        }}
      >
        <Image
          src={imageFeature}
          alt="Feature image"
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute right-[1%] -top-[8%] z-20 pointer-events-none">
        <div className="w-16 h-16">
          <Image src={logo} alt="Micah Threads" className="rounded-full" />
        </div>
      </div>

      <div className="absolute bottom-2 right-10 z-20 pointer-events-none">
        <span className="font-black text-3xl drop-shadow-md text-white tracking-tight">
          New
        </span>
      </div>

      <div className="absolute bottom-[-4%] left-2 z-30 pointer-events-auto">
        <ThumbsRow />
      </div>
    </motion.div>
  );
}
