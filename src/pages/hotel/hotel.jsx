import React, { useState } from "react";
import { Navbar } from "../../components/navbar.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import SimpleFooter from "../../components/footer.jsx";
import HotelCard from "../../components/hotels/hotelCard";
import useHotels from "../../shared/hooks/useHotels.jsx";
import useSearchHotels from "../../shared/hooks/useSearchHotels.jsx";
import Paginacion from "../../components/paginacion.jsx";

const HotelPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8; // Debemos de cambiar el limite por el que usemos al final

  const defaultResult = useHotels({ page: currentPage, limit: itemsPerPage });

  const searchResult = useSearchHotels({
    page: currentPage,
    limit: itemsPerPage,
    search: searchTerm,
  });
  const isSearch = searchTerm.trim() !== "";
  const { hotels, totalItems, errorMessage } = isSearch ? searchResult : defaultResult;
  const loading = isSearch ? searchResult.loading : defaultResult.loading || false;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div>
      <Navbar />
      <div className="hotel-header">
        <br />
        <br />
        <div className="filter-wrapper">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {loading && <p>Cargando hoteles...</p>}

      <div className="hotel-grid">
        {(hotels || []).map((hotel, idx) => (
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