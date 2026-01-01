import Dashboard from "../components/Dasboard";
import Users from "../components/Users";
import Proviencedas from "../components/pages/provience/Proviencedas";
import Districtdas from "../components/pages/district/Districtdas";
import BranchManagement from "../components/pages/branch/Branchdas";

export const adminRoutes = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "users",
    element: <Users />,
  },
  {
    path: "province",
    element: <Proviencedas />,
  },
  {
    path: "district",
    element: <Districtdas />,
  },
  {
    path:"branch",
    element:<BranchManagement/>
  }
];
