
import Home from '../components/public/Home';
import Login from '../components/shared/Login';
import BranchService from '../pages/BranchServices';

export const publicRoutes = [
    {
        path: "",
        element: <Home />,
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: ":place",
        element: <BranchService />
    }
];