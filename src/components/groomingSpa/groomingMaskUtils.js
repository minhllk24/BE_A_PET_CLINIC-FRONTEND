/** CSS mask helpers for Figma cut-out shapes */
export function cssMask(url, size = "100% 100%", position = "0 0") {
  return {
    WebkitMaskImage: `url(${url})`,
    maskImage: `url(${url})`,
    WebkitMaskSize: size,
    maskSize: size,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: position,
    maskPosition: position,
  };
}
