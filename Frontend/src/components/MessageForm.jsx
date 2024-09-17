import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const MessageForm = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleMessage = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      await axios
        .post("http://localhost:8000/api/v1/message/send", form, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          toast.success(res.data.message);
          setForm({
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            message: "",
          });
        });
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="container form-component message-form">
      <h2>Send us A Message</h2>
      <form action="" onSubmit={handleMessage}>
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={form.firstname}
            onChange={(e) => setForm({ ...form, firstname: e.target.value })}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={form.lastname}
            onChange={(e) => setForm({ ...form, lastname: e.target.value })}
          />
        </div>
        <div>
          {" "}
          <input
            type="text"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="number"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <textarea
          rows={7}
          placeholder="Message"
          value={form.message}
          name=""
          id=""
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        ></textarea>

        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
