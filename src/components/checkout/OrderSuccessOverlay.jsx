import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { orderSuccessImages } from "./orderSuccessAssets";

function OrderSuccessOverlay() {
  const { isOrderSuccessOpen, closeOrderSuccess } = useCart();
  const navigate = useNavigate();

  if (!isOrderSuccessOpen) {
    return null;
  }

  const handleGoHome = () => {
    closeOrderSuccess();
    navigate("/");
  };

  const handleOrderDetails = () => {
    closeOrderSuccess();
  };

  return (
    <div
      className="overlay-fade-in pointer-events-auto fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(6,16,90,0.12)] p-4 backdrop-blur-[3px]"
      role="dialog"
      aria-label="Đặt hàng thành công"
      aria-modal="true"
    >
      <div className="panel-slide-in relative inline-grid shrink-0 place-items-start leading-none">
        <div className="relative h-[456.096px] w-[1023px] max-w-[calc(100vw-32px)] rounded-[10px] border border-solid border-[#ababab] bg-white shadow-[0px_100px_203px_0px_rgba(0,0,0,0.07),0px_22.336px_45.343px_0px_rgba(0,0,0,0.04),0px_6.65px_13.5px_0px_rgba(0,0,0,0.03)]" />

        <div className="absolute left-1/2 top-1/2 flex w-full max-w-[1023px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-10 px-6">
          <img
            src={orderSuccessImages.successIcon}
            alt=""
            className="size-[69px] shrink-0"
          />

          <div className="flex flex-col items-center gap-2">
            <h2 className="whitespace-nowrap font-['Roboto'] text-[48px] font-bold leading-[1.167] text-[#3d3d3d]">
              Đặt hàng thành công
            </h2>
            <p className="w-[481px] max-w-full text-center font-['Roboto'] text-[16px] leading-[1.5] tracking-[0.15px] text-[#949494]">
              Đơn đặt hàng của bạn đã được xác nhận. Xem chi tiết và theo dõi
              đơn hàng tại &apos;Đơn hàng của tôi&apos;.
            </p>
          </div>

          <div className="flex flex-wrap items-start justify-center gap-5">
            <button
              type="button"
              onClick={handleGoHome}
              className="btn-yellow px-[22px] py-2 normal-case tracking-[0.46px]"
            >
              <span className="whitespace-nowrap font-['Roboto'] text-[15px] font-bold uppercase leading-[26px] tracking-[0.46px] text-black">
                Trở về trang chủ
              </span>
            </button>
            <button
              type="button"
              onClick={handleOrderDetails}
              className="btn-yellow-outline px-[22px] py-2 normal-case tracking-[0.46px]"
            >
              <span className="whitespace-nowrap font-['Roboto'] text-[15px] font-medium uppercase leading-[26px] tracking-[0.46px] text-black">
                chi tiết đơn hàng
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessOverlay;
