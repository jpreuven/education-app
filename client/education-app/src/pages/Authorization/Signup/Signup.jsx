import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../app/features/users/userSlice";
import { setLoginOrSignup } from "../../../app/features/LoginOrSignup/loginOrSignupSlice";
import "./Signup.css";
import Topbar from "../../../components/Topbar/Topbar";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [usernameValue, setUsernameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const loginOrSignup = useSelector((state) => state.loginOrSignup.value);

  function handleSubmit(e) {
    e.preventDefault();
    const userInfo = {
      username: usernameValue,
      email: emailValue,
      password: passwordValue,
    };

    fetch("http://localhost:5000/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error("Failed to sign up");
        }
      })
      .then((user) => {
        console.log("User created!");
        console.log(user);
        dispatch(setUser(user));
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing up:", error.message);
      });
  }

  return (
    <div>
      <Topbar />
      <div className="signup">
        <div className="signup-outer-card">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h6 className="signup-outer-card-header">
              Signup for an account at{" "}
              <span className="signup-outer-card-header-span">
                Education App
              </span>
            </h6>
            <label className="signup-outer-card-label">Email:</label>
            <input
              className="signup-outer-card-input"
              type={"text"}
              value={emailValue}
              onChange={(e) => {
                setEmailValue(e.target.value);
              }}
            />
            <label className="signup-outer-card-label">Username:</label>
            <input
              className="signup-outer-card-input"
              type={"text"}
              value={usernameValue}
              onChange={(e) => {
                setUsernameValue(e.target.value);
              }}
            />
            <label className="signup-outer-card-label">Password:</label>
            <input
              className="signup-outer-card-input"
              type={"password"}
              value={passwordValue}
              onChange={(e) => {
                setPasswordValue(e.target.value);
              }}
            />
            <button className="signup-outer-card-signup-button">
              Click to Signup
            </button>
          </form>
          <p className="signup-outer-card-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                dispatch(setLoginOrSignup(!loginOrSignup));
              }}
              className="signup-outer-card-login-span"
            >
              Click here!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
