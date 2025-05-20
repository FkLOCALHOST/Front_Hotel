import React, { useState } from "react";
import { Navbar } from "../../components/navbar.jsx";
import FilterBar from "../../components/FilterBar.jsx";
import SimpleFooter from "../../components/footer.jsx";
import HotelCard from "../../components/hotels/hotelCard";
import ViewHotel from "../../components/hotels/viewHotel";
import useHotels from "../../shared/hooks/useHotels.jsx";
import Paginacion from "../../components/paginacion.jsx";

const HotelPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const itemsPerPage = 8;

  const { hotels, errorMessage, toggleOrder, orderBy, totalItems } = useHotels({
    page: currentPage,
    limit: itemsPerPage,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCardClick = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handleCloseModal = () => {
    setSelectedHotel(null);
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
        {(hotels || []).map((hotel, idx) => (
          <HotelCard
            key={hotel._id || `hotel-${idx}`}
            id={hotel._id}
            hotelName={hotel.name}
            department={hotel.department}
            starts={parseInt(hotel.category)}
            imageUrl={hotel.imageHotel}
            onClick={() => handleCardClick(hotel)}
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
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
          onClick={handleCloseModal}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <button
              style={{
                position: "absolute",
                top: 20,
                right: 40,
                zIndex: 1001,
                background: "#transparent",
                border: "none",
                fontSize: 64,
                cursor: "pointer",
              }}
              onClick={handleCloseModal}
            >
              &times;
            </button>
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
