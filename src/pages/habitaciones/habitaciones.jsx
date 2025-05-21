import React from "react";
import { Navbar } from "../../components/navbar.jsx";
import SimpleFooter from "../../components/footer.jsx";
import RoomCard from "../../components/rooms/RoomCard.jsx";
import useRooms from "../../shared/hooks/rooms/useRooms.jsx";

const HabitacionesPage = () => {
  const { rooms, errorMessage } = useRooms();

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center", minHeight: "60vh" }}>
        {errorMessage && <p>{errorMessage}</p>}
        {!errorMessage && rooms && rooms.length > 0 ? (
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
        ) : !errorMessage ? (
          <p>No hay habitaciones disponibles.</p>
        ) : null}
      </div>
      <SimpleFooter />
    </div>
  );
};

export default HabitacionesPage;
