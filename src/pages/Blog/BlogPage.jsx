import { useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import CanvasLayout from "../../components/layout/CanvasLayout";
import Footer from "../../components/layout/Footer";
import NavBar from "../../components/Navbar";
import BlogCard, { CategoryIcon } from "../../components/blog/BlogCard";
import { blogImages } from "../../assets/blogImages";
import { useAuth } from "../../context/AuthContext";
import {
  BLOG_CATEGORIES,
  FEATURED_BLOG_POST,
  RECENT_BLOG_POSTS,
  TRENDING_BLOG_POSTS,
} from "../../data/blogData";

const PAGE_SIZE = 8;

function FeaturedPost() {
  const post = FEATURED_BLOG_POST;
  return (
    <article className="relative flex h-[452px] w-[1200px] overflow-hidden rounded-[32px] border border-[#FFF7ED] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      <div className="relative h-[450px] w-[690px] shrink-0 overflow-hidden">
        <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
        <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-[#FDD835] px-5 py-2 text-[12px] font-bold uppercase tracking-[0.6px] text-[#D32F2F] shadow-lg">
          <Sparkles className="h-3 w-3" /> Nổi bật
        </div>
      </div>
      <div className="relative -ml-6 my-[7px] flex flex-1 flex-col justify-center rounded-l-[32px] bg-white p-12">
        <p className="flex items-center gap-2 text-[16px] font-bold uppercase tracking-[0.8px] text-[#0D47A1]">
          <CategoryIcon category={post.category} className="h-[17px] w-[17px]" />
          {post.categoryLabel}
        </p>
        <h2 className="mt-3 max-w-[460px] text-[32px] font-bold leading-[40px] text-[#111827]">
          {post.title}
        </h2>
        <p className="mt-4 max-w-[500px] text-[16px] leading-6 text-[#6B7280]">{post.excerpt}</p>
        <div className="mt-6 flex items-center justify-between border-t border-[#FFF7ED] pt-6">
          <div className="flex items-center gap-3">
            <img src={post.authorImage} alt="" className="h-10 w-10 rounded-full border-2 border-[#FFEDD5] object-cover" />
            <div>
              <p className="text-[16px] font-bold leading-6 text-[#111827]">{post.author}</p>
              <p className="flex items-center gap-1 text-[16px] leading-6 text-[#9CA3AF]">
                <CalendarDays className="h-3 w-3" /> {post.publishedAt}
              </p>
            </div>
          </div>
          <Link to={`/blog/${post.id}`} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FDD835] text-[#0D47A1] transition-transform hover:scale-105">
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function TrendingSection() {
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    scrollRef.current?.scrollBy({ left: direction * 344, behavior: "smooth" });
  };

  return (
    <section className="w-[1200px] pt-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-[24px] font-bold leading-8 text-[#111827]">
          <span className="flex h-7 w-9 items-center justify-center rounded-full bg-[#FDD835]">
            <TrendingUp className="h-5 w-5 text-[#0D47A1]" />
          </span>
          Đang là xu hướng
        </h2>
        <div className="flex gap-2">
          {[-1, 1].map((direction) => (
            <button
              key={direction}
              type="button"
              onClick={() => scroll(direction)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FDD835] text-[#0D47A1] transition-transform hover:scale-105"
              aria-label={direction < 0 ? "Bài trước" : "Bài tiếp theo"}
            >
              {direction < 0 ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </div>
      <div ref={scrollRef} className="mt-6 flex gap-6 overflow-x-hidden pb-6">
        {TRENDING_BLOG_POSTS.map((post) => (
          <article key={post.id} className="flex h-[130px] w-[320px] shrink-0 gap-4 rounded-[16px] border border-[#E3F2FD] bg-white p-4 shadow-sm">
            <img src={post.image} alt="" className="h-24 w-24 rounded-[12px] object-cover" />
            <div className="flex min-w-0 flex-col justify-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#0D47A1]">{post.categoryLabel}</p>
              <h3 className="mt-1 line-clamp-3 text-[14px] leading-[19px] text-[rgba(0,0,0,0.87)]">{post.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function BlogPage() {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");
  const [category, setCategory] = useState(
    BLOG_CATEGORIES.some((item) => item.id === initialCategory) ? initialCategory : "all",
  );
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const posts = useMemo(
    () =>
      RECENT_BLOG_POSTS.filter((post) => category === "all" || post.category === category).slice(
        0,
        visibleCount,
      ),
    [category, visibleCount],
  );
  const total = RECENT_BLOG_POSTS.filter(
    (post) => category === "all" || post.category === category,
  ).length;

  const selectCategory = (id) => {
    setCategory(id);
    setVisibleCount(PAGE_SIZE);
    setSearchParams(id === "all" ? {} : { category: id });
  };

  return (
    <div className="min-h-screen bg-white">
      <CanvasLayout>
        <NavBar isAuthenticated={isAuthenticated} />
        <main className="flex min-h-[1931px] flex-col items-center gap-3 bg-[#E5F6FD] pb-6">
          <nav className="flex h-14 w-[1200px] items-center gap-10 pr-16 text-[16px]">
            <button type="button" className="h-full border-b-2 border-[#0D47A1] pb-0.5 font-bold text-[#0D47A1]">
              Blog Nền tảng
            </button>
            <Link to="/blog/community" className="font-medium text-[#4B5563]">Cộng đồng chia sẻ</Link>
          </nav>

          <section className="flex w-[1200px] items-end justify-between pb-5">
            <div>
              <h1 className="flex items-center gap-1 text-[40px] font-bold leading-[48px] tracking-[-0.8px]">
                Khám phá <span className="text-[#0D47A1]">Blog</span>
                <img src={blogImages.titlePet} alt="" className="h-12 w-12 object-contain" />
              </h1>
              <p className="mt-2 text-[16px] leading-6 text-[#4B5563]">Kiến thức chăm sóc thú cưng từ chuyên gia!!</p>
            </div>
            <div className="flex gap-3">
              {BLOG_CATEGORIES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectCategory(item.id)}
                  className={`rounded-full border px-5 py-2 text-[16px] leading-6 transition-all ${
                    category === item.id
                      ? "border-[#0D47A1] bg-[#0D47A1] font-bold text-white shadow-md"
                      : "border-[#0D47A1] bg-white text-[rgba(0,0,0,0.87)] hover:bg-[#E3F2FD]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </section>

          <FeaturedPost />
          <TrendingSection />

          <section className="mt-1 flex w-[1202px] flex-col items-center gap-8 pt-4">
            <div className="flex w-full items-center gap-2">
              <h2 className="shrink-0 text-[24px] font-bold leading-8 text-[#111827]">Bài viết mới nhất</h2>
              <div className="ml-2 h-1 flex-1 bg-[#FDD835]" />
            </div>
            <div className="grid w-full grid-cols-4 gap-x-[16px] gap-y-8">
              {posts.map((post) => <BlogCard key={post.id} post={post} />)}
            </div>
            {posts.length < total && (
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                className="my-4 h-[42px] rounded-[4px] bg-[#FFF176] px-[22px] text-[15px] font-medium uppercase tracking-[0.46px] text-black shadow-elevation hover:bg-[#FDD835]"
              >
                Xem thêm
              </button>
            )}
          </section>
        </main>
        <Footer variant="white" />
      </CanvasLayout>
    </div>
  );
}
