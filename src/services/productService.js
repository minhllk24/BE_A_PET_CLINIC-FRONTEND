import apiClient from "./apiClient";

function unwrap(payload) {
  return payload?.data ?? payload;
}

function getPayload(payload) {
  return payload?.DT ?? payload?.data ?? payload;
}

function warnOptionalApiFailure(apiName, error) {
  if (import.meta.env.DEV) {
    console.warn(`${apiName} API is unavailable. Falling back to empty data.`, error);
  }
}

export function normalizeArray(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.DT)) return response.DT;
  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response?.data?.items)) return response.data.items;
  if (Array.isArray(response?.products)) return response.products;
  if (Array.isArray(response?.data?.products)) return response.data.products;
  if (Array.isArray(response?.DT?.products)) return response.DT.products;
  if (Array.isArray(response?.DT?.items)) return response.DT.items;
  if (Array.isArray(response?.DT?.reviews)) return response.DT.reviews;
  if (Array.isArray(response?.reviews)) return response.reviews;
  if (Array.isArray(response?.data?.reviews)) return response.data.reviews;
  return [];
}

function getFirstValue(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== "");
}

function toNumber(value) {
  if (value === undefined || value === null || value === "") return 0;
  if (typeof value === "number") return value;
  return Number(String(value).replace(/[^\d.-]/g, "")) || 0;
}

function normalizeImageUrl(value) {
  if (!value) return value;
  if (/^(https?:)?\/\//.test(value) || value.startsWith("data:") || value.startsWith("blob:")) {
    return value;
  }
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  if (!backendUrl) return value;
  return `${backendUrl.replace(/\/$/, "")}/${String(value).replace(/^\//, "")}`;
}

function normalizeVariant(variant) {
  if (!variant) return variant;
  return {
    ...variant,
    id: getFirstValue(variant.id, variant.variant_id),
    name: getFirstValue(variant.name, variant.variant_name),
    price: getFirstValue(variant.price, 0),
    originalPrice: getFirstValue(variant.originalPrice, variant.original_price),
    stockQuantity: getFirstValue(variant.stockQuantity, variant.stock_quantity, 0),
    sizes: Array.isArray(variant.sizes) ? variant.sizes : [],
  };
}

export function normalizeProduct(product) {
  const source = getPayload(product);
  const id = getFirstValue(source?.productId, source?.product_id, source?.id);
  const name = getFirstValue(source?.productName, source?.product_name, source?.name, "Sản phẩm");
  const productImages = Array.isArray(source?.product_images)
    ? [...source.product_images]
        .sort((first, second) => Number(Boolean(second?.is_primary)) - Number(Boolean(first?.is_primary)))
        .map((item) => normalizeImageUrl(item?.image_url))
        .filter(Boolean)
    : [];
  const price = getFirstValue(
    source?.price,
    source?.product_price,
    source?.sellingPrice,
    source?.selling_price,
    source?.sale_price,
    0,
  );
  const originalPrice = getFirstValue(source?.originalPrice, source?.original_price, source?.oldPrice);
  const numericPrice = toNumber(price);
  const numericOriginalPrice = toNumber(originalPrice);
  const computedDiscountPercent =
    numericOriginalPrice > numericPrice && numericPrice > 0
      ? Math.round(((numericOriginalPrice - numericPrice) / numericOriginalPrice) * 100)
      : undefined;
  const image = normalizeImageUrl(
    getFirstValue(
      source?.imageUrl,
      source?.image_url,
      source?.product_image,
      source?.thumbnail_url,
      productImages[0],
      source?.images?.[0],
      source?.image,
      source?.thumbnail,
    ),
  );
  const categoryId = getFirstValue(source?.categoryId, source?.category_id, source?.product_category_id);
  const categoryIdx = Number.isFinite(Number(categoryId)) ? Number(categoryId) - 1 : source?.categoryIdx;

  return {
    ...source,
    id,
    productId: id,
    name,
    productName: name,
    price,
    originalPrice,
    discountPercent: getFirstValue(
      source?.discountPercent,
      source?.discount_percent,
      source?.discount_percentage,
      computedDiscountPercent,
    ),
    rating: getFirstValue(source?.rating, source?.averageRating, source?.average_rating, 0),
    image,
    imageUrl: image,
    images: productImages.length
      ? productImages
      : Array.isArray(source?.images)
        ? source.images.map(normalizeImageUrl)
        : image ? [image] : [],
    categoryIdx,
    variants: Array.isArray(source?.variants) ? source.variants.map(normalizeVariant) : [],
    stockQuantity: getFirstValue(source?.stockQuantity, source?.stock_quantity, 0),
    soldQuantity: getFirstValue(source?.soldQuantity, source?.sold_quantity, 0),
    reviewCount: getFirstValue(source?.reviewCount, source?._count?.reviews, source?.reviews_count, 0),
  };
}

