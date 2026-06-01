import PropTypes from "prop-types";

const VARIANT_CLASS = {
  filled: "btn-yellow",
  outline: "btn-yellow-outline",
  light: "btn-yellow-light",
};

function YellowButton({
  children,
  variant = "filled",
  className = "",
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  "aria-label": ariaLabel,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      className={[
        VARIANT_CLASS[variant] ?? VARIANT_CLASS.filled,
        "focus-ring-brand",
        loading ? "btn-loading" : "",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}

YellowButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["filled", "outline", "light"]),
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  "aria-label": PropTypes.string,
};

export default YellowButton;
