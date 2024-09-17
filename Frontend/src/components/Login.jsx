import React, { useContext } from "react";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const { isAuthenticated, setisAuthenticated } = useContext(Context);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    role: "Patient",
  });

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        form,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
        setisAuthenticated(true);
        setForm({
          email: "",
          password: "",
          confirmpassword: "",
          role:"Patient",
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const navigate = useNavigate();
  if (isAuthenticated) return navigate("/");

  return (
    <div className="container  form-component login-form">
      <h2>SIGN IN</h2>
      <p>Please Login To Continue </p>
      <h1>Welcome to Dipanshu Medical Institute ❤️</h1>

      <form onSubmit={handlelogin}>
        <input
          type="email"
          value={form.email}
          placeholder="Enter Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          value={form.password}
          placeholder="Enter Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input
          type="password"
          placeholder="Enter ConfirmPassword"
          value={form.confirmpassword}
          onChange={(e) =>
            setForm({ ...form, confirmpassword: e.target.value })
          }
        />
        <div
          style={{ gap: "10px", justifyContent: "flex", flexDirection: "row" }}
        >
          <p style={{ marginBottom: 0 }}>Not Registered</p>
          <Link
            style={{ textDecoration: "none", alignItems: "center" }}
            to="/register"
          >
            Register Now
          </Link>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
