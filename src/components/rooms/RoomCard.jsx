import PropTypes from "prop-types";
import React, { useState } from "react";
import { Star, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/room/roomCard.css";

const RoomCard = ({
  id,
  number,
  price,
  description,
  capacity,
  preView = [],
  status,
  onClick,
  onDelete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

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
    console.log(e);
  }

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % preView.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + preView.length) % preView.length);
  };

  return (
    <div
      className="room-card"
      onClick={onClick}
      style={{ cursor: "pointer", position: "relative" }}
    >
      {isAdmin && (
        <div className="room-card-actions">
          <Edit
            size={40}
            className="room-card-action-icon"
            title="Editar"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/habitaciones/registrar-room", {
                state: {
                  editMode: true,
                  roomId: id,
                },
              });
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

      <div className="slider-container">
        <img
          src={
            preView && preView.length > 0
              ? preView[currentIndex]
              : "https://via.placeholder.com/300x200?text=Sin+Imagen"
          }
          alt={`Imagen ${currentIndex + 1} de habitación ${number}`}
          className="room-image"
        />
        {preView.length > 1 && (
          <div className="slider-controls">
            <button onClick={handlePrev}>&lt;</button>
            <button onClick={handleNext}>&gt;</button>
          </div>
        )}
      </div>

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
          <span style={{ fontWeight: "bold" }}>Estado:</span>{" "}
          {status ? "Disponible" : "No disponible"}
        </p>
      </div>
    </div>
  );
};

RoomCard.propTypes = {
  id: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  capacity: PropTypes.string,
  preView: PropTypes.arrayOf(PropTypes.string),
  status: PropTypes.bool,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
};

export default RoomCard;
