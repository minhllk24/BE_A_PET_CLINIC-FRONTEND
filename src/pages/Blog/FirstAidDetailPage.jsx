import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Phone,
  Play,
  Siren,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../../components/layout/Breadcrumb";
import CanvasLayout from "../../components/layout/CanvasLayout";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import {
  FIRST_AID_POSTS,
  getFirstAidDetail,
} from "../../data/firstAidData";
import { getFirstAidGuideBySlug, getFirstAidGuidesPage } from "../../services/contentService";

function EmergencySupport() {
  return (
    <aside className="relative flex h-[364px] w-[373px] shrink-0 flex-col justify-center gap-6 rounded-[32px] border-l-4 border-[#C62828] bg-white px-10 shadow-md">
      <h2 className="flex items-center gap-2 text-[24px] font-semibold leading-8 text-[#C62828]">
        <Phone className="h-[18px] w-[18px]" />
        Gọi hỗ trợ ngay!
      </h2>
      <p className="text-[16px] leading-6">Bác sĩ trực tuyến luôn sẵn sàng hướng dẫn bạn qua video call 24/7.</p>
      <div className="flex flex-col gap-4">
        <a href="tel:0868686868" className="flex h-14 items-center justify-center rounded-full bg-[#D32F2F] text-[15px] font-bold uppercase tracking-[0.46px] text-white shadow-elevation transition-transform hover:scale-[1.02]">
          Gọi ngay 0868686868
        </a>
        <Link to="/booking" className="flex h-[60px] items-center justify-center rounded-full border-2 border-[#FDD835] bg-[#FFF9C4] text-[16px] font-bold">
          Đặt lịch khám ngay
        </Link>
      </div>
    </aside>
  );
}

