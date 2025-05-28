import React from "react";
import { Calendar, MapPin, Users, DollarSign } from "lucide-react";
import "../../assets/styles/event/eventView.css";

const ViewEvent = ({
  name,
  description,
  price,
  date,
  place,
  image,
  type,
}) => {  const formatDate = (dateString) => {
    if (!dateString) return { date: "", time: "" };
    const eventDate = new Date(dateString);
    
    const date = eventDate.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long", 
      day: "numeric",
    });
    
    const time = eventDate.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
    
    return { date, time };
  };

  const formatPrice = (price) => {
    if (typeof price === "number") {
      return `Q${price.toFixed(2)}`;
    }
    return `Q${price}`;
  };
  return (
    <div className="event-card-horizontal">
      <img
        src={image || "https://via.placeholder.com/400x300?text=Sin+Imagen"}
        alt={`Imagen de ${name}`}
        className="event-image-horizontal"
      />
      <div className="event-info-horizontal">
        <h2 className="event-name-horizontal">{name}</h2>
          <div className="event-detail-horizontal">
          <Users
            size={18}
            className="event-icon-horizontal event-icon-users"
          />
          <span className={`event-text-horizontal ${type === "PUBLIC" ? "event-type-public" : "event-type-private"}`}>
            {type === "PUBLIC" ? "Evento Público" : "Evento Privado"}
          </span>
        </div><div className="event-detail-horizontal">
          <span className="event-bold-horizontal">Descripción:</span>
          <div className="event-description-text">{description}</div>
        </div>

        <div className="event-detail-horizontal">
          <MapPin
            size={18}
            className="event-icon-horizontal event-icon-map"
          />
          <span className="event-bold-horizontal">Lugar:</span> {place}
        </div>

        <div className="event-detail-horizontal">
          <Calendar
            size={18}
            className="event-icon-horizontal event-icon-calendar"
          />
          <span className="event-bold-horizontal">Fecha:</span> 
          <div className="event-date-info">
            <span className="event-date-day">{formatDate(date).date}</span>
            <span className="event-date-time">{formatDate(date).time}</span>
          </div>
        </div>        <div className="event-detail-horizontal">
          <DollarSign
            size={18}
            className="event-icon-horizontal event-icon-price"
          />
          <span className="event-bold-horizontal">Precio:</span> {formatPrice(price)}
        </div>
      </div>
    </div>
  );
};

export default ViewEvent;
