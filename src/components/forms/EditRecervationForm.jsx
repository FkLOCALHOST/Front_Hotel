import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import useEditReservation from "../../shared/hooks/reservation/useEditReservation";
import useReservationById from "../../shared/hooks/reservation/useReservationById";
import useRooms from "../../shared/hooks/rooms/useRooms";
import useGetHotel from "../../shared/hooks/useGetHotel";
import Navbar from "../navbar";
import SimpleFooter from "../footer";
import Calendary from "../calendary/Calendary";
import "../../assets/styles/forms/hotelForms.css";

const EditRecervationForm = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const locationState = location.state || {};
  const reservationId = props.reservationId || locationState.reservationId || null;
  const onSubmit = props.onSubmit || null;
  const onCancel = props.onCancel || null;

  const { editReservation, loading: loadingEdit, error: errorEdit } = useEditReservation();
  const { reservation, loading: loadingReservation } = useReservationById(reservationId);
  const { rooms } = useRooms();
  const { hotels } = useGetHotel();

  const [filteredRooms, setFilteredRooms] = useState([]);
  const [form, setForm] = useState({
    hotel: "",
    room: "",
    checkIn: null,
    checkOut: null,
  });
  const [errors, setErrors] = useState({
    hotel: "",
    room: "",
    checkIn: "",
    checkOut: "",
  });

  // Llenar el formulario con los datos de la reserva solo una vez
  useEffect(() => {
    if (
      reservation &&
      reservation.room &&
      reservation.room.hotel &&
      (!form.hotel && !form.room)
    ) {
      setForm({
        hotel: reservation.room.hotel.uid || reservation.room.hotel._id || reservation.room.hotel || "",
        room: reservation.room.uid || reservation.room._id || reservation.room || "",
        checkIn: reservation.checkIn ? new Date(reservation.checkIn) : null,
        checkOut: reservation.checkOut ? new Date(reservation.checkOut) : null,
      });
    }
    // eslint-disable-next-line
  }, [reservation]);

  // Filtrar habitaciones por hotel seleccionado
  useEffect(() => {
    if (form.hotel) {
      const available = rooms.filter(
        (room) => room.hotel === form.hotel || room.hotel?.uid === form.hotel
      );
      setFilteredRooms(available);
    } else {
      setFilteredRooms([]);
    }
  }, [form.hotel, rooms]);

  // Validación básica de campos
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "hotel":
        if (!value) error = "Selecciona un hotel";
        break;
      case "room":
        if (!value) error = "Selecciona una habitación";
        break;
      case "checkIn":
        if (!value) error = "Selecciona fecha de check-in";
        break;
      case "checkOut":
        if (!value) error = "Selecciona fecha de check-out";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
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

  const handleEdit = async (e) => {
    e.preventDefault();

    // Validar todos los campos
    const isHotelValid = validateField("hotel", form.hotel);
    const isRoomValid = validateField("room", form.room);
    const isCheckInValid = validateField("checkIn", form.checkIn);
    const isCheckOutValid = validateField("checkOut", form.checkOut);

    if (!isHotelValid || !isRoomValid || !isCheckInValid || !isCheckOutValid || !(form.checkIn < form.checkOut)) {
      toast({
        title: "Por favor corrige los errores en el formulario",
        status: "error",
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

    const response = await editReservation(reservationId, reservationData);

    if (response) {
      if (onSubmit) onSubmit(response);
      toast({
        title: "¡Reserva editada exitosamente!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/reservas");
    } else {
      toast({
        title: "Error al editar la reserva",
        description: errorEdit || "Inténtalo nuevamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loadingReservation) return <div>Cargando datos de la reserva...</div>;
  if (!reservation) return <div>No se encontró la reserva.</div>;

  return (
    <>
      <Navbar />
      <div className="hotel-form-container" style={{ marginTop: "100px" }}>
        <h1 className="hotel-form-title">Editar Reserva</h1>
        <form className="hotel-form" onSubmit={handleEdit}>
          <label>Hotel</label>
          <select name="hotel" value={form.hotel} onChange={handleChange} required>
            <option value="">Selecciona un hotel</option>
            {hotels.map((hotel) => (
              <option key={hotel._id || hotel.uid} value={hotel.uid}>
                {hotel.name}
              </option>
            ))}
          </select>
          {errors.hotel && <span className="error-message">{errors.hotel}</span>}

          <label>Habitación</label>
          <select name="room" value={form.room} onChange={handleChange} required>
            <option value="">Selecciona una habitación</option>
            {filteredRooms.map((room) => (
              <option key={room._id || room.uid} value={room.uid}>
                {room.name || `Habitación ${room.number}`}
              </option>
            ))}
          </select>
          {errors.room && <span className="error-message">{errors.room}</span>}

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px", marginBottom: "10px" }}>
            <Calendary
              roomId={form.room}
              selectedDate={form.checkIn}
              onSelect={(date) => {
                setForm((prev) => ({ ...prev, checkIn: date }));
                validateField("checkIn", date);
              }}
              label="Fecha de Check-in"
            />
          </div>
          {errors.checkIn && <span className="error-message">{errors.checkIn}</span>}

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px", marginBottom: "10px" }}>
            <Calendary
              roomId={form.room}
              selectedDate={form.checkOut}
              onSelect={(date) => {
                setForm((prev) => ({ ...prev, checkOut: date }));
                validateField("checkOut", date);
              }}
              label="Fecha de Check-out"
            />
          </div>
          {errors.checkOut && <span className="error-message">{errors.checkOut}</span>}

          <button type="submit" disabled={!isFormValid() || loadingEdit}>
            {loadingEdit ? "Editando..." : "Editar Reserva"}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>
              Cancelar
            </button>
          )}
          {errorEdit && <div style={{ color: "red" }}>{errorEdit}</div>}
        </form>
      </div>
      <SimpleFooter />
    </>
  );
};

export default EditRecervationForm;