import React from "react";
import Login from "../Authorization/Login/Login";
import Signup from "../Authorization/Signup/Signup";
import { useSelector } from "react-redux";

export default function AuthorizationPage() {
  const loginOrSignup = useSelector((state) => state.loginOrSignup.value);
  console.log(loginOrSignup ? "Login" : "Signup");

  return <>{loginOrSignup ? <Login /> : <Signup />}</>;
}
