import PropTypes from "prop-types";
import React from "react";
import { Edit, Trash2 } from "lucide-react";
import "../../assets/styles/hotel/hotelCard.css";

const EventCard = ({
  name,
  description,
  price,
  date,
  place,
  image,
  type,
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
    <div className="hotel-card" onClick={onClick} style={{ cursor: "pointer", position: "relative" }}>
      {isAdmin && (
        <div className="hotel-card-actions">
          <Edit
            size={40}
            className="hotel-card-action-icon"
            title="Editar"
            onClick={e => {
              e.stopPropagation();
              if (onEdit) onEdit();
            }}
          />
          <Trash2
            size={40}
            className="hotel-card-action-icon"
            title="Eliminar"
            onClick={e => {
              e.stopPropagation();
              if (onDelete) onDelete();
            }}
          />
        </div>
      )}
      <img
        src={image || "https://via.placeholder.com/300x180?text=Sin+Imagen"}
        alt={`Imagen de ${name}`}
        className="hotel-image"
      />
      <div className="hotel-info">
        <h2 className="hotel-name">{name}</h2>
        <p className="hotel-detail">
          <strong>Tipo:</strong>&nbsp;{type === "PUBLIC" ? "Público" : "Privado"}
        </p>
        <p className="hotel-detail">
          <strong>Descripción:</strong>&nbsp;{description}
        </p>
        <p className="hotel-detail">
          <strong>Lugar:</strong>&nbsp;{place}
        </p>
        <p className="hotel-detail">
          <strong>Fecha:</strong>&nbsp;{date ? date.slice(0, 10) : ""}
        </p>
        <p className="hotel-detail">
          <strong>Precio:</strong>&nbsp;Q{price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  image: PropTypes.string,
  type: PropTypes.oneOf(["PUBLIC", "PRIVATE"]),
  onClick: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default EventCard;
