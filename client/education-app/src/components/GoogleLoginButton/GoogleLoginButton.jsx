import React from "react";
import { GoogleLogin } from "react-google-login";

export default function GoogleLoginButton() {
  function onSuccess(res) {
    console.log("Login successful. Cur User: ", res.profileObj);
  }
  function onFailure(res) {
    console.log("Login failed. Cur User: ", res);
  }
  return (
    <div id="google-sign-in-button">
      <GoogleLogin
        clientId={import.meta.env.VITE_CLIENT_ID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}
