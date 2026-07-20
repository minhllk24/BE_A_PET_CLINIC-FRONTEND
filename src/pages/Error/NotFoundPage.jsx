import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navbar";
import sleepingPetImage from "../../assets/images/not-found/sleeping-pet.png";
import tennisBallImage from "../../assets/images/not-found/tennis-ball.png";

const NOT_FOUND_COPY = {
  title: "Ôi, trang này ngủ mất rồi!",
  description:
    "Có vẻ một bạn thú cưng đã tha mất trang bạn đang tìm. Để\nDr. Pet’s House dẫn bạn về chỗ an toàn nhé!",
  actionLabel: "VỀ TRANG CHỦ",
  homePath: "/",
};

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <NavBar />

      <main className="bg-[#E5F6FD]">
        <section className="relative mx-auto flex min-h-[621px] max-w-page justify-center overflow-hidden px-6 pt-[96px] text-center">
          <div className="relative flex w-full max-w-[670px] flex-col items-center">
            <div className="relative h-[240px] w-full">
              <div
                className="absolute left-[102px] top-0 flex h-[240px] w-[444px] items-start justify-center font-['Baloo_Tamma'] text-[270px] font-normal leading-[0.95] text-[#0D47A1]"
                aria-label="404"
              >
                <span className="w-[164px] text-center">4</span>
                <span className="w-[164px] text-center">0</span>
                <span className="w-[164px] text-center">4</span>
              </div>

              <img
                src={sleepingPetImage}
                alt=""
                className="absolute left-[455px] top-[66px] size-[215px] object-contain"
              />
            </div>

            <img
              src={tennisBallImage}
              alt=""
              className="absolute left-[65%] top-[210px] size-12 -translate-x-1/2 object-contain"
            />

            <h1 className="mt-6 max-w-[649px] text-center text-[52px] font-bold leading-[48px] tracking-[-1.2px] text-black/85">
              {NOT_FOUND_COPY.title}
            </h1>

            <p className="mt-[27px] whitespace-pre-line text-center text-[20px] font-normal leading-[29.25px] text-black/60">
              {NOT_FOUND_COPY.description}
            </p>

            <Link
              to={NOT_FOUND_COPY.homePath}
              className="mt-[43px] inline-flex h-[42px] min-w-[155px] items-center justify-center rounded bg-[#FDD835] px-[22px] text-[15px] font-bold uppercase leading-[26px] tracking-[0.46px] text-black/90 shadow-elevation transition-[background-color,box-shadow,transform] duration-200 hover:bg-[#FBC02D] hover:shadow-[0px_2px_8px_rgba(253,216,53,0.45)] focus-ring-brand active:scale-[0.98]"
            >
              {NOT_FOUND_COPY.actionLabel}
            </Link>
          </div>
        </section>
      </main>

      <Footer variant="white" />
    </div>
  );
}

export default NotFoundPage;
