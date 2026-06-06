# Product API contract

The product detail frontend reads `VITE_API_BASE_URL` and falls back to `/api`.

## Endpoints

- `GET /products/:productId`
- `GET /products/:productId/reviews?page=1&pageSize=2`
- `GET /products/:productId/similar?limit=12`
- `POST /products/:productId/reviews/:reviewId/like`
- `POST /products/:productId/reviews`

Responses may return the payload directly or under `{ "data": ... }`.

Frontend routes that consume these endpoints:

- `/product-details/:productId`
- `/product-details/:productId/write-review`

## Product detail payload

```json
{
  "id": 1,
  "name": "Product name",
  "price": 130000,
  "originalPrice": 230000,
  "discountPercent": 43,
  "rating": 4.6,
  "reviewCount": 126,
  "shortDescription": "Short description",
  "description": "Full description",
  "images": ["https://..."],
  "variants": [
    {
      "id": 10,
      "name": "250ml",
      "sizes": ["100ml", "250ml", "500ml"],
      "stock": 20
    }
  ],
  "shipping": {
    "freeShippingThreshold": 1000000,
    "deliveryEstimate": "3-7 ngày làm việc"
  }
}
```

## Reviews payload

```json
{
  "items": [
    {
      "id": 1,
      "authorName": "Nguyen Van A",
      "authorAvatar": "https://...",
      "rating": 5,
      "content": "Good product",
      "likeCount": 2,
      "createdAt": "2026-06-06T00:00:00Z"
    }
  ],
  "page": 1,
  "totalPages": 5,
  "totalItems": 10,
  "averageRating": 4.6,
  "ratingBreakdown": {
    "5": 70,
    "4": 20,
    "3": 5,
    "2": 3,
    "1": 2
  }
}
```
