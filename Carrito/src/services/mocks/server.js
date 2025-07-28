import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://fakestoreapi.com/products/1", () => {
    return HttpResponse.json({
      id: 1,
      title: "Test Product",
      price: 100,
    });
  }),

  http.get("https://fakestoreapi.com/products/invalid", () => {
    return HttpResponse.json(
      {
        error: "Product not found",
      },
      { status: 404 }
    );
  }),
];

export const server = setupServer(...handlers);
