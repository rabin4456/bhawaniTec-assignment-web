import { createBrowserRouter, Link, Navigate } from "react-router-dom";
import Home from "../pages/home";
import { PageRoutes } from "../global/enum";

export const routes = createBrowserRouter([
  {
    path: PageRoutes.ROOT,
    element: <Navigate to={PageRoutes.HOME} />,
  },

  {
    path: PageRoutes.HOME,
    element: <Home />,
  },
]);
