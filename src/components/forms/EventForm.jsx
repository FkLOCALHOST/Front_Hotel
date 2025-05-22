import React, { useState } from "react";
import { useToast, Box, Text } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import useAddEvent from "../../shared/hooks/event/useAddEvent";
import useRooms from "../../shared/hooks/rooms/useRooms";
import useGetHotel from "../../shared/hooks/useGetHotel";
import Navbar from "../navbar";
import SimpleFooter from "../footer";
import "../../assets/styles/forms/forms.css";

const EventForm = () => {
  const formatDateForInput = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (isNaN(date.getTime())) return "";
    const pad = (n) => n.toString().padStart(2, "0");
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes())
    );
  };

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    date: "",
    place: "",
    type: "PRIVATE",
    hotel: "",
    room: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const toast = useToast();

  const { addEvent, loading, error } = useAddEvent();
  const { rooms } = useRooms();
  const { hotels } = useGetHotel();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast({
        title: "Imagen requerida",
        description: "Por favor selecciona una imagen para el evento.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formattedDate = formatDateForInput(form.date);

    const formData = new FormData();
    Object.entries({ ...form, date: formattedDate }).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("image", selectedFile);

    const response = await addEvent(formData);

    if (response) {
      toast({
        title: "Evento creado exitosamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setForm({
        name: "",
        description: "",
        price: "",
        date: "",
        place: "",
        type: "PRIVATE",
        hotel: "",
        room: "",
      });
      setSelectedFile(null);
    } else {
      toast({
        title: "Error al crear el evento.",
        description: error || "Inténtalo de nuevo.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container-Event">
        <div className="login-content event-form-content">
          <h1 className="login-title">Crear Evento</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Nombre del evento"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <textarea
                name="description"
                placeholder="Descripción"
                value={form.description}
                onChange={handleChange}
                required
                className="event-description"
              />
            </div>
            <div className="input-group">
              <input
                type="number"
                name="price"
                placeholder="Precio"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="datetime-local"
                name="date"
                value={formatDateForInput(form.date)}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="place"
                placeholder="Lugar"
                value={form.place}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <Box {...getRootProps()} className="event-dropzone">
                <input {...getInputProps()} />
                {selectedFile ? (
                  <Text>{selectedFile.name}</Text>
                ) : isDragActive ? (
                  <Text>Suelta la imagen aquí...</Text>
                ) : (
                  <Text>Arrastra una imagen o haz clic para seleccionar</Text>
                )}
              </Box>
            </div>
            <div className="input-group">
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="event-select"
              >
                <option value="PRIVATE">Privado</option>
                <option value="PUBLIC">Público</option>
              </select>
            </div>
            <div className="input-group">
              <select
                name="hotel"
                value={form.hotel}
                onChange={handleChange}
                required
                className="event-select"
              >
                <option value="">Selecciona un hotel</option>
                {hotels.map((hotel) => (
                  <option key={hotel._id} value={hotel._id}>
                    {hotel.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <select
                name="room"
                value={form.room}
                onChange={handleChange}
                required
                className="event-select"
              >
                <option value="">Selecciona una habitación</option>
                {rooms.map((room) => (
                  <option key={room._id} value={room._id}>
                    {room.name || `Habitación ${room.number}`}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Creando..." : "Crear Evento"}
            </button>
          </form>
        </div>
      </div>
      <SimpleFooter />
    </>
  );
};

export default EventForm;
