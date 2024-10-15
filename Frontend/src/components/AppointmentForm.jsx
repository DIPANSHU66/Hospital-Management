import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AppointmentForm = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    appointment_date: "",
    department: "",
    doctor_firstname: "",
    doctor_lastname: "",
    address: "",
    hasVisited: false,
  });
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const departmentArray = [
    "Radiology",
    "Neurology",
    "Orthopedics",
    "Cardiology",
    "Gastroenterology",
    "Oncology",
    "Pediatrics",
    "Dermatology",
    "Internal Medicine",
    "Surgery",
    "Anesthesiology",
    "Ophthalmology",
    "Urology",
    "Pulmonology",
    "Endocrinology",
    "Rheumatology",
    "Hematology",
    "Nephrology",
    "Psychiatry",
    "Emergency Medicine",
    "Obstetrics and Gynecology",
    "Pathology",
    "Physical Medicine and Rehabilitation",
    "Family Medicine",
    "Addiction Medicine",
    "Sports Medicine",
    "Infectious Diseases",
    "Allergy and Immunology",
    "Plastic Surgery",
    "Vascular Surgery",
    "Thoracic Surgery",
    "General Surgery",
    "Transplant Surgery",
    "Critical Care Medicine",
    "Medical Genetics",
    "Pain Management",
    "Palliative Care",
    "Clinical Pharmacology",
    "Sleep Medicine",
    "Geriatrics",
    "Nuclear Medicine",
    "Maternal-Fetal Medicine",
    "Audiology",
    "Speech-Language Pathology",
    "Reproductive Endocrinology",
    "Neurocritical Care",
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleappointment = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/appointment/post",
        form,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setForm({
      lastname: "",
      email: "",
      phone: "",
      nic: "",
      dob: "",
      gender: "",
      appointment_date: "",
      department: "",
      doctor_firstname: "",
      doctor_lastname: "",
      address: "",
      hasVisited: false,
    });
  };

  return (
    <div className="container form-component appointment-form">
      <h2>Dipanshu Medical Institute ❤️</h2>
      <form onSubmit={handleappointment}>
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
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="" disabled>
              Select your gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            type="date"
            name="appointment_date"
            placeholder="Appointment Date"
            value={form.appointment_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select department
            </option>
            {departmentArray.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>

          <select
            value={`${form.doctor_firstname},${form.doctor_lastname}`}
            onChange={(e) => {
              const [firstname, lastname] = e.target.value.split(",");
              setForm({
                ...form,
                doctor_firstname: firstname || "",
                doctor_lastname: lastname || "",
              });
            }}
            disabled={!form.department}
          >
            <option value="">Select Doctor</option>
            {doctors
              .filter((doctor) => doctor.doctorDepartment === form.department)
              .map((doctor, index) => (
                <option
                  value={`${doctor.firstname},${doctor.lastname}`}
                  key={index}
                >
                  {doctor.firstname} {doctor.lastname}
                </option>
              ))}
          </select>
        </div>
        <textarea
          rows="3"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Have you visited before?</p>
          <input
            step={{ flex: "none", width: "25px" }}
            type="checkbox"
            checked={form.hasVisited}
            onChange={(e) => setForm({ ...form, hasVisited: e.target.checked })}
          />
        </div>
        <button type="submit" style={{ margin: "0 auto" }}>
          GET APPOINTMENT
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
