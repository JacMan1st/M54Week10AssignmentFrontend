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
      <div className="header">
        <h1>SnapSerge</h1>
        <img src="" alt="" className="logo" />
      </div>
      <div className="content">
        <div className="social-post">
          <div className="image-container">
            {randomPhoto && (
              <img
                className="random-photo"
                src={randomPhoto.urls.regular}
                alt="Random Photo"
              />
            )}
            <div className="reactions">
              <i className="far fa-heart"></i>
              <i className="far fa-laugh-squint"></i>
              <i className="far fa-thumbs-up"></i>
            </div>
          </div>
          <div className="comments">
            <div className="comment-bubble">
              <div className="speech-bubble">
                <p>Wow, love this!</p>
              </div>
              <div className="comment-icons">
                <i className="far fa-heart"></i>
                <i className="far fa-laugh-squint"></i>
                <i className="far fa-thumbs-up"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="signup-login">
          <p className="playful-text">
            Like what you see? <br /> Sign up or login.
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
