import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAddRooms from "@/shared/hooks/rooms/useAddRooms";
import useEditRooms from "@/shared/hooks/rooms/useEditRooms";
import useRoomById from "@/shared/hooks/rooms/useRoomById";
import useGetHotel from "../../shared/hooks/useGetHotel";
import useGetAmenities from "../../shared/hooks/amenity/useGetAmenity";
import { useToast } from "@chakra-ui/react";
import Navbar from "../navbar";
import SimpleFooter from "../footer";
import "../../assets/styles/forms/forms.css";
import {
  validateRoomName,
  validateRoomNameMessage,
  validateDescription,
  validateDescriptionMessage,
  validatePrice,
  validatePriceMessage,
  validateCapacity,
  validateCapacityMessage,
  validateRoomNumber,
  validateRoomNumberMessage,
} from "../../shared/validators";

const RoomForm = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const locationState = location.state || {};
  const editMode = typeof props.editMode === "boolean" ? props.editMode : locationState.editMode || false;
  const roomId = props.roomId || locationState.roomId || null;
  const onSubmit = props.onSubmit || null;
  const onCancel = props.onCancel || null;

  const { room, loading: loadingRoom } = useRoomById(editMode ? roomId : null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    capacity: "",
    hotel: "",
    amenity: "",
    number: "",
    preView: [],
  });
  const [originalImages, setOriginalImages] = useState([]);
  const [amenitiesFetched, setAmenitiesFetched] = useState(false);
  // Estado para errores de validación
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    capacity: "",
    number: "",
    hotel: "",
    amenity: "",
  });

  const { addRoom, loading: loadingAdd, error: errorAdd } = useAddRooms();
  const { editRoom, loading: loadingEdit, error: errorEdit } = useEditRooms();
  const { hotels, loading: loadingHotels, error: errorHotels } = useGetHotel();
  const { fetchAmenities, amenities, loading: loadingAmenities, error: errorAmenities } = useGetAmenities(); const toast = useToast();
  useEffect(() => {
    if (!amenitiesFetched) {
      fetchAmenities();
      setAmenitiesFetched(true);
    }
  }, [amenitiesFetched, fetchAmenities]);

  // Función para validar un campo específico
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!validateRoomName(value)) {
          error = validateRoomNameMessage;
        }
        break;
      case "description":
        if (!validateDescription(value)) {
          error = validateDescriptionMessage;
        }
        break;
      case "price":
        if (!validatePrice(value)) {
          error = validatePriceMessage;
        }
        break;
      case "capacity":
        if (!validateCapacity(value)) {
          error = validateCapacityMessage;
        }
        break;
      case "number":
        if (!validateRoomNumber(value)) {
          error = validateRoomNumberMessage;
        }
        break;
      case "hotel":
        if (!value) {
          error = "Debe seleccionar un hotel";
        }
        break;
      case "amenity":
        if (!value) {
          error = "Debe seleccionar una amenidad";
        }
        break;
      default:
        break;
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    return error === "";
  };
  useEffect(() => {
    if (editMode && room) {
      setForm({
        name: room.name || "",
        description: room.description || "",
        price: room.price || "",
        capacity: room.capacity || "",
        hotel: room.hotel?.uid || room.hotel || "",
        amenity: room.amenity?.uid || room.amenity || "",
        number: room.number || "",
        preView: [],
      });
      setOriginalImages(Array.isArray(room.preView) ? room.preView : [room.preView]);
    }
  }, [editMode, room]); const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const fileArray = Array.from(files);
      setForm((prev) => ({ ...prev, [name]: fileArray }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      validateField(name, value);
    }
  };

  const buildFormData = (form) => {
    const data = new FormData();
    for (const [key, value] of Object.entries(form)) {
      if (key === "preView") {
        value.forEach((file) => data.append("preView", file));
      } else {
        data.append(key, value);
      }
    }
    return data;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isNameValid = validateField("name", form.name);
    const isDescriptionValid = validateField("description", form.description);
    const isPriceValid = validateField("price", form.price);
    const isCapacityValid = validateField("capacity", form.capacity);
    const isNumberValid = validateField("number", form.number); const isHotelValid = validateField("hotel", form.hotel);
    const isAmenityValid = validateField("amenity", form.amenity);

    if (!isNameValid || !isDescriptionValid || !isPriceValid || !isCapacityValid ||
      !isNumberValid || !isHotelValid || !isAmenityValid) {
      toast({
        title: "Por favor corrige los errores en el formulario",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    console.log(amenities)
    let result;

    if (editMode && room && room.uid) {
      const dataToSend = form.preView.length > 0 ? buildFormData(form) : {
        ...form,
        preView: originalImages,
      };

      result = await editRoom(room.uid, dataToSend);
      if (result) {
        if (onSubmit) onSubmit(result);
        toast({
          title: "Habitación editada exitosamente",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/habitaciones");
      }
    } else if (!editMode) {
      const dataToSend = form.preView.length > 0 ? buildFormData(form) : { ...form };
      result = await addRoom(dataToSend);

      if (result) {
        setForm({
          name: "",
          description: "",
          price: "",
          capacity: "",
          hotel: "",
          amenity: "",
          number: "",
          preView: [],
        });
        setOriginalImages([]);
        if (onSubmit) onSubmit(result);
        toast({
          title: "Habitación registrada exitosamente",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/habitaciones");
      }
    }

    if (!result) {
      toast({
        title: errorAdd || errorEdit || "Error al procesar la habitación",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const removeImage = (index) => {
    setForm((prev) => {
      const newPreview = [...prev.preView];
      newPreview.splice(index, 1);
      return { ...prev, preView: newPreview };
    });
  };

  if (editMode && loadingRoom) return <div>Cargando datos de la habitación...</div>;

  return (
    <>
      <Navbar />
      <div className="event-form-container" style={{ marginTop: "120px" }}>
        <h2 className="event-form-title">
          {editMode ? "Editar Habitación" : "Registrar Habitación"}
        </h2>
        <form className="event-form" onSubmit={handleSubmit}>
          {/* Cada campo en un <div> simple, sin estilos de centrado */}
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          <div>
            <label>Descripción:</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className={errors.description ? "input-error" : ""}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>
          <div>
            <label>Precio:</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className={errors.price ? "input-error" : ""}
            />
            {errors.price && <span className="error-message">{errors.price}</span>}
          </div>
          <div>
            <label>Capacidad:</label>
            <input
              type="number"
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              required
              className={errors.capacity ? "input-error" : ""}
            />
            {errors.capacity && <span className="error-message">{errors.capacity}</span>}
          </div>
          <div>
            <label>Número:</label>
            <input
              type="text"
              name="number"
              value={form.number}
              onChange={handleChange}
              required
              className={errors.number ? "input-error" : ""}
            />
            {errors.number && <span className="error-message">{errors.number}</span>}
          </div>
          <div>
            <label>Hotel:</label>
            <select
              name="hotel"
              value={form.hotel}
              onChange={handleChange}
              required
              className={errors.hotel ? "input-error" : ""}
            >
              <option value="">Selecciona un hotel</option>
              {loadingHotels ? <option>Cargando...</option> : errorHotels ? <option>Error</option> : hotels.map((h) => (
                <option key={h.uid} value={h.uid}>{h.name}</option>
              ))}
            </select>
            {errors.hotel && <span className="error-message">{errors.hotel}</span>}
          </div>
          <div>
            <label>Amenidad:</label>
            <select
              name="amenity"
              value={form.amenity}
              onChange={handleChange}
              required
              className={errors.amenity ? "input-error" : ""}
            >
              <option value="">Selecciona un amenity</option>
              {loadingAmenities
                ? <option>Cargando...</option>
                : errorAmenities
                  ? <option disabled>Error: {errorAmenities.message || errorAmenities}</option>
                  : amenities.map((a) => (
                    <option key={a.uid} value={a.uid}>{a.name}</option>
                  ))
              }
            </select>
            {errors.amenity && <span className="error-message">{errors.amenity}</span>}
          </div>
          <div>
            <label>Imágenes:</label>
            <input
              type="file"
              name="preView"
              accept="image/*"
              multiple
              onChange={handleChange}
            />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
              {originalImages.map((img, i) => (
                <img key={i} src={img} alt={`img-${i}`} style={{ width: 100 }} />
              ))}
              {form.preView.map((file, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <img src={URL.createObjectURL(file)} alt={`preview-${i}`} style={{ width: 100 }} />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    style={{ position: "absolute", top: 0, right: 0, background: "red", color: "white" }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" disabled={loadingAdd || loadingEdit || (editMode && loadingRoom)}>
            {editMode ? (loadingEdit ? "Editando..." : "Editar Habitación") : (loadingAdd ? "Registrando..." : "Registrar Habitación")}
          </button>
          {onCancel && <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancelar</button>}
          {(errorAdd || errorEdit) && <div style={{ color: "red" }}>{errorAdd || errorEdit}</div>}
        </form>
      </div>
      <SimpleFooter />
    </>
  );
};

export default RoomForm;