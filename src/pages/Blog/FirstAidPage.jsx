import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Lightbulb,
  PhoneCall,
  Search,
  Siren,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { blogImages } from "../../assets/blogImages";
import CanvasLayout from "../../components/layout/CanvasLayout";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { FIRST_AID_CATEGORIES, FIRST_AID_POSTS } from "../../data/firstAidData";
import { getFirstAidCategories, getFirstAidGuidesPage } from "../../services/contentService";

const PAGE_SIZE = 5;

function FirstAidTabs() {
  return (
    <nav className="flex h-14 w-[1200px] items-center gap-10 text-[16px]">
      <Link to="/blog/kien-thuc" className="font-medium text-[#4B5563]">Kiến thức thú cưng</Link>
      <Link to="/blog/cong-dong" className="font-medium text-[#4B5563]">Cộng đồng chia sẻ</Link>
      <span className="flex h-full items-center border-b-2 border-[#0D47A1] pb-0.5 font-bold text-[#0D47A1]">Cẩm nang sơ cứu</span>
    </nav>
  );
}

function FirstAidCard({ post }) {
  const isUrgent = post.variant === "urgent";
  const hasImage = Boolean(post.image);

  return (
    <Link
      to={`/blog/so-cuu/${post.id}`}
      className={`group relative overflow-hidden rounded-[32px] border border-[#D9E3F6] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${
        isUrgent ? "col-span-8 min-h-[420px]" : "col-span-4 min-h-[300px]"
      }`}
    >
      <div className={`${isUrgent ? "grid h-full grid-cols-2" : "flex h-full flex-col"}`}>
        {hasImage && (
          <div className={`relative overflow-hidden ${isUrgent ? "h-full" : "h-[178px]"}`}>
            <img src={post.image} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
            {post.urgent && (
              <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-[#FFDAD6] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.3px] text-[#C62828]">
                <Siren className="h-4 w-4" /> Cấp cứu khẩn cấp
              </span>
            )}
          </div>
        )}
        <div className={`flex flex-1 flex-col justify-center ${isUrgent ? "p-10" : "p-8"}`}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.3px] text-[#0D47A1]">{post.categoryLabel}</p>
          <h2 className={`mt-3 font-semibold leading-tight text-[rgba(0,0,0,0.87)] ${isUrgent ? "text-[26px]" : "text-[20px]"}`}>{post.title}</h2>
          <p className="mt-4 text-[14px] leading-5 text-[#414753]">{post.description}</p>
          <span className="mt-6 flex items-center gap-2 text-[13px] font-semibold text-[#005AB4]">
            Đọc ngay <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function SupportCards() {
  return (
    <div className="mt-6 grid w-full grid-cols-12 gap-6">
      <article className="col-span-4 flex min-h-[210px] flex-col justify-center rounded-[32px] bg-[#FFF9C4] p-10">
        <h2 className="flex items-center gap-2 text-[20px] font-semibold text-[#F57F17]"><Lightbulb className="h-5 w-5" /> Mẹo hữu ích</h2>
        <p className="mt-4 text-[14px] leading-5 text-[#414753]">Luôn để sẵn số điện thoại bác sĩ thú y trong danh bạ nhanh và chuẩn bị một bộ sơ cứu cơ bản tại nhà.</p>
      </article>
      <article className="col-span-8 flex min-h-[210px] items-center justify-between rounded-[32px] bg-[#B3E5FC] px-14 py-10">
        <div className="max-w-[430px]">
          <h2 className="text-[22px] font-semibold text-[#1A1C1C]">Không tìm thấy tình huống của bạn?</h2>
          <p className="mt-3 text-[14px] leading-5 text-[#414753]">Hệ thống hotline 24/7 của chúng tôi luôn sẵn sàng hỗ trợ bạn bất kỳ lúc nào.</p>
        </div>
        <a href="tel:0868686868" className="flex items-center gap-2 rounded-full bg-[#D32F2F] px-8 py-3 text-[13px] font-bold text-white shadow-md">
          <PhoneCall className="h-4 w-4" /> GỌI NGAY
        </a>
      </article>
    </div>
  );
}

export default function FirstAidPage() {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");
  const [category, setCategory] = useState(
    FIRST_AID_CATEGORIES.some((item) => item.id === initialCategory) ? initialCategory : "all",
  );
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [categories, setCategories] = useState(FIRST_AID_CATEGORIES);
  const [allPosts, setAllPosts] = useState(FIRST_AID_POSTS);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [apiEmptyMessage, setApiEmptyMessage] = useState("");

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setLoadError("");
    setApiEmptyMessage("");

    Promise.all([
      getFirstAidCategories(),
      getFirstAidGuidesPage({ limit: 100 }),
    ])
      .then(([apiCategories, apiGuides]) => {
        if (!active) return;
        if (apiCategories.length > 1) setCategories(apiCategories);
        if (apiGuides.guides.length) {
          setAllPosts(apiGuides.guides);
          return;
        }

        setApiEmptyMessage("API cẩm nang sơ cứu chưa có dữ liệu, đang hiển thị dữ liệu mẫu từ giao diện.");
      })
      .catch((error) => {
        if (!active) return;
        setApiEmptyMessage(error?.message || "Không thể tải cẩm nang sơ cứu, đang hiển thị dữ liệu mẫu từ giao diện.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    setCategory(categories.some((item) => item.id === categoryParam) ? categoryParam : "all");
    setVisibleCount(PAGE_SIZE);
  }, [categories, searchParams]);

  const filteredPosts = useMemo(() => {
    const keyword = search.trim().toLocaleLowerCase("vi");
    return allPosts.filter((post) => {
      if (category !== "all" && post.category !== category) return false;
      return !keyword || [post.title, post.description, post.categoryLabel].some((value) =>
        value.toLocaleLowerCase("vi").includes(keyword),
      );
    });
  }, [allPosts, category, search]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const chooseCategory = (id) => {
    setCategory(id);
    setVisibleCount(PAGE_SIZE);
    setSearchParams(id === "all" ? {} : { category: id });
  };

  return (
    <div className="min-h-screen bg-white">
      <CanvasLayout>
        <NavBar isAuthenticated={isAuthenticated} />
        <main className="flex min-h-[1900px] flex-col items-center bg-[#E5F6FD] pb-12">
          <FirstAidTabs />
          <section className="w-[1200px] pt-6">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="flex items-center gap-2 text-[40px] font-bold leading-[48px] tracking-[-0.8px]">
                  Cẩm nang <span className="text-[#0D47A1]">sơ cứu</span>
                  <img src={blogImages.firstAidTitle} alt="" className="h-12 w-12 object-contain" />
                </h1>
                <p className="mt-2 text-[16px] leading-6 text-[#4B5563]">Tra cứu các triệu chứng và quy trình sơ cứu cơ bản để bảo vệ boss của bạn</p>
              </div>
              <div className="flex gap-3">
                {categories.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => chooseCategory(item.id)}
                    className={`rounded-full border px-5 py-2 text-[16px] transition-colors ${
                      category === item.id ? "border-[#0D47A1] bg-[#0D47A1] font-bold text-white shadow-md" : "border-[#0D47A1] bg-white hover:bg-[#E3F2FD]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="mt-10 flex h-14 w-full items-center rounded-full border border-[rgba(25,118,210,0.5)] bg-white px-6">
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tìm kiếm triệu chứng hoặc tình huống..." className="min-w-0 flex-1 bg-transparent text-[16px] outline-none" />
              <Search className="h-6 w-6 text-[#0D47A1]" />
            </label>

            {loadError && <p className="mt-4 text-[14px] text-[#D32F2F]">{loadError}</p>}
            {apiEmptyMessage && !loadError && <p className="mt-4 text-[14px] text-[#0D47A1]">{apiEmptyMessage}</p>}

            {isLoading ? (
              <div className="mt-12 flex h-48 items-center justify-center rounded-[24px] bg-white/70 text-[18px] text-[#0D47A1]">
                Đang tải cẩm nang sơ cứu...
              </div>
            ) : visiblePosts.length ? (
              <div className="mt-12 grid grid-cols-12 auto-rows-auto gap-6">
                {visiblePosts.map((post) => <FirstAidCard key={post.id} post={post} />)}
              </div>
            ) : (
              <div className="mt-12 flex h-48 items-center justify-center rounded-[24px] bg-white/70 text-[18px] text-[#414753]">
                Không tìm thấy cẩm nang phù hợp.
              </div>
            )}

            <SupportCards />

            {visiblePosts.length < filteredPosts.length && (
              <div className="mt-8 flex justify-center">
                <button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} className="rounded-[4px] bg-[#FFF176] px-8 py-3 text-[15px] font-medium uppercase tracking-[0.46px] shadow-md hover:bg-[#FDD835]">
                  Xem thêm
                </button>
              </div>
            )}
          </section>
        </main>
        <Footer variant="white" />
      </CanvasLayout>
    </div>
  );
}
