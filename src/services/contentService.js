import { blogImages } from "../assets/blogImages";
import apiClient from "./apiClient";

function assertSuccess(response) {
  if (response?.EC !== undefined && response.EC !== 0) {
    throw new Error(response.EM || "Khong the tai noi dung");
  }
  return response?.DT ?? response;
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function slugify(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const blogCategoryAliases = {
  "suc-khoe": "health",
  "suc-khoe-thu-cung": "health",
  "dinh-duong": "nutrition",
  "tam-ly": "psychology",
  "hanh-vi": "psychology",
  "ve-sinh-lam-dep": "grooming",
  grooming: "grooming",
  "cham-soc": "care",
};

const firstAidCategoryAliases = {
  "tai-nan": "accident",
  "ngo-doc": "poisoning",
  "kho-tho": "breathing",
  "chan-thuong": "injury",
};

function normalizeBlogCategory(category = {}) {
  const label = category.category_name || category.label || "Chủ đề";
  const rawId = String(category.post_category_id || category.id || slugify(label));
  const mappedId = blogCategoryAliases[slugify(label)] || rawId;

  return {
    id: mappedId,
    backendId: String(category.post_category_id || category.id || ""),
    label,
  };
}

function normalizeFirstAidCategory(category = {}) {
  const label = category.category_name || category.label || "Chủ đề";
  const rawId = String(category.first_aid_category_id || category.id || slugify(label));
  const mappedId = firstAidCategoryAliases[slugify(label)] || rawId;

  return {
    id: mappedId,
    backendId: String(category.first_aid_category_id || category.id || ""),
    label,
  };
}

function getBlogCategoryId(category) {
  return blogCategoryAliases[slugify(category?.category_name)] || String(category?.post_category_id || "care");
}

function getFirstAidCategoryId(category) {
  return firstAidCategoryAliases[slugify(category?.category_name)] || String(category?.first_aid_category_id || "accident");
}

export function normalizePost(post = {}) {
  const category = post.category || {};
  const categoryLabel = category.category_name || "Kiến thức";
  const contentText = post.content || post.excerpt || "";
  const paragraphs = String(contentText)
    .split(/\n{2,}|\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    ...post,
    id: post.slug || String(post.post_id || post.id || ""),
    backendId: String(post.post_id || ""),
    section: post.post_type === "community" ? "community" : "knowledge",
    category: getBlogCategoryId(category),
    categoryLabel,
    title: post.title || "Bài viết",
    excerpt: post.excerpt || paragraphs[0] || "Thông tin hữu ích giúp bạn chăm sóc thú cưng mỗi ngày.",
    content: contentText,
    paragraphs,
    image: post.thumbnail_url || blogImages.postPlaceholder,
    author: post.author?.full_name || "Dr. Pet's House",
    authorImage: post.author?.avatar_url || blogImages.authorMinhAnh,
    publishedAt: formatDate(post.created_at),
    intro: post.excerpt || paragraphs[0] || "",
    description: paragraphs.slice(0, 2).join("\n\n") || post.excerpt || "",
    highlightTitle: "Điểm cần lưu ý",
    highlightText: paragraphs[2] || post.excerpt || "Theo dõi tình trạng thú cưng và liên hệ bác sĩ thú y khi có dấu hiệu bất thường.",
    schedule: paragraphs.slice(3, 6).length
      ? paragraphs.slice(3, 6)
      : ["Quan sát dấu hiệu bất thường.", "Chuẩn bị thông tin sức khỏe cần thiết.", "Liên hệ bác sĩ thú y khi cần hỗ trợ."],
    tags: post.hashtags
      ? String(post.hashtags).split(/[,\s]+/).filter(Boolean).map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
      : [`#${slugify(categoryLabel) || "petcare"}`],
    commentsCount: post._count?.comments || post.commentsCount || 0,
    likesCount: post.likes_count || 0,
    views: post.view_count || 0,
  };
}

function normalizePostComment(comment = {}) {
  const replies = Array.isArray(comment.children)
    ? comment.children.map((child) => ({
        id: child.comment_id || child.id,
        author: child.user?.full_name || "Người dùng",
        avatar: child.user?.avatar_url || "",
        content: child.content || "",
        replyTo: comment.user?.full_name || null,
        time: formatDate(child.created_at),
      }))
    : [];

  return {
    id: comment.comment_id || comment.id,
    author: comment.user?.full_name || "Người dùng",
    avatar: comment.user?.avatar_url || "",
    content: comment.content || "",
    time: formatDate(comment.created_at),
    replies,
  };
}

export function normalizeFirstAidGuide(guide = {}, index = 0) {
  const category = guide.category || {};
  const mediaImage = guide.media?.find?.((item) => item.media_type === "image")?.file_url;
  const image = mediaImage || guide.steps?.find?.((step) => step.image_url)?.image_url || blogImages.postPlaceholder;
  const urgent = /hoc|nghet|kho tho|cap cuu|soc|ngo doc/i.test(slugify(`${guide.title} ${guide.situation_description}`));
  const steps = (guide.steps || []).map((step) => ({
    title: `Bước ${step.step_number}`,
    description: step.step_content,
  }));

  return {
    ...guide,
    id: guide.slug || String(guide.guide_id || ""),
    backendId: String(guide.guide_id || ""),
    category: getFirstAidCategoryId(category),
    categoryLabel: category.category_name || "Sơ cứu",
    variant: urgent || index === 0 ? "urgent" : image ? "image" : "text",
    urgent,
    image,
    title: guide.title || "Hướng dẫn sơ cứu",
    heroTitle: guide.title || "Hướng dẫn sơ cứu",
    description: guide.situation_description || "Các bước xử lý ban đầu trước khi đưa thú cưng đến cơ sở thú y.",
    steps: steps.length
      ? steps
      : [
          { title: "Giữ bình tĩnh", description: "Đưa thú cưng đến khu vực an toàn và hạn chế kích động." },
          { title: "Quan sát dấu hiệu", description: "Ghi nhận triệu chứng, thời điểm xảy ra và các yếu tố liên quan." },
          { title: "Liên hệ bác sĩ", description: "Gọi phòng khám hoặc đưa thú cưng đi cấp cứu khi tình trạng nặng." },
        ],
    video: {
      title: guide.video_url ? "Xem video hướng dẫn chi tiết" : "Hướng dẫn xử lý an toàn",
      description: guide.video_url || "Thực hiện các bước sơ cứu nhẹ nhàng, tránh tự dùng thuốc khi chưa có chỉ định.",
      highlights: ["Giữ đường thở thông thoáng", "Theo dõi phản ứng của thú cưng"],
      url: guide.video_url || "",
    },
    emergencyPhone: guide.emergency_phone || "0868686868",
  };
}

export async function getBlogCategories() {
  const response = await apiClient.get("/post-categories");
  return [{ id: "all", label: "Tất cả", backendId: "" }, ...assertSuccess(response).map(normalizeBlogCategory)];
}

export async function getFeaturedPost() {
  const response = await apiClient.get("/posts/featured");
  const post = assertSuccess(response);
  return post ? normalizePost(post) : null;
}

export async function getTrendingPosts(limit = 5) {
  const response = await apiClient.get("/posts/trending", { params: { limit } });
  return assertSuccess(response).map(normalizePost);
}

export async function getPostsPage(params = {}) {
  const response = await apiClient.get("/posts", { params });
  const payload = assertSuccess(response);
  const posts = Array.isArray(payload.posts) ? payload.posts : [];
  return {
    posts: posts.map(normalizePost),
    totalRows: Number(payload.totalRows ?? posts.length),
    totalPages: Number(payload.totalPages || 1),
  };
}

export async function getPostBySlug(slug) {
  const response = await apiClient.get(`/posts/${slug}`);
  return normalizePost(assertSuccess(response));
}

export async function getFirstAidCategories() {
  const response = await apiClient.get("/first-aid/categories");
  return [{ id: "all", label: "Tất cả", backendId: "" }, ...assertSuccess(response).map(normalizeFirstAidCategory)];
}

export async function getFirstAidGuidesPage(params = {}) {
  const response = await apiClient.get("/first-aid/guides", { params });
  const payload = assertSuccess(response);
  return {
    guides: (payload.guides || []).map(normalizeFirstAidGuide),
    totalRows: Number(payload.totalRows || 0),
    totalPages: Number(payload.totalPages || 1),
  };
}

export async function getFirstAidGuideBySlug(slug) {
  const response = await apiClient.get(`/first-aid/guides/${slug}`);
  return normalizeFirstAidGuide(assertSuccess(response));
}

export async function getPostComments(postId, params = {}) {
  const response = await apiClient.get(`/posts/${postId}/comments`, { params });
  const payload = assertSuccess(response);
  return {
    comments: Array.isArray(payload?.comments) ? payload.comments.map(normalizePostComment) : [],
    totalRows: Number(payload?.totalRows || 0),
    totalPages: Number(payload?.totalPages || 1),
  };
}

export async function createPostComment(postId, content) {
  const response = await apiClient.post(`/posts/${postId}/comments`, { content });
  return assertSuccess(response);
}

export async function replyPostComment(commentId, content) {
  const response = await apiClient.post(`/posts/comments/${commentId}/reply`, { content });
  return assertSuccess(response);
}

export async function togglePostLike(postId) {
  const response = await apiClient.post(`/posts/${postId}/like`);
  return assertSuccess(response);
}
