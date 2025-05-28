import React, { useState, useMemo } from "react";
import { Navbar } from "../../components/navbar.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import SimpleFooter from "../../components/footer.jsx";
import HotelCard from "../../components/hotels/hotelCard";
import ViewHotel from "../../components/hotels/viewHotel";
import useHotels from "../../shared/hooks/useHotels.jsx";
import useSearchHotels from "../../shared/hooks/useSearchHotels.jsx";
import Paginacion from "../../components/paginacion.jsx";
import "../../assets/styles/hotel/hotelPage.css";
import HotelFilters from "../../components/hotels/hotelFilter.jsx";

const HotelPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    department: "",
    maxPrice: ""
  });

  const itemsPerPage = 8;

  const isFilterActive =
    searchTerm.trim() !== "" ||
    filters.category ||
    filters.department ||
    filters.maxPrice;

  const memoizedFilters = useMemo(() => filters, [filters]);

  const defaultResult = useHotels({ page: currentPage, limit: itemsPerPage });

  const searchResult = useSearchHotels({
    page: currentPage,
    limit: itemsPerPage,
    category: memoizedFilters.category,
    maxPrice: memoizedFilters.maxPrice,
    department: memoizedFilters.department,
    search: searchTerm
  });

  const { hotels, totalItems, errorMessage } = isFilterActive
    ? searchResult
    : defaultResult;

  const loading = isFilterActive
    ? searchResult.loading
    : defaultResult.loading || false;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    if (value !== searchTerm) {
      setSearchTerm(value);
      setCurrentPage(1);
    }
  };

  const handleFilter = (filterValues) => {
    const hasChanged =
      filters.category !== filterValues.category ||
      filters.department !== filterValues.department ||
      filters.maxPrice !== filterValues.maxPrice;

    if (hasChanged) {
      setFilters(filterValues);
      setCurrentPage(1);
    }
  };

  const handleCardClick = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handleCloseModal = () => {
    setSelectedHotel(null);
  };

  const userData = JSON.parse(localStorage.getItem("User"));
  const favHotels = userData?.userDetails?.favHotel || [];

  return (
    <div>
      <Navbar />
      <div className="hotel-header">
        <div className="filter-wrapper">
          <SearchBar onSearch={handleSearch} />
          <HotelFilters onFilter={handleFilter} />
        </div>
      </div>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {loading && <p>Cargando hoteles...</p>}

      <div className="hotel-grid">
        {(hotels || []).map((hotel, idx) => (
          <HotelCard
            key={hotel.uid || `hotel-${idx}`}
            id={hotel.uid}
            hotelName={hotel.name}
            department={hotel.department}
            starts={parseInt(hotel.category)}
            imageUrl={hotel.imageHotel}
            onClick={() => handleCardClick(hotel)}
            onDeleted={() => setCurrentPage(currentPage)}
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

      {selectedHotel && (
        <div className="hotel-modal-overlay" onClick={handleCloseModal}>
          <button className="hotel-modal-close" onClick={handleCloseModal}>
            &times;
          </button>
          <div
            className="hotel-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <ViewHotel
              hotelName={selectedHotel.name}
              department={selectedHotel.department}
              starts={parseInt(selectedHotel.category)}
              address={selectedHotel.address}
              price={selectedHotel.price}
              imageUrl={selectedHotel.imageHotel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelPage;
