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
  return (
    <div className={`sidebar-overlay ${open ? "open" : ""}`} onClick={onClose}>
      <div className="sidebar" onClick={e => e.stopPropagation()}>
        <div className="sidebar-item">
          <User size={20} />
          <span onClick={() => window.location.href = "/auth/login"}>
            Iniciar Sesion
          </span>
        </div>
        <div className="sidebar-item">
          <Star size={20} />
          <span>Favoritos</span>
        </div>
        <div className="sidebar-item" onClick={() => navigate("/reservaciones")}>
          <CalendarCheck size={20} />
          <span>Mis Reservaciones</span>
        </div>
        <div className="sidebar-item">
          <History size={20} />
          <span>Historial</span>
        </div>
        <div className="sidebar-item">
          <Edit size={20} />
          <span>Editar Perfil</span>
        </div>
        <div className="sidebar-item">
          <LogOut size={20} />
          <span
            onClick={() => {
              localStorage.clear();
              window.location.href = "/auth/login";
            }}
          >
            Salir
          </span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;