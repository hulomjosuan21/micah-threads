"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "@/assets/micah-logo.png";
import { createPortal } from "react-dom";

type SplashProps = {
  onFinish?: () => void;
  minDurationMs?: number; // minimum time to show splash
  animationData?: any; // Lottie JSON (optional)
  loop?: boolean;
  backgroundClass?: string;
};

export default function SplashScreen({
  onFinish,
  minDurationMs = 1200,
  animationData,
  loop = false,
  backgroundClass = "bg-white",
}: SplashProps) {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mountedPortal, setMountedPortal] = useState(false);

  useEffect(() => {
    setMountedPortal(true);
  }, []);

  useEffect(() => {
    let timer: number | undefined;
    let lottieInstance: any;

    const ensureMinDuration = new Promise<void>((resolve) => {
      timer = window.setTimeout(() => resolve(), minDurationMs);
    });

    const loadLottie = async () => {
      if (!animationData) return; // no animation, just use timer
      try {
        const lottieMod: any = await import("lottie-web");
        const lottie = lottieMod.default || lottieMod;
        if (containerRef.current) {
          lottieInstance = lottie.loadAnimation({
            container: containerRef.current,
            renderer: "svg",
            loop,
            autoplay: true,
            animationData,
          });
        }
      } catch {
        // lottie-web not installed or failed; silently continue with timer
      }
    };

    const run = async () => {
      await Promise.all([ensureMinDuration, loadLottie()]);
      setVisible(false);
      onFinish?.();
    };

    run();

    return () => {
      if (timer) window.clearTimeout(timer);
      if (lottieInstance) lottieInstance.destroy?.();
    };
  }, [animationData, loop, minDurationMs, onFinish]);

  if (!mountedPortal) return null;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className={`fixed inset-0 z-100 ${backgroundClass} flex items-center justify-center pointer-events-auto`}
        >
          <div className="flex flex-col items-center gap-4">
            {/* Lottie mount point (optional) */}
            <div ref={containerRef} className="w-36 h-36" />

            {/* Fallback/logo while Lottie loads or absent */}
            <div className="w-16 h-16">
              <Image src={logo} alt="Micah Threads" className="rounded-full" />
            </div>

            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-gray-600"
            >
              Loading
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
