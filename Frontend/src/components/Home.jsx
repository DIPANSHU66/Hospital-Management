import React from "react";
import Hero from "./Hero";
import Biography from "./Biography";
import MessageForm from "./MessageForm";
import Departments from "./Departments";
const Home = () => {
  return (
    <>
      <Hero
        title="Welcome to Dipanshu Medical Insitute   |  Your  Trusted   Healthcare Provider "
        imageUrl="https://th.bing.com/th/id/OIP.YdeYgj5nF35VuMit64pv-AAAAA?w=182&h=342&c=7&r=0&o=5&dpr=1.5&pid=1.7"
      ></Hero>
      <Biography imageurl="https://th.bing.com/th/id/OIP.17Q8ZXS87lDJxaDTh9DQQQHaFN?w=268&h=188&c=7&r=0&o=5&dpr=1.5&pid=1.7"></Biography>
      <Departments></Departments>
      <MessageForm></MessageForm>
    </>
  );
};

export default Home;
