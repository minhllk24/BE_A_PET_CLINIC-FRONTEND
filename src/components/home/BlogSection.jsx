import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import {
  ALL_BLOG_POSTS,
  FEATURED_BLOG_POST,
} from "../../data/blogData";
import { getFeaturedPost, getPostsPage } from "../../services/contentService";
import { CategoryIcon } from "../blog/BlogCard";

function BlogPostItem({ post, highlighted }) {
  return (
    <Link
      to={`/blog/${post.id}`}
      className={`group block rounded-[10px] px-9 py-8 transition-all hover:-translate-y-0.5 hover:shadow-md ${
        highlighted ? "bg-[#E3F2FD]" : "bg-white"
      }`}
    >
      <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.5px] text-[#0D47A1]">
        <CategoryIcon category={post.category} className="h-3 w-3" />
        {post.categoryLabel}
      </p>
      <h3 className="mt-3 text-2xl font-bold leading-snug text-[#232536] transition-colors group-hover:text-[#0D47A1]">
        {post.title}
      </h3>
      <p className="mt-3 flex items-center gap-1 text-sm text-[#6B7280]">
        <CalendarDays className="h-3.5 w-3.5" />
        {post.publishedAt}
      </p>
    </Link>
  );
}

function BlogSection() {
  const [featuredPost, setFeaturedPost] = useState(FEATURED_BLOG_POST);
  const [latestPosts, setLatestPosts] = useState(() => ALL_BLOG_POSTS.slice(0, 4));
  const [fallbackNotice, setFallbackNotice] = useState("");

  useEffect(() => {
    let active = true;
    setFallbackNotice("");

    Promise.all([
      getFeaturedPost(),
      getPostsPage({ type: "official_blog", limit: 4, page: 1 }),
    ])
      .then(async ([apiFeatured, apiPosts]) => {
        if (!active) return;
        const officialPosts = apiPosts.posts.filter((post) => post.section === "knowledge");

        if (apiFeatured?.section === "knowledge") {
          setFeaturedPost(apiFeatured);
        } else if (officialPosts[0]) {
          setFeaturedPost(officialPosts[0]);
        }

        if (officialPosts.length) {
          setLatestPosts(officialPosts.slice(0, 4));
          return;
        }

        const allPosts = await getPostsPage({ limit: 4, page: 1 });
        if (!active) return;
        const fallbackApiPosts = allPosts.posts.filter((post) => post.section === "knowledge");
        if (fallbackApiPosts.length) {
          setLatestPosts(fallbackApiPosts.slice(0, 4));
          if (fallbackApiPosts[0]) setFeaturedPost(fallbackApiPosts[0]);
          return;
        }

        setFallbackNotice("API blog chưa có dữ liệu, đang hiển thị bài viết mẫu.");
      })
      .catch((error) => {
        if (!active) return;
        setFallbackNotice(error?.message || "Không thể tải blog mới nhất, đang hiển thị bài viết mẫu.");
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="blog" className="w-full bg-white py-10 md:py-12">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 lg:flex-row lg:gap-[30px]">
        <div className="flex flex-1 flex-col gap-8">
          <div className="relative">

            <h2 className="text-[32px] font-bold tracking-wide text-[#232536] font-baloo relative z-10">
              Bài viết nổi bật
            </h2>
            {/* Vector vàng */}
            <svg
              className="
                pointer-events-none absolute
                left-[-40px] top-[35px]
                h-[10.5px] w-[179px]
              "
              viewBox="0 0 182 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M0.213867 5.64588C23.7047 3.62998 109.211 -0.290806 179.214 5.6459C142.876 5.6459 106.198 6.7462 75.7139 13"
                stroke="#FDD835"
                strokeWidth="5"
                strokeLinejoin="round"
              />
            </svg>
      

          </div>
          <Link
            to={`/blog/${featuredPost.id}`}
            className="group flex flex-col gap-6 border border-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(13,71,161,0.12)] md:p-8"
          >
            <div className="relative overflow-hidden rounded-[24px]">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="h-auto max-h-[348px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-[#FDD835] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.5px] text-[#D32F2F] shadow-lg">
                <CategoryIcon category={featuredPost.category} className="h-3 w-3" />
                {featuredPost.categoryLabel}
              </span>
            </div>
            <p className="flex items-center gap-2 text-sm text-[#6B7280]">
              <span>
                By <span className="font-semibold text-[#0D47A1]">{featuredPost.author}</span>
              </span>
              <span>|</span>
              <span className="flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                {featuredPost.publishedAt}
              </span>
            </p>
            <h3 className="text-2xl font-bold text-[#232536] transition-colors group-hover:text-[#0D47A1]">
              {featuredPost.title}
            </h3>
            <p className="text-xl leading-relaxed text-[#6d6e76]">
              {featuredPost.excerpt}
            </p>
            <span className="btn-yellow-light focus-ring-brand w-fit bg-[#fff176]">
              ĐỌC THÊM →
            </span>
          </Link>
        </div>

        <div className="flex w-full flex-col gap-px lg:max-w-[576px]">
          <div className="mb-4 flex items-start justify-between">
            <h2 className="text-[32px] font-bold text-[#232536]">
              Bài viết mới nhất
            </h2>
            <Link
              to="/blog#latest-posts"
              className="text-base font-semibold text-[#0D47A1] hover:underline"
            >
              Xem tất cả
            </Link>
          </div>
          {fallbackNotice && (
            <p className="mb-2 rounded-xl bg-[#E5F6FD] px-4 py-2 text-sm font-medium text-[#0D47A1]">
              {fallbackNotice}
            </p>
          )}
          {latestPosts.map((post, index) => (
            <BlogPostItem
              key={post.id}
              post={post}
              highlighted={index === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
