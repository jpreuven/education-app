import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./NewSideBar.css";
// import logo from "../../images/ProperlyManagementSolutionsLogo.jpg";
import LowerSideBar from "./SidebarComponents/LowerSideBar";
import UpperSideBar from "./SidebarComponents/UpperSideBar";

export default function SideBar() {
  const mobileSidebarIsOpen = useSelector(
    (state) => state.mobileSidebarIsOpen.value
  );

  return (
    <div className="new-sidebar-outer-div">
      <nav
        className={`new-sidebar-inner-div ${
          mobileSidebarIsOpen ? "new-sidebar-inner-div-reopen" : ""
        }`}
      >
        <ul className="new-sidebar-link-list">
          <UpperSideBar />
        </ul>
        <ul className="new-sidebar-link-list" id="new-sidebar-bottom-link-list">
          <LowerSideBar />
        </ul>
      </nav>
    </div>
  );
}
