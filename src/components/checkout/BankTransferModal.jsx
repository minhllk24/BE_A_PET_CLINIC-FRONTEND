import { useCart } from "../../context/CartContext";
import {
  BANK_TRANSFER_INFO,
  bankTransferImages,
} from "./bankTransferAssets";

function BankTransferModal() {
  const { isBankTransferOpen, completeBankTransfer } = useCart();

  if (!isBankTransferOpen) {
    return null;
  }

  const handleCopyAccount = async () => {
    try {
      await navigator.clipboard.writeText(BANK_TRANSFER_INFO.accountNumber);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div
      className="overlay-fade-in pointer-events-auto fixed inset-0 z-[75] flex items-center justify-center bg-[rgba(6,16,90,0.2)] p-4 backdrop-blur-[6px]"
      role="dialog"
      aria-label="Thông tin chuyển khoản"
      aria-modal="true"
      onClick={completeBankTransfer}
    >
      <div
        className="panel-slide-in flex h-[336px] w-[385px] max-w-[calc(100vw-32px)] flex-col gap-[15px] rounded-[4px] border border-[#c2c7d1] bg-white p-[17px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex w-full shrink-0 items-start justify-center">
          <div className="rounded-[6px] border border-[#c2c7d1] bg-white p-[5px]">
            <div className="size-[128px] overflow-hidden rounded-[inherit]">
              <img
                src={bankTransferImages.qrPlaceholder}
                alt="QR thanh toán"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 pt-px">
          <div className="flex w-full items-center justify-between">
            <span className="font-['Roboto'] text-[14px] leading-5 text-[#727780]">
              Ngân hàng
            </span>
            <span className="font-['Roboto'] text-[14px] leading-5 text-[#191c1e]">
              {BANK_TRANSFER_INFO.bank}
            </span>
          </div>
          <div className="flex w-full items-center justify-between">
            <span className="font-['Roboto'] text-[14px] leading-5 text-[#727780]">
              Số tài khoản
            </span>
            <div className="flex items-center gap-2">
              <span className="font-['Roboto'] text-[14px] leading-5 text-[#191c1e]">
                {BANK_TRANSFER_INFO.accountNumber}
              </span>
              <button
                type="button"
                onClick={handleCopyAccount}
                className="btn-icon-subtle rounded-[2px] p-[2px]"
                aria-label="Sao chép số tài khoản"
              >
                <img
                  src={bankTransferImages.copyIcon}
                  alt=""
                  className="h-[13.333px] w-[11.333px]"
                />
              </button>
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <span className="font-['Roboto'] text-[14px] leading-5 text-[#727780]">
              Chủ tài khoản
            </span>
            <span className="font-['Roboto'] text-[14px] leading-5 text-[#191c1e]">
              {BANK_TRANSFER_INFO.accountHolder}
            </span>
          </div>
          <div className="flex w-full items-center justify-between">
            <span className="font-['Roboto'] text-[14px] leading-5 text-[#727780]">
              Số tiền
            </span>
            <span className="font-['Roboto'] text-[14px] font-bold leading-5 text-[#9a4600]">
              {BANK_TRANSFER_INFO.amount}
            </span>
          </div>
        </div>

        <p className="text-center font-['Roboto'] text-[11px] leading-[16.5px] text-red-600">
          Vui lòng ghi mã đơn {BANK_TRANSFER_INFO.orderCode} trong phần nội
          dung chuyển khoản.
        </p>
      </div>
    </div>
  );
}

export default BankTransferModal;
