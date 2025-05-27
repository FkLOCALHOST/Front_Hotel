import React, { useState, useEffect } from "react";
import "../../assets/styles/hotel/hotelFilter.css";

const BedroomFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    search: "",
    capacity: "",
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
        type="number"
        name="capacity"
        placeholder="Capacidad mínima..."
        value={filters.capacity}
        onChange={handleInputChange}
        min="1"
      />

      <input
        type="number"
        name="maxPrice"
        placeholder="Precio máximo..."
        value={filters.maxPrice}
        onChange={handleInputChange}
        min="0"
      />
    </div>
  );
};

export default BedroomFilter;