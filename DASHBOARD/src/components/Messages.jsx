import React, { useContext, useEffect, useState } from "react";
import { context } from "../main";
import axios from "axios";
import { Navigate } from "react-router-dom";
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated, setisAuthenticated } = useContext(context);
  useEffect(() => {
    const fetchmessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/message/getall",
          { withCredentials: true }
        );
        setMessages(res.data.messages);
      } catch (error) {
        console.log("Error Occured While Fetching Messages:", error);
      }
    };
    fetchmessages();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login"></Navigate>;
  }
  console.log(messages);
  return (
    <section className="page messages">
      <h1>Messages</h1>
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((element) => {
            return (
              <div className="card">
                <div className="details">
                  <p>
                    First Name :<span>{element.firstname}</span>
                  </p>
                  <p>
                    {" "}
                    Last Name :<span>{element.lastname}</span>
                  </p>
                  <p>
                    {" "}
                    Email :<span>{element.email}</span>
                  </p>
                  <p>
                    Phone:<span>{element.phone}</span>
                  </p>
                  <p>
                    Message :<span>{element.message}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>"No Message Yet"</h1>
        )}
      </div>
    </section>
  );
};

export default Messages;
