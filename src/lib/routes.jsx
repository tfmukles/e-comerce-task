import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import Dashboard from "../pages";
import Checkout from "../pages/checkout";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/products/:slug",
        element: <Dashboard />,
      },
      {
        path: "/products/page/:page",
        element: <Dashboard />,
      },
    ],
  },
]);
