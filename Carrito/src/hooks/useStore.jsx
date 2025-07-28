import { useState, useEffect, useCallback, useMemo } from "react";

const API_ENDPOINTS = {
  PRODUCTS: "https://fakestoreapi.com/products ",
  CATEGORIES: "https://fakestoreapi.com/products/categories ",
};

export default function useStore() {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      if (products) return products;

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

      setProducts(processedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [products]);

  const fetchCategories = useCallback(async () => {
    try {
      if (categories) return;

      const response = await fetch(API_ENDPOINTS.CATEGORIES);
      if (!response.ok) throw new Error("Failed to fetch categories");

      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, [categories]);

  const getProduct = useCallback(
    async (idProduct) => {
      try {
        if (typeof idProduct !== "number")
          throw new Error("ID must be a number");

        const product = products.find((item) => item.id === idProduct);
        if (product) return product;

        const response = await fetch(`${API_ENDPOINTS.PRODUCTS}/${idProduct}`);
        if (!response.ok)
          throw new Error(`Failed fetching product with id: ${idProduct}`);
        const data = await response.json();
        const updatedProduct = {
          ...data,
          limit: Math.floor(Math.random() * 100),
        };

        setProducts((prevProducts) => [...prevProducts, updatedProduct]);
        return updatedProduct;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    },
    [products]
  );

  const filterProductsByCategory = useCallback(
    (category) => {
      if (!category || typeof category !== "string")
        throw new Error("Category must be a string:", category);

      if (!categories) return null;
      if (!products) return null;
      return products.filter((product) => product.category === category);
    },
    [categories, products]
  );

  const updateStock = useCallback(
    (idProduct, quantity = 1) => {
      if (!products) throw new Error("Products haven't been fetched yet!");
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === idProduct
            ? { ...product, stock: product.stock - quantity }
            : product
        )
      );
    },
    [products]
  );

  const restoreStock = useCallback((idProduct, quantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === idProduct
          ? { ...product, stock: product.stock + quantity }
          : product
      )
    );
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchCategories, fetchProducts]);

  const value = useMemo(
    () => ({
      products,
      categories,
      getProduct,
      fetchProducts,
      fetchCategories,
      updateStock,
      restoreStock,
      filterProductsByCategory,
    }),
    [
      products,
      categories,
      getProduct,
      fetchProducts,
      fetchCategories,
      updateStock,
      restoreStock,
      filterProductsByCategory,
    ]
  );

  return value;
}
