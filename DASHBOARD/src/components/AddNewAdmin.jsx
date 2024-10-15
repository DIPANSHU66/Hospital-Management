import React, { useContext, useState } from "react";
import { context } from "../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const AddNewAdmin = () => {
  const { isAuthenticated, setisAuthenticated } = useContext(context);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    password: "",
    gender: "",
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/admin/addnew",
        form,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.Success) {
        console.log(res.data);
        toast.success(res.data.message);
        setisAuthenticated(true);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setForm({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      nic: "",
      dob: "",
      password: "",
      gender: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  if (!isAuthenticated) navigate("/login");

  return (
    <section className="page">
      <section className="container form-component add-admin-form">
        <img
          src="https://th.bing.com/th/id/OIP.vuCzUS9JxTCSps8WU1HzAgHaHa?w=192&h=193&c=7&r=0&o=5&dpr=1.5&pid=1.7"
          alt="logo"
          className="logo"
        />
        <h3> Welcome to Dipanshu Medical Institute ❤️</h3>
        <h1 className="form-title">ADD NEW ADMIN</h1>
        <form onSubmit={handleRegister}>
          <div>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={form.firstname}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={form.lastname}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="nic"
              placeholder="NIC"
              value={form.nic}
              onChange={handleChange}
            />
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={form.dob}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <div></div>
          </div>
          <button type="submit">Add New Admin</button>
        </form>
      </section>
    </section>
  );
};

export default AddNewAdmin;
