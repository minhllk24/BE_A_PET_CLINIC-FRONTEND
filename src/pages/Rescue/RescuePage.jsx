import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Circle, Link as LinkIcon, MapPin, Phone } from "lucide-react";
import CanvasLayout from "../../components/layout/CanvasLayout";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navbar";
import AdoptionApplicationModal from "../../components/rescue/AdoptionApplicationModal";
import { rescueImages } from "../../assets/rescueImages";
import { RESCUE_PARTNERS, RESCUE_PETS } from "../../data/rescueData";

const STATUS_FILTERS = [
  { label: "Tất cả trạng thái", value: "all" },
  { label: "Còn chờ", value: "waiting" },
  { label: "Đã có tổ ấm", value: "adopted" },
];
const RESCUE_PAGE_SIZE = 6;

function SectionLabel({ children }) {
  return (
    <div className="inline-flex h-[24px] items-center gap-2 rounded-full bg-[#FDD835] px-3 text-[11px] font-bold leading-none text-[#715B00]">
      {children}
    </div>
  );
}

function RescuePetCard({ pet, onAdopt }) {
  const adopted = pet.state === "adopted";

  return (
    <article className="relative flex h-[625px] w-[380px] flex-col overflow-hidden rounded-[2px] border border-[rgba(208,198,174,0.6)] bg-[#FAF9F6] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
      <div className="h-2 w-full bg-gradient-to-r from-[#0D47A1] via-[#FDD835] to-[#79CCF2]" />
      <div className="px-4 pb-2 pt-4">
        <div className="h-[217px] overflow-hidden rounded-[2px] border-2 border-white bg-[#D9E3F6] p-0.5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <img src={pet.image} alt={pet.name} className="h-full w-full object-cover" />
        </div>
      </div>

      {adopted ? (
        <div className="absolute left-4 top-4 flex h-[39px] items-center gap-2 rounded-full border-2 border-white bg-[#0058BE] px-[18px] text-[12px] uppercase tracking-[0.6px] text-white">
          <Circle className="h-[11px] w-[11px] fill-white" />
          {pet.ribbon}
        </div>
      ) : (
        <div className="absolute right-[-42px] top-[18px] rotate-45 border-b border-[#0D47A1] bg-[#FCD34D] px-10 pb-[5px] pt-1 text-[11px] uppercase tracking-[1.1px] text-[rgba(0,0,0,0.87)]">
          {pet.ribbon}
        </div>
      )}

      <div className="flex flex-1 flex-col px-5 pb-5 pt-2">
        <p className="py-2 text-[16px] leading-6 text-[rgba(0,0,0,0.87)]">{pet.description}</p>
        <div className="border-y border-dashed border-[rgba(208,198,174,0.5)] pb-[9px] pt-[11px]">
          <h3 className="text-[24px] font-bold leading-8 text-[#121C2A]">Tình trạng</h3>
          <p className="mt-1 text-[14px] leading-5 tracking-[0.28px] text-[rgba(0,0,0,0.87)]">
            {pet.status}
          </p>
        </div>
        <div className="pt-[10px]">
          <h3 className="text-[24px] font-bold leading-8 text-[#121C2A]">Cần hỗ trợ</h3>
          <p className="mt-1 min-h-[40px] text-[14px] leading-5 tracking-[0.28px] text-[rgba(0,0,0,0.87)]">
            {pet.need}
          </p>
        </div>
        {!adopted && (
          <div className="mt-auto flex flex-col gap-2">
            <button
              type="button"
              onClick={() => onAdopt(pet)}
              className="h-9 rounded-[2px] bg-[#FDD835] text-[14px] leading-5 tracking-[0.28px] text-[rgba(0,0,0,0.87)] shadow-[0_1px_1px_rgba(0,0,0,0.05)] transition-colors hover:bg-[#FBC02D]"
            >
              Nhận nuôi ngay
            </button>
            <button className="h-[38px] rounded-[2px] border border-white bg-[#0D47A1] text-[14px] leading-5 tracking-[0.28px] text-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
              Liên hệ để hỗ trợ
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

function PartnerCard({ partner }) {
  const description = Array.isArray(partner.description) ? partner.description : [partner.description];

  return (
    <article className="flex h-[406px] w-[357.333px] flex-col rounded-[32px] border border-[#D9E3F6] bg-white p-px shadow-[0_10px_30px_rgba(59,130,246,0.15)]">
      <div className="flex h-full flex-col p-[25px]">
        <div className="flex gap-6 pb-4">
          <img src={partner.image} alt={partner.name} className="h-20 w-20 shrink-0 rounded-[32px] object-cover" />
          <div className="flex min-w-0 flex-col gap-2">
            <a
              href={partner.href}
              target="_blank"
              rel="noreferrer"
              className="w-[188px] text-[24px] font-normal leading-7 text-[#0058BE] hover:underline"
            >
              {partner.name}
            </a>
            <div className="flex items-center gap-2 text-[14px] leading-5 tracking-[0.28px] text-[#4F606A]">
              <MapPin className="h-[15px] w-3 shrink-0" />
              <span className="whitespace-nowrap">{partner.region}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-[16px] leading-6 text-[#4F606A]">
          <p className="min-h-[48px] italic">{partner.address}</p>
          <div className="h-24">
            {description.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div className="mt-auto flex justify-center gap-4 py-6">
          <button className="flex h-[52px] w-[146px] items-center justify-center gap-2 rounded-full bg-[#FCD34D] text-[14px] leading-5 tracking-[0.28px] text-[#715B00]">
            <Phone className="h-[13.5px] w-[13.5px]" />
            Gọi ngay
          </button>
          <a
            href={partner.href}
            target="_blank"
            rel="noreferrer"
            className="flex h-[52px] w-[145.67px] items-center justify-center gap-2 rounded-full bg-[#0058BE] pr-[0.36px] text-[14px] leading-5 tracking-[0.28px] text-white"
          >
            <LinkIcon className="h-[13.5px] w-[13.5px]" />
            Ghé thăm
          </a>
        </div>
      </div>
    </article>
  );
}

export default function RescuePage() {
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAdoptionPet, setSelectedAdoptionPet] = useState(null);

  const filteredPets = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLocaleLowerCase("vi");
    return RESCUE_PETS.filter((pet) => {
      const matchesStatus = status === "all" || pet.state === status;
      const matchesKeyword =
        !normalizedKeyword ||
        [pet.name, pet.description, pet.status, pet.need].some((value) =>
          value.toLocaleLowerCase("vi").includes(normalizedKeyword),
        );
      return matchesStatus && matchesKeyword;
    });
  }, [keyword, status]);
  const totalPages = Math.max(1, Math.ceil(filteredPets.length / RESCUE_PAGE_SIZE));
  const pets = filteredPets.slice(
    (currentPage - 1) * RESCUE_PAGE_SIZE,
    currentPage * RESCUE_PAGE_SIZE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, status]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  return (
    <div className="min-h-screen bg-white">
      <CanvasLayout>
        <NavBar />
        <main className="relative min-h-[1985px] overflow-hidden bg-[#E5F6FD] px-[120px] pb-[84px] pt-[34px]">
          <section className="relative flex h-[486px] items-start">
            <div className="w-[550px] pt-[34px]">
              <SectionLabel>Tìm một người bạn thân</SectionLabel>
              <h1 className="mt-5 w-[540px] font-display text-[64px] font-bold leading-[62px] text-[#111827]">
                Mọi chiếc đuôi đều xứng đáng có một <span className="text-[#FF9800]">tổ ấm </span><span className="text-[#0D47A1]">yêu thương </span>
              </h1>
              <p className="mt-7 w-[480px] text-[16px] leading-6 text-[#414753]">
                Từ hôm nay, danh mục cứu trợ là nơi để bạn chung tay giúp đỡ hoặc mở cửa nhà đón một bạn nhỏ cần được yêu thương.
              </p>
            </div>

            <div className="relative ml-[92px] mt-2 h-[470px] w-[520px]">
              <div className="absolute right-0 top-0 h-[450px] w-[480px] rounded-[50%] bg-[#C7DAF7]" />
              <div className="absolute left-3 top-7 h-[422px] w-[422px] overflow-hidden rounded-full border-[10px] border-white shadow-[0_18px_35px_rgba(13,71,161,0.16)]">
                <img src={rescueImages.heroFamily} alt="Người nhận nuôi ôm chú chó" className="h-full w-full object-cover" />
              </div>
              <div className="absolute bottom-[58px] left-[26px] flex h-[54px] w-[164px] items-center gap-3 rounded-[18px] bg-white px-4 shadow-[0_12px_26px_rgba(13,71,161,0.16)]">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#FDD835] text-[15px] font-bold text-[#715B00]">+</span>
                <div>
                  <p className="text-[16px] font-bold leading-5 text-[#0D47A1]">1200+</p>
                  <p className="text-[10px] leading-3 text-[#64748B]">Thú cưng đã tìm được nhà</p>
                </div>
              </div>
            </div>
          </section>

          <section className="relative">
            <SectionLabel>Đang cần được hỗ trợ</SectionLabel>
            <h2 className="mt-3 text-[40px] font-bold leading-[48px] text-[#111827]">Tìm kiếm người bạn bốn chân</h2>
            <img src={rescueImages.yellowDoodle} alt="" className="absolute left-[930px] top-[18px] h-[38px] w-[55px]" />

            <div className="mt-7 grid w-[1180px] grid-cols-3 gap-x-5 gap-y-8">
              {pets.map((pet) => (
                <RescuePetCard key={pet.id} pet={pet} onAdopt={setSelectedAdoptionPet} />
              ))}
            </div>

            <div className="mt-8 flex justify-center gap-3 text-[#0D47A1]">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="grid h-8 w-8 place-items-center rounded-full border border-[#90CAF9] bg-white transition-colors hover:bg-[#E3F2FD] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Trang trước"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                const isActive = page === currentPage;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`grid h-8 w-8 place-items-center rounded-full text-[13px] transition-colors ${
                      isActive
                        ? "bg-[#0D47A1] text-white"
                        : "border border-[#90CAF9] bg-white text-[#0D47A1] hover:bg-[#E3F2FD]"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className="grid h-8 w-8 place-items-center rounded-full border border-[#90CAF9] bg-white transition-colors hover:bg-[#E3F2FD] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Trang sau"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </section>

          <section className="mt-[54px] rounded-[22px] border-4 border-[#0D47A1] border-r-[#FDD835] bg-white px-[54px] py-[38px]">
            <blockquote className="w-[1200px] text-[24px] font-bold leading-8 text-[#0D47A1]">
              “Cứu một con vật không thay đổi thế giới, nhưng với nó, thế giới đã thay đổi hoàn toàn.”
            </blockquote>
            <p className="mt-4 w-[1200px] text-[15px] leading-6 text-[#414753]">
              Hãy cùng chúng tôi xây dựng mạng lưới cứu trợ vững mạnh nhất để không một mảnh đời nhỏ bé nào bị bỏ phía sau.
            </p>
          </section>

          <section className="relative mt-[70px]">
            <SectionLabel>Kết nối hỗ trợ</SectionLabel>
            <h2 className="mt-3 text-[40px] font-bold leading-[48px] text-[#111827]">Mạng lưới đối tác cứu trợ</h2>
            <p className="mt-3 text-[16px] leading-6 text-[#475569]">
              Danh sách các đơn vị cứu hộ và trạm tạm trú đang đồng hành trong hành trình vì thú cưng.
            </p>
            <img src={rescueImages.yellowDoodle} alt="" className="absolute right-[170px] top-6 h-[74px] w-[124px]" />

            <div className="mt-9 grid w-[1200px] grid-cols-3 gap-8">
              {RESCUE_PARTNERS.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </div>
          </section>
        </main>
        <Footer variant="white" />
      </CanvasLayout>
      <AdoptionApplicationModal
        open={Boolean(selectedAdoptionPet)}
        pet={selectedAdoptionPet}
        onClose={() => setSelectedAdoptionPet(null)}
      />
    </div>
  );
}
