import React, {useState} from "react";
import {Link, useLocation} from "wouter";

function Navbar() {
  const [isNavbarShowing, setNavbarShowing] = useState(false);
  const [isShopDropdownShowing, setShowDropdownShowing] = useState(false);
  const [location] = useLocation();
  const toggleNavbar = () => setNavbarShowing(!isNavbarShowing);
  const toggleShopDropdown = () => setShowDropdownShowing(!isShopDropdownShowing);

  return (<>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container px-4 px-lg-5">
        <a className="navbar-brand" href="/">Totally Fictitious E-Stall</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleNavbar}><span className="navbar-toggler-icon"></span></button>
        <div className={`collapse navbar-collapse ${isNavbarShowing ? "show" : ""}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item"><Link className={`nav-link ${location === "/register" ? "active" : ""}`} aria-current="page" href="/register">Register</Link></li>
            <li className="nav-item"><Link className={`nav-link ${location === "/about" ? "active" : ""}`} href="/abort">About</Link></li>
            <li className="nav-item dropdown"  onClick={toggleShopDropdown}>
              <a className={`nav-link dropdown-toggle ${isShopDropdownShowing?"show":""}`} id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded={isShopDropdownShowing?"true":"false"}>Shop</a>
              <ul className={`dropdown-menu ${isShopDropdownShowing?"show":""}`} aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#!">All Products</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#!">Popular Items</a></li>
                <li><a className="dropdown-item" href="#!">New Arrivals</a></li>
              </ul>
            </li>
          </ul>
          <form className="d-flex">
            <button className="btn btn-outline-dark" type="submit">
              <i className="bi-cart-fill me-1"></i>
              Cart
              <span className="badge bg-dark text-white ms-1 rounded-pill">0</span>
            </button>
          </form>
        </div>
      </div>
    </nav>
  </>);
}

export default Navbar;