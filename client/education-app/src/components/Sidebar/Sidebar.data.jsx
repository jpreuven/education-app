// import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const SideBarData = [
  { href: "/", title: "Home" },
  { href: "/properties", title: "Properties" },
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

const SideBarDataJSX = SideBarData.map((link, index) => {
  return (
    <li key={index} className="sidebar-links">
      <div className="sidebar-links-div">
        <a href={`${link.href}`}>{link.title}</a>
      </div>
    </li>
  );
});

export { SideBarDataJSX };
