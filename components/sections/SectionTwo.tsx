import { motion } from "framer-motion";

export default function SectionTwo() {
  return (
    <div className="h-svh w-full flex items-center justify-center px-8">
      <motion.h1
        layout
        layoutId="shared-title"
        className="text-3xl md:text-5xl font-black tracking-tight text-center"
        initial={false}
        transition={{ type: "spring", stiffness: 240, damping: 28 }}
      >
        Experience the fusion of fashion and purpose with Micah Threads.
      </motion.h1>
    </div>
  );
}
