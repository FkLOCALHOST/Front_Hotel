import React, { useState } from "react";
import { Navbar } from "../../components/navbar.jsx";
import FilterBar from "../../components/FilterBar.jsx";
import SimpleFooter from "../../components/footer.jsx";
import EventCard from "../../components/events/EventCard.jsx";
import useEvents from "../../shared/hooks/event/useGetEvent.jsx";
import Paginacion from "../../components/paginacion.jsx";

const EventDashboard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const itemsPerPage = 8;

    const { events, errorMessage, totalItems } = useEvents({
        page: currentPage,
        limit: itemsPerPage,
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
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
                    <FilterBar />
                </div>
            </div>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <div className="hotel-grid">
                {(events || []).map((event, idx) => (
                    <EventCard
                        key={event._id || `event-${idx}`}
                        name={event.name}
                        description={event.description}
                        price={event.price}
                        date={event.date}
                        place={event.place}
                        image={event.image}
                        type={event.type}
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
                        <ViewEvent event={selectedEvent} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventDashboard;
