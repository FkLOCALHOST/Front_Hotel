import PropTypes from "prop-types";
import React, { useState } from "react";
import "../../assets/styles/hotel/hotelCard.css";
import { Star } from "lucide-react";

const HotelCard = ({ id, hotelName, department, starts, address, price, imageUrl }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="hotel-card">
      <img
        src={imageUrl}
        alt={`Imagen de ${hotelName}`}
        className="hotel-image"
      />
      <div className="hotel-info">
        <h2 className="hotel-name">{hotelName }</h2>
        <p className="hotel-detail">
          <Star size={16} style={{ marginRight: "6px" }} /> {starts} estrellas
        </p>
        <p className="hotel-detail">
          <span style={{ fontWeight: "bold" }}>Departamento:</span> {department}
        </p>
      </div>
    </div>
  );
};

HotelCard.propTypes = {
  id: PropTypes.string.isRequired,
  hotelName: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  starts: PropTypes.number.isRequired,
  address: PropTypes.string,
  price: PropTypes.string,
  imageUrl: PropTypes.string,
};

export default HotelCard;
