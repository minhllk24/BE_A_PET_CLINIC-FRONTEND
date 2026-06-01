/**
 * Preserves 1440px Figma canvas on large screens; enables horizontal scroll
 * on smaller viewports without distorting proportions.
 */
function CanvasLayout({ children, className = "", minHeight }) {
  return (
    <div className="w-full overflow-x-auto overscroll-x-contain scroll-smooth bg-white">
      <div
        className={`relative mx-auto w-[1440px] shrink-0 ${className}`}
        style={minHeight ? { minHeight } : undefined}
      >
        {children}
      </div>
    </div>
  );
}

export default CanvasLayout;
