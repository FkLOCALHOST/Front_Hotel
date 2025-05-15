import React, { useState, useEffect, useRef } from "react";
import "../assets/styles/navbar.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }

    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="contenedorNav"
      style={{ top: showNavbar ? "0" : "-70px" }}
    >
      <div className="logoNav">
        <img
          src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
          alt="logo"
        />
      </div>
      <div className="rutasNav">
        <div>Hoteles</div>
        <div>Reservaciones</div>
        <div>Eventos</div>
        <div>Favoritos</div>
        <div>Perfil</div>
      </div>
    </div>
  );
};

export default Navbar;
