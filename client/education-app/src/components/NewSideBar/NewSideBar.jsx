import React, { useState } from "react";
import "./NewSideBar.css";
// import logo from "../../images/ProperlyManagementSolutionsLogo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { SideBarDataJSX, SideBarLowerDataJSX } from "../Sidebar/Sidebar.data";
import { setUser } from "../../app/features/users/userSlice";
import { Link, useNavigate } from "react-router-dom";

export default function SideBar() {
  const mobileSidebarIsOpen = useSelector(
    (state) => state.mobileSidebarIsOpen.value
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <div className="new-sidebar-outer-div">
      <nav
        className={`new-sidebar-inner-div ${
          mobileSidebarIsOpen ? "new-sidebar-inner-div-reopen" : ""
        }`}
      >
        <ul className="new-sidebar-link-list">{SideBarDataJSX}</ul>
        <ul className="new-sidebar-link-list" id="new-sidebar-bottom-link-list">
          {/* <li className="sidebar-links">
            <div className="sidebar-links-div">
              <Link to="/testing">Settings</Link>
            </div>
          </li>
          <li className="sidebar-links">
            <div className="sidebar-links-div">
              <Link to="/testing1">Account Info</Link>
            </div>
          </li>
          <li className="sidebar-links">
            <div className="sidebar-links-div">
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          </li> */}
          {SideBarLowerDataJSX}
          {/* <li>yo</li> */}
        </ul>
      </nav>
    </div>
  );
}
