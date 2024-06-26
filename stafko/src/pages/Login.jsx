import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/Login.css";
import Header from "../components/login_components/Header.jsx";
import Footer from "../components/login_components/Footer.jsx";
import { loginUser } from "../utils/login_calls/LoginCalls.js";

export default function Login({ setIsLoggedIn, username, setUsername }) {
  const [pass, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    loginUser({ username, pass, setIsLoggedIn, setError });
  };

  return (
      <div className="bg-div">
        <Header />
        <div className="main-div">
          <form onSubmit={handleLogin}>
            <h2>Welcome</h2>
            <img
              className="icon-img"
              src="src/assets/user_images/user-icon.png"
              alt="user-icon"
            />
            <label htmlFor="username">Username:</label>
            <br />
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={30}
            />
            <br />
            <img
              className="icon-img"
              src="src/assets/user_images/password-icon.png"
              alt="user-icon"
            />
            <label htmlFor="password">Password:</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              value={pass}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={50}
            />
            <br />
            <input className="submit" type="submit" value="Login" />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <p>
              Don't have an account?&nbsp;
              <Link to="/register" className="register-link">
                Register here
              </Link>
            </p>
          </form>
        </div>
        <Footer />
      </div>
  );
}
