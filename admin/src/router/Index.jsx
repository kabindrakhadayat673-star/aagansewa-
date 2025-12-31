import Adminlayout from "../layout/Adminlayout";
import { adminRoutes } from "./AdminRoutes";
import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Notfound from "../components/shared/Notfound";
import Guard from "./Guard";

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <Guard>
        <Adminlayout />
      </Guard>
    ),
    children: adminRoutes,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);
