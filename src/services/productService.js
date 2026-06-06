import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

function unwrap(response) {
  return response.data?.data ?? response.data;
}

export async function getProductDetails(productId) {
  return unwrap(await api.get(`/products/${productId}`));
}

export async function getProductReviews(productId, page = 1, pageSize = 2) {
  return unwrap(
    await api.get(`/products/${productId}/reviews`, {
      params: { page, pageSize },
    }),
  );
}

export async function getSimilarProducts(productId, limit = 12) {
  return unwrap(
    await api.get(`/products/${productId}/similar`, {
      params: { limit },
    }),
  );
}

export async function likeProductReview(productId, reviewId) {
  return unwrap(await api.post(`/products/${productId}/reviews/${reviewId}/like`));
}

export async function createProductReview(productId, payload) {
  return unwrap(await api.post(`/products/${productId}/reviews`, payload));
}

