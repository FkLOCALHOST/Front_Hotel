import React, { useState, useEffect, useRef } from "react";
import "../assets/styles/navbar.css";
import logoSinTexto from "../assets/images/logo_sin_texto.svg";
import { Link } from "react-router-dom";
import SideBar from "./sideBar.jsx";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate()
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
      <div
        className="contenedorNav"
        style={{ top: showNavbar ? "0" : "-150px" }}
      >
        <div className="logoNav">
          <Link to="/home">
            <img src={logoSinTexto} alt="logo" />
          </Link>
        </div>
        <div className="rutasNav">
          <Link to="/hotel" className="nav-link">Hoteles</Link>
          <Link to="/" className="nav-link">Reservaciones</Link>
          <Link to="/favoritos" className="nav-link">Eventos</Link>
          <div
            onClick={() => setSidebarOpen(true)}
            style={{ cursor: "pointer" }}
          >
            Perfil
          </div>
        </div>
      </div>
      <SideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Navbar;
