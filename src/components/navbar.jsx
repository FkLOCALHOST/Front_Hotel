import React, { useState, useEffect, useRef } from "react";
import "../assets/styles/navbar.css";
import logoSinTexto from "../assets/images/logo_sin_texto.svg";
import { Link } from "react-router-dom";
import SideBar from "./sideBar.jsx";

export const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
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

  useEffect(() => {
    const userStr = localStorage.getItem("User");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserRole(user.userDetails?.role || null);
      } catch {
        setUserRole(null);
      }
    }
  }, []);

  return (
    <>
      <div
        className="contenedorNav"
        style={{ top: showNavbar ? "0" : "-150px" }}
      >
        <div className="logoNav">
          <Link to="/">
            <img src={logoSinTexto} alt="logo" />
          </Link>
        </div>
        <div className="rutasNav">
          <Link to="/hoteles" className="nav-link">
            Hoteles
          </Link>
          <Link to="/habitaciones" className="nav-link">
            Habitaciones
          </Link>
          <Link to="/eventos" className="nav-link">
            Eventos
          </Link>
          {userRole === "ADMIN_ROLE" && (
            <Link to="/reportes" className="nav-link">
              Reportes
            </Link>
          )}
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
