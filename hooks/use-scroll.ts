import { useRef, useState } from "react";

export default function useScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLastPage, setIsLastPage] = useState(false);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      // If we've scrolled past the second page (thresholding for safety)
      const atBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setIsLastPage(atBottom);
    }
  };

  const scrollDirect = (direction: "up" | "down") => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: direction === "down" ? window.innerHeight : -window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return { containerRef, isLastPage, handleScroll, scrollDirect };
}
