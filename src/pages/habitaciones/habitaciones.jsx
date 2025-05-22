import React, { useState } from "react";
import { Navbar } from "../../components/navbar.jsx";
import SimpleFooter from "../../components/footer.jsx";
import RoomCard from "../../components/rooms/RoomCard.jsx";
import useRooms from "../../shared/hooks/rooms/useRooms.jsx";
import Paginacion from "../../components/paginacion.jsx";
import SearchBar from "../../components/SearchBar.jsx";

const itemsPerPage = 10;

const HabitacionesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { rooms, totalItems, errorMessage, loading } = useRooms({
    page: currentPage,
    limit: itemsPerPage,
    searchTerm, // ✅ importante
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reiniciar la paginación al hacer búsqueda
  };

  return (
    <>
      <Navbar />
      <br />
      <SearchBar onSearch={handleSearch} />
      <div className="room-grid">
        {errorMessage && <p>{errorMessage}</p>}
        {loading && <p>Cargando habitaciones...</p>}
        {!loading && !errorMessage && rooms.length === 0 && (
          <p>No hay habitaciones.</p>
        )}
        {rooms.map((room) => (
          <RoomCard
            key={room._id}
            number={room.number}
            price={room.price}
            description={room.description}
            capacity={room.capacity}
            preView={room.preView}
            status={room.status}
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
    </>
  );
};

export default HabitacionesPage;
