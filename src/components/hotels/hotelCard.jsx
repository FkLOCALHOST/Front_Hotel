import PropTypes from "prop-types";
import React, { useState } from "react";
import "../../assets/styles/hotel/hotelCard.css";
import { Star } from "lucide-react";

const HotelCard = ({ hotelName, department, starts, imageUrl, onClick }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="hotel-card" onClick={onClick} style={{ cursor: "pointer" }}>
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
};

export default HotelCard;
