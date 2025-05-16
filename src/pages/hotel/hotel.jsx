import React from "react";
import Sidebar from "../../components/sideBar.jsx";
import SimpleFooter from "./components/footer.jsx";
import HotelCard from "../../components/hotel/HotelCard.jsx";
// import { useHoteles } from "../../shared/hooks/useHoteles.jsx";

const FavoritosHotelesPage = () => {
  const { hoteles, isFetching } = useHoteles();

  if (isFetching) return <div>Cargando hoteles...</div>;

  return (
    <div>
      <Sidebar />
      {hotels.length === 0 ? (
        <div>No hay hoteles</div>
      ) : (
      hotels.map((hotel) => (
      <HotelCard
        key={hotel.id}
        id={hotel.id}
        hotelName={hotel.hotelName}
        starts={hotel.starts}
        address={hotel.address}
        price={hotel.price}
        imageUrl={hotel.imageUrl}
      />
      )) )}
      <SimpleFooter />
    </div>
  );
};

export default FavoritosHotelesPage;
