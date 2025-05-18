/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/assets";
import config from "../../config/config";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const LoginPopUp = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Sign In");
  const [showPassword, setShowPassword] = useState(false);
  const { url } = config;
  const { setToken } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };


  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currentState === "Sign In") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
  
    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
  
        if (currentState === "Sign Up") {
          window.alert("Account created successfully");
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Sign In" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Enter Your Full Name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Enter Your Email"
            required
          />

          <div className="password-input-container">
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              required
            />
            <img
              src={showPassword ? assets.eye_open_icon : assets.eye_closed_icon}
              alt="Toggle Password Visibility"
              className="toggle-password-visibility"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "Create Account" : "Sign In"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy. </p>
        </div>
        {currentState === "Sign In" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Sign In")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp;
