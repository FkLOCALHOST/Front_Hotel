import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useGetRoomById from "../../shared/hooks/rooms/useGetRoomById";
import useCreateReservation from "../../shared/hooks/reservation/useCreateReservation";
import useReservationReceipt from "../../shared/hooks/reservation/useReservationReceipt";
import Navbar from "../navbar";
import SimpleFooter from "../footer";
import Calendary from "../calendary/Calendary";
import "../../assets/styles/room/roomDetails.css";

const RoomDetails = () => {
    const { id } = useParams();
    const { room, errorMessage, loading } = useGetRoomById(id);
    const { addReservation, loading: loadingReservation } = useCreateReservation();
    const { downloadReceipt, loading: loadingReceipt } = useReservationReceipt();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [reservationUid, setReservationUid] = useState(null);

    if (loading) return <p>Cargando habitación...</p>;
    if (errorMessage) return <p>{errorMessage}</p>;
    if (!room) return <p>Habitación no encontrada.</p>;

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % room.preView.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + room.preView.length) % room.preView.length);
    };

    const isFormValid = () => {
        return (
            checkIn instanceof Date &&
            checkOut instanceof Date &&
            checkIn < checkOut
        );
    };

    const handleReservation = async () => {
        const user = JSON.parse(localStorage.getItem("User"));
        const userId = user?.userDetails?._id;

        if (!isFormValid() || !userId || !id) {
            alert("Completa todos los campos correctamente antes de reservar.");
            console.log("Datos de reserva incompletos:", { checkIn, checkOut, userId, id });
            return;
        }

        const reservationData = {
            user: userId,
            room: id,
            checkIn: checkIn.toISOString().split("T")[0],
            checkOut: checkOut.toISOString().split("T")[0]
        };

        const result = await addReservation(reservationData);
        if (result) {
            alert("¡Reserva realizada con éxito!");
            console.log("Reserva:", result);

            setReservationUid(result.uid || result._id);
        } else {
            alert("Ocurrió un error al intentar reservar.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="room-details-container">
                <div className="preview-section">
                    <div>
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
                        <div className="images-gallery">
                            <img src={room.preView[(currentIndex + 1) % room.preView.length]} alt="" />
                            <img src={room.preView[(currentIndex + 2) % room.preView.length]} alt="" />
                            <img src={room.preView[(currentIndex + 3) % room.preView.length]} alt="" />
                        </div>
                    </div>
                </div>
                <div className="details-section">
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
                            <div className="calendary">
                            <Calendary
                                roomId={id}
                                selectedDate={checkIn}
                                onSelect={setCheckIn}
                                label={"Fecha de Check-in"}
                            />
                        </div>
                        <div className="calendary">
                            <Calendary
                                roomId={id}
                                selectedDate={checkOut}
                                onSelect={setCheckOut}
                                label={"Fecha de Check-out"}
                            />
                        </div>
                        </div>
                        <button
                            className="reserve-button"
                            onClick={handleReservation}
                            disabled={loadingReservation || !isFormValid()}
                        >
                            {loadingReservation ? "Reservando..." : "Reservar"}
                        </button>
                        {reservationUid && (
                            <button
                                className="reserve-button"
                                style={{ marginTop: "10px" }}
                                onClick={() => downloadReceipt(reservationUid)}
                                disabled={loadingReceipt}
                            >
                                {loadingReceipt ? "Descargando..." : "Recibo"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <SimpleFooter />
        </>
    );
};

export default RoomDetails;
