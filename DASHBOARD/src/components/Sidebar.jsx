import React, { useContext, useState } from "react";
import { context } from "../main";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setisAuthenticated } = useContext(context);
  const navigate = useNavigate();
  const loggingout = async () => {
    setShow(!show);
    await axios
      .get("http://localhost:8000/api/v1/user/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setisAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      <section
        className={show ? "show sidebar" : "sidebar"}
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        <div className="links">
          <TiHome
            onClick={() => {
              setShow(!show);
              navigate("/");
            }}
          ></TiHome>
          <FaUserDoctor
            onClick={() => {
              setShow(!show);
              navigate("/doctors");
            }}
          ></FaUserDoctor>
          <MdAddModerator
            onClick={() => {
              setShow(!show);
              navigate("/messages");
            }}
          ></MdAddModerator>
          <IoPersonAddSharp
            onClick={() => {
              setShow(!show);
              navigate("/doctor/addnew");
            }}
          ></IoPersonAddSharp>
          <AiFillMessage
            onClick={() => {
              setShow(!show);
              navigate("/admin/addnew");
            }}
          ></AiFillMessage>
          <RiLogoutBoxFill onClick={loggingout}></RiLogoutBoxFill>
        </div>
      </section>
      <div
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className="wrapper"
      >
        <GiHamburgerMenu
          className="hamburger"
          onClick={() => setShow(!show)}
        ></GiHamburgerMenu>
      </div>
    </>
  );
};

export default Sidebar;
