import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AddNewDoctor from "./components/AddNewDoctor";
import AddNewAdmin from "./components/AddNewAdmin";
import Messages from "./components/Messages";
import Doctors from "./components/Doctors";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { context } from "./main";
import { useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import "./App.css"
const App = () => {
  const { isAuthenticated, setisAuthenticated, setuser } = useContext(context);
  useEffect(() => {
    const fetchuser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/admin/me",
          { withCredentials: true }
        );
        setisAuthenticated(true);
        setuser(response.data.user);
      } catch (e) {
        setisAuthenticated(false);
        setuser({});
      }
    };
    fetchuser();
  }, [isAuthenticated]);
  return (
    <>
      <Router>
        <Sidebar></Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard></Dashboard>} />
          <Route path="/login" element={<Login></Login>} />
          <Route
            path="/doctor/addnew"
            element={<AddNewDoctor></AddNewDoctor>}
          />
          <Route path="/admin/addnew" element={<AddNewAdmin></AddNewAdmin>} />
          <Route path="/messages" element={<Messages></Messages>} />
          <Route path="/doctors" element={<Doctors></Doctors>} />
        </Routes>
        <ToastContainer position="top-center"></ToastContainer>
      </Router>
    </>
  );
};

export default App;
