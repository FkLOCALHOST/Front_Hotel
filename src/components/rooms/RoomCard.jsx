import PropTypes from "prop-types";
import React from "react";
import { Star, Edit, Trash2 } from "lucide-react";

import "../../assets/styles/room/roomCard.css";

const RoomCard = ({
  number,
  price,
  description,
  capacity,
  preView,
  status,
  onClick,
  onEdit,
  onDelete,
}) => {
  let isAdmin = false;
  try {
    const userStr = localStorage.getItem("User");
    if (userStr) {
      const user = JSON.parse(userStr);
      const role = user.userDetails?.role;
      isAdmin = role === "ADMIN_ROLE";
    }
  } catch (e) {
    isAdmin = false;
  }
  return (
    <div className="room-card" onClick={onClick} style={{ cursor: "pointer", position: "relative" }}>
      {isAdmin && (
        <div className="room-card-actions">
          <Edit
            size={40}
            className="room-card-action-icon"
            title="Editar"
            onClick={(e) => {
              e.stopPropagation();
              if (onEdit) onEdit();
            }}
          />
          <Trash2
            size={40}
            className="room-card-action-icon"
            title="Eliminar"
            onClick={(e) => {
              e.stopPropagation();
              if (onDelete) onDelete();
            }}
          />
        </div>
      )}
      <img
        src={
          preView && preView.length > 0
            ? preView[0]
            : "https://via.placeholder.com/300x200?text=Sin+Imagen"
        }
        alt={`Imagen de habitación ${number}`}
        className="room-image"
      />
      <div className="room-info">
        <h2 className="room-name">Habitación {number}</h2>
        <p className="room-detail">
          <span style={{ fontWeight: "bold" }}>Precio:</span> {price}
        </p>
        <p className="room-detail">
          <span style={{ fontWeight: "bold" }}>Capacidad:</span> {capacity}
        </p>
        <p className="room-detail">
          <span style={{ fontWeight: "bold" }}>Descripción:</span> {description}
        </p>
        <p className="room-detail">
          <span style={{ fontWeight: "bold" }}>Estado: </span>{" "}
          {status ? " Disponible" : " No disponible"}
        </p>
      </div>
    </div>
  );
};

RoomCard.propTypes = {
  number: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  capacity: PropTypes.string,
  preView: PropTypes.arrayOf(PropTypes.string),
  status: PropTypes.bool,
  onClick: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default RoomCard;
