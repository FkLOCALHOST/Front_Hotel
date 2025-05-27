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

  const { addRoom, loading: loadingAdd, error: errorAdd } = useAddRooms();
  const { editRoom, loading: loadingEdit, error: errorEdit } = useEditRooms();
  const { hotels, loading: loadingHotels, error: errorHotels } = useGetHotel();
  const { fetchAmenities, amenities, loading: loadingAmenities, error: errorAmenities } = useGetAmenities();
  const toast = useToast();

  useEffect(() => {
    fetchAmenities();
  }, []);

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
  }, [editMode, room]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: Array.from(files) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
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
      <div className="hotel-form-container" style={{ marginTop: "120px" }}>
        <h2 className="hotel-form-title">
          {editMode ? "Editar Habitación" : "Registrar Habitación"}
        </h2>
        <form className="hotel-form" onSubmit={handleSubmit}>
          <div>
            <label>Nombre:</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Descripción:</label>
            <textarea name="description" value={form.description} onChange={handleChange} required />
          </div>
          <div>
            <label>Precio:</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} required />
          </div>
          <div>
            <label>Capacidad:</label>
            <input type="number" name="capacity" value={form.capacity} onChange={handleChange} required />
          </div>
          <div>
            <label>Número:</label>
            <input type="text" name="number" value={form.number} onChange={handleChange} required />
          </div>
          <div>
            <label>Hotel:</label>
            <select name="hotel" value={form.hotel} onChange={handleChange} required>
              <option value="">Selecciona un hotel</option>
              {loadingHotels ? <option>Cargando...</option> : errorHotels ? <option>Error</option> : hotels.map((h) => (
                <option key={h.uid} value={h.uid}>{h.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Amenidad:</label>
            <select name="amenity" value={form.amenity} onChange={handleChange} required>
              <option value="">Selecciona un amenity</option>
              {loadingAmenities ? <option>Cargando...</option> : errorAmenities ? <option>Error</option> : amenities.map((a) => (
                <option key={a.uid} value={a.uid}>{a.name}</option>
              ))}
            </select>
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