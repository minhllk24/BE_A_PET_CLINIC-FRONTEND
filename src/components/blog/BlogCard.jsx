import {
  ArrowRight,
  Bubbles,
  CalendarDays,
  Cross,
  HeartPlus,
  LayoutGrid,
  PawPrint,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

export function CategoryIcon({ category, className = "h-3 w-3" }) {
  if (category === "all") return <LayoutGrid className={className} />;
  if (category === "health") return <Cross className={className} />;
  if (category === "nutrition") return <Sparkles className={className} />;
  if (category === "psychology") return <HeartPlus className={className} />;
  if (category === "grooming") return <Bubbles className={className} />;
  if (category === "care") return <PawPrint className={className} />;
  return <span className={`${className} inline-block rounded-full border border-current`} />;
}

export function CategoryBadge({ category, label }) {
  return (
    <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.5px] text-[#0D47A1] shadow-sm backdrop-blur-[4px]">
      <CategoryIcon category={category} />
      {label}
    </span>
  );
}

export default function BlogCard({ post }) {
  const href = `/blog/${post.id}`;

  return (
    <article className="group flex h-[343px] w-[288px] flex-col overflow-hidden rounded-[24px] border border-[#fff7ed] bg-white p-px shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(13,71,161,0.12)]">
      <Link to={href} className="relative h-[178px] shrink-0 p-2">
        <img src={post.image} alt="" className="h-full w-full rounded-[16px] object-cover" />
        <CategoryBadge category={post.category} label={post.categoryLabel} />
      </Link>
      <div className="flex min-h-0 flex-1 flex-col px-6 pb-4 pt-3">
        <Link to={href}>
          <h3 className="line-clamp-2 text-[20px] font-normal leading-[25px] text-[#111827]">
            {post.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-[14px] leading-5 text-[#6B7280]">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between border-t border-[#F9FAFB] pt-4 text-[12px]">
          <span className="flex items-center gap-1 text-[#9CA3AF]">
            <CalendarDays className="h-3 w-3" />
            {post.publishedAt}
          </span>
          <Link to={href} className="flex items-center gap-1 font-semibold text-[#0D47A1]">
            Đọc tiếp <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
