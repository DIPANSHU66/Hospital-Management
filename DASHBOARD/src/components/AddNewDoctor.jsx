import React, { useContext, useState } from "react";
import { context } from "../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddNewDoctor = () => {
  const { isAuthenticated, setisAuthenticated } = useContext(context);
  const departments = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "ENT",
    "Dermatology",
    "Physical Therapy",
    "Gastroenterology",
    "Endocrinology",
    "Pulmonology",
    "Nephrology",
    "Hematology",
  ];

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    password: "",
    gender: "male",
    doctorDepartement: "",
    docAvatar: "", // Change to null initially
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstname", form.firstname);
    formData.append("lastname", form.lastname);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("nic", form.nic);
    formData.append("dob", form.dob);
    formData.append("password", form.password);
    formData.append("gender", form.gender);
    formData.append("doctorDepartement", form.doctorDepartement);
    formData.append("docAvatar", form.docAvatar); // Ensure this is a file object

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/doctor/addnew",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }, // Use multipart/form-data
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setisAuthenticated(true);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }

    // Reset form after submission
    setForm({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      nic: "",
      dob: "",
      password: "",
      gender: "male",
      doctorDepartement: "",
      docAvatar: form.docAvatar,
    });
  };

  const handlefile = (e) => {
    const file = e.target.files[0];

    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: file,
    }));
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
          src="https://th.bing.com/th/id/OIP.Y72I8XIj0KCPHr0E-8_XpAHaHa?w=209&h=187&c=7&r=0&o=5&dpr=1.5&pid=1.7"
          alt="logo"
          className="logo"
        />
        <h3> Welcome to Dipanshu Medical Institute ❤️</h3>
        <h1 className="form-title">ADD NEW Doctors</h1>
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
            <input
              type="file"
              name="docAvatar"
              id="docAvatar"
              onChange={handlefile}
              placeholder="Add Profile Photo"
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
          </div>
          <select
            id="department"
            name="doctorDepartement"
            value={form.doctorDepartement}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Department
            </option>
            {departments.map((el, index) => (
              <option key={index} value={el}>
                {el}
              </option>
            ))}
          </select>

          <button type="submit">Add New Doctor</button>
        </form>
      </section>
    </section>
  );
};

export default AddNewDoctor;
