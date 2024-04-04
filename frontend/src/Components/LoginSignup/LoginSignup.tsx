import React, { useState } from "react";
import axios from "axios"; // Import Axios
import "./LoginSignup.css";
import { useNavigate } from 'react-router-dom';
import user_icon from "../Assets/user.png";
import email_icon from "../Assets/mail.png";
import password_icon from "../Assets/password.png";

interface LoginSignupProps { }

const LoginSignup: React.FC<LoginSignupProps> = () => {
  const [action, setAction] = useState<"Sign Up" | "Login">("Login");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleSubmit = async () => {
    try {
      console.log("clicked")
      const response = await axios.post("http://localhost:8000/login/", formData);
      console.log(response.data); // Assuming Django responds with some data
      const token = response.data.token; // Assuming the token key is 'token' in the response
      console.log(token);
      localStorage.setItem('myAuthToken', token);
      
      if (token) { // Assuming token is set after successful login
        navigate('/home');
      }
      // Handle successful login here (e.g., store token in local storage, redirect user, etc.)
    } catch (error) {
      alert("Invalid username or password");
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
      </div>
      <div className="inputs">

        <div className="input">
          <img src={user_icon} alt="user icon" />
          <input type="text" placeholder="user name" name="username" onChange={handleChange} />
        </div>

        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={email_icon} alt="email icon" />
            <input type="email" placeholder="email" name="email" onChange={handleChange} />
          </div>
        )}

        <div className="input">
          <img src={password_icon} alt="password icon" />
          <input type="password" placeholder="password" name="password" onChange={handleChange} />
        </div>
      </div>
      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => setAction("Sign Up")}
        >
          
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => setAction("Login")}
        >
          
        </div>

        <div className="submit-button" onClick={handleSubmit}>
          Submit
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;