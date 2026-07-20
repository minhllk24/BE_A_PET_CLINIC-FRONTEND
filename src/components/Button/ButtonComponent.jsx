function ButtonComponent({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
  disabled = false,
  loading = false,
}) {
  const variants = {
    primary: "btn-brand bg-primary text-white hover:bg-[#5BB8E8] focus-ring-brand",
    secondary:
      "btn-brand bg-gray-200 text-gray-800 hover:bg-gray-300 focus-ring-brand",
    danger:
      "btn-brand bg-red-500 text-white hover:bg-red-600 focus-ring-brand",
    outline:
      "btn-brand border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white focus-ring-brand",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={[
        "rounded px-4 py-2 font-medium",
        variants[variant] ?? variants.primary,
        loading ? "btn-loading" : "",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export default ButtonComponent;
