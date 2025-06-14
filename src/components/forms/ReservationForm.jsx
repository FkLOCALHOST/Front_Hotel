import React, { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import useCreateReservation from "../../shared/hooks/reservation/useCreateReservation";
import useRooms from "../../shared/hooks/rooms/useRooms";
import useGetHotel from "../../shared/hooks/useGetHotel";
import Navbar from "../navbar";
import SimpleFooter from "../footer";
import Calendary from "../calendary/Calendary";
import "../../assets/styles/forms/forms.css";
import "../../assets/styles/room/roomDetails.css";

const ReservationForm = () => {
    const [form, setForm] = useState({
        hotel: "",
        room: "",
        checkIn: null,
        checkOut: null,
    });

    const toast = useToast();
    const { addReservation, loading, error } = useCreateReservation();
    const { rooms } = useRooms();
    const { hotels } = useGetHotel();
    const [filteredRooms, setFilteredRooms] = useState([]);

    useEffect(() => {
        if (form.hotel) {
            const available = rooms.filter((room) => room.hotel === form.hotel);
            setFilteredRooms(available);
        } else {
            setFilteredRooms([]);
        }
    }, [form.hotel, rooms]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const isFormValid = () => {
        return (
            form.hotel &&
            form.room &&
            form.checkIn instanceof Date &&
            form.checkOut instanceof Date &&
            form.checkIn < form.checkOut
        );
    };

    const handleReservation = async (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            toast({
                title: "Campos incompletos o inválidos",
                description: "Por favor completa todos los campos correctamente.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const user = JSON.parse(localStorage.getItem("User"));
        const userId = user?.userDetails?._id;

        const reservationData = {
            user: userId,
            room: form.room,
            checkIn: form.checkIn.toISOString().split("T")[0],
            checkOut: form.checkOut.toISOString().split("T")[0],
        };

        const response = await addReservation(reservationData);

        if (response) {
            toast({
                title: "¡Reserva exitosa!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setForm({ hotel: "", room: "", checkIn: null, checkOut: null });
        } else {
            toast({
                title: "Error al reservar",
                description: error || "Inténtalo nuevamente.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Navbar />
            <div className="event-form-container" style={{ marginTop: "100px" }}>
                <h1 className="event-form-title">Reservar Habitación</h1>
                <form className="event-form" onSubmit={handleReservation}>
                    <div>
                      <label>Hotel</label>
                      <select name="hotel" value={form.hotel} onChange={handleChange} required>
                          <option value="">Selecciona un hotel</option>
                          {hotels.map((hotel) => (
                              <option key={hotel._id} value={hotel.uid}>
                                  {hotel.name}
                              </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      <label>Habitación</label>
                      <select name="room" value={form.room} onChange={handleChange} required>
                          <option value="">Selecciona una habitación</option>
                          {filteredRooms.map((room) => (
                              <option key={room._id} value={room.uid}>
                                  {room.name || `Habitación ${room.number}`}
                              </option>
                          ))}
                      </select>
                    </div>
                    <div className="availability-section">
                      <div className="calendary">
                        <Calendary
                            roomId={form.room}
                            selectedDate={form.checkIn}
                            onSelect={(date) => setForm((prev) => ({ ...prev, checkIn: date }))}
                            label={
                              <span style={{ fontSize: "0.98rem", fontWeight: 500}}>
                                Fecha de Check-in
                              </span>
                            }
                        />
                      </div>
                      <div className="calendary">
                        <Calendary
                            roomId={form.room}
                            selectedDate={form.checkOut}
                            onSelect={(date) => setForm((prev) => ({ ...prev, checkOut: date }))}
                            label={
                              <span style={{ fontSize: "0.98rem", fontWeight: 500 }}>
                                Fecha de Check-out
                              </span>
                            }
                        />
                      </div>
                    </div>
                    <button type="submit" disabled={!isFormValid() || loading}>
                        {loading ? "Reservando..." : "Reservar"}
                    </button>
                </form>
            </div>
            <SimpleFooter />
        </>
    );
};

export default ReservationForm;
