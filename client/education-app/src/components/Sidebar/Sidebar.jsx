import React, { useState } from "react";
import "./Sidebar.css";
// import logo from "../../images/ProperlyManagementSolutionsLogo.jpg";
import { useSelector } from "react-redux";
import { SideBarDataJSX } from "./Sidebar.data";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function SideBar() {
  const mobileSidebarIsOpen = useSelector(
    (state) => state.mobileSidebarIsOpen.value
  );
  console.log(mobileSidebarIsOpen);

  return (
    <div className="sidebar-outer-div">
      <nav
        className={`sidebar-inner-div ${
          mobileSidebarIsOpen ? "sidebar-inner-div-reopen" : ""
        }`}
      >
        <div className="sidebar-logo-div">
          <img alt="sidebar-logo" id="sidebar-logo" />
          {/* <img src={logo} alt="sidebar-logo" id="sidebar-logo" /> */}
        </div>
        <ul className="sidebar-link-list">{SideBarDataJSX}</ul>
        <ul className="sidebar-link-list" id="sidebar-botton-link-list">
          <li className="sidebar-links">
            <div className="sidebar-links-div">
              <a href="/testing">Settings</a>
            </div>
          </li>
          <li className="sidebar-links">
            <div className="sidebar-links-div">
              <a href="/testing">Account Info</a>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
