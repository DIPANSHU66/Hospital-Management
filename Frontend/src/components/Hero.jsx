import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Dipanshu Medical Institute is a leading-edge healthcare facility
          equipped with the latest technology. Our highly skilled team of
          doctors, specialized nurses, and dedicated support staff delivers
          innovative treatments with a focus on excellence and compassion. We
          ensure each patient receives top-quality care and personalized support
          throughout their healthcare journey.
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="" className="animated-image" />
        <span>
          <img src="https://pa.azureedge.net/media/join-hero/blob-latest.svg" alt="" />
        </span>
      </div>
    </div>
  );
};

export default Hero;
