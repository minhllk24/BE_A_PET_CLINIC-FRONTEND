import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CalendarDays,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import CanvasLayout from "../../components/layout/CanvasLayout";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navbar";
import BlogCard, { CategoryIcon } from "../../components/blog/BlogCard";
import { blogImages } from "../../assets/blogImages";
import { productImages } from "../../assets/productImages";
import { useAuth } from "../../context/AuthContext";
import {
  BLOG_CATEGORIES,
  FEATURED_BLOG_POST,
  ALL_BLOG_POSTS,
  TRENDING_BLOG_POSTS,
} from "../../data/blogData";
import {
  getBlogCategories,
  getFeaturedPost,
  getPostsPage,
  getTrendingPosts,
} from "../../services/contentService";

const PAGE_SIZE = 8;

function FeaturedPost({ post = FEATURED_BLOG_POST }) {
  const href = `/blog/${post.id}`;

  return (
    <Link to={href} className="group relative flex h-[452px] w-[1200px] overflow-hidden rounded-[32px] border border-[#FFF7ED] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-transform hover:-translate-y-0.5">
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
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FDD835] text-[#0D47A1] transition-transform group-hover:scale-105">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function TrendingSection({ posts = TRENDING_BLOG_POSTS }) {
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
              {direction < 0 ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </div>
      <div ref={scrollRef} className="mt-6 flex gap-6 overflow-x-hidden pb-6">
        {posts.map((post) => (
          <Link key={post.id} to={`/blog/${post.id}`} className="group flex h-[130px] w-[320px] shrink-0 gap-4 rounded-[16px] border border-[#E3F2FD] bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <img src={post.image} alt="" className="h-24 w-24 rounded-[12px] object-cover" />
            <div className="flex min-w-0 flex-col justify-center">
              <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.5px] text-[#0D47A1]">
                <CategoryIcon category={post.category} className="h-3 w-3" />
                {post.categoryLabel}
              </p>
              <h3 className="mt-1 line-clamp-3 text-[14px] leading-[19px] text-[rgba(0,0,0,0.87)] transition-colors group-hover:text-[#0D47A1]">{post.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function BlogPage() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialKeyword = searchParams.get("keyword") || "";
  const [category, setCategory] = useState(
    BLOG_CATEGORIES.some((item) => item.id === initialCategory) ? initialCategory : "all",
  );
  const [search, setSearch] = useState(initialKeyword);
  const [searchQuery, setSearchQuery] = useState(initialKeyword);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [categories, setCategories] = useState(BLOG_CATEGORIES);
  const [featuredPost, setFeaturedPost] = useState(FEATURED_BLOG_POST);
  const [trendingPosts, setTrendingPosts] = useState(TRENDING_BLOG_POSTS);
  const [allPosts, setAllPosts] = useState(ALL_BLOG_POSTS);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [apiEmptyMessage, setApiEmptyMessage] = useState("");

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const nextCategory = categories.some((item) => item.id === categoryParam)
      ? categoryParam
      : "all";
    const keyword = searchParams.get("keyword") || "";
    setCategory(nextCategory);
    setSearch(keyword);
    setSearchQuery(keyword);
    setVisibleCount(PAGE_SIZE);
  }, [categories, searchParams]);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setLoadError("");
    setApiEmptyMessage("");

    Promise.all([
      getBlogCategories(),
      getFeaturedPost(),
      getTrendingPosts(5),
      getPostsPage({ type: "official_blog", limit: 100 }),
    ])
      .then(async ([apiCategories, apiFeatured, apiTrending, apiPosts]) => {
        if (!active) return;
        if (apiCategories.length > 1) setCategories(apiCategories);
        if (apiFeatured) setFeaturedPost(apiFeatured);
        if (apiTrending.length) setTrendingPosts(apiTrending);
        if (apiPosts.posts.length) {
          setAllPosts(apiPosts.posts);
          return;
        }

        const allApiPosts = await getPostsPage({ limit: 100 });
        if (!active) return;

        const officialPosts = allApiPosts.posts.filter((post) => post.section === "knowledge");
        if (officialPosts.length) {
          setAllPosts(officialPosts);
          return;
        }

        setApiEmptyMessage("API blog chưa có dữ liệu, đang hiển thị dữ liệu mẫu từ giao diện.");
      })
      .catch((error) => {
        if (!active) return;
        setApiEmptyMessage(error?.message || "Không thể tải bài viết mới nhất, đang hiển thị dữ liệu mẫu từ giao diện.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (location.hash !== "#latest-posts") return;
    window.requestAnimationFrame(() => {
      document.getElementById("latest-posts")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.hash, category]);

  const filteredPosts = useMemo(() => {
    const keyword = searchQuery.trim().toLocaleLowerCase("vi");
    return allPosts.filter((post) => {
      if (category !== "all" && post.category !== category) return false;
      if (!keyword) return true;
      return [post.title, post.excerpt, post.categoryLabel].some((value) =>
        value.toLocaleLowerCase("vi").includes(keyword),
      );
    });
  }, [allPosts, category, searchQuery]);
  const posts = filteredPosts.slice(0, visibleCount);
  const total = filteredPosts.length;

  const updateParams = (nextCategory, keyword) => {
    const params = {};
    if (nextCategory !== "all") params.category = nextCategory;
    if (keyword) params.keyword = keyword;
    setSearchParams(params);
  };

  const selectCategory = (id) => {
    setCategory(id);
    setVisibleCount(PAGE_SIZE);
    updateParams(id, searchQuery);
  };

  const submitSearch = () => {
    const keyword = search.trim();
    setSearchQuery(keyword);
    setVisibleCount(PAGE_SIZE);
    updateParams(category, keyword);
  };

  return (
    <div className="min-h-screen bg-white">
      <CanvasLayout>
        <NavBar isAuthenticated={isAuthenticated} />
        <main className="flex min-h-[1931px] flex-col items-center gap-3 bg-[#E5F6FD] pb-6">
          <nav className="flex h-14 w-[1200px] items-center gap-10 pr-16 text-[16px]">
            <button type="button" className="h-full border-b-2 border-[#0D47A1] pb-0.5 font-bold text-[#0D47A1]">
              Kiến thức thú cưng
            </button>
            <Link to="/blog/cong-dong" className="font-medium text-[#4B5563]">Cộng đồng chia sẻ</Link>
            <Link to="/blog/so-cuu" className="font-medium text-[#4B5563]">Cẩm nang sơ cứu</Link>
          </nav>

          <section className="flex w-[1200px] items-end justify-between pb-5">
            <div>
              <h1 className="flex items-center gap-1 text-[40px] font-bold leading-[48px] tracking-[-0.8px]">
                Kiến thức<span className="text-[#0D47A1]">thú cưng</span>
                <img src={blogImages.titlePet} alt="" className="h-12 w-12 object-contain" />
              </h1>
              <p className="mt-2 text-[16px] leading-6 text-[#4B5563]">Kiến thức chăm sóc thú cưng từ chuyên gia!!</p>
            </div>
          </section>

          <FeaturedPost post={featuredPost} />
          <TrendingSection posts={trendingPosts} />

          <section id="latest-posts" className="mt-1 flex w-[1202px] scroll-mt-4 flex-col items-center gap-8 pt-4">
            <div className="flex w-full items-center gap-2">
              <h2 className="shrink-0 text-[24px] font-bold leading-8 text-[#111827]">Bài viết</h2>
              <div className="ml-2 h-1 flex-1 bg-[#FDD835]" />
              <div className="flex gap-3">
                {categories.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => selectCategory(item.id)}
                    className={`flex items-center gap-2 rounded-full border px-5 py-2 text-[16px] leading-6 transition-all ${
                      category === item.id
                        ? "border-[#0D47A1] bg-[#0D47A1] font-bold text-white shadow-md"
                        : "border-[#0D47A1] bg-white text-[rgba(0,0,0,0.87)] hover:bg-[#E3F2FD]"
                    }`}
                  >
                    <CategoryIcon category={item.id} className="h-4 w-4" />
                    {item.label}
                  </button>
                ))}
              </div>              
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                submitSearch();
              }}
              className="flex h-[56px] w-full items-center justify-between rounded-[42px] border border-[rgba(25,118,210,0.5)] bg-white/80 py-2 pl-6 pr-2 backdrop-blur-[11px]"
            >
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Bạn đang tìm kiếm bài viết gì?"
                className="min-w-0 flex-1 bg-transparent text-[16px] text-[#5F5F5F] outline-none placeholder:text-[#5F5F5F]"
              />
              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#0D47A1] transition-colors hover:bg-[#FFF176]"
                aria-label="Tìm kiếm bài viết"
              >
                <img src={productImages.searchIcon} alt="" className="h-6 w-6" />
              </button>
            </form>
            {searchQuery && (
              <p className="-mt-5 w-full text-[16px] leading-6 text-[#414753]">
                Kết quả tìm kiếm cho &quot;{searchQuery}&quot;
              </p>
            )}
            {loadError && (
              <p className="-mt-5 w-full text-[14px] leading-5 text-[#D32F2F]">
                {loadError}
              </p>
            )}
            {apiEmptyMessage && !loadError && (
              <p className="-mt-5 w-full text-[14px] leading-5 text-[#0D47A1]">
                {apiEmptyMessage}
              </p>
            )}
            {isLoading ? (
              <div className="flex h-48 w-full items-center justify-center rounded-[24px] bg-white/70 text-[18px] text-[#0D47A1]">
                Đang tải bài viết...
              </div>
            ) : posts.length ? (
              <div className="grid w-full grid-cols-4 gap-x-[16px] gap-y-8">
                {posts.map((post) => <BlogCard key={post.id} post={post} />)}
              </div>
            ) : (
              <div className="flex h-48 w-full items-center justify-center rounded-[24px] bg-white/70 text-[18px] text-[#414753]">
                Không tìm thấy bài viết phù hợp.
              </div>
            )}
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
