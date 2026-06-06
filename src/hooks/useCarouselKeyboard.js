import { useEffect } from "react";

/**
 * ArrowLeft / ArrowRight keyboard navigation for carousels.
 */
export function useCarouselKeyboard({ onPrev, onNext, enabled = true }) {
  useEffect(() => {
    if (!enabled) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, onPrev, onNext]);
}

export default useCarouselKeyboard;
