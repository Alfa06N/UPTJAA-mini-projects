import HomePage from "./pages/home-page/HomePage.jsx";
import ShopPage from "./pages/shop-page/ShopPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import CategoryPage from "./pages/shop-page/components/CategoryPage/CategoryPage.jsx";
import useCart from "./hooks/useCart";
import { createContext } from "react";
import CartPage from "./pages/cart-page/CartPage.jsx";
import useStore from "./hooks/useStore.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/shop-page",
        element: <ShopPage />,
        children: [
          {
            index: true,
            element: <h1>Nothing here to see</h1>,
          },
          {
            path: ":category",
            element: <CategoryPage />,
          },
        ],
      },

      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>404 - Page Not Found</h1>,
  },
]);

export const CartContext = createContext();
export const StoreContext = createContext();

function App() {
  const cartValues = useCart();
  const storeValues = useStore();
  return (
    <>
      <StoreContext value={{ ...storeValues }}>
        <CartContext value={{ ...cartValues }}>
          <RouterProvider router={router}></RouterProvider>
        </CartContext>
      </StoreContext>
    </>
  );
}

export default App;
