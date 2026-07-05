import { GROOMING_SERVICES } from "./groomingData";
import { ALL_BLOG_POSTS } from "./blogData";
import { COMMUNITY_POSTS } from "./communityData";
import { FIRST_AID_POSTS } from "./firstAidData";
import { PRODUCT_CATEGORIES, SHOP_PRODUCTS } from "./shopData";

const searchProducts = SHOP_PRODUCTS.slice(0, 9).map((product, index) => ({
  ...product,
  name: index === 0 ? "ten sp" : product.name,
  categorySlug: PRODUCT_CATEGORIES[product.categoryIdx]?.slug,
}));

const COMMUNITY_TYPE_TO_FILTER_ID = {
  "Khoảnh khắc": "moment",
  "Hỏi đáp": "qa",
  "Mẹo vặt": "tips",
  "Kinh nghiệm": "experience",
};

export const SEARCH_DEMAND_TYPES = [
  { id: "all", label: "Tất cả" },
  { id: "service", label: "Dịch vụ" },
  { id: "shopping", label: "Mua sắm" },
  { id: "article", label: "Bài viết" },
];

export const SEARCH_SORT_OPTIONS = {
  relevant: { id: "relevant", label: "Liên quan nhất", appliesTo: ["all", "service", "shopping", "article"] },
  priceAsc: { id: "priceAsc", label: "Giá thấp đến cao", appliesTo: ["all", "service", "shopping"] },
  priceDesc: { id: "priceDesc", label: "Giá cao đến thấp", appliesTo: ["all", "service", "shopping"] },
  newest: { id: "newest", label: "Mới nhất", appliesTo: ["all", "article"] },
};

export const SEARCH_FILTER_GROUPS = [
  {
    id: "serviceGroups",
    title: "Nhóm dịch vụ",
    appliesTo: ["all", "service"],
    options: [
      { id: "all-services", label: "Tất cả dịch vụ", count: 0 },
      { id: "spa-grooming", label: "Spa & Grooming", count: 0 },
      { id: "clinic", label: "Khám & Điều trị", count: 0 },
    ],
  },
  {
    id: "productCategories",
    title: "Danh mục",
    appliesTo: ["all", "shopping"],
    options: [
      { id: "all-categories", label: "Tất cả danh mục", count: 0 },
      ...PRODUCT_CATEGORIES.map((category, index) => ({
        id: category.slug,
        label: category.label,
        count: 0,
      })),
    ],
  },
  {
    id: "priceRanges",
    title: "Khoảng giá",
    appliesTo: ["all", "service", "shopping"],
    options: [
      { id: "20-50", label: "20.000đ - 50.000đ", count: null },
      { id: "50-100", label: "50.000đ - 100.000đ", count: null },
      { id: "100-200", label: "100.000đ - 200.000đ", count: null },
      { id: "200-plus", label: "200.000đ trở lên", count: null },
    ],
  },
  {
    id: "firstAid",
    title: "Cẩm nang",
    appliesTo: ["all", "article"],
    options: [
      { id: "all-first-aid", label: "Tất cả cẩm nang", count: 0 },
      { id: "accident", label: "Tai nạn", count: 0 },
      { id: "poisoning", label: "Ngộ độc", count: 0 },
      { id: "breathing", label: "Khó thở", count: 0 },
      { id: "injury", label: "Chấn thương", count: 0 },
    ],
  },
  {
    id: "knowledge",
    title: "Kiến thức",
    appliesTo: ["all", "article"],
    options: [
      { id: "all-knowledge", label: "Tất cả kiến thức", count: 0 },
      { id: "health", label: "Sức khỏe", count: 0 },
      { id: "nutrition", label: "Dinh dưỡng", count: 0 },
      { id: "psychology", label: "Tâm lý", count: 0 },
      { id: "grooming", label: "Vệ sinh & Làm đẹp", count: 0 },
    ],
  },
  {
    id: "community",
    title: "Cộng đồng",
    appliesTo: ["all", "article"],
    options: [
      { id: "all-community", label: "Tất cả thẻ", count: 0 },
      { id: "moment", label: "Khoảnh khắc", count: 0 },
      { id: "qa", label: "Hỏi đáp", count: 0 },
      { id: "tips", label: "Mẹo vặt", count: 0 },
      { id: "experience", label: "Kinh nghiệm", count: 0 },
    ],
  },
];

export const SEARCH_RESULTS = {
  services: GROOMING_SERVICES.slice(0, 3).map((service, index) => ({
    ...service,
    groupId: "spa-grooming",
    priceValue: [50, 150, 100][index],
  })),
  otherServices: GROOMING_SERVICES.slice(1, 3).map((service, index) => ({
    ...service,
    groupId: "spa-grooming",
    priceValue: [50, 30][index],
  })),
  products: searchProducts,
  suggestedProducts: SHOP_PRODUCTS.slice(9, 13),
  firstAid: FIRST_AID_POSTS.slice(2, 6),
  knowledge: ALL_BLOG_POSTS.slice(0, 5),
  community: COMMUNITY_POSTS.slice(2, 4),
};

export const SEARCH_SUMMARY = {
  total: 21,
  service: 3,
  shopping: 9,
  firstAid: 4,
  knowledge: 5,
};

