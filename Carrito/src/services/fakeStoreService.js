const API_ENDPOINTS = {
  PRODUCTS: "https://fakestoreapi.com/products",
  CATEGORIES: "https://fakestoreapi.com/products/categories",
};

export const products = [];
export const categories = [];

export async function fetchProducts() {
  try {
    if (products.length > 0) return products;

    const response = await fetch(`${API_ENDPOINTS.PRODUCTS}`);

    if (!response.ok) throw new Error("Failed to fetch products");

    const productsData = await response.json();
    const processedProducts = await Promise.all(
      productsData.map(async (product) => {
        try {
          const imageResponse = await fetch(product.image);
          const blob = await imageResponse.blob();
          const imageUrl = URL.createObjectURL(blob);

          return {
            ...product,
            stock: Math.floor(Math.random() * 100),
            image: imageUrl,
          };
        } catch (error) {
          console.error(
            "Failed to fetch image for product:",
            product.id,
            error
          );
          return product;
        }
      })
    );

    processedProducts.forEach((product) => {
      products[product.id] = product;
    });
    return Object.values(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function fetchCategories() {
  try {
    if (categories.length > 0) {
      return categories;
    }
    const response = await fetch(`${API_ENDPOINTS.PRODUCTS}/categories`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    const data = await response.json();
    data.map((value) => {
      if (!categories.includes(value)) {
        categories.push(value);
      }
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getProduct(idProduct) {
  try {
    if (typeof idProduct !== "number") throw new Error("ID must be a number");

    if (products[idProduct]) return products[idProduct];

    const response = await fetch(`${API_ENDPOINTS.PRODUCTS}/${idProduct}`);
    if (!response.ok)
      throw new Error(`Failed fetching product with id: ${idProduct}`);
    const data = await response.json();
    const { id, title, category, price, description, image, rating } = data;
    products[id] = {
      name: title,
      category: category,
      price: price,
      description: description,
      image: image,
      rating: rating,
      stock: Math.floor(Math.random() * 100),
    };
    return products[idProduct];
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
}

export async function filterProductsByCategory(category) {
  if (!category) return [];
  if (typeof category !== "string") {
    throw new Error("Category must be a string");
  }
  if (products.length === 0) {
    await fetchProducts();
  }
  return Object.values(products).filter(
    (product) => product.category === category
  );
}

export function updateStock(product, quantity) {
  console.log(
    products
      .map((item) =>
        item.id === product.id
          ? { ...item, stock: item.stock + quantity }
          : item
      )
      .filter((item) => item.id === product.id)[0]
  );
}
