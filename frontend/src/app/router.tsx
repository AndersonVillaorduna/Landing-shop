import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../shared/components/layout";
import Home from "../pages/Home";
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
        path: "product/:id",
        element: <ProductDetail />,
      },
    ],
  },
]);
