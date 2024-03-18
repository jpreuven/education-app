import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../app/features/users/userSlice";
import { setLoginOrSignup } from "../../../app/features/LoginOrSignup/loginOrSignupSlice";
import "./Login.css";
import Topbar from "../../../components/Topbar/Topbar";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const loginOrSignup = useSelector((state) => state.loginOrSignup.value);

  function handleSubmit(e) {
    e.preventDefault();
    const userInfo = {
      username: usernameValue,
      password: passwordValue,
    };
    fetch("http://localhost:5000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          console.log("User found!");
          dispatch(setUser(user));
          navigate("/");
        });
      } else {
        console.log("Something went wrong!");
      }
    });
  }

  return (
    <div>
      <Topbar />
      <div className="login">
        <div className="login-outer-card">
          <form className="login-form" onSubmit={handleSubmit}>
            <h6 className="login-outer-card-header">
              Login to your account at{" "}
              <span className="login-outer-card-header-span">
                Education App
              </span>
            </h6>
            <label className="login-outer-card-label">Username:</label>
            <input
              className="login-outer-card-input"
              type={"text"}
              value={usernameValue}
              onChange={(e) => {
                setUsernameValue(e.target.value);
              }}
            />
            <label className="login-outer-card-label">Password:</label>
            <input
              className="login-outer-card-input"
              type={"password"}
              value={passwordValue}
              onChange={(e) => {
                setPasswordValue(e.target.value);
              }}
            />
            <button className="login-outer-card-login-button">
              Click to Login
            </button>
          </form>
          <p className="login-outer-card-signup">
            Don't have an account?{" "}
            <span
              onClick={() => {
                dispatch(setLoginOrSignup(!loginOrSignup));
              }}
              className="login-outer-card-signup-span"
            >
              Click here!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
