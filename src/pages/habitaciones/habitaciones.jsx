import React, { useState } from "react";
import { Navbar } from "../../components/navbar.jsx";
import SimpleFooter from "../../components/footer.jsx";
import RoomCard from "../../components/rooms/RoomCard.jsx";
import useRooms from "../../shared/hooks/rooms/useRooms.jsx";
import Paginacion from "../../components/paginacion.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import { useNavigate } from "react-router-dom";

const HabitacionesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { rooms, totalItems, errorMessage, loading, refetch } = useRooms({
    page: currentPage,
    limit: itemsPerPage,
  });

  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCardClick = (roomId) => {
    navigate(`/habitaciones/${roomId}`);
  };

  const handleDelete = async (roomId) => {
    // Aquí podrías usar un hook como useDeleteRoom si lo tienes, o una llamada directa a la API
    if (window.confirm("¿Estás seguro de que deseas eliminar esta habitación?")) {
      try {
        // await deleteRoom(roomId); // Si tienes un hook o función para eliminar
        console.log("Eliminar habitación", roomId);
        refetch(); // Recarga las habitaciones luego de eliminar
      } catch (error) {
        console.error("Error al eliminar habitación:", error);
      }
    }
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
              id={room._id || room.uid}
              number={room.number}
              price={room.price}
              description={room.description}
              capacity={room.capacity}
              preView={room.preView}
              status={room.status}
              onClick={() => handleCardClick(room._id || room.uid)}
              onDelete={() => handleDelete(room._id || room.uid)}
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
