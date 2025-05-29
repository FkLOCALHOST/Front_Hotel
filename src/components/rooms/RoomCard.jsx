import PropTypes from "prop-types";
import React, { useState } from "react";
import { Star, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useGetHotel from "../../shared/hooks/useGetHotel";
import "../../assets/styles/room/roomCard.css";

const RoomCard = ({
  id,
  number,
  name,
  price,
  description,
  hotel,
  capacity,
  preView = [],
  status,
  onClick,
  onDelete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { hotels } = useGetHotel();

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

  // Buscar el nombre del hotel usando el hook
  let hotelName = "";
  if (hotel && typeof hotel === "object" && hotel.name) {
    hotelName = hotel.name;
  } else if (hotel && hotels && Array.isArray(hotels)) {
    const found = hotels.find((h) => h.uid === hotel || h._id === hotel);
    hotelName = found ? found.name : hotel;
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

      <div className="room-info-card">
        <h2 className="room-name">{name}</h2>
        <p className="room-detail">
          <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
            Precio:
          </span>{" "}
          {price}
        </p>
        <p className="room-detail">
          <span style={{ fontWeight: "bold" ,marginLeft: "10px"}}>Capacidad:</span> {capacity}
        </p>
        <p className="room-detail">
          <span style={{ fontWeight: "bold", marginLeft: "10px" }}>Descripción:</span> {description}
        </p>
        <p className="room-detail">
          <span style={{ fontWeight: "bold" , marginLeft: "10px"}}>Estado:</span>{" "}
          {status ? "Disponible" : "No disponible"}
        </p>
        <p className="room-detail">
          <span style={{ fontWeight: "bold" , marginLeft: "10px"}}>Hotel:</span>
          {hotelName}
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
