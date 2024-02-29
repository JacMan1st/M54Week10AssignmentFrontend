import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  const [randomPhoto, setRandomPhoto] = useState(null);

  useEffect(() => {
    const fetchRandomPhoto = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/photos/random",
          {
            headers: {
              Authorization:
                "Client-ID qQQGmmQbKDUunBP7z-KoctFBxxQqZnFnV06Ad7cqcxU",
            },
          }
        );
        setRandomPhoto(response.data);
      } catch (error) {
        console.error("Error fetching random photo:", error);
      }
    };

    fetchRandomPhoto();
  }, []);

  return (
    <div className="landing-page">
      <h1 className="header">Welcome To SnapSerge</h1>
      <div className="content">
        <div className="image-container">
          {randomPhoto && (
            <img
              className="random-photo"
              src={randomPhoto.urls.regular}
              alt="Random Photo"
            />
          )}
        </div>
        <div className="signup-login">
          <p className="welcome-text">
            Feel the need to Serge?
            <br />
            Sign up or login.
          </p>
          <div className="buttons-container">
            <Link to="./login/Login" className="login-button">
              Login
            </Link>
            <Link to="./signin/Signup" className="signup-button">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
