import { useRef, useState } from "react";

export default function useScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLastPage, setIsLastPage] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;

    const {
      scrollTop,
      scrollLeft,
      scrollHeight,
      scrollWidth,
      clientHeight,
      clientWidth,
    } = containerRef.current;

    // Check if we are on mobile (using standard 768px breakpoint)
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 10;
      setIsLastPage(atEnd);
      const idx = Math.round(scrollLeft / clientWidth);
      setCurrentIndex(idx);
    } else {
      const atBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setIsLastPage(atBottom);
      const idx = Math.round(scrollTop / clientHeight);
      setCurrentIndex(idx);
    }
  };

  const scrollDirect = (direction: "up" | "down") => {
    if (!containerRef.current) return;

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      containerRef.current.scrollBy({
        left: direction === "down" ? window.innerWidth : -window.innerWidth,
        behavior: "smooth",
      });
    } else {
      containerRef.current.scrollBy({
        top: direction === "down" ? window.innerHeight : -window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return { containerRef, isLastPage, currentIndex, handleScroll, scrollDirect };
}
