import React from "react";
import { useContext } from "react";
import { context } from "../main";
import { Navigate } from "react-router-dom";
const Dashboard = () => {
  const { isAuthenticated } = useContext(context);
  if (!isAuthenticated) return <Navigate to="/login"></Navigate>;
  return <div></div>;
};

export default Dashboard;
