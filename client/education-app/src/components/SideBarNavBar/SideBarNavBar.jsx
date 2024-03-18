import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../Sidebar/Sidebar.css";
import { setMobileSidebarIsOpen } from "../../app/features/mobileSidebarIsOpen/mobileSidebarIsOpenSlice";

export default function SideBarNavBar() {
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
      className="sidebar-navbar"
      style={{
        backgroundColor: mobileSidebarIsOpen ? "#001730" : "#002043",
      }}
    >
      <input
        type="checkbox"
        id="sidebar-checkbox-toggle"
        checked={mobileSidebarIsOpen}
        onChange={toggleSidebar}
      />
      <label htmlFor="sidebar-checkbox-toggle" className="sidebar-hamburger">
        &#9776;
      </label>
    </nav>
  );
}
