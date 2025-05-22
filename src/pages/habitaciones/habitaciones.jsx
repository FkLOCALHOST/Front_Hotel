import React, { useState } from "react";
import { Navbar } from "../../components/navbar.jsx";
import SimpleFooter from "../../components/footer.jsx";
import RoomCard from "../../components/rooms/RoomCard.jsx";
import useRooms from "../../shared/hooks/rooms/useRooms.jsx";
import Paginacion from "../../components/paginacion.jsx";
import SearchBar from "../../components/SearchBar.jsx";

const HabitacionesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { rooms, totalItems, errorMessage, loading } = useRooms({
    page: currentPage,
    limit: itemsPerPage,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <div className="filter-wrapper">
        <SearchBar />
      </div>
      <div className="room-grid">
        {errorMessage && <p>{errorMessage}</p>}
        {loading && <p>Cargando habitaciones...</p>}
        {!errorMessage && !loading && rooms && rooms.length > 0 ? (
          rooms.map((room) => (
            <RoomCard
              key={room.uid || room._id || room.number}
              number={room.number}
              price={room.price}
              description={room.description}
              capacity={room.capacity}
              preView={room.preView}
              status={room.status}
            />
          ))
        ) : !errorMessage && !loading ? (
          <p>No hay habitaciones disponibles.</p>
        ) : null}
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

export default HabitacionesPage;
