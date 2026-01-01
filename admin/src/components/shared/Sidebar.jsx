import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLogoutMutation } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { logout } from "../../redux/features/authstate";
import { MapPin, Building2, GitBranch, Users, LogOut, Home, User } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: Home },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Province", path: "/admin/province", icon: MapPin },
    { name: "District", path: "/admin/district", icon: Building2 },
    { name: "Branch", path: "/admin/branch", icon: GitBranch },
    { name: "Profile", path: "/admin/profile", icon: User },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [signout] = useLogoutMutation();
  const { isAuth } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const handleLogout = async () => {
    try {
      const res = await signout().unwrap();
      toast.success(res.message || "Logged Out Successfully");
      dispatch(logout());
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || "Logout Failed");
    }
  };

  return (
    <div className="w-72 bg-gray-900 text-white h-screen flex flex-col shadow-2xl">
      <div className="p-6 border-b border-gray-700 bg-blue-600">
        <h2 className="text-2xl font-bold text-center text-white drop-shadow-lg">🏠 Aangan Sewa</h2>
        <p className="text-center text-blue-100 text-sm mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "hover:bg-gray-700 text-gray-300 hover:text-white hover:shadow-md"
              }`}
            >
              <Icon size={20} className={`transition-transform duration-300 ${
                isActive ? "scale-110" : "group-hover:scale-110"
              }`} />
              <span className="font-medium">{item.name}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700 bg-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <LogOut size={18} className="animate-pulse" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
