import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { setUser } from "../../../app/features/users/userSlice";

import settingLogo from "../../../../src/assets/setting-logo.svg";
import profileLogo from "../../../../src/assets/profile-logo.svg";
import logoutLogo from "../../../../src/assets/logout-logo.svg";

const SideBarLowerData = [
  {
    href: "/settings",
    title: "Settings",
    logo: settingLogo,
  },
  { href: "/account", title: "Account Info", logo: profileLogo },
  { href: "/", title: "Logout", logo: logoutLogo },
];
export default function LowerSideBar() {
  let dispatch = useDispatch();

  function handleLogout() {
    fetch("http://localhost:5000/logout", {
      method: "DELETE",
      credentials: "include",
    })
      .then((r) => {
        if (r.ok) {
          console.log("User logged out!");
          //   navigate("/");
          dispatch(setUser(null));
        } else {
          console.log("Something went wrong!");
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  }
  const SideBarLowerDataJSX = SideBarLowerData.map(
    ({ href, title, logo }, index) => {
      return (
        <li key={index} className="new-sidebar-links">
          <div className="new-sidebar-links-div">
            <Link
              to={`${href}`}
              onClick={() => (title === "Logout" ? handleLogout() : null)}
            >
              <div style={{ display: "flex" }}>
                <p
                  style={{
                    flexGrow: "2",
                    color: "#3c4043",
                    fontFamily: "Google Sans",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {title}
                </p>
                <img src={logo} style={{ width: "20px" }} />
              </div>
            </Link>
          </div>
        </li>
      );
    }
  );

  return <>{SideBarLowerDataJSX}</>;
}
