import React, { useState } from "react";
import { Navbar } from "../../components/navbar.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import SimpleFooter from "../../components/footer.jsx";
import HotelCard from "../../components/hotels/hotelCard";
import ViewHotel from "../../components/hotels/viewHotel";
import useHotels from "../../shared/hooks/useHotels.jsx";
import useSearchHotels from "../../shared/hooks/useSearchHotels.jsx";
import Paginacion from "../../components/paginacion.jsx";
import "../../assets/styles/hotel/hotelPage.css";

const HotelPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;
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
        <br />
        <br />
        <div className="filter-wrapper">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {loading && <p>Cargando hoteles...</p>}

      <div className="hotel-grid">
        {(hotels || []).map((hotel, idx) => {
          const isFavorite = favHotels.includes(hotel.uid);
      return (
      <HotelCard
        key={hotel.uid || `hotel-${idx}`}
        id={hotel.uid}
        hotelName={hotel.name}
        department={hotel.department}
        starts={parseInt(hotel.category)}
        imageUrl={hotel.imageHotel}
        onClick={() => handleCardClick(hotel)}
        isFavorite={isFavorite}
      />
    );
  })}
      </div>
      <Paginacion
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <SimpleFooter />

      {selectedHotel && (
        <div
          className="hotel-modal-overlay"
          onClick={handleCloseModal}
        >
          <button
            className="hotel-modal-close"
            onClick={handleCloseModal}
          >
            &times;
          </button>
          <div className="hotel-modal-content" onClick={(e) => e.stopPropagation()}>
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