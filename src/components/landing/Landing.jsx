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
      <div className="content">
        <div className="signup-login">
          <h3 className="welcome-text">Welcome to SnapSerge!</h3>

          <p>
            Are you on the verge to Serge?
            <br />
            Sign up or login.
          </p>
          <div className="buttons-container">
            <Link to="/Login" className="login-button">
              LogIn
            </Link>
            <Link to="/Signup" className="signup-button">
              SignUp
            </Link>
          </div>
        </div>

        <div className="image-container">
          <img
            className="phone"
            src="images/My first design (1).png"
            alt="phone selfie"
          />
          {randomPhoto && (
            <img
              className="landing-photo"
              src={randomPhoto.urls.regular}
              alt="landing Photo"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
