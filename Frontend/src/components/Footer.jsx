import React from "react";
import { Link } from "react-router-dom";
import { FaPhone, FaLocationArrow } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Monday",
      time: "9:00 AM - 11:00 PM",
    },
    {
      id: 2,
      day: "Tuesday",
      time: "12:00 PM - 12:00 AM",
    },
    {
      id: 3,
      day: "Wednesday",
      time: "10:00 AM - 10:00 PM",
    },
    {
      id: 4,
      day: "Thursday",
      time: "9:00 AM - 9:00 PM",
    },
    {
      id: 5,
      day: "Monday",
      time: "3:00 PM - 9:00 PM",
    },
    {
      id: 6,
      day: "Saturday",
      time: "9:00 AM - 3:00 PM",
    },
  ];

  return (
    <>
      <footer className="container">
        <hr />
        <div className="content">
          <div>
            <img
              src="https://th.bing.com/th/id/OIP.rvPi9g5eBUJkgoS1rC3x0AHaHa?w=171&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
              alt=""
              className="logo-img"
            />
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <Link to={"/"}>Home</Link>
              <Link to={"/appointment"}>Appointment</Link>
              <Link to={"/about"}>About</Link>
            </ul>
          </div>
          <div>
            <h4>Hours</h4>
            {hours.map((element) => {
              return (
                <li key={element.id}>
                  <span>{element.day}</span>
                  <span>{element.time}</span>
                </li>
              );
            })}
          </div>
          <div>
            <h4>contact</h4>
            <div>
              <FaPhone></FaPhone>
              <span>999-999-9999</span>
            </div>
            <div>
              <MdEmail></MdEmail>
 <span>dipanshu@caregmail.com</span>
            </div>
            <div>
              <FaLocationArrow></FaLocationArrow>
              <span>
                <button>INDIA</button>
                <button> USA </button>
                <button>UK</button>
                <button>NEW YORK</button>
                <button> DUBAI</button>
                <button> FRANCE</button>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
