import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import "../Sidebar/Sidebar.css";
import "./NavBar.css";
import { setMobileSidebarIsOpen } from "../../app/features/mobileSidebarIsOpen/mobileSidebarIsOpenSlice";

export default function NavBar() {
  const mobileSidebarIsOpen = useSelector(
    (state) => state.mobileSidebarIsOpen.value
  );
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    console.log(mobileSidebarIsOpen);
    dispatch(setMobileSidebarIsOpen(!mobileSidebarIsOpen));
  };

  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: "#fff",
      }}
    >
      <input
        type="checkbox"
        id="sidebar-checkbox-toggle"
        checked={mobileSidebarIsOpen}
        onChange={toggleSidebar}
      />
      <label htmlFor="sidebar-checkbox-toggle" className="navbar-hamburger">
        &#9776;
      </label>
    </nav>
  );
}
