import Adminlayout from "../layout/Adminlayout";
import { adminRoutes } from "./AdminRoutes";
import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Notfound from "../components/shared/Notfound";



export const router = createBrowserRouter([
    {
        path: "/admin",
        element: <Adminlayout/>,
        children: adminRoutes,
    },
    {
        path: "/",
        element:<Login/>,

    },
    {
        path: "*",
        element: <Notfound />,
    },
  
]);


