import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";

function Login({ setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://m54week10assignmentbackend.onrender.com/users/login", {
        username,
        password,
      });
      console.log("Login successful:", response.data);
      setLoggedIn(true);
      setLoggedInUser(username);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Error logging in:", error);
      setError(
        error.response.data.message || "An error occurred during login."
      );
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            placeholder="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
        {loggedInUser && (
          <p className="success-message">
            Welcome back to SnapSerge!
            <br />
            {loggedInUser}'s here reporting for duty!
          </p>
        )}
      </form>
      <a href="*" className="forget-pass">
        Forgot Password?
      </a>
    </div>
  );
}

export default Login;
