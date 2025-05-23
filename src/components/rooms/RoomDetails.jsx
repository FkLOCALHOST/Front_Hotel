import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useGetRoomById from "../../shared/hooks/rooms/useGetRoomById";
import Navbar from "../navbar";
import SimpleFooter from "../footer";
import "../../assets/styles/room/roomDetails.css";
import Calendary from "../calendary/Calendary";

const RoomDetails = () => {
    const { id } = useParams();
    const { room, errorMessage, loading } = useGetRoomById(id);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null); // ahora es Date

    if (loading) return <p>Cargando habitación...</p>;
    if (errorMessage) return <p>{errorMessage}</p>;
    if (!room) return <p>Habitación no encontrada.</p>;

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % room.preView.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + room.preView.length) % room.preView.length);
    };

    const handleCheckAvailability = () => {
        if (!selectedDate) {
            alert("Selecciona una fecha primero.");
            return;
        }
        alert(`(Simulado) Verificando disponibilidad para: ${selectedDate.toLocaleDateString()}`);
    };

    const handleReservation = () => {
        alert("Reservar (simulado)");
    };

    return (
        <>
            <Navbar />
            <div className="room-details-container">
                <div className="slider">
                    <img
                        src={
                            room.preView && room.preView.length > 0
                                ? room.preView[currentIndex]
                                : "https://via.placeholder.com/400x250?text=Sin+imagen"
                        }
                        alt={`Vista ${currentIndex + 1}`}
                    />
                    {room.preView.length > 1 && (
                        <div className="slider-buttons">
                            <button onClick={handlePrev}>&lt;</button>
                            <button onClick={handleNext}>&gt;</button>
                        </div>
                    )}
                </div>

                <div className="room-info">
                    <h2>{room.name}</h2>
                    <p><span>Número:</span> {room.number}</p>
                    <p><span>Precio:</span> {room.price}</p>
                    <p><span>Capacidad:</span> {room.capacity}</p>
                    <p><span>Descripción:</span> {room.description}</p>
                    <p className={room.status ? "availability" : "availability unavailable"}>
                        <span>Estado:</span> {room.status ? "Disponible" : "No disponible"}
                    </p>

                    <div className="availability-section">
                        <Calendary
                            roomId={id}
                            selectedDate={selectedDate}
                            onSelect={setSelectedDate}
                        />
                        <button onClick={handleCheckAvailability}>Verificar disponibilidad</button>
                    </div>

                    <button className="reserve-button" onClick={handleReservation}>
                        Reservar
                    </button>
                </div>
            </div>
            <SimpleFooter />
        </>
    );
};

export default RoomDetails;
