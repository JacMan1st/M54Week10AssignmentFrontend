import { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/singin/Signup";
import LandingPage from "./components/landing/Landing";
import { Navigate } from "react-router-dom";
import "./App.css";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      <div className="bodz">
        <nav>
          <ul>
            <li>
              {!loggedIn && (
                <Link to="/login" className="login-link">
                  Login
                </Link>
              )}
              {!loggedIn && <Link to="/signup">Signup</Link>}
            </li>
          </ul>
          {loggedIn && <button onClick={handleLogout}>Logout</button>}
        </nav>
      </div>
      <div style={{ paddingTop: "60px" }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          {!loggedIn && <Route path="*" element={<Navigate to="/login" />} />}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
