import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { useLocation } from "react-router-dom";
import useAddEvent from "../../shared/hooks/event/useAddEvent";
import useEditEvent from "../../shared/hooks/event/useEditEvent";
import { getHotels, getRooms } from "../../services/api.jsx";
import "../../assets/styles/forms/forms.css";

const EventForm = () => {
  const toast = useToast();
  const { addEvent } = useAddEvent();
  const { editEvent } = useEditEvent();
  const location = useLocation();
  const editMode = location.state?.editMode || false;

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
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      const res = await getHotels();
      if (res?.data?.hotels) {
        setHotels(res.data.hotels);
      }
    };
    fetchHotels();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      if (!form.hotel) {
        setRooms([]);
        return;
      }
      const res = await getRooms();
      if (res?.data?.rooms) {
        // Soporta r.hotel como string o como objeto
        const filtered = res.data.rooms.filter((r) => {
          const hotelId =
            typeof r.hotel === "object"
              ? r.hotel.uid || r.hotel._id
              : r.hotel;
          return hotelId === form.hotel;
        });
        setRooms(filtered);
      }
    };
    fetchRooms();
  }, [form.hotel]);

  useEffect(() => {
    if (editMode && location.state) {
      const {
        name,
        description,
        price,
        date,
        place,
        type,
        hotel,
        room,
        image,
      } = location.state;

      setForm({
        name: name || "",
        description: description || "",
        price: price || "",
        date: date ? new Date(date).toISOString().slice(0, 16) : "",
        place: place || "",
        type: type || "PRIVATE",
        hotel: hotel || "",
        room: room || "",
      });

      if (image) {
        setSelectedFile({ name: image, preview: image });
      }
    }
  }, [editMode, location.state]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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

    const formattedDate = form.date.split("T")[0];

    const formData = new FormData();
    Object.entries({ ...form, date: formattedDate }).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("image", selectedFile);

    let response;
    if (editMode) {
      const eventId = location.state?.eventId;
      response = await editEvent(eventId, formData);
    } else {
      response = await addEvent(formData);
    }

    if (response) {
      toast({
        title: editMode
          ? "Evento actualizado exitosamente."
          : "Evento creado exitosamente.",
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
        title: "Error al procesar el evento.",
        description: "Inténtalo de nuevo.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="event-form-container">
      <form onSubmit={handleSubmit} className="event-form">
        <FormControl>
          <FormLabel>Nombre</FormLabel>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="event-form-input"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Descripción</FormLabel>
          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="event-form-textarea"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Precio</FormLabel>
          <Input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className="event-form-input"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Fecha</FormLabel>
          <Input
            type="datetime-local"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="event-form-input"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Lugar</FormLabel>
          <Input
            name="place"
            value={form.place}
            onChange={handleChange}
            required
            className="event-form-input"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Tipo</FormLabel>
          <Select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="event-form-select"
          >
            <option value="PRIVATE">Privado</option>
            <option value="PUBLIC">Público</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Hotel</FormLabel>
          <Select
            name="hotel"
            value={form.hotel}
            onChange={handleChange}
            required
            className="event-form-select"
            placeholder="Selecciona un hotel"
          >
            {hotels.map((hotel) => (
              <option key={hotel.uid || hotel._id} value={hotel.uid || hotel._id}>
                {hotel.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Salón</FormLabel>
          <Select
            name="room"
            value={form.room}
            onChange={handleChange}
            required
            className="event-form-select"
            placeholder={
              form.hotel
                ? "Selecciona una habitación"
                : "Selecciona primero un hotel"
            }
            disabled={!form.hotel}
          >
            {rooms.map((room) => (
              <option
                key={room.uid || room._id}
                value={room.uid || room._id}
              >
                {room.name || room.numero || "Sin nombre"}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Imagen</FormLabel>
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            {selectedFile && selectedFile.preview ? (
              <img
                src={selectedFile.preview}
                alt="Preview"
                className="event-image-preview"
              />
            ) : isDragActive ? (
              <Text>Suelta la imagen aquí...</Text>
            ) : (
              <Text>Arrastra una imagen o haz clic para seleccionar</Text>
            )}
          </div>
        </FormControl>

        <Button type="submit" className="event-form-submit-btn">
          {editMode ? "Actualizar Evento" : "Crear Evento"}
        </Button>
      </form>
    </div>
  );
};

export default EventForm;
