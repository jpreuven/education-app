import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import homeLogo from "../../../../src/assets/home-logo.svg";
import classLogo from "../../../../src/assets/class-logo.svg";

const SideBarData = [
  { href: "/", title: "Home", logo: homeLogo },
  { href: "/classes", title: "Classes", logo: classLogo },
  { href: "/tenants", title: "Tenants" },
  { href: "/leases", title: "Leases" },
  { href: "/link5", title: "Link 5" },
  { href: "/link5", title: "Link 5" },
  { href: "/link5", title: "Link 5" },
  { href: "/link5", title: "Link 5" },
  { href: "/link5", title: "Link 5" },
  { href: "/link5", title: "Link 5" },
  { href: "/link5", title: "Link 5" },
  { href: "/link5", title: "Link 5" },
  { href: "/link5", title: "Link 5" },
  { href: "/link5", title: "Link 5" },
  { href: "/link5", title: "Link 5" },
  { href: "/link5", title: "Link 5" },
  { href: "/link5", title: "Link 5" },
  { href: "/link5", title: "Link 5" },
  { href: "/link5", title: "Link 5" },
  { href: "/link5", title: "Link 5" },
  { href: "/link5", title: "Link 5" },
  { href: "/link5", title: "Link 5" },
  { href: "/link5", title: "Link 5" },
];

export default function UpperSideBar() {
  const SideBarDataJSX = SideBarData.map(({ href, title, logo }, index) => {
    const sideBarLinkStyle = {
      flexGrow: "2",
      position: "relative",
      zIndex: "-1",
      left: "0",
      color: "#3c4043",
      fontFamily: "Google Sans",
      fontSize: "14px",
      fontWeight: "600",
    };
    if (!logo) {
      sideBarLinkStyle["left"] = "-10px";
    }
    return (
      <li key={index} className="new-sidebar-links">
        <div className="new-sidebar-links-div">
          <Link to={`${href}`}>
            <div style={{ display: "flex" }}>
              <p style={sideBarLinkStyle}>{title}</p>
              {logo ? <img src={logo} style={{ width: "20px" }} /> : null}
            </div>
          </Link>
        </div>
      </li>
    );
  });

  return <>{SideBarDataJSX}</>;
}
