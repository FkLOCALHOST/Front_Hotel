import React, { useState } from "react";
import { Navbar } from "../../components/navbar.jsx";
import FilterBar from "../../components/FilterBar.jsx";
import SimpleFooter from "../../components/footer.jsx";
import HotelCard from "../../components/hotels/hotelCard";
import useHotels from "../../shared/hooks/useHotels.jsx";
import Paginacion from "../../components/paginacion.jsx";

const HotelPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { hotels, errorMessage, toggleOrder, orderBy, totalItems } = useHotels({
    page: currentPage,
    limit: itemsPerPage,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Navbar />
      <div className="hotel-header">
        <br />
        <br />
        <div className="filter-wrapper">
          <FilterBar />
        </div>
      </div>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <div className="hotel-grid">
        {hotels.map((hotel, idx) => (
          <HotelCard
            key={hotel._id || `hotel-${idx}`}
            id={hotel._id}
            hotelName={hotel.name}
            department={hotel.department}
            starts={parseInt(hotel.category)}
            imageUrl={hotel.image}
          />
        ))}
      </div>
      <Paginacion
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <SimpleFooter />
    </div>
  );
};

export default HotelPage;
