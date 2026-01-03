import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../shared/components/layout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:gender",
        element: <Products />,
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
      },
    ],
  },
]);
