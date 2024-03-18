// import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import settingLogo from "../../../src/assets/setting-logo.svg";
import profileLogo from "../../../src/assets/profile-logo.svg";
import logoutLogo from "../../../src/assets/logout-logo.svg";
import homeLogo from "../../../src/assets/home-logo.svg";
import classLogo from "../../../src/assets/class-logo.svg";

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

const SideBarLowerData = [
  {
    href: "/settings",
    title: "Settings",
    logo: settingLogo,
  },
  { href: "/account", title: "Account Info", logo: profileLogo },
  { href: "/", title: "Logout", logo: logoutLogo },
];

const SideBarDataJSX = SideBarData.map(({ href, title, logo }, index) => {
  const sideBarLinkStyle = {
    flexGrow: "2",
    position: "relative",
    zIndex: "-1",
    left: "0",
  };
  if (!logo) {
    sideBarLinkStyle["left"] = "-10px";
  }
  return (
    <li key={index} className="sidebar-links">
      <div className="sidebar-links-div">
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

const SideBarLowerDataJSX = SideBarLowerData.map(
  ({ href, title, logo }, index) => {
    return (
      <li key={index} className="sidebar-links">
        <div className="sidebar-links-div">
          <Link to={`${href}`}>
            <div style={{ display: "flex" }}>
              <p style={{ flexGrow: "2" }}>{title}</p>
              <img src={logo} style={{ width: "20px" }} />
            </div>
          </Link>
          {/* <div style={{ width: "1px" }}> */}
          {/* </div> */}
        </div>
      </li>
    );
  }
);

export { SideBarDataJSX, SideBarLowerDataJSX };
