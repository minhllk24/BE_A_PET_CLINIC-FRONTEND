export default function CouponInput({ value, onChange, onApply, error }) {
  return (
    <div className="flex flex-row items-start gap-[26px]">
      <div className="flex flex-col flex-1 min-w-0">
        <div className="w-full h-[37px] border border-[rgba(0,0,0,0.23)] rounded-[4px] px-[14px] flex items-center bg-[#FFFFFF]">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value.toUpperCase())}
            placeholder="Nhập mã giảm giá"
            className="w-full bg-transparent outline-none font-['Roboto'] text-[14px] font-normal text-[#4F4B4B] leading-[2.66em] tracking-[0.0714em] uppercase placeholder:text-[#999]"
          />
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
      <button
        type="button"
        onClick={onApply}
        className="h-[37px] w-[104px] flex items-center justify-center bg-[#FDD835] rounded-[4px] shadow-[0px_3px_0.5px_rgba(0,0,0,0.2),0px_2px_1px_rgba(0,0,0,0.14),0px_1px_2.5px_rgba(0,0,0,0.12)] hover:bg-[#ffe454] active:scale-[0.98] transition-all duration-micro"
      >
        <span className="whitespace-nowrap font-['Roboto'] text-[16px] font-normal leading-[1.5] tracking-[0.15px] text-black">Áp dụng</span>
      </button>
    </div>
  );
}
