import React from "react";

import Signup from "../singup/Signup";
import Login from "../login/Login";

import "./LogOrSign.css";

const LogOrSign = ({ setLoggedIn }) => {
  return (
    <div className="logorsign-wrapper">
      <Signup setLoggedIn={setLoggedIn} />
      <Login setLoggedIn={setLoggedIn} />
    </div>
  );
};

export default LogOrSign;
