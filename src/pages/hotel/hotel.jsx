import React from "react";
import { Navbar } from "../../components/navbar.jsx";
import VideoFondo from "../../components/home/video.jsx";
import SimpleFooter from "../../components/footer.jsx";
import HotelCard from "../../components/hotels/hotelCard";

const HotelPage = () => {
  return (
    <div>
      <Navbar />
      <VideoFondo />
      <HotelCard />
      <SimpleFooter />
    </div>
  );
};

export default HotelPage;
