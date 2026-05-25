import PropTypes from "prop-types";

function YellowButton({
  children,
  variant = "filled",
  className = "",
  onClick,
  type = "button",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded px-[22px] py-2 text-[15px] font-bold uppercase tracking-wide shadow-elevation transition hover:opacity-90";

  const variants = {
    filled: "bg-secondary text-black/87",
    outline: "border border-secondary bg-transparent text-black/87",
    light: "bg-secondary-light text-black/87",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
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
};

export default YellowButton;
