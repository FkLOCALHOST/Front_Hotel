import PropTypes from "prop-types";
import React, { useState } from "react";
import "../../assets/styles/hotel/hotelCard.css";
import { Star, MapPin, DollarSign, Heart } from "lucide-react";

const HotelCard = ({ id, hotelName, starts, address, price, imageUrl }) => {
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
        <h2 className="hotel-name">{hotelName}</h2>
        <p className="hotel-detail">
          <Star size={16} style={{ marginRight: "6px" }} /> {starts} estrellas
        </p>
        <p className="hotel-detail">
          <MapPin size={16} style={{ marginRight: "6px" }} /> {address}
        </p>
        <p className="hotel-detail">
          <DollarSign size={16} style={{ marginRight: "6px" }} /> {price}
        </p>
        <button
          className={`like-button ${liked ? "liked" : ""}`}
          onClick={toggleLike}
        >
          <Heart
            size={20}
            color={liked ? "#FF2929" : "#fff"}
            fill={liked ? "#FF2929" : "none"}
          />
        </button>
      </div>
    </div>
  );
};

HotelCard.propTypes = {
  id: PropTypes.string.isRequired,
  hotelName: PropTypes.string.isRequired,
  starts: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default HotelCard;
