import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Appointment from "./components/Appointment";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment></Appointment>} />
        <Route path="/About" element={<About></About>} />
        <Route path="/Register" element={<Register></Register>} />
        <Route path="/Login" element={<Login></Login>} />
        <Route path="/Login" element={<Login></Login>} />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
