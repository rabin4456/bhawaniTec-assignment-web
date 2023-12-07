import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/home";
import { PageRoutes } from "../global/enum";
import { AppLayout } from "../components";
import DebitNote from "../pages/debitNote";

export const routes = createBrowserRouter([
  {
    path: PageRoutes.ROOT,
    element: <Navigate to={PageRoutes.HOME} />,
  },

  {
    element: <AppLayout />,
    children: [
      {
        path: PageRoutes.HOME,
        element: <Home />,
      },
      {
        path: PageRoutes.DEBIT_NOTE,
        element: <DebitNote />,
      },
    ],
  },
]);
