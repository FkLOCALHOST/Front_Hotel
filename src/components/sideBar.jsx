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
<<<<<<< Updated upstream
import logout from "../shared/hooks/useLogout.jsx";

const SideBar = ({ open, onClose }) => {
  
  const user = localStorage.getItem("User"); 
=======
import { useNavigate } from "react-router-dom";

const SideBar = ({ open, onClose }) => {

  const navigate = useNavigate();
>>>>>>> Stashed changes

  return (
    <div className={`sidebar-overlay ${open ? "open" : ""}`} onClick={onClose}>
      <div className="sidebar" onClick={e => e.stopPropagation()}>
        <div className="sidebar-item">
          <User size={20} />
          <span>Perfil</span>
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

        {user && (
          <div className="sidebar-item" onClick={logout}>
            <LogOut size={20} />
            <span>Salir</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
