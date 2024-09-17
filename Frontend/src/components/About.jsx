import React from "react";
import Hero from "./Hero";
import Biography from "./Biography";

const About = () => {
  return (
    <div>
      <Hero
        title={"Learn More About  Us| Dipanshu Medical Institute"}
        imageUrl={
          "https://static.vecteezy.com/system/resources/previews/004/335/589/original/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-vector.jpg"
        }
      ></Hero>
      <Biography
        imageurl={
          "https://stream-blog-v2.imgix.net/blog/wp-content/uploads/93812b9e3e1feff4dd3a93b4fb74a5a6/Screen-Shot-2022-07-29-at-10.37.49-AM.png?auto=format&auto=compress"
        }
      ></Biography>
    </div>
  );
};

export default About;