function normalizeReview(review) {
  const source = getPayload(review);
  return {
    ...source,
    id: getFirstValue(source?.reviewId, source?.review_id, source?.id),
    authorName: getFirstValue(source?.authorName, source?.author_name, source?.user?.full_name, source?.full_name, source?.user_name, source?.customer_name, "Khách hàng"),
    authorAvatar: normalizeImageUrl(getFirstValue(source?.authorAvatar, source?.author_avatar, source?.user?.avatar_url, source?.avatar_url, source?.avatar)),
    rating: getFirstValue(source?.rating, source?.star, source?.stars, 0),
    content: getFirstValue(source?.content, source?.comment, source?.review_content, ""),
    likeCount: getFirstValue(source?.likeCount, source?.likes_count, source?.like_count, Array.isArray(source?.likes) ? source.likes.length : undefined, 0),
    createdAt: getFirstValue(source?.createdAt, source?.created_at, source?.created_date),
  };
}

function normalizeRatingBreakdown(breakdown) {
  if (!Array.isArray(breakdown)) return breakdown ?? {};
  return breakdown.reduce((result, item) => {
    const star = item.star ?? item.rating;
    if (!star) return result;
    return {
      ...result,
      [star]: item.percentage ?? item.percent ?? item.count ?? 0,
    };
  }, {});
}

export async function getProducts(params = {}) {
  const response = unwrap(await apiClient.get("/products", { params }));
  return normalizeArray(response).map(normalizeProduct);
}

export async function getProductsPage(params = {}) {
  const response = unwrap(await apiClient.get("/products", { params }));
  const payload = getPayload(response);
  const products = normalizeArray(payload).map(normalizeProduct);

  return {
    products,
    totalRows: Number(payload?.totalRows ?? products.length),
    totalPages: Number(payload?.totalPages ?? 1),
    page: Number(params.page ?? 1),
    limit: Number(params.limit ?? (products.length || 10)),
  };
}

export async function getProductCategories() {
  const response = unwrap(await apiClient.get("/categories"));
  return normalizeArray(response);
}

export async function getBestSellingProducts(limit = 12) {
  return getProducts({ sort: "best_selling", limit, page: 1 });
}

export async function getActiveFlashSaleProducts(limit = 12) {
  try {
    const response = unwrap(await apiClient.get("/flash-sales/active"));
    const payload = getPayload(response);
    if (!payload) return [];

    return normalizeArray(payload)
      .map((item) => {
        const product = item?.product ?? item?.Product ?? item;
        return normalizeProduct({
          ...product,
          price: item?.discount_price ?? product?.price,
          original_price: product?.original_price ?? product?.price,
          discount_percentage: item?.discount_percentage ?? product?.discount_percentage,
          flash_sale_item_id: item?.flash_sale_item_id,
        });
      })
      .slice(0, limit);
  } catch (error) {
    warnOptionalApiFailure("Active flash sale", error);
    return [];
  }
}

export async function getProductDetails(productId) {
  return normalizeProduct(unwrap(await apiClient.get(`/products/${productId}`)));
}

export async function getProductReviews(productId, page = 1, pageSize = 2) {
  try {
    const [reviewsResponse, statsResponse] = await Promise.all([
      apiClient.get(`/reviews/target/product/${productId}`, {
        params: { page, limit: pageSize },
      }),
      apiClient.get(`/products/${productId}/review-stats`).catch((error) => {
        warnOptionalApiFailure("Product review stats", error);
        return null;
      }),
    ]);
    const reviewsPayload = getPayload(unwrap(reviewsResponse));
    const statsPayload = getPayload(unwrap(statsResponse));

    return {
      items: normalizeArray(reviewsResponse).map(normalizeReview),
      totalPages: reviewsPayload?.totalPages ?? 1,
      totalItems: reviewsPayload?.totalRows ?? reviewsPayload?.totalItems ?? statsPayload?.totalReviews ?? 0,
      averageRating: statsPayload?.averageRating ?? reviewsPayload?.averageRating ?? 0,
      ratingBreakdown: normalizeRatingBreakdown(statsPayload?.breakdown ?? reviewsPayload?.ratingBreakdown),
    };
  } catch (error) {
    warnOptionalApiFailure("Product reviews", error);
    return { items: [], totalPages: 1, totalItems: 0, averageRating: 0, ratingBreakdown: {} };
  }
}

export async function getSimilarProducts(productId, limit = 12) {
  try {
    const response = unwrap(await apiClient.get(`/products/${productId}/related`));
    return normalizeArray(response).map(normalizeProduct).slice(0, limit);
  } catch (error) {
    warnOptionalApiFailure("Similar products", error);
    return [];
  }
}

export async function likeProductReview(productId, reviewId) {
  return unwrap(await apiClient.post(`/reviews/${reviewId}/like`));
}

export async function createProductReview(productId, payload) {
  return unwrap(
    await apiClient.post("/reviews", {
      target_type: "product",
      target_id: String(productId),
      rating: payload.rating,
      comment: payload.comment ?? payload.content ?? payload.review ?? "",
    }),
  );
}

