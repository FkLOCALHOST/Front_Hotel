import React, { useState, useEffect } from "react";
import "../../assets/styles/hotel/hotelFilter.css";

const HotelFilters = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    department: "",
    maxPrice: ""
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilter(filters);
    }, 300); 

    return () => clearTimeout(timer);
  }, [filters, onFilter]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="hotel-filters">
      <input
        type="text"
        name="search"
        placeholder="Buscar por nombre..."
        value={filters.search}
        onChange={handleInputChange}
      />

      <select
        name="category"
        value={filters.category}
        onChange={handleInputChange}
      >
        <option value="">Todas las categorías</option>
        <option value="1 STARS">⭐</option>
        <option value="2 STARS">⭐⭐</option>
        <option value="3 STARS">⭐⭐⭐</option>
        <option value="4 STARS">⭐⭐⭐⭐</option>
        <option value="5 STARS">⭐⭐⭐⭐⭐</option>
      </select>

      <input
        type="text"
        name="department"
        placeholder="Departamento..."
        value={filters.department}
        onChange={handleInputChange}
      />

      <input
        type="number"
        name="maxPrice"
        placeholder="Precio máximo..."
        value={filters.maxPrice}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default HotelFilters;