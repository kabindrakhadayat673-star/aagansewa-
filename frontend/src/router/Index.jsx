import Adminlayout from "../layout/Adminlayout";
import PublicLayout from "../layout/PublicLayout";
import { adminRoutes } from "./AdminRoutes";
import { createBrowserRouter } from "react-router-dom";

import Notfound from "../components/shared/Notfound";
import { publicRoutes } from "./PublicRoutes";

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      
        <Adminlayout /> ),
    children: adminRoutes,
  },
  {
    path: "",
    element: <PublicLayout/>,
    children: publicRoutes,
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);
