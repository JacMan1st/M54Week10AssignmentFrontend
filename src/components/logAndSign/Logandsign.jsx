import React from "react";

import Signup from "../singup/Signup";
import Login from "../login/Login";

import "./Logandsign.css";

const LogAndSign = ({ setLoggedIn }) => {
  return (
    <div className="logandsign-wrapper">
      <Signup setLoggedIn={setLoggedIn} />
      <Login setLoggedIn={setLoggedIn} />
    </div>
  );
};

export default LogAndSign;
