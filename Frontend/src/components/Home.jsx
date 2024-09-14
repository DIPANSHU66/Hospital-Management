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
        imageUrl="/hero.png"
      ></Hero>
      <Biography></Biography>
      <Departments></Departments>
      <MessageForm></MessageForm>
    </>
  );
};

export default Home;
