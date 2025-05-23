import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../assets/styles/forms/hotelForms.css";
import useAddHotel from "../../shared/hooks/useAddHotel";
import useEditHotel from "../../shared/hooks/useEditHotel";
import useHotelById from "../../shared/hooks/useHotelById";

const HotelForm = (props) => {
  const location = useLocation();
  const editMode = props.editMode || location.state?.editMode || false;
  const hotelId = props.hotelId || location.state?.hotelId || null;
  const onSubmit = props.onSubmit || null;
  const onCancel = props.onCancel || null;

  const { hotel, loading: loadingHotel } = useHotelById(editMode ? hotelId : null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    addres: "",
    category: "",
    price: "",
    description: "",
    department: "",
    imageHotel: null,
  });

  const [originalImage, setOriginalImage] = useState(null);

  useEffect(() => {
    if (editMode && hotel) {
      setForm({
        name: hotel.name || "",
        email: hotel.email || "",
        phone: hotel.phone || "",
        addres: hotel.addres || "",
        category: hotel.category || "",
        price: hotel.price || "",
        description: hotel.description || "",
        department: hotel.department || "",
        imageHotel: null,
      });
      setOriginalImage(hotel.imageHotel || null);
    }
  }, [editMode, hotel]);

  const { addHotel, loading: loadingAdd, error: errorAdd } = useAddHotel();
  const { editHotel, loading: loadingEdit, error: errorEdit } = useEditHotel();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;

    if (editMode && hotel && hotel.uid) {
      let dataToSend;
      // Si hay nueva imagen, usa FormData
      if (form.imageHotel instanceof File) {
        dataToSend = new FormData();
        dataToSend.append("name", form.name);
        dataToSend.append("email", form.email);
        dataToSend.append("phone", form.phone);
        dataToSend.append("addres", form.addres);
        dataToSend.append("category", form.category);
        dataToSend.append("price", form.price);
        dataToSend.append("description", form.description);
        dataToSend.append("department", form.department);
        dataToSend.append("imageHotel", form.imageHotel); // archivo
      } else {
        // Si no hay nueva imagen, envía la URL original
        dataToSend = {
          ...form,
          imageHotel: originalImage,
        };
      }
      result = await editHotel(hotel.uid, dataToSend);
      if (result) {
        if (onSubmit) onSubmit(result);
        alert("Hotel editado exitosamente");
      }
    } else if (!editMode) {
      // Crear hotel (puedes hacer lo mismo aquí si soportas imágenes al crear)
      let dataToSend;
      if (form.imageHotel instanceof File) {
        dataToSend = new FormData();
        dataToSend.append("name", form.name);
        dataToSend.append("email", form.email);
        dataToSend.append("phone", form.phone);
        dataToSend.append("addres", form.addres);
        dataToSend.append("category", form.category);
        dataToSend.append("price", form.price);
        dataToSend.append("description", form.description);
        dataToSend.append("department", form.department);
        dataToSend.append("imageHotel", form.imageHotel);
      } else {
        dataToSend = { ...form };
      }
      result = await addHotel(dataToSend);
      if (result) {
        setForm({
          name: "",
          email: "",
          phone: "",
          addres: "",
          category: "",
          price: "",
          description: "",
          department: "",
          imageHotel: null,
        });
        if (onSubmit) onSubmit(result);
        alert("Hotel creado exitosamente");
      }
    }
  };

  if (editMode && loadingHotel) {
    return <div>Cargando datos del hotel...</div>;
  }

  return (
    <div className="hotel-form-container">
      <h2 className="hotel-form-title">
        {editMode ? "Editar Hotel" : "Crear Hotel"}
      </h2>
      <form className="hotel-form" onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            disabled={editMode && loadingHotel}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={editMode && loadingHotel}
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            disabled={editMode && loadingHotel}
          />
        </div>
        <div>
          <label>Dirección:</label>
          <input
            type="text"
            name="addres"
            value={form.addres}
            onChange={handleChange}
            required
            disabled={editMode && loadingHotel}
          />
        </div>
        <div>
          <label>Categoría:</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            disabled={editMode && loadingHotel}
          >
            <option value="">Selecciona una categoría</option>
            <option value="1 STARS">1 Estrella</option>
            <option value="2 STARS">2 Estrellas</option>
            <option value="3 STARS">3 Estrellas</option>
            <option value="4 STARS">4 Estrellas</option>
            <option value="5 STARS">5 Estrellas</option>
          </select>
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            disabled={editMode && loadingHotel}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            disabled={editMode && loadingHotel}
          />
        </div>
        <div>
          <label>Departamento:</label>
          <input
            type="text"
            name="department"
            value={form.department}
            onChange={handleChange}
            required
            disabled={editMode && loadingHotel}
          />
        </div>
        <div>
          <label>Imagen:</label>
          <input
            type="file"
            name="imageHotel"
            accept="image/*"
            onChange={handleChange}
            disabled={editMode && loadingHotel}
          />
          {editMode && originalImage && !form.imageHotel && (
            <img
              src={originalImage}
              alt="Imagen actual del hotel"
              style={{ width: "120px", marginTop: "8px" }}
            />
          )}
        </div>
        <button type="submit" disabled={loadingAdd || loadingEdit || (editMode && loadingHotel)}>
          {editMode
            ? loadingEdit
              ? "Editando..."
              : "Editar Hotel"
            : loadingAdd
            ? "Creando..."
            : "Crear Hotel"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>
            Cancelar
          </button>
        )}
        {(errorAdd || errorEdit) && (
          <div style={{ color: "red" }}>{errorAdd || errorEdit}</div>
        )}
      </form>
    </div>
  );
};

export default HotelForm;
