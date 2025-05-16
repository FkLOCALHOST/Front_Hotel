import React, { useState, useEffect, useRef } from "react";
import "../assets/styles/navbar.css";
import logoSinTexto from "../assets/images/logo_sin_texto.svg";
// import { Link } from "react-router-dom";
import SideBar from "./sideBar.jsx";

export const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    <>
      <div className="contenedorNav" style={{ top: showNavbar ? "0" : "-150px" }}>
        <div className="logoNav">
          <img
            src={logoSinTexto}
            alt="logo"
          />
        </div>
        <div className="rutasNav">
          <div>Hoteles</div>
          <div>Reservaciones</div>
          <div>Eventos</div>
          <div>Favoritos</div>
          <div onClick={() => setSidebarOpen(true)}>Perfil</div>
        </div>
      </div>
      <SideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Navbar;
