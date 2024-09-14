import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Dipanshu Medical Institute stands out as a state-of-the-art facility,
          designed to meet the highest standards of modern healthcare. Our
          institute is equipped with the latest advancements in medical
          technology, ensuring that we provide the most effective and innovative
          treatments available. Our team comprises highly skilled professionals,
          including experienced doctors, specialized nurses, and dedicated
          support staff, all of whom are committed to excellence in patient
          care. Each member of our team is chosen not only for their expertise
          but also for their compassionate approach, ensuring that every patient
          feels understood and supported throughout their healthcare journey.
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="" className="animated-image" />
        <span>
          <img src="/vector.png" alt="" />
        </span>
      </div>
    </div>
  );
};

export default Hero;
