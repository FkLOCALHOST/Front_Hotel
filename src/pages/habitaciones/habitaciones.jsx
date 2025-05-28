import React, { useState, useRef } from "react";
import { Navbar } from "../../components/navbar.jsx";
import SimpleFooter from "../../components/footer.jsx";
import RoomCard from "../../components/rooms/RoomCard.jsx";
import useRooms from "../../shared/hooks/rooms/useRooms.jsx";
import useSearchRooms from "../../shared/hooks/rooms/useSearchRooms.jsx";
import Paginacion from "../../components/paginacion.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import BedroomFilter from "../../components/rooms/BedroomFilter.jsx"


const HabitacionesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    capacity: "",
    maxPrice: ""
  });
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const [roomToDelete, setRoomToDelete] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const isSearch = searchTerm.trim() !== "" || 
                  filters.capacity || 
                  filters.maxPrice;

  const defaultResult = useRooms({
    page: currentPage,
    limit: itemsPerPage,
  });

  const searchResult = useSearchRooms({
    page: currentPage,
    limit: itemsPerPage,
    search: searchTerm,
    capacity: filters.capacity,
    maxPrice: filters.maxPrice
  });

  const {
    rooms,
    totalItems,
    errorMessage,
    loading,
    refetch,
  } = isSearch ? searchResult : defaultResult;

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

  const handleCardClick = (roomId) => {
    navigate(`/habitaciones/${roomId}`);
  };

  const handleDelete = (roomId) => {
    setRoomToDelete(roomId);
    onOpen();
  };

  const confirmDelete = async () => {
    try {
      console.log("Eliminar habitación", roomToDelete);
      refetch();
    } catch (error) {
      console.error("Error al eliminar habitación:", error);
    } finally {
      onClose();
      setRoomToDelete(null);
    }
  };

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <div className="filter-wrapper">
        <SearchBar onSearch={handleSearch} />
        <BedroomFilter onFilter={handleFilter} />
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

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="#232323" color="#fff">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eliminar habitación
            </AlertDialogHeader>
            <AlertDialogBody>
              ¿Estás seguro de que deseas eliminar esta habitación?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} bg="#333" color="#fff" _hover={{ bg: "#444" }}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default HabitacionesPage;