function StepSection({ steps }) {
  return (
    <section className="pt-10">
      <div className="flex items-center gap-[30px]">
        <h2 className="text-[32px] font-semibold leading-10 tracking-[-0.32px] text-[#121C2A]">Các bước sơ cứu tại chỗ</h2>
        <div className="flex gap-2">
          {["Thực hiện chậm", "Quan sát kỹ"].map((label) => (
            <span key={label} className="rounded-full bg-[#C62828] px-4 py-1 text-[14px] font-semibold leading-5 tracking-[0.28px] text-white">{label}</span>
          ))}
        </div>
      </div>
      <ol className="mt-10 grid grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <li key={step.title} className="min-h-[342px] rounded-[32px] border border-[#7A8494] bg-white p-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FDD835] text-[24px] font-semibold text-[#005AB4]">{index + 1}</span>
            <h3 className="mt-2 text-[24px] font-semibold leading-8 text-[#005AB4]">{step.title}</h3>
            <p className="mt-2 text-[16px] leading-[26px]">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function VideoSection({ video }) {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="mt-6 flex min-h-[405px] items-center rounded-[32px] bg-[#0D47A1] px-16 text-white shadow-[0_12px_25px_rgba(13,71,161,0.2)]">
      <div className="w-[532px]">
        <h2 className="text-[32px] font-semibold leading-10">{video.title}</h2>
        <p className="mt-4 text-[16px] leading-6">{video.description}</p>
        <ul className="mt-4 space-y-2">
          {video.highlights.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[16px] leading-6"><CheckCircle2 className="h-4 w-4" /> {item}</li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={() => setPlaying((value) => !value)}
        className="ml-10 flex h-[281px] w-[500px] items-center justify-center rounded-[32px] border border-[#C1C6D5] bg-black"
        aria-label={playing ? "Tạm dừng video" : "Phát video hướng dẫn"}
      >
        <span className={`flex h-20 w-20 items-center justify-center rounded-full bg-[#FDD835] text-black transition-transform ${playing ? "scale-90" : "hover:scale-105"}`}>
          <Play className="ml-1 h-7 w-7 fill-current" />
        </span>
      </button>
    </section>
  );
}

function RelatedSection({ currentId, posts: sourcePosts = FIRST_AID_POSTS }) {
  const posts = useMemo(() => sourcePosts.filter((post) => post.id !== currentId), [currentId, sourcePosts]);
  const [start, setStart] = useState(0);
  if (!posts.length) return null;
  const visiblePosts = Array.from({ length: 3 }, (_, index) => posts[(start + index) % posts.length]);
  const move = (amount) => setStart((value) => (value + amount + posts.length) % posts.length);

  return (
    <section className="pt-10">
      <div className="flex items-center gap-4">
        <h2 className="shrink-0 text-[20px] font-semibold uppercase leading-8 text-[#0D47A1]">Các kiến thức sơ cứu quan trọng khác</h2>
        <div className="h-1 flex-1 rounded-full bg-[#FDD835]" />
      </div>
      <div className="relative mt-10 grid grid-cols-3 gap-6">
        {visiblePosts.map((post) => (
          <Link key={post.id} to={`/blog/so-cuu/${post.id}`} className="group flex min-h-[390px] flex-col rounded-[32px] bg-white p-10 shadow-sm transition-transform hover:-translate-y-1">
            {post.image && <img src={post.image} alt="" className="mb-4 h-40 w-full rounded-[16px] object-cover" />}
            <p className="mt-auto text-[12px] font-semibold uppercase text-[#0D47A1]">{post.categoryLabel}</p>
            <h3 className="mt-3 text-[22px] font-semibold leading-8">{post.title}</h3>
            <p className="mt-3 text-[14px] leading-5">{post.description}</p>
            <span className="mt-4 flex items-center gap-2 font-semibold text-[#0D47A1]">Đọc ngay <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
          </Link>
        ))}
        <button type="button" onClick={() => move(-1)} className="absolute -left-12 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#FDD835]" aria-label="Bài trước"><ChevronLeft /></button>
        <button type="button" onClick={() => move(1)} className="absolute -right-12 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#FDD835]" aria-label="Bài tiếp theo"><ChevronRight /></button>
      </div>
    </section>
  );
}

export default function FirstAidDetailPage() {
  const { isAuthenticated } = useAuth();
  const { postId } = useParams();
  const fallbackDetail = useMemo(() => getFirstAidDetail(postId), [postId]);
  const [detail, setDetail] = useState(fallbackDetail);
  const [relatedPosts, setRelatedPosts] = useState(FIRST_AID_POSTS);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;
    setDetail(fallbackDetail);
    setIsLoading(true);
    setLoadError("");

    Promise.all([
      getFirstAidGuideBySlug(postId),
      getFirstAidGuidesPage({ limit: 12 }),
    ])
      .then(([apiDetail, apiGuides]) => {
        if (!active) return;
        setDetail(apiDetail);
        if (apiGuides.guides.length) {
          setRelatedPosts(apiGuides.guides.filter((item) => item.id !== apiDetail.id));
        }
      })
      .catch((error) => {
        if (!active) return;
        setLoadError(error?.message || "Không thể tải hướng dẫn sơ cứu, đang hiển thị dữ liệu mẫu từ giao diện.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [fallbackDetail, postId]);

  return (
    <div className="min-h-screen bg-white">
      <CanvasLayout>
        <NavBar isAuthenticated={isAuthenticated} />
        <main className="flex flex-col items-center bg-[#E5F6FD] pb-8 pt-6">
          <div className="w-[1200px]">
            <Breadcrumb
              variant="blog"
              items={[
                { label: "Trang chủ", to: "/" },
                { label: "Blog", to: "/blog" },
                { label: "Cẩm nang sơ cứu", to: "/blog/so-cuu" },
                { label: detail.categoryLabel, to: `/blog/so-cuu?category=${detail.category}` },
                { label: detail.title },
              ]}
            />
            <section className="mt-6 flex">
              <div className="relative h-[364px] w-[861px] overflow-hidden rounded-[32px]">
                <img src={detail.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-white/50" />
                <div className="relative flex h-full max-w-[760px] flex-col justify-center p-6">
                  <span className="flex w-fit items-center gap-2 rounded-full bg-[#FFDAD6] px-4 py-2 text-[14px] font-semibold text-[#C62828]"><Siren className="h-4 w-4" /> CẤP CỨU KHẨN CẤP</span>
                  <h1 className="mt-4 text-[48px] font-bold leading-[60px] tracking-[-0.96px] text-[#FDD835]">{detail.heroTitle}</h1>
                  <p className="mt-3 max-w-[672px] text-[18px] leading-7 text-white">{detail.description}</p>
                </div>
              </div>
              <div className="-ml-[34px] relative z-10"><EmergencySupport /></div>
            </section>
            {isLoading && (
              <div className="mt-4 rounded-[16px] bg-white px-6 py-3 text-[#0D47A1]">
                Đang tải hướng dẫn sơ cứu...
              </div>
            )}
            {loadError && (
              <div className="mt-4 rounded-[16px] bg-white px-6 py-3 text-[#0D47A1]">
                {loadError}
              </div>
            )}
            <StepSection steps={detail.steps} />
            <VideoSection video={detail.video} />
            <RelatedSection currentId={detail.id} posts={relatedPosts} />
          </div>
        </main>
        <Footer variant="white" />
      </CanvasLayout>
    </div>
  );
}
