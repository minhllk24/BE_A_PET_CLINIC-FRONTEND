import { useEffect, useRef, useState } from "react";
import useCanvasScale from "../../hooks/useCanvasScale";

const DESIGN_WIDTH = 1440;

/**
 * Scales a 1440px Figma canvas to fit laptop viewport width while
 * preserving proportions. Navbar + page content scale together.
 */
function ScaledCanvasLayout({
  children,
  className = "",
  designWidth = DESIGN_WIDTH,
}) {
  const scale = useCanvasScale(designWidth, 0);
  const innerRef = useRef(null);
  const [scaledHeight, setScaledHeight] = useState(null);

  useEffect(() => {
    const node = innerRef.current;
    if (!node) return undefined;

    const measure = () => {
      setScaledHeight(node.offsetHeight * scale);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [scale, children]);

  return (
    <div className="w-full overflow-x-hidden bg-[#f5f5f5]">
      <div
        className="relative mx-auto"
        style={{
          width: designWidth * scale,
          height: scaledHeight ?? "auto",
        }}
      >
        <div
          ref={innerRef}
          className={className}
          style={{
            width: designWidth,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default ScaledCanvasLayout;
