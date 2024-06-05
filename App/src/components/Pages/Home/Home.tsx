import React from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/Design/Header/Header";

const Home = () => {
  return (
    <>
      <Header />
      <div>
        <h1>Welcome to Our App</h1>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </>
  );
};

export default Home;
