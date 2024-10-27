import React, { useState, useEffect, useRef } from 'react';
import {FaBars, FaTimes} from "react-icons/fa";
import { Link } from "react-router-dom";
import logout from './Assets/logout.png';


function Navbar() {
  const navRef= useRef();
  const showNavbar = () => {
  navRef.current.classList.toggle(
    "responsive_nav"
  );
};
  return (
    <header className="titl">
    <h2>PlanPal</h2>
    <nav ref={navRef}>
        <a href="/home">Home</a>
        <a href="/events">Events</a>
        <a href="/login" className="logout">
            <img src={logout} alt="Logout" className="logout-icon" />
        </a>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes/>
        </button>
    </nav>
    <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
    </button>
</header>
  )
}

export default Navbar