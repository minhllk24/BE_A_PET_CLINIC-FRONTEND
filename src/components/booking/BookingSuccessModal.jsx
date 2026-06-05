import { Link } from "react-router-dom";
import { bookingImages } from "../../assets/bookingImages";

const { successPanelBackground, successCheckGroup } = bookingImages;

function BookingSuccessModal() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#06105a33] p-4 backdrop-blur-md">
      <div
        className="flex min-h-[310px] w-full max-w-4xl flex-col items-center justify-center gap-8 rounded-[10px] border border-slate-300 bg-white bg-cover bg-center p-10 text-center shadow-2xl"
        style={{ backgroundImage: `url(${successPanelBackground})` }}
      >
        <img src={successCheckGroup} alt="" className="h-[69px] w-[69px]" />
        <div>
          <h2 className="text-4xl font-bold text-[#3d3d3d] md:text-5xl">Đặt lịch thành công</h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-[#949494]">
            Lịch hẹn của bạn đã được xác nhận. Xem chi tiết và theo dõi lịch hẹn tại ‘Lịch sử đặt lịch’.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-5">
          <Link to="/" className="rounded bg-secondary px-6 py-3 text-sm font-bold uppercase tracking-[0.46px] shadow-elevation">
            Trở về trang chủ
          </Link>
<<<<<<< HEAD
          <Link to="/appointment/history" className="rounded border border-secondary px-6 py-3 text-sm font-medium uppercase tracking-[0.46px]">
            Chi tiết lịch hẹn
          </Link>
=======
          <button type="button" className="rounded border border-secondary px-6 py-3 text-sm font-medium uppercase tracking-[0.46px]">
            Chi tiết lịch hẹn
          </button>
>>>>>>> origin/Fix-ShopPage-Dich-vu
        </div>
      </div>
    </div>
  );
}

export default BookingSuccessModal;
