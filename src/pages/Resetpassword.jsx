import { useState } from "react";
import axios from "axios";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/users/reset-password",
        {
          email,
        }
      );
      console.log("Password reset email sent:", response.data);
      setSuccessMessage("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setError(
        error.response.data.message ||
          "An error occurred while sending the password reset email."
      );
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </form>
    </div>
  );
}

export default ResetPassword;
