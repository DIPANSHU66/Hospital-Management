import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Appointment from "./components/Appointment";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { Context } from "./main";
import axios from "axios";
const App = () => {
  const { isAuthenticated, setisAuthenticated, setuser } = useContext(Context);

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/patient/me",
          { withCredentials: true }
        );
        if (response.data.success) {
          setisAuthenticated(true);
          setuser(response.data.user);
        } else {
          setisAuthenticated(false);
          setuser({});
        }
      } catch (e) {
        setisAuthenticated(false);
        setuser({});
        toast.error("Failed to fetch user data");
      }
    };
    fetchuser();
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
