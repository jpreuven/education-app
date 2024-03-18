import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./app/features/users/userSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import AuthorizationPage from "./pages/Authorization/Authorization";
import Sidebar from "./components/Sidebar/Sidebar";
import Classes from "./pages/Classes/Classes";
import SideBarNavBar from "./components/SideBarNavBar/SideBarNavBar";
import { setMobileSidebarIsOpen } from "./app/features/mobileSidebarIsOpen/mobileSidebarIsOpenSlice";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  console.log("testing");

  const mobileSidebarIsOpen = useSelector(
    (state) => state.mobileSidebarIsOpen.value
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
    dispatch(setMobileSidebarIsOpen(!mobileSidebarIsOpen));
  }

  useEffect(() => {
    if (mobileSidebarIsOpen) {
      const appOuterRouteDiv = document.querySelector(".app-inner-route-div");

      if (appOuterRouteDiv) {
        appOuterRouteDiv.addEventListener(
          "click",
          makeScreenUnusableMobileSidebar
        );
      }
    } else {
      const appOuterRouteDiv = document.querySelector(".app-inner-route-div");

      if (appOuterRouteDiv) {
        appOuterRouteDiv.removeEventListener(
          "click",
          makeScreenUnusableMobileSidebar
        );
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
      }
    : null;

  const innerDivStyle = user
    ? {
        display: "flex",
        flexDirection: "column",
        "@media (minHeight: 800px)": {
          flexDirection: "row",
        },
      }
    : null;

  return (
    <div className="app-outer-route-div" style={outerDivStyle}>
      {user ? <Sidebar /> : null}
      <div className="app-inner-route-div" style={innerDivStyle}>
        <SideBarNavBar />
        <Router>
          <Routes>
            {user ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/classes" element={<Classes />} />
              </>
            ) : (
              <Route path="/" element={<AuthorizationPage />} />
            )}
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