export const SEARCH_EMPTY_STATE = {
  summary: "Tìm thấy 0 kết quả phù hợp",
  title: "Không tìm thấy kết quả phù hợp",
  description:
    "Hãy thử điều chỉnh bộ lọc hiện tại! Bạn cũng có thể dùng từ khóa khác hoặc quay về trang chủ để khám phá thêm.",
  retryLabel: "Thử từ khóa khác",
  retryQuery: "tắm",
  homeLabel: "Về trang chủ",
  homeHref: "/",
};

function normalizeSearchText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

function collectSearchableText(item) {
  if (!item || typeof item !== "object") return "";

  return [
    item.title,
    item.name,
    item.description,
    item.excerpt,
    item.content,
    item.categoryLabel,
    item.type,
    item.author,
    ...(item.tags || []),
  ]
    .filter(Boolean)
    .join(" ");
}

function matchesQuery(item, query) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return true;
  return normalizeSearchText(collectSearchableText(item)).includes(normalizedQuery);
}

function sortByPrice(items, sort) {
  if (!["priceAsc", "priceDesc"].includes(sort)) return items;

  return [...items].sort((a, b) => {
    const left = a.priceValue ?? a.price ?? 0;
    const right = b.priceValue ?? b.price ?? 0;
    return sort === "priceAsc" ? left - right : right - left;
  });
}

function filterResultBuckets(query) {
  return {
    services: SEARCH_RESULTS.services.filter((item) => matchesQuery(item, query)),
    otherServices: SEARCH_RESULTS.otherServices.filter((item) => matchesQuery(item, query)),
    products: SEARCH_RESULTS.products.filter((item) => matchesQuery(item, query)),
    suggestedProducts: SEARCH_RESULTS.suggestedProducts.filter((item) => matchesQuery(item, query)),
    firstAid: SEARCH_RESULTS.firstAid.filter((item) => matchesQuery(item, query)),
    knowledge: SEARCH_RESULTS.knowledge.filter((item) => matchesQuery(item, query)),
    community: SEARCH_RESULTS.community.filter((item) => matchesQuery(item, query)),
  };
}

function buildCounts(results) {
  return {
    service: results.services.length,
    shopping: results.products.length,
    firstAid: results.firstAid.length,
    knowledge: results.knowledge.length,
    community: results.community.length,
  };
}

function applyTypeAndSort(results, type, sort) {
  if (type === "service") {
    return {
      ...results,
      services: sortByPrice(results.services, sort),
      otherServices: sortByPrice(results.otherServices, sort),
      products: [],
      suggestedProducts: [],
      firstAid: [],
      knowledge: [],
      community: [],
    };
  }

  if (type === "shopping") {
    return {
      ...results,
      services: [],
      otherServices: [],
      products: sortByPrice(results.products, sort),
      suggestedProducts: sortByPrice(results.suggestedProducts, sort),
      firstAid: [],
      knowledge: [],
      community: [],
    };
  }

  if (type === "article") {
    return {
      ...results,
      services: [],
      otherServices: [],
      products: [],
      suggestedProducts: [],
    };
  }

  return {
    ...results,
    services: sortByPrice(results.services, sort),
    otherServices: sortByPrice(results.otherServices, sort),
    products: sortByPrice(results.products, sort),
    suggestedProducts: sortByPrice(results.suggestedProducts, sort),
  };
}

const FACET_RESULT_CONFIG = {
  serviceGroups: {
    allOptionId: "all-services",
    getItems: (results) => results.services,
    getOptionId: (item) => item.groupId,
  },
  productCategories: {
    allOptionId: "all-categories",
    getItems: (results) => results.products,
    getOptionId: (item) => item.categorySlug,
  },
  firstAid: {
    allOptionId: "all-first-aid",
    getItems: (results) => results.firstAid,
    getOptionId: (item) => item.category,
  },
  knowledge: {
    allOptionId: "all-knowledge",
    getItems: (results) => results.knowledge,
    getOptionId: (item) => item.category,
  },
  community: {
    allOptionId: "all-community",
    getItems: (results) => results.community,
    getOptionId: (item) => COMMUNITY_TYPE_TO_FILTER_ID[item.type],
  },
};

function countByFacetOption(items, getOptionId) {
  return items.reduce((counts, item) => {
    const optionId = getOptionId(item);
    if (!optionId) return counts;
    return {
      ...counts,
      [optionId]: (counts[optionId] || 0) + 1,
    };
  }, {});
}

function buildFacets(results) {
  return SEARCH_FILTER_GROUPS.map((group) => {
    const config = FACET_RESULT_CONFIG[group.id];
    if (!config) return group;

    const items = config.getItems(results);
    const optionCounts = countByFacetOption(items, config.getOptionId);

    return {
      ...group,
      options: group.options.map((option) => ({
        ...option,
        count: option.id === config.allOptionId ? items.length : optionCounts[option.id] || 0,
      })),
    };
  });
}

export function mockSearchApi({ query = "tắm", type = "all", sort = "relevant" } = {}) {
  const matchedResults = filterResultBuckets(query);
  const counts = buildCounts(matchedResults);
  const total = counts.service + counts.shopping + counts.firstAid + counts.knowledge + counts.community;
  const results = applyTypeAndSort(matchedResults, type, sort);

  return {
    query,
    type,
    sort,
    total,
    counts,
    facets: buildFacets(matchedResults),
    results,
    emptyState: SEARCH_EMPTY_STATE,
  };
}
