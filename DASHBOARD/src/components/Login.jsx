import React, { useContext, useState } from "react";
import { context } from "../main";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const { isAuthenticated, setisAuthenticated } = useContext(context);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    role: "Admin",
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
          role: "Admin",
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const navigate = useNavigate();
  if (isAuthenticated) return navigate("/");

  return (
    <div className="container form-component">
      <img src="https://th.bing.com/th/id/OIP.gqbwZzhhvM46yI9KgXSfdgHaH0?w=168&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" className="logo" alt="logo" />
      <h1>  ❤️    ❤️    ❤️   Welcome to Dipanshu HealthCare ❤️  ❤️  ❤️</h1>
      <p>Only Admins are allowed to access this Resources</p>
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
        ></div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
