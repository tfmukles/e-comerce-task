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
    ],
  },
]);
