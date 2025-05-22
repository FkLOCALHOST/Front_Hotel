import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import "../../assets/styles/hotel/hotelCard.css";
import { Star } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { addFavHotel } from "../../services/api";

const HotelCard = ({ id, hotelName, department, starts, imageUrl, onClick, isFavorite }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(isFavorite);
  }, [isFavorite]);

  const toggleLike = async (e) => {
  e.stopPropagation();
  if (!liked) {
    const userData = JSON.parse(localStorage.getItem("User"));
    const uid = userData?.userDetails?._id;
    if (!uid) {
      alert("Debes iniciar sesión para guardar favoritos.");
      return;
    }

    if(!liked){
      const response = await addFavHotel(uid, id);
    if (response.data && response.data.success) {
      setLiked(true);
      const favs = userData.userDetails.favHotel || [];
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      alert("No se pudo guardar como favorito.");
    }  
  } else {
    setLiked(false);
    const favs = userData.userDetails.favHotel || [];
      userData.userDetails.favHotel = favs.filter(favId => favId !== id);
      localStorage.setItem("User", JSON.stringify(userData));
    }
  }
};

  return (
    <div className="hotel-card" onClick={onClick} style={{ cursor: "pointer", position: "relative" }}>
      <img
        src={imageUrl}
        alt={`Imagen de ${hotelName}`}
        className="hotel-image"
      />
      <span
        className={`like-button${liked ? " liked" : ""}`}
        onClick={toggleLike}
        title={liked ? "Quitar de favoritos" : "Guardar como favorito"}
        style={{
          position: "absolute",
          top: "300px",
          right: "16px",
          fontSize: "1.6rem",
          cursor: "pointer",
          transition: "color 0.2s",
          zIndex: 2
        }}
      >
        <FaHeart />
      </span>
      <div className="hotel-info">
        <h2 className="hotel-name">{hotelName}</h2>
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
  imageUrl: PropTypes.string,
  onClick: PropTypes.func,
};

export default HotelCard;