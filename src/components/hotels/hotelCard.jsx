import PropTypes from "prop-types";
import React, { useState } from "react";
import "../../assets/styles/hotel/hotelCard.css";
import { Star, Edit, Trash2 } from "lucide-react";
import useDeleteHotel from "../../shared/hooks/useDeleteHotel";

const HotelCard = ({ hotelName, department, starts, imageUrl, onClick, onEdit, onDelete, id, onDeleted }) => {
  const [liked, setLiked] = useState(false);
  const { removeHotel, loading } = useDeleteHotel();

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

  const toggleLike = () => {
    setLiked(!liked);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (loading) return;
    if (window.confirm("¿Seguro que deseas eliminar este hotel?")) {
      const ok = await removeHotel(id);
      if (ok && typeof onDeleted === "function") {
        onDeleted();
      }
    }
  };

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
            onClick={handleDelete}
          />
        </div>
      )}
      <img
        src={imageUrl}
        alt={`Imagen de ${hotelName}`}
        className="hotel-image"
      />
      <div className="hotel-info">
        <h2 className="hotel-name"> {hotelName }</h2>
        <p className="hotel-detail">
          {[...Array(starts)].map((_, i) => (
            <Star
              key={i}
              size={16}
              style={{ marginRight: "2px", color: "#FFD700", verticalAlign: "middle" }}
              fill="#FFD700"
            />
          ))}
          <span style={{ marginLeft: "6px" }}>{starts} estrellas</span>
        </p>
        <p className="hotel-detail">
          <span style={{ fontWeight: "bold" }}>Departamento:</span> {department}
        </p>
      </div>
    </div>
  );
};

HotelCard.propTypes = {
  hotelName: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  starts: PropTypes.number.isRequired,
  address: PropTypes.string,
  price: PropTypes.string,
  imageUrl: PropTypes.string,
  onClick: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onDeleted: PropTypes.func,
};

export default HotelCard;
