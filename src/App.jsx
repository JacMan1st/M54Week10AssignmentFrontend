import { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/singin/Signup";
import LandingPage from "./components/landing/Landing";
import Social from "./components/social/Social";
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
          <div className="navbar">
            <div className="nav-links">
              <div className="login-div">
                {!loggedIn && (
                  <Link to="/login" className="login-link">
                    Login
                  </Link>
                )}
              </div>
              <div>
                {loggedIn && (
                  <Link to="/social" className="serge-link">
                    SergeMedia
                  </Link>
                )}
              </div>

              <div>{!loggedIn && <Link to="/signup">Signup</Link>}</div>
            </div>
            <div className="thelogo-container">
              <img
                className="the-logo"
                src="images/Designer.png"
                alt="logo"
              ></img>
            </div>

            <div className="logout-button">
              {loggedIn && <button onClick={handleLogout}>Logout</button>}
            </div>
          </div>
        </nav>
      </div>

      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/social"
            element={loggedIn ? <Social /> : <Navigate to="/" />}
          />
          {!loggedIn && <Route path="*" element={<Navigate to="/login" />} />}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
