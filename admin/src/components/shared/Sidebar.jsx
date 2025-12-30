import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { logout } from "../../redux/features/authstate";

const Sidebar = () => {
  const menuItems = [
    { name: "Province", path: "/admin/province" },
    { name: "District", path: "/admin/district" },
    { name: "Branch Management", path: "/admin/branch" },
    { name: "Profile", path: "/admin/profile" },
  ];
  const Dispatch = useDispatch();
  const Navigate = useNavigate();
  const [signout] = useLogoutMutation();
  const { isAuth } = useSelector((state) => state.user);
  useEffect(() => {
    if (!isAuth) {
      Navigate("/");
    }
  }, [isAuth, Navigate]);

  const handlelogout = async () => {
    try {
      Dispatch(logout());
      const res = await signout().unwrap();
      toast.success(res.message || "Logged Out Successfully");
      Navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || "Logout Failed");
    }
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-8">
        <button
          onClick={handlelogout}
          className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
