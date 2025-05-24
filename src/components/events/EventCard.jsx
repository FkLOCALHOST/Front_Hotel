import PropTypes from "prop-types";
import React from "react";
import { Edit, Trash2 } from "lucide-react";
import "../../assets/styles/hotel/hotelCard.css";
import { useNavigate } from "react-router-dom";
import useDeleteEvent from "../../shared/hooks/event/useDeleteEvent";

const EventCard = ({
  uid,
  name,
  description,
  price,
  date,
  place,
  image,
  type,
  onClick,
  ...rest
}) => {

  const {
    status,
    createdAt,
    updatedAt,
    ...domSafeRest
  } = rest;

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
    console.log("Error Parsing User from Local Storage", e)
  }

  const navigate = useNavigate();
  const { removeEvent, loading } = useDeleteEvent();

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate("/eventos/registrar-evento", {
      state: {
        editMode: true,
        eventId: uid,
        // Pasa todos los datos para prellenar el formulario
        name,
        description,
        price,
        date,
        place,
        image,
        type,
      },
    });
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (loading) return;
    if (window.confirm("¿Seguro que deseas eliminar este evento?")) {
      console.log("Eliminando evento con uid:", uid);
      const ok = await removeEvent(uid);
      if (ok) {
        window.alert("Evento eliminado exitosamente");
        window.location.reload();
      } else {
        window.alert("No se pudo eliminar el evento");
      }
    }
  };

  const handleCardClick = () => {
    if (onClick) onClick({ 
      uid, name, description, price, date, place, image, type 
    });
  };

  return (
    <div
      className="hotel-card"
      onClick={handleCardClick}
      style={{ cursor: "pointer", position: "relative" }}
      {...domSafeRest}
    >
      {isAdmin && (
        <div className="hotel-card-actions">
          <Edit
            size={40}
            className="hotel-card-action-icon"
            title="Editar"
            onClick={handleEdit}
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
          <strong>Precio:</strong>&nbsp;Q{price?.toFixed ? price.toFixed(2) : price}
        </p>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  uid: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  image: PropTypes.string,
  type: PropTypes.oneOf(["PUBLIC", "PRIVATE"]),
  onClick: PropTypes.func,
};

export default EventCard;