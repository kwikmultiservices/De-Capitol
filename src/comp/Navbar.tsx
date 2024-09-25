import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiMenuAltRight } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <div>
      <>
        <nav className="navbar pr-6">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img src="/image/logo.png" alt="logo" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            {click ? <AiOutlineClose /> : <BiMenuAltRight />}
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            {/* <li className="nav-item">
              <Link
                to="#"
                className="nav-links"
                onClick={() => {
                  closeMobileMenu();
                }}
              >
                W
              </Link>
            </li> */}

            <li className="nav-item">
              <Link
                to="/who-we-are"
                className="nav-links"
                onClick={() => {
                  closeMobileMenu();
                }}
              >
                About Us
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/Contact-us"
                className="nav-links"
                onClick={() => {
                  closeMobileMenu();
                }}
              >
                Contact Us
              </Link>
            </li>

            <li className="nav-item border bg-[#3187FA] rounded-lg">
              <Link
                to="/login"
                className="nav-links"
                onClick={() => {
                  closeMobileMenu();
                }}
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </>
    </div>
  );
}
