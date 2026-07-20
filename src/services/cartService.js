import apiClient from "./apiClient";

function assertSuccess(response) {
  if (response?.EC !== 0) {
    throw new Error(response?.EM || "Request failed");
  }
  return response.DT;
}

function getPrimaryProductImage(product = {}) {
  const primaryImage = Array.isArray(product.product_images)
    ? product.product_images.find((image) => image.is_primary) || product.product_images[0]
    : null;

  return product.thumbnail_url || product.image_url || primaryImage?.image_url || null;
}

export function normalizeCartItem(item = {}) {
  const product = item.product || {};
  const variant = item.variant || item.product_variant || {};
  const productId = item.product_id ?? product.product_id ?? item.productId;
  const variantId = item.variant_id ?? variant.variant_id ?? item.variantId ?? null;
  const cartItemId = item.cart_item_id ?? item.cartItemId ?? item.id;
  const price = variant.price ?? product.price ?? item.price ?? 0;

  return {
    id: String(cartItemId ?? `${productId}:${variantId || "default"}`),
    cartItemId,
    productId,
    variantId,
    name: product.product_name ?? product.name ?? item.name ?? "",
    price: Number(price),
    image: getPrimaryProductImage(product) || item.image || item.imageUrl || item.thumbnail,
    type: variant.variant_name ?? item.type ?? "",
    size: item.size ?? "",
    variants: Array.isArray(product.variants) ? product.variants : item.variants,
    qty: Number(item.quantity ?? item.qty ?? 1),
    selected: Boolean(item.is_selected ?? item.selected ?? true),
    raw: item,
  };
}

export async function getCart() {
  const response = await apiClient.get("/cart");
  const cart = assertSuccess(response);
  const items = Array.isArray(cart?.cart_items) ? cart.cart_items : [];
  return {
    ...cart,
    items: items.map(normalizeCartItem),
  };
}

export async function addCartItem(item) {
  const response = await apiClient.post("/cart", {
    product_id: item.productId || item.product_id || item.id,
    variant_id: item.variantId || item.variant_id || null,
    size: item.size || "",
    quantity: item.qty || item.quantity || 1,
  });
  return normalizeCartItem(assertSuccess(response));
}

export async function updateCartItem(itemId, updates) {
  const payload = {};
  if (updates.quantity !== undefined) payload.quantity = updates.quantity;
  if (updates.variantId !== undefined) payload.variant_id = updates.variantId;
  if (updates.variant_id !== undefined) payload.variant_id = updates.variant_id;
  if (updates.size !== undefined) payload.size = updates.size;
  if (updates.isSelected !== undefined) payload.is_selected = updates.isSelected;
  if (updates.is_selected !== undefined) payload.is_selected = updates.is_selected;

  const response = await apiClient.put(`/cart/${itemId}`, payload);
  const data = assertSuccess(response);
  return data ? normalizeCartItem(data) : null;
}

export async function deleteCartItem(itemId) {
  const response = await apiClient.delete(`/cart/${itemId}`);
  return assertSuccess(response);
}
