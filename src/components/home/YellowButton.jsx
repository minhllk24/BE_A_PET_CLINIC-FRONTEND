import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
  to,
  href,
  type = "button",
  disabled = false,
  loading = false,
  "aria-label": ariaLabel,
}) {
  const buttonClassName = [
    VARIANT_CLASS[variant] ?? VARIANT_CLASS.filled,
    "focus-ring-brand",
    loading ? "btn-loading" : "",
    className,
  ].join(" ");

  if (to) {
    return (
      <Link
        to={to}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-disabled={disabled || loading || undefined}
        tabIndex={disabled || loading ? -1 : undefined}
        className={buttonClassName}
      >
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-disabled={disabled || loading || undefined}
        tabIndex={disabled || loading ? -1 : undefined}
        className={buttonClassName}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      className={buttonClassName}
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
  to: PropTypes.string,
  href: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  "aria-label": PropTypes.string,
};

export default YellowButton;
