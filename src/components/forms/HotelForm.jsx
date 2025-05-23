import React, { useState } from "react";
import "../../assets/styles/forms/hotelForms.css";
import useAddHotel from "../../shared/hooks/useAddHotel";

const HotelForm = () => {
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

  const { addHotel, loading, error } = useAddHotel();

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
    const result = await addHotel(form);
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
      alert("Hotel creado exitosamente");
    }
  };

  return (
    <div className="hotel-form-container">
      <h2 className="hotel-form-title">Crear Hotel</h2>
      <form className="hotel-form" onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
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
          />
        </div>
        <div>
          <label>Categoría:</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
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
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
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
          />
        </div>
        <div>
          <label>Imagen:</label>
          <input
            type="file"
            name="imageHotel"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear Hotel"}
        </button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </div>
  );
};

export default HotelForm;
