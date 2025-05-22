import React from "react";
import { Star } from "lucide-react";
import "../../assets/styles/hotel/hotelMain2.css";

const ViewHotel = ({
  hotelName,
  department,
  starts,
  address,
  price,
  imageUrl,
}) => {
  return (
    <div className="hotel-card-horizontal">
      <img
        src={imageUrl}
        alt={`Imagen de ${hotelName}`}
        className="hotel-image-horizontal"
      />
      <div className="hotel-info-horizontal">
        <h2 className="hotel-name-horizontal">{hotelName}</h2>
        <p className="hotel-detail-horizontal">
          {[...Array(starts)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className="star-icon-horizontal"
              fill="#FFD700"
            />
          ))}
          <span className="star-text-horizontal">{starts} estrellas</span>
        </p>
        <p className="hotel-detail-horizontal">
          <span className="bold-horizontal">Departamento:</span> {department}
        </p>
        <p className="hotel-detail-horizontal">
          <span className="bold-horizontal">Dirección:</span> {address}
        </p>
        <p className="hotel-detail-horizontal">
          <span className="bold-horizontal">Precio:</span> {price}
        </p>
        <button>
          Habitaciones
        </button>
      </div>
    </div>
  );
};

export default ViewHotel;
