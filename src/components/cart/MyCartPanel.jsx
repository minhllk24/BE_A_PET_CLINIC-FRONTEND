import { cartImages } from "../../assets/cartImages";
import { useCart } from "../../context/CartContext";

const CART_ITEMS = [
  { id: 1, name: "Tên sản phẩm", price: "giá", type: "fill", size: "fill", qty: 1 },
  { id: 2, name: "Tên sản phẩm", price: "giá", type: "fill", size: "fill", qty: 1 },
  { id: 3, name: "Tên sản phẩm", price: "giá", type: "fill", size: "fill", qty: 1 },
];

function CartItemRow({ item }) {
  return (
    <div className="flex h-[100px] w-[503px] shrink-0 items-center gap-[10px] border-b border-solid border-[#e0e0e0] py-[10px]">
      <button
        type="button"
        className="flex h-[40px] shrink-0 items-center overflow-clip"
        aria-label="Chọn sản phẩm"
      >
        <span className="flex shrink-0 items-start rounded-[100px] p-0">
          <img src={cartImages.checkbox} alt="" className="size-6" />
        </span>
      </button>

      <div className="flex h-full shrink-0 items-center justify-center">
        <div className="h-full w-[80px]">
          <img
            src={cartImages.productThumb}
            alt=""
            className="size-full object-cover"
          />
        </div>
      </div>

      <div className="flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-[10px]">
        <div className="flex w-full items-start justify-between">
          <p className="w-[278px] break-words font-['Roboto'] text-[14px] font-bold leading-[1.43] tracking-[0.17px] text-[#0d47a1]">
            {item.name}
          </p>
          <button
            type="button"
            className="relative h-5 w-[17px] shrink-0"
            aria-label="Xóa sản phẩm"
          >
            <img src={cartImages.iconBin} alt="" className="size-full" />
          </button>
        </div>

        <div className="flex w-full items-center justify-between text-[#353535]">
          <p className="shrink-0 whitespace-nowrap font-['Roboto'] text-[14px] font-bold leading-[1.43] tracking-[0.17px]">
            {item.price}
          </p>
          <div className="flex h-[27px] w-[78px] shrink-0 items-center justify-between rounded border border-solid border-[#353535] px-4 py-[5px] text-center font-['Josefin_Sans'] text-[20px] font-medium leading-normal">
            <button type="button" className="w-[3px] shrink-0" aria-label="Giảm số lượng">
              -
            </button>
            <span className="w-[3px] shrink-0">{item.qty}</span>
            <button type="button" className="w-[6px] shrink-0" aria-label="Tăng số lượng">
              +
            </button>
          </div>
        </div>

        <div className="flex w-full items-center gap-10 whitespace-nowrap font-['Roboto'] text-[12px] leading-[1.66] tracking-[0.4px] text-[#353535]">
          <div className="flex items-center gap-[10px]">
            <span>Loại:</span>
            <span>{item.type}</span>
          </div>
          <div className="flex items-center gap-[10px]">
            <span>Size:</span>
            <span>{item.size}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyCartPanel({ onClose }) {
  const { openCheckout } = useCart();
  const itemCount = CART_ITEMS.length;

  return (
    <aside
      className="panel-slide-in absolute right-[94px] top-0 flex w-[551px] flex-col items-center gap-[10px] overflow-x-clip overflow-y-auto rounded bg-[#fffde7] px-5 py-[10px] shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
      data-name="my cart"
      role="dialog"
      aria-label="Giỏ hàng"
    >
      <div className="flex w-[503px] shrink-0 items-center justify-between">
        <p className="whitespace-nowrap tracking-[0.15px] text-[#353535]">
          <span className="font-['Roboto'] text-[16px] font-bold leading-[1.5]">
            Giỏ hàng{" "}
          </span>
          <span className="font-['Roboto'] text-[16px] font-bold leading-[1.5] text-[#f45757]">
            ({itemCount})
          </span>
        </p>
        <button
          type="button"
          onClick={onClose}
          className="btn-icon-subtle relative size-[30px] shrink-0 p-1"
          aria-label="Đóng giỏ hàng"
        >
          <img src={cartImages.iconClose} alt="" className="size-full" />
        </button>
      </div>

      <div className="flex h-[508px] w-full shrink-0 flex-col items-start overflow-x-clip overflow-y-auto">
        {CART_ITEMS.map((item) => (
          <CartItemRow key={item.id} item={item} />
        ))}
      </div>

      <div className="flex h-[60px] w-full shrink-0 items-center justify-center gap-6 rounded bg-[#f5f5f5] p-6">
        <div className="flex h-5 min-w-0 flex-1 items-center gap-5 font-['Roboto'] text-[16px] font-bold leading-[1.5] tracking-[0.15px]">
          <p className="shrink-0 whitespace-nowrap text-[rgba(0,0,0,0.87)]">
            Tạm tính:{" "}
          </p>
          <p className="min-w-0 flex-1 text-[#f45757]">$35.09</p>
        </div>
        <button
          type="button"
          onClick={openCheckout}
          className="btn-brand-cart shrink-0"
        >
          <span className="whitespace-nowrap font-['Roboto'] text-[13px] font-medium uppercase leading-[22px] tracking-[0.46px] text-black">
            Đặt hàng
          </span>
        </button>
      </div>
    </aside>
  );
}

export default MyCartPanel;
