import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbar.jsx";
import SimpleFooter from "../../components/footer.jsx";
import ReservationCard from "../../components/reservations/ReservationCard.jsx";
import useGetReservations from "../../shared/hooks/reservation/useGetReservations.jsx";
import Paginacion from "../../components/paginacion.jsx";
import SearchBar from "../../components/SearchBar.jsx";

const itemsPerPage = 5;

const ReservacionesPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    const { reservations, totalItems, errorMessage, loading } = useGetReservations({
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

    const handleEdit = (reservation) => {
        navigate("/reservaciones/create", {
            state: {
                editMode: true,
                reservationId: reservation.uid,
            },
        });
    };

    return (
        <div>
            <Navbar />
            <br />
            <br />
            <div className="filter-wrapper">
                <SearchBar onSearch={handleSearch} />
            </div>
            <div className="reservation-grid">
                {errorMessage && <p>{errorMessage}</p>}
                {loading && <p>Cargando reservaciones...</p>}
                {!errorMessage && !loading && reservations && reservations.length > 0 ? (
                    reservations.map((reservation) => (
                        <ReservationCard
                            key={reservation.uid}
                            reservation={reservation}
                            onClick={() => console.log(`Reservación seleccionada: ${reservation.uid}`)}
                            onEdit={handleEdit}
                        />
                    ))
                ) : !errorMessage && !loading ? (
                    <p>No hay reservaciones disponibles.</p>
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

export default ReservacionesPage;
