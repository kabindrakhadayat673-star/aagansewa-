import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const Guard = ({ children }) => {
  const isAuth = useSelector((state) => state.user.isAuth);
  return isAuth ? children : <Navigate to="/" repalce />;
};