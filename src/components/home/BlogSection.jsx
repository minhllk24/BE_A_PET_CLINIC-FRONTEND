import { homeImages } from "../../assets/homeImages";
import {
  HOME_BLOG_POSTS,
  HOME_BLOG_POST_TITLE,
  HOME_FEATURED_BLOG,
} from "../../data/homeData";
import YellowButton from "./YellowButton";

function BlogPostItem({ author, date, highlighted }) {
  return (
    <article
      className={`rounded-[10px] px-9 py-8 ${
        highlighted ? "bg-[#fbf6ea]" : "bg-white"
      }`}
    >
      <p className="text-sm text-[#4c4c4c]">
        By <span className="text-[#592ea9]">{author}</span>
        <span className="mx-2">|</span>
        {date}
      </p>
      <h3 className="mt-3 text-2xl font-bold leading-snug text-[#232536]">
        {HOME_BLOG_POST_TITLE}
      </h3>
    </article>
  );
}

function BlogSection() {
  return (
    <section id="blog" className="w-full bg-white py-10 md:py-12">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 lg:flex-row lg:gap-[30px]">
        <div className="flex flex-1 flex-col gap-8">
          <div className="relative">

            <h2 className="text-[32px] font-bold tracking-wide text-[#232536] font-baloo relative z-10">
              Nổi bật
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
          <div className="flex flex-col gap-6 border border-white p-6 shadow-sm md:p-8">
            <img
              src={homeImages.blogFeatured}
              alt="Featured blog"
              className="h-auto w-full max-h-[348px] object-cover"
            />
            <p className="text-sm text-[#4c4c4c]">
              By <span className="text-[#592ea9]">{HOME_FEATURED_BLOG.author}</span>
              <span className="mx-2">|</span>
              {HOME_FEATURED_BLOG.date}
            </p>
            <h3 className="text-2xl font-bold text-[#232536]">
              {HOME_FEATURED_BLOG.title}
            </h3>
            <p className="text-xl leading-relaxed text-[#6d6e76]">
              {HOME_FEATURED_BLOG.description}
            </p>
            <YellowButton variant="light" className="w-fit bg-[#fff176]">
              ĐỌC THÊM →
            </YellowButton>
          </div>
        </div>

        <div className="flex w-full flex-col gap-px lg:max-w-[576px]">
          <div className="mb-4 flex items-start justify-between">
            <h2 className="text-[32px] font-bold text-[#232536]">All Posts</h2>
            <a
              href="#blog"
              className="text-base text-[#592ea9] hover:underline"
            >
              View All
            </a>
          </div>
          {HOME_BLOG_POSTS.map((post, index) => (
            <BlogPostItem key={`${post.author}-${index}`} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
