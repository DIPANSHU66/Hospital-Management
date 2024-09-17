import React from "react";
import AppointmentForm from "./AppointmentForm";
import Hero from "./Hero";

const Appointment = () => {
  return (
    <div>
      <Hero
        title={"Sechdule YourAppointment | Dipanshu Medical Insitute"}
        imageUrl={"https://static.vecteezy.com/system/resources/previews/041/437/133/non_2x/strategic-planning-in-business-3d-character-illustration-png.png"}
      ></Hero>
      <AppointmentForm></AppointmentForm>
    </div>
  );
};

export default Appointment;
