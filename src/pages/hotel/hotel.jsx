import React from "react";
import { Navbar } from "../../components/navbar.jsx";
import FilterBar from "../../components/FilterBar.jsx";
import SimpleFooter from "../../components/footer.jsx";
import HotelCard from "../../components/hotels/hotelCard";
import useHotels from "../../shared/hooks/useHotels.jsx";

const HotelPage = () => {
  const { hotels, errorMessage, toggleOrder, orderBy } = useHotels();

  return (
    <div>
      <Navbar />
      <div className="hotel-header">
        <br />
        <br />
        <div className="filter-wrapper">
          <FilterBar />
          <button onClick={toggleOrder}>
            Ordenar por: {orderBy === "highestStars" ? "Más estrellas" : "Menos estrellas"}
          </button>
        </div>
      </div>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <div className="hotel-grid">
        {hotels.map((hotel) => (
          <HotelCard
            key={hotel._id}
            id={hotel._id}
            hotelName={hotel.name}
            department={hotel.department}
            starts={parseInt(hotel.category)}
            imageUrl={hotel.image}
          />
        ))}
      </div>

      <SimpleFooter />
    </div>
  );
};

export default HotelPage;
 