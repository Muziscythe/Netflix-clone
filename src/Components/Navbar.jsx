import React, { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <div className={`navbar ${show && "navbar__black"}`}>
      <div className="navbar__contents">
        <img
          src="http://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo.png"
          alt="Netflix logo"
          className="navbar__logo"
        />
      </div>
    </div>
  );
}

export default Navbar;
