import React, { useState } from "react";
import "./LoginSignup.css";

import user_icon from "../Assets/user.png";
import email_icon from "../Assets/mail.png";
import password_icon from "../Assets/password.png";

interface LoginSignupProps {}

const LoginSignup: React.FC<LoginSignupProps> = () => {
  const [action, setAction] = useState<"Sign Up" | "Login">("Sign Up");

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div className="idk"></div>
        ) : (
          <div className="input">
            <img src={user_icon} alt="user icon" />
            <input type="text" placeholder="user name" />
          </div>
        )}
        <div className="input">
          <img src={email_icon} alt="email icon" />
          <input type="email" placeholder="email" />
        </div>
        <div className="input">
          <img src={password_icon} alt="password icon" />
          <input type="password" placeholder="password" />
        </div>
      </div>
      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => setAction("Sign Up")}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => setAction("Login")}
        >
          Login
        </div>

        <div className="submit-button" onClick={() => console.log("submit")}>
          Submit
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;