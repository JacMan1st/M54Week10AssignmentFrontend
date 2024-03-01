import { useState } from "react";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [signedUpUser, setSignedUpUser] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/users/signupUser",
        {
          username,
          email,
          password,
        }
      );
      console.log("Signup successful:", response.data);
      setSignedUpUser(response.data.user.username);
      alert(
        `Success! You have signed up. Welcome, ${response.data.user.username}!`
      );
    } catch (error) {
      console.error("Error signing up:", error);
      setError(
        error.response.data.message || "An error occurred during signup."
      );
    }
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit} className="signup-form">
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
            placeholder="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
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
        <button type="submit" className="submit-button">
          Signup
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default Signup;
