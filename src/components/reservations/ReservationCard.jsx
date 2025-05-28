import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/reservations/reservationCard.css";
import useReservationReceipt from "../../shared/hooks/reservation/useReservationReceipt";
import { Edit, Trash2 } from "lucide-react";

const ReservationCard = ({ reservation, onClick, onDelete }) => {
  const { user, checkIn, checkOut, date, room, status, uid, preView = [] } = reservation;
  const { downloadReceipt, loading: loadingReceipt } = useReservationReceipt();
  const navigate = useNavigate();

  let isAdmin = false;
  try {
    const userStr = localStorage.getItem("User");
    if (userStr) {
      const userObj = JSON.parse(userStr);
      const role = userObj.userDetails?.role;
      isAdmin = role === "ADMIN_ROLE";
    }
  } catch (e) {
    isAdmin = false;
  }

  const formatDate = (isoDate) =>
    new Date(isoDate).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

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
      className="reservation-card"
      onClick={onClick}
      style={{ cursor: "pointer", position: "relative" }}
    >
      {isAdmin && (
        <div className="reservation-card-actions">
          <Edit
            size={40}
            className="room-card-action-icon"
            title="Editar"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/reservaciones/edit", {
                state: {
                  reservationId: uid,
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
              if (onDelete) onDelete(reservation);
            }}
          />
        </div>
      )}

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
        <button
          onClick={(e) => {
            e.stopPropagation();
            downloadReceipt(uid);
          }}
          className="invoice-btn"
          disabled={loadingReceipt}
        >
          {loadingReceipt ? "Descargando..." : "Recibo"}
        </button>
      </div>
    </div>
  );
};

ReservationCard.propTypes = {
  reservation: PropTypes.shape({
    user: PropTypes.string.isRequired,
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    room: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    preView: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
};


export default ReservationCard;