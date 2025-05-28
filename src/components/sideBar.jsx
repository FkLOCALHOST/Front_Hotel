import React from "react";
import "../assets/styles/sideBar.css";
import {
  User,
  Star,
  CalendarCheck,
  History,
  Edit,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SideBar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const isUserLoggedIn = localStorage.getItem("User"); 

  const handleLogout = () => {
    localStorage.clear();
    navigate("/dashboard");
    window.location.reload(); 
  };

  return (
    <div className={`sidebar-overlay ${open ? "open" : ""}`} onClick={onClose}>
      <div className="sidebar" onClick={e => e.stopPropagation()}>
        {!isUserLoggedIn ? (
          <div className="sidebar-item" onClick={() => navigate("/auth/login")}>
            <User size={20} />
            <span>Iniciar Sesión</span>
          </div>
        ) : (
          <>
            <div className="sidebar-item" onClick={() => navigate("/favoritos")}>
              <Star size={20} />
              <span>Favoritos</span>
            </div>
            <div className="sidebar-item" onClick={() => navigate("/reservaciones")}>
              <CalendarCheck size={20} />
              <span>Mis Reservaciones</span>
            </div>
            <div className="sidebar-item" onClick={() => navigate("/perfil")}>
              <Edit size={20} />
              <span>Editar Perfil</span>
            </div>
            <div className="sidebar-item" onClick={handleLogout}>
              <LogOut size={20} />
              <span>Salir</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SideBar;