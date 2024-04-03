import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import Dashboard from "../pages";

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
