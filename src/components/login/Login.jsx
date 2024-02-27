import React, { useState } from "react";
import { loginUser } from "../../ulti/fetch";

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const changeHandler = (e, setter, state) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(username, password);
      console.log("backend connection", data);

      if (data && data.user.id && data.user.username) {
        setShowPopup(true);
        setLoggedIn(true);
      } else {
        console.log("unexpected: ", data);
        console.log("ID: ", data.user.id);
        console.log("username: ", data.user.username);
        console.log("email: ", data.user.email);
        throw new Error("invalid");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <form className="form1" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <input
          placeholder="username"
          onChange={(e) => changeHandler(e, setUsername, username)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => changeHandler(e, setPassword, password)}
        />
        <button>Login</button>
      </form>
      {showPopup && (
        <div className="success-popup">
          <p>
            Login Successful!
            <br />
            SnapSurger {username}, reporting for duty!
          </p>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Login;
