import React from "react";
import { GoogleLogout } from "react-google-login";

export default function GoogleLogoutButton() {
  function onSuccess() {
    console.log("Log out successful");
  }

  return (
    <div id="google-sign-in-button">
      <GoogleLogout
        clientId={import.meta.env.VITE_CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}
