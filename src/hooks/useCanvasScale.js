import { useCallback, useEffect, useState } from "react";

const DEFAULT_DESIGN_WIDTH = 1440;

/**
 * Scale a fixed Figma canvas to fit the viewport width on laptop screens.
 * Never scales above 1 (preserves pixel fidelity on large displays).
 */
export function computeCanvasScale(
  viewportWidth,
  designWidth = DEFAULT_DESIGN_WIDTH,
  padding = 0,
) {
  const available = Math.max(320, viewportWidth - padding);
  return Math.min(1, available / designWidth);
}

export function useCanvasScale(designWidth = DEFAULT_DESIGN_WIDTH, padding = 0) {
  const readScale = useCallback(
    () => computeCanvasScale(window.innerWidth, designWidth, padding),
    [designWidth, padding],
  );

  const [scale, setScale] = useState(() =>
    typeof window !== "undefined" ? readScale() : 1,
  );

  useEffect(() => {
    const update = () => setScale(readScale());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [readScale]);

  return scale;
}

export default useCanvasScale;
