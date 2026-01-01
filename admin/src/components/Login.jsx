import { useState, useEffect } from "react";
import Input from "./shared/input";
import { useLoginMutation } from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/features/authstate";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const { isAuth } = useSelector((state) => state.user || {});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  useEffect(() => {
    if (isAuth) {
      navigate("/admin/dashboard");
    }
  }, [isAuth, navigate]);
  
  const handleClick = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await login(formData).unwrap();
      console.log(res);
      dispatch(setUser(res.user));
      navigate("/admin/dashboard");
      toast.success(res.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center bg-white p-10 rounded-xl shadow-md w-96">
        {/* Login Heading */}
        <h1 className="text-3xl font-bold mb-6">LOGIN</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
          <Input
            label="Email"
            type="text"
            placeholder="Enter the email"
            id="email"
            required
            onChange={handleClick}
            value={formData.email}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter the password"
            id="password"
            required
            onChange={handleClick}
            value={formData.password}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg mt-3"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;