import React from "react";

const Biography = ({ imageurl }) => {
  return (
    <>
    <div className="conatiner biography">
      <div className="banner">
        <img src={imageurl} alt="" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h1>Who We Are</h1>
        <p>
          Certainly! Here’s a focused "About Us" section specifically about the
          health services provided by the Dianshu Medical Institute: About Us At
          Dianshu Medical Institute, our commitment to health is unwavering. We
          provide a comprehensive range of medical services designed to meet the
          diverse needs of our patients.
        </p>
        <p>
          At Dipanshu Medical Institute, we are dedicated to advancing health
          through a combination of innovative practices and personalized care,
        </p>
        <p>
          We extend our heartfelt gratitude for taking the time to visit Dianshu
          Medical Institute.
        </p>
        <p>
          We hope that your experience here has been insightful and reassuring.
          Our team is dedicated to providing exceptional care and support.
        </p>
        <p>
          Should you have any further questions or require additional
          information, please do not hesitate to reach out.
        </p>
        <p>Thank you once again for your visit.</p>
      </div>
    </div>
    </>
  );
};

export default Biography;
