import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { logout } from "../../redux/features/authstate";
import { MapPin, Building2, GitBranch, User, LogOut, Home } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: Home },
    { name: "Province", path: "/admin/province", icon: MapPin },
    { name: "District", path: "/admin/district", icon: Building2 },
    { name: "Branch Management", path: "/admin/branch", icon: GitBranch },
    { name: "Profile", path: "/admin/profile", icon: User },
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
      
      const res = await signout().unwrap();
      toast.success(res.message || "Logged Out Successfully");
       Dispatch(logout());
      Navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || "Logout Failed");
    }
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-screen flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold text-center">Admin Panel</h2>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700 text-gray-300 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handlelogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
