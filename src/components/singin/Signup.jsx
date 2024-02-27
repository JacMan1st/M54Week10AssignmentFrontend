import { useState } from "react";
import { signup } from "../../ulti/fetch";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const changeHandler = (e, setter, state) => {
    setter(e.target.value);
    console.log(state);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowPopup(true);
    console.log("signup complete");
    await signup(username, email, password);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <form className="form2" onSubmit={handleSubmit}>
        <h3>Signup</h3>
        <input
          placeholder="Username"
          onChange={(e) => changeHandler(e, setUsername, username)}
        />
        <input
          placeholder="email"
          onChange={(e) => changeHandler(e, setEmail, email)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => changeHandler(e, setPassword, password)}
        />
        <button type="submit">Signup</button>
      </form>
      {showPopup && (
        <div className="success-popup">
          <p>
            Signup Successful!
            <br />
            Our new SnapSerger, {username}!
          </p>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Signup;
