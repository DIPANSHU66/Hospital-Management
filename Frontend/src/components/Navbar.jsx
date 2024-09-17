import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = () => {
  const navigate = useNavigate();
  const [show, setshow] = useState(false);
  const { isAuthenticated, setisAuthenticated } = useContext(Context);
  const handlelogout = async (e) => {
    e.preventDefault();
    try {
      await axios
        .get("http://localhost:8000/api/v1/user/patient/logout", {
          withCredentials: true,
        })
        .then((res) => {
          setisAuthenticated(false);
          toast.success(res.data.message);
          navigate("/login");
        });
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const gotologin = () => {
    navigate("/login");
  };

  return (
    <nav className="c">
     
      <div className="logo"> </div>
      <div className={show ? "nav so" : "navlink"}>
        <div className="link">
          <Link to="/" onClick={() => setshow(!show)}>
            HOME
          </Link>
          <Link to="/appointment" onClick={() => setshow(!show)}>
            Appointment
          </Link>
          <Link to="/about" onClick={() => setshow(!show)}>
            About Us
          </Link>
        </div>
        {isAuthenticated ? (
          <button className="logoutBt btn" onClick={handlelogout}>
            Logout
          </button>
        ) : (
          <button className="loginBt  btn" onClick={gotologin}>
            Login
          </button>
        )}
      </div>
      <div className="hamburger" onClick={() => setshow(!show)}>
        <GiHamburgerMenu></GiHamburgerMenu>
      </div>
    </nav>
  );
};
export default Navbar;
