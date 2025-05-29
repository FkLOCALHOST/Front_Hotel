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

    </div>
  );
};

export default BedroomFilter;