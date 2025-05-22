import React from "react";
import { Navbar } from "../components/navbar.jsx";
import VideoFondo from "../components/home/video.jsx";
import SimpleFooter from "../components/footer.jsx";
import HotelCard from "../components/hotels/hotelCard";
import useHotels from "../shared/hooks/useHotels.jsx";

const Home = () => {
  const { hotels, errorMessage } = useHotels();

  return (
    <>
      <Navbar />
      <VideoFondo />

      <section style={{ padding: "2rem" }}>
        <h2 style={{ textAlign: "center" }}>Hoteles Destacados</h2>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <div className="hotel-grid">
          {(hotels || [])
            .slice()
            .sort((a, b) => parseInt(b.category) - parseInt(a.category))
            .slice(0, 4)
            .map((hotel, idx) => (
              <HotelCard
                key={hotel._id || `hotel-${idx}`}
                id={hotel._id}
                hotelName={hotel.name}
                department={hotel.department}
                starts={parseInt(hotel.category)}
                imageUrl={hotel.imageHotel}
              />
            ))}
        </div>
      </section>

      <SimpleFooter />
    </>
  );
};

export default Home;
