import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import {
  GUEST_ACCOUNT_CREDENTIALS,
  guestSuccessImages,
} from "./guestSuccessAssets";

function GuestOrderSuccessOverlay() {
  const { isGuestSuccessOpen, closeGuestSuccess, lastOrderResult } = useCart();
  const { openAuth } = useAuth();
  const navigate = useNavigate();

  if (!isGuestSuccessOpen) {
    return null;
  }

  const handleGoHome = () => {
    closeGuestSuccess();
    navigate("/");
  };

  const handleLogin = () => {
    closeGuestSuccess();
    openAuth("login");
  };
  const guestAccount = lastOrderResult?.guest_account || GUEST_ACCOUNT_CREDENTIALS;

  return (
    <div
      className="overlay-fade-in pointer-events-auto fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(6,16,90,0.2)] p-4 backdrop-blur-[6px]"
      role="dialog"
      aria-label="Đặt hàng thành công"
      aria-modal="true"
    >
      <div className="panel-slide-in relative h-[609px] w-[1023px] max-w-[calc(100vw-32px)]">
        <div className="absolute inset-0 overflow-hidden rounded-[10px] border border-[#ababab] bg-white shadow-[0px_100px_203px_0px_rgba(0,0,0,0.07),0px_22.336px_45.343px_0px_rgba(0,0,0,0.04),0px_6.65px_13.5px_0px_rgba(0,0,0,0.03)]">
          <img
            src={guestSuccessImages.cardBackground}
            alt=""
            className="size-full object-cover"
          />
        </div>

        <div className="absolute left-1/2 top-1/2 flex w-full max-w-[1023px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-10 px-6 py-[50px]">
          <img
            src={guestSuccessImages.successIcon}
            alt=""
            className="size-[69px] shrink-0"
          />

          <div className="flex flex-col items-center gap-2">
            <h2 className="whitespace-nowrap font-['Roboto'] text-[48px] font-bold leading-[1.167] text-[#3d3d3d]">
              Đặt hàng thành công
            </h2>
            <p className="w-[481px] max-w-full text-center font-['Roboto'] text-[16px] leading-[1.5] tracking-[0.15px] text-[#949494]">
              Đơn đặt hàng của bạn đã được xác nhận. Để xem chi tiết và theo
              dõi đơn hàng, bạn vui lòng đăng nhập tài khoản sau:
            </p>
          </div>

          <div className="flex h-[74px] w-[338px] flex-col gap-[10px] rounded-[4px] bg-[#f5f5f5] p-[10px] font-['Roboto'] text-[16px] leading-[1.5] tracking-[0.15px]">
            <div className="flex w-full items-start gap-[15px]">
              <span className="h-[23px] w-[112px] shrink-0 text-[rgba(0,0,0,0.6)]">
                Tên đăng nhập:
              </span>
              <span className="h-[23px] text-[rgba(0,0,0,0.87)]">
                {guestAccount.username}
              </span>
            </div>
            <div className="flex w-full items-start gap-[15px]">
              <span className="h-[23px] w-[112px] shrink-0 text-[rgba(0,0,0,0.6)]">
                Mật khẩu:
              </span>
              <span className="min-w-0 flex-1 text-[rgba(0,0,0,0.87)]">
                {guestAccount.password}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
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
              onClick={handleLogin}
              className="btn-yellow-outline w-[190px] px-[22px] py-2 normal-case tracking-[0.46px]"
            >
              <span className="whitespace-nowrap font-['Roboto'] text-[15px] font-medium uppercase leading-[26px] tracking-[0.46px] text-black">
                Đăng nhập
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestOrderSuccessOverlay;
