import PropTypes from "prop-types";
import React from "react";
import "../../assets/styles/reservations/reservationCard.css";


const ReservationCard = ({ reservation, onClick }) => {
    const {
        user,
        checkIn,
        checkOut,
        date,
        room,
        status,
        uid,
    } = reservation

    const formatDate = (isoDate) =>
        new Date(isoDate).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })

    return (
        <div className="reservation-card" onClick={onClick} style={{ cursor: "pointer" }}>
            <div className="reservation-info">
                <h2 className="reservation-title">Reservación</h2>
                <p className="reservation-id">#{uid}</p>
                <p className="reservation-detail">
                    <strong>Usuario ID:</strong> {user}
                </p>
                <p className="reservation-detail">
                    <strong>Habitación ID:</strong> {room}
                </p>
                <p className="reservation-detail">
                    <strong>Fecha de entrada:</strong> {formatDate(checkIn)}
                </p>
                <p className="reservation-detail">
                    <strong>Fecha de salida:</strong> {formatDate(checkOut)}
                </p>
                <p className="reservation-detail">
                    <strong>Fecha de reservación:</strong> {formatDate(date)}
                </p>
                <p className="reservation-detail">
                    <strong>Estado:</strong> {status}
                </p>
            </div>
        </div>
    )
}

ReservationCard.propTypes = {
    reservation: PropTypes.shape({
        user: PropTypes.string.isRequired,
        checkIn: PropTypes.string.isRequired,
        checkOut: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        room: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func,
}

export default ReservationCard;
