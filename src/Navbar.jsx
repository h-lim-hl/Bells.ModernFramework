import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "./StoreCart";
import { useJwt } from "./UserStore";

function Navbar() {
  const [isNavbarShowing, setNavbarShowing] = useState(false);
  const [isShopDropdownShowing, setShowDropdownShowing] = useState(false);
  const [location] = useLocation();
  const toggleNavbar = () => setNavbarShowing(!isNavbarShowing);
  const toggleShopDropdown = () => setShowDropdownShowing(!isShopDropdownShowing);
  const { getCart } = useCart();

  const { getJwt, clearJwt } = useJwt();

  let jwt = getJwt();
  let userName;
  let role;
  if (jwt) { // there is a jwt unverified as fresh
    const jwtDataObj = atob(jwt.split('.')[1]);
    const { exp } = jwtDataObj;
    userName = jwtDataObj.userName;
    userName ??= "UnknowUser";

    role = jwtDataObj.role;

    if (exp < Date.now) {
      clearJwt();
      jwt = null;
      userName = null;
    }
  }

  return (<>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container px-4 px-lg-5">
        <Link className="navbar-brand" href="/">Totally Fictitious E-Stall</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleNavbar}><span className="navbar-toggler-icon"></span></button>
        <div className={`collapse navbar-collapse ${isNavbarShowing ? "show" : ""}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className={`nav-item ${userName ? "" : "d-none"}`}> <Link className="nav-link">{`Welcome ${userName}!`}</Link></li>
          </ul>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item"><Link className={`nav-link ${location === "/register" ? "active" : ""} ${jwt ? "d-none": ""}`} aria-current="page" href="/register">Register</Link></li>
            <li className="nav-item"><Link className={`nav-link ${location === "/login" ? "active" : ""} ${jwt ? "d-none": ""}`} href="/login">Login</Link></li>
            <li className="nav-item"><Link className={`nav-link ${location === "/about" ? "active" : ""}`} href="/abort">About</Link></li>

            <li className="nav-item"><Link className={`nav-link ${jwt && role ? "": "d-none"}`} href="/management">Manage</Link></li>
            {/* <li className="nav-item"><Link className={`nav-link ${jwt && role ? "": "d-none"}`} href="/logout">Logout</Link></li> */}

            <li className="nav-item"><Link className={`nav-link ${jwt ? "": "d-none"}`} href="/logout">Logout</Link></li>

          </ul>
          <Link className="btn btn-outline-dark" href="/cart">
            <i className="bi-cart-fill me-1"></i>
            Cart
            <span className="badge bg-dark text-white ms-1 rounded-pill">{(getCart() && getCart().length) ? getCart().length : 0}</span>
          </Link>
        </div>
      </div>
    </nav>
  </>);
}

export default Navbar;