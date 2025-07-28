import { useState } from "react";

export default function useCart() {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantityAdded) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (!existingProduct) {
        return [
          ...prevCart,
          {
            ...product,
            quantity: quantityAdded,
          },
        ];
      } else {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityAdded }
            : item
        );
      }
    });
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const findProduct = (product) => {
    return cart.find((item) => item.id === product.id);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      return parseFloat((total + item.price * item.quantity).toFixed(2));
    }, 0);
  };

  return {
    cart,
    addToCart,
    findProduct,
    removeFromCart,
    clearCart,
    getTotalPrice,
  };
}
