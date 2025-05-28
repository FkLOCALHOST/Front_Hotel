import React, { useState } from "react";
import { Navbar } from "../../components/navbar.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import SimpleFooter from "../../components/footer.jsx";
import EventCard from "../../components/events/EventCard.jsx";
import EventFilter from "../../components/events/EventFilter.jsx";
import ViewEvent from "../../components/events/viewEvent.jsx";
import useEvents from "../../shared/hooks/event/useGetEvent.jsx";
import useSearchEvent from "../../shared/hooks/event/useSearchEvent.jsx";
import Paginacion from "../../components/paginacion.jsx";

const EventDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    place: "",
    maxPrice: "",
    date: ""
  });
  const itemsPerPage = 8;

  const isSearch = searchTerm.trim() !== "" || 
                  filters.place || 
                  filters.maxPrice || 
                  filters.date;

  const defaultResult = useEvents({
    page: currentPage,
    limit: itemsPerPage,
  });

  const searchResult = useSearchEvent({
    page: currentPage,
    limit: itemsPerPage,
    search: searchTerm,
    place: filters.place,
    maxPrice: filters.maxPrice,
    date: filters.date
  });

  const { events, totalItems, errorMessage, loading } = isSearch 
    ? searchResult 
    : defaultResult;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleFilter = (filterValues) => {
    setFilters(filterValues);
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
      <br />
      <br />
      <div className="hotel-header">
        <div className="filter-wrapper">
          <SearchBar onSearch={handleSearch} />
          <EventFilter onFilter={handleFilter} />
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

      <SimpleFooter />      {selectedEvent && (
        <div className="hotel-modal-overlay" onClick={handleCloseModal}>
          <button className="hotel-modal-close" onClick={handleCloseModal}>
            &times;
          </button>
          <div
            className="hotel-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <ViewEvent
              name={selectedEvent.name}
              description={selectedEvent.description}
              price={selectedEvent.price}
              date={selectedEvent.date}
              place={selectedEvent.place}
              image={selectedEvent.image}
              type={selectedEvent.type}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDashboard;
