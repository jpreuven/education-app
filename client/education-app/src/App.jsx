import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./app/features/users/userSlice";
import { setAssignmentFormDropdown } from "./app/features/assignmentFormDropdown/assignmentFormDropdownSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import AuthorizationPage from "./pages/Authorization/Authorization";
import CoursePage from "./pages/CoursePage/CoursePage";
import { setMobileSidebarIsOpen } from "./app/features/mobileSidebarIsOpen/mobileSidebarIsOpenSlice";
import NavBar from "./components/NewNavBar/NavBar";
import SideBar from "./components/NewSideBar/NewSideBar";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const mobileSidebarIsOpen = useSelector(
    (state) => state.mobileSidebarIsOpen.value
  );

  const assignmentFormDropdown = useSelector(
    (state) => state.assignmentFormDropdown.value
  );

  function getUser(e) {
    fetch("http://localhost:5000/check_session", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          dispatch(setUser(user));
          setLoading(false);
          console.log("User data in session");
        });
      } else {
        console.log("No user data in session/cookies");
        setLoading(false);
      }
    });
  }
  useEffect(() => getUser(), []);
  const user = useSelector((state) => state.user.value);

  function makeScreenUnusableMobileSidebar(e) {
    if (
      !e.target.className.includes("new-sidebar-inner-div") &&
      !e.target.className.includes("new-sidebar-link-list") &&
      !e.target.className.includes("new-sidebar-links")
      // &&!e.target.className.includes("new-sidebar-links-div")
    ) {
      dispatch(setMobileSidebarIsOpen(!mobileSidebarIsOpen));
    }
    // console.log(e.target.className);
  }

  useEffect(() => {
    if (mobileSidebarIsOpen) {
      const appOuterRouteDiv = document.querySelector(".app-inner-route-div");
      const navBar = document.querySelector(".navbar");

      if (appOuterRouteDiv) {
        appOuterRouteDiv.addEventListener(
          "click",
          makeScreenUnusableMobileSidebar
        );
      }
      if (navBar) {
        navBar.addEventListener("click", makeScreenUnusableMobileSidebar);
      }
    } else {
      const appOuterRouteDiv = document.querySelector(".app-inner-route-div");
      const navBar = document.querySelector(".navbar");

      if (appOuterRouteDiv) {
        appOuterRouteDiv.removeEventListener(
          "click",
          makeScreenUnusableMobileSidebar
        );
      }
      if (navBar) {
        navBar.removeEventListener("click", makeScreenUnusableMobileSidebar);
      }
    }
  }, [mobileSidebarIsOpen]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth >= 800) {
      dispatch(setMobileSidebarIsOpen(false));
    }
  }, [windowWidth]);

  if (loading) {
    return <div style={{ height: "100dvh" }}>Loading...</div>;
  }

  const outerDivStyle = user
    ? {
        display: "flex",
        flexDirection: "column",
      }
    : null;

  const innerDivStyle = user
    ? {
        display: "flex",
        // flexDirection: "column",
        // "@media (minHeight: 800px)": {
        //   flexDirection: "row",
        // },
      }
    : null;

  function toggleOffAssignmentList(e) {
    // Toggle off assignment list if click outside of the assignment list
    if (
      assignmentFormDropdown &&
      !e.target.className.includes("assignment-list")
    ) {
      dispatch(setAssignmentFormDropdown(false));
    }
  }

  return (
    <div
      className="app-outer-route-div"
      style={outerDivStyle}
      onClick={toggleOffAssignmentList}
    >
      {user ? <NavBar /> : null}
      <div className="app-inner-route-div" style={innerDivStyle}>
        {user ? <SideBar /> : null}
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/course/:id" element={<CoursePage />} />
            </>
          ) : (
            <Route path="/" element={<AuthorizationPage />} />
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
