import React, { useState, useEffect } from "react";
import "../../assets/styles/hotel/hotelFilter.css";

const EventFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    search: "",
    place: "",
    maxPrice: "",
    date: ""
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
        name="place"
        placeholder="Lugar del evento..."
        value={filters.place}
        onChange={handleInputChange}
      />

      <input
        type="date"
        name="date"
        placeholder="Fecha del evento..."
        value={filters.date}
        onChange={handleInputChange}
        min={new Date().toISOString().split('T')[0]}
      />
    </div>
  );
};

export default EventFilter;