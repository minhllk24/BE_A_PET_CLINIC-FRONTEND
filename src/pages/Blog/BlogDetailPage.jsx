import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import BlogCard from "../../components/blog/BlogCard";
import CanvasLayout from "../../components/layout/CanvasLayout";
import Footer from "../../components/layout/Footer";
import NavBar from "../../components/Navbar";
import ShoppingProductCard from "../../components/product/ShoppingProductCard";
import { useAuth } from "../../context/AuthContext";
import {
  BLOG_CATEGORIES,
  FEATURED_BLOG_POST,
  QUICK_READ_POSTS,
  RECENT_BLOG_POSTS,
} from "../../data/blogData";
import { FEATURED_PRODUCTS } from "../../data/shopData";

function SectionHeading({ children }) {
  return (
    <div className="flex w-full items-center gap-4">
      <h2 className="shrink-0 text-[24px] font-semibold uppercase leading-8 text-[#0D47A1]">
        {children}
      </h2>
      <div className="h-1 flex-1 rounded-full bg-[#FDD835]" />
    </div>
  );
}

function SidebarHeading({ children }) {
  return (
    <div className="flex w-full items-center gap-2">
      <div className="h-1 flex-1 rounded-full bg-[#FDD835]" />
      <h2 className="shrink-0 text-[20px] font-semibold leading-7 text-[#002D62]">{children}</h2>
      <div className="h-1 flex-1 rounded-full bg-[#FDD835]" />
    </div>
  );
}

function BlogSidebar() {
  return (
    <aside className="flex w-[330px] shrink-0 flex-col gap-6 self-start">
      <section className="rounded-[12px] bg-white p-6 shadow-sm">
        <SidebarHeading>XEM NHANH</SidebarHeading>
        <div className="mt-6 flex flex-col gap-4">
          {QUICK_READ_POSTS.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="group flex gap-3">
              <img src={post.image} alt="" className="h-20 w-20 shrink-0 rounded-lg object-cover" />
              <div className="flex min-w-0 flex-col justify-center">
                <h3 className="line-clamp-2 text-[14px] font-semibold leading-5 text-[#1A1C1C] group-hover:text-[#0D47A1]">
                  {post.title}
                </h3>
                <p className="mt-1 text-[12px] font-medium leading-4 text-[#414753]/75">
                  {post.publishedAt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-[12px] bg-white p-6 shadow-sm">
        <SidebarHeading>CHỦ ĐỀ</SidebarHeading>
        <div className="mt-6 flex flex-col gap-6">
          {BLOG_CATEGORIES.filter((item) => item.id !== "all").map((item, index) => (
            <Link
              key={item.id}
              to={`/blog?category=${item.id}`}
              className={`flex h-11 items-center justify-center rounded-[12px] text-[14px] font-semibold tracking-[0.14px] transition-colors hover:bg-[#FFF9C4] hover:text-[#005AB4] ${
                index === 2 ? "bg-[#FFF9C4] text-[#005AB4]" : "text-[rgba(0,0,0,0.87)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </aside>
  );
}

function Article({ post }) {
  return (
    <article className="w-[813px] rounded-[12px] bg-white px-8 pb-8 pt-6">
      <h1 className="text-[32px] font-bold leading-[40px] text-[#0D47A1]">{post.title}</h1>

      <div className="mt-4 flex h-[54px] items-center gap-6 border-y border-[#C1C6D5] text-[14px] font-semibold tracking-[0.14px] text-[#414753]">
        <span className="flex items-center gap-2">
          <UserRound className="h-4 w-4 text-[#0D47A1]" /> {post.author}
        </span>
        <span className="flex items-center gap-2">
          <CalendarDays className="h-5 w-[18px] text-[#0D47A1]" /> {post.publishedAt}
        </span>
      </div>

      <div className="relative mt-4 h-[450px] overflow-hidden rounded-[12px]">
        <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
        <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-[#FDD835] px-5 py-2 text-[12px] font-bold uppercase tracking-[0.6px] text-[#D32F2F] shadow-lg">
          <Sparkles className="h-3 w-3" /> Nổi bật
        </div>
      </div>

      <div className="mt-6 text-[16px] leading-[26px] text-[#414753]">
        <p className="italic">{post.intro}</p>
        <p className="mt-6">{post.description}</p>

        <div className="mt-6 rounded-r-[8px] border-l-4 border-[#1976D2] bg-[#F3F4F6] px-6 py-6">
          <h2 className="text-[20px] font-semibold leading-7 text-[#005AB4]">{post.highlightTitle}</h2>
          <p className="mt-2">{post.highlightText}</p>
        </div>

        <h2 className="mt-6 text-[24px] font-semibold leading-8 text-[#005AB4]">
          Lịch tiêm phòng chi tiết
        </h2>
        <ol className="mt-5 flex flex-col gap-4">
          {post.schedule.map((item, index) => (
            <li key={item} className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E3F2FD] font-semibold text-[#005AB4]">
                {index + 1}
              </span>
              <span className="pt-1">{item}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-t border-[#C1C6D5] pt-8">
        {post.tags.map((tag) => (
          <button key={tag} type="button" className="rounded-full bg-[#EEEEEE] px-4 py-2 text-[14px] font-medium text-[#414753] hover:bg-[#FFF9C4]">
            {tag}
          </button>
        ))}
      </div>
    </article>
  );
}

function RelatedBlogSection({ posts }) {
  const [start, setStart] = useState(0);
  const visible = Array.from({ length: 4 }, (_, index) => posts[(start + index) % posts.length]);

  return (
    <section className="w-[1200px]">
      <SectionHeading>Bài viết liên quan</SectionHeading>
      <div className="relative mt-6 flex justify-between">
        {visible.map((post) => <BlogCard key={post.id} post={post} />)}
        <button type="button" onClick={() => setStart((value) => (value - 1 + posts.length) % posts.length)} className="absolute -left-14 top-[143px] flex h-14 w-14 items-center justify-center rounded-full bg-[#FDD835] text-[#0D47A1]">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button type="button" onClick={() => setStart((value) => (value + 1) % posts.length)} className="absolute -right-14 top-[143px] flex h-14 w-14 items-center justify-center rounded-full bg-[#FDD835] text-[#0D47A1]">
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}

export default function BlogDetailPage() {
  const { isAuthenticated } = useAuth();
  const { postId } = useParams();
  const post = useMemo(() => {
    const selected = RECENT_BLOG_POSTS.find((item) => item.id === postId);
    return selected
      ? { ...FEATURED_BLOG_POST, ...selected, author: FEATURED_BLOG_POST.author, tags: FEATURED_BLOG_POST.tags }
      : FEATURED_BLOG_POST;
  }, [postId]);

  return (
    <div className="min-h-screen bg-white">
      <CanvasLayout>
        <NavBar isAuthenticated={isAuthenticated} />
        <main className="flex min-h-[2245px] flex-col items-center gap-6 bg-[#E5F6FD] pb-12 pt-6">
          <nav className="flex h-4 w-[1200px] items-center gap-2 text-[12px] font-medium text-[#414753]">
            <Link to="/">Trang chủ</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/blog">Chia sẻ cộng đồng</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-[#005AB4]">{post.categoryLabel}</span>
          </nav>

          <div className="flex w-[1200px] items-start gap-12">
            <Article post={post} />
            <BlogSidebar />
          </div>

          <section className="w-[1206px] pt-6">
            <SectionHeading>Sản phẩm liên quan</SectionHeading>
            <div className="mt-6 flex gap-9">
              {FEATURED_PRODUCTS.slice(0, 6).map((product) => (
                <ShoppingProductCard key={product.id} product={product} href="/product-details" />
              ))}
            </div>
          </section>

          <RelatedBlogSection posts={RECENT_BLOG_POSTS} />
        </main>
        <Footer variant="white" />
      </CanvasLayout>
    </div>
  );
}
