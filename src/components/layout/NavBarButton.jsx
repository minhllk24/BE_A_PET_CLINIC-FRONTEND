import { useMemo } from "react";
import PropTypes from "prop-types";

const Button = ({
  className = "",
  color = "Primary",
  size = "Large",
  state = "Enabled",
  variant = "Contained",
  startIcon,
  endIcon,
  label = "ĐẶT LỊCH",
  bookButtonBorder,
  bookButtonBackgroundColor,
  baseWidth,
  endIcon1 = false,
  startIcon1 = false,
  startIcon2,
}) => {
  const bookButtonStyle = useMemo(() => {
    return {
      border: bookButtonBorder,
      backgroundColor: bookButtonBackgroundColor,
    };
  }, [bookButtonBorder, bookButtonBackgroundColor]);

  const baseStyle = useMemo(() => {
    return {
      width: baseWidth,
    };
  }, [baseWidth]);

  return (
    <button
      className={`cursor-pointer [border:none] py-2 px-[22px] bg-[#fdd835] h-10 w-[150px] shadow-[0px_1px_5px_rgba(0,_0,_0,_0.12),_0px_2px_2px_rgba(0,_0,_0,_0.14),_0px_3px_1px_-2px_rgba(0,_0,_0,_0.2)] rounded-borderradius overflow-hidden shrink-0 flex flex-col items-center justify-center box-border ${className}`}
      style={bookButtonStyle}
    >
      <div className="flex items-center justify-center gap-2" style={baseStyle}>
        {!!startIcon1 && startIcon2}
        <b className="relative text-base tracking-[0.15px] leading-[150%] font-fontfamily text-primary-contrasttext text-left shrink-0">
          {label}
        </b>
        {!!endIcon1 && endIcon}
      </div>
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  startIcon: PropTypes.any,
  endIcon: PropTypes.any,
  label: PropTypes.string,
  endIcon1: PropTypes.bool,
  startIcon1: PropTypes.bool,
  startIcon2: PropTypes.any,

  /** Variant props */
  color: PropTypes.string,
  size: PropTypes.string,
  state: PropTypes.string,
  variant: PropTypes.string,

  /** Style props */
  bookButtonBorder: PropTypes.string,
  bookButtonBackgroundColor: PropTypes.string,
  baseWidth: PropTypes.string,
};

export default Button;
