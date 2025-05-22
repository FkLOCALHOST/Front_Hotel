import PropTypes from 'prop-types';
import React from 'react';
import "../../assets/styles/hotel/hotelCard.css";

const FavoritosCard = ({ hotelName, department, starts, imageUrl, onClick}) =>{

    return(
        <div className="hotel-card" onClick={onClick}>
      <img src={imageUrl || "/default-hotel.jpg"} alt={hotelName} className="hotel-image" />
      <div className="hotel-info">
        <div className="hotel-name">{hotelName}</div>
        <div className="hotel-detail">
          <span>Departamento: {department}</span>
        </div>
        <div className="hotel-detail">
          <span>Estrellas: {starts}</span>
        </div>
      </div>
    </div>
    )
}

FavoritosCard.propTypes = {
  hotelName: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  starts: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imageUrl: PropTypes.string,
  onClick: PropTypes.func,
};

export default FavoritosCard;