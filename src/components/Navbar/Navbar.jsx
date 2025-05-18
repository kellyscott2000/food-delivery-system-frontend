/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleSeeAllClick = () => {
    navigate("/category");
    closeDrawer();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeDrawer = () => {
    setIsMenuOpen(false);
  };

  const navigateAndCloseDrawer = (path) => {
    navigate(path);
    closeDrawer();
  };

  // Set the menu state based on the current route
  const currentPath = location.pathname;
  const determineActiveMenu = () => {
    if (currentPath === "/") return "home";
    if (currentPath === "/category") return "menu";
    // if (currentPath === "/myorders") return "myorders";
    if (currentPath === "/contact-us") return "contact-us";
    return "";
  };

  return (
    <div className="navbar">
      {!isMenuOpen && (
        <button className="hamburger" onClick={toggleMenu}>
          ☰ {/* Hamburger icon */}
        </button>
      )}
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <div className={`drawer ${isMenuOpen ? "open" : ""}`}>
      <button className="close-icon" onClick={closeDrawer}>
      X
    </button>
        <ul className="drawer-menu">
        <Link to="/">
        <img src={assets.logo} alt="" className="logod" />
      </Link>
          <li onClick={() => navigateAndCloseDrawer("/")}>Home</li>
          <li onClick={handleSeeAllClick}>Menu</li>
          <li onClick={() => navigateAndCloseDrawer("/contact-us")}>
            Contact Us
          </li>
        </ul>
      </div>

      <ul className={`navbar-menu ${isMenuOpen ? "hidden" : ""}`}>
        <Link
          to="/"
          // onClick={() => setMenu("home")}
          onClick={() => navigateAndCloseDrawer("/")}
          className={determineActiveMenu() === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href=""
          onClick={handleSeeAllClick}
          className={determineActiveMenu() === "menu" ? "active" : ""}
        >
          Menu
        </a>

        <a
          href="#footer"
          // onClick={() => setMenu("contact-us")}
          onClick={() => navigateAndCloseDrawer("/contact-us")}
          className={determineActiveMenu() === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
