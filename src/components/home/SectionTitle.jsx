import PropTypes from "prop-types";

function SectionTitle({ children, subtitle, className = "" }) {
  return (
    <div className={`flex flex-col items-center gap-6 text-center ${className}`}>
      <div className="relative">
        <h2 className="font-display text-4xl leading-tight text-slate-900 md:text-5xl lg:text-[64px]">
          {children}
        </h2>
      </div>

      {subtitle && (
        <p className="max-w-3xl text-base leading-relaxed text-slate-900 md:text-lg md:leading-[1.6]">
          {subtitle}
        </p>
      )}
    </div>
  );
}

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
  subtitle: PropTypes.string,
  className: PropTypes.string,
};

export default SectionTitle;