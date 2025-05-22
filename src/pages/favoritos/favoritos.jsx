import React from "react";
import Navbar from "../../components/navbar";
import SimpleFooter from "../../components/footer";
import FavoritosCard from "../../components/favoritos/favoritosCard";
import useHotels from "../../shared/hooks/useHotels";

export const favoritos = () => {
  const { hotels, errorMessage } = useHotels();

  const userData = JSON.parse(localStorage.getItem("User"));
  const favHotels = userData?.userDetails?.favHotel || [];

  const favoritosList = hotels.filter(hotel => favHotels.includes(hotel.uid));

  return (
    <div>
      <Navbar />
      <h2 style={{ margin: "2rem 0" }}>Mis Hoteles Favoritos</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div className="hotel-grid">
        {favoritosList.length > 0 ? (
          favoritosList.map((hotel, idx) => (
            <FavoritosCard
              key={hotel.uid || `hotel-${idx}`}
              hotelName={hotel.name}
              department={hotel.department}
              starts={parseInt(hotel.category)}
              imageUrl={hotel.imageHotel}
              onClick={() => {}}
            />
          ))
        ) : (
          <p>No tienes hoteles favoritos.</p>
        )}
      </div>
      <SimpleFooter />
    </div>
  );
};

export default favoritos;
