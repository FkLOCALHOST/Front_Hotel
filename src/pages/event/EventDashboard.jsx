import React, { useState } from "react";
import { Navbar } from "../../components/navbar.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import SimpleFooter from "../../components/footer.jsx";
import EventCard from "../../components/events/EventCard.jsx";
import useEvents from "../../shared/hooks/event/useGetEvent.jsx";
import Paginacion from "../../components/paginacion.jsx";

const EventDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;

  const { events, errorMessage, totalItems, loading } = useEvents({
    page: currentPage,
    limit: itemsPerPage,
    search: searchTerm,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCardClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      <Navbar />
      <div className="hotel-header">
        <br />
        <br />
        <div className="filter-wrapper">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {loading && <p>Cargando eventos...</p>}

      <div className="hotel-grid">
        {events.map((event) => (
          <EventCard
            key={event.uid || event._id}
            uid={event.uid || event._id}
            name={event.name}
            description={event.description}
            price={event.price}
            date={event.date}
            place={event.place}
            image={event.image}
            type={event.type}
            status={event.status}
            createdAt={event.createdAt}
            updatedAt={event.updatedAt}
            onClick={() => handleCardClick(event)}
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

      {selectedEvent && (
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
                background: "transparent",
                border: "none",
                fontSize: 64,
                cursor: "pointer",
              }}
              onClick={handleCloseModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDashboard;
