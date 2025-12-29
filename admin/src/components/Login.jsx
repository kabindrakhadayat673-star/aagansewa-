import { useState } from "react";
import Input from "./shared/input";
import { useLoginMutation } from "../redux/features/authSlice";

const Login = () => {
  const [Login]= useLoginMutation();
const [formData, setFromData]=useState({
    email: "",
    password: "",
    })
    const handlClick = (e) => {
    const { id, value } = e.target;
    setFromData({ ...formData, [id]: value });

    }

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
     const res = await Login(formData).unwrap();
     console.log(res);
     } catch (error) {
      alert("error",error);
      console.log(error);
      
    }
  }
  
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
            onChange={handlClick}
            value={formData.email}

          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter the password"
            id="password"
             required
             onChange={handlClick}
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
