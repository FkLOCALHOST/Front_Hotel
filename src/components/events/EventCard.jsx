import PropTypes from "prop-types";
import React, { useRef } from "react";
import { Edit, Trash2 } from "lucide-react";
import "../../assets/styles/hotel/hotelCard.css";
import { useNavigate } from "react-router-dom";
import useDeleteEvent from "../../shared/hooks/event/useDeleteEvent";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

const EventCard = ({
  uid,
  name,
  description,
  price,
  date,
  place,
  image,
  type,
  onClick,
  ...rest
}) => {

  const {
    status,
    createdAt,
    updatedAt,
    ...domSafeRest
  } = rest;
  

  let isAdmin = false;
  try {
    const userStr = localStorage.getItem("User");
    if (userStr) {
      const user = JSON.parse(userStr);
      const role = user.userDetails?.role;
      isAdmin = role === "ADMIN_ROLE";
    }
  } catch (e) {
    isAdmin = false;
    console.log("Error Parsing User from Local Storage", e)
  }

  const navigate = useNavigate();
  const { removeEvent, loading } = useDeleteEvent();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate("/eventos/registrar-evento", {
      state: {
        editMode: true,
        eventId: uid,
        // Pasa todos los datos para prellenar el formulario
        name,
        description,
        price,
        date,
        place,
        image,
        type,
      },
    });
  };

const handleDelete = async (e) => {
    e.stopPropagation();
    if (loading) return;
    onOpen();
  };

  const confirmDelete = async () => {
    const ok = await removeEvent(uid);
    if (ok) {
      toast({
        title: "Evento eliminado exitosamente",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
        containerStyle: { color: "#fff" },
      });
      onClose();
      setTimeout(() => window.location.reload(), 1200);
    } else {
      toast({
        title: "No se pudo eliminar el evento",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top",
        containerStyle: { color: "#fff" },
      });
      onClose();
    }
  };

  const handleCardClick = () => {
    if (onClick) onClick({ 
      uid, name, description, price, date, place, image, type 
    });
  };

  return (
    <div
      className="hotel-card"
      onClick={handleCardClick}
      style={{ cursor: "pointer", position: "relative" }}
      {...domSafeRest}
    >
      {isAdmin && (
        <div className="hotel-card-actions">
          <Edit
            size={40}
            className="hotel-card-action-icon"
            title="Editar"
            onClick={handleEdit}
          />
          <Trash2
            size={40}
            className="hotel-card-action-icon"
            title="Eliminar"
            onClick={handleDelete}
          />
        </div>
      )}
      <img
        src={image || "https://via.placeholder.com/300x180?text=Sin+Imagen"}
        alt={`Imagen de ${name}`}
        className="hotel-image"
      />
      <div className="hotel-info">
        <h2 className="hotel-name">{name}</h2>
        <p className="hotel-detail">
          <strong>Tipo:</strong>&nbsp;{type === "PUBLIC" ? "Público" : "Privado"}
        </p>
        <p className="hotel-detail">
          <strong>Descripción:</strong>&nbsp;{description}
        </p>
        <p className="hotel-detail">
          <strong>Lugar:</strong>&nbsp;{place}
        </p>
        <p className="hotel-detail">
          <strong>Fecha:</strong>&nbsp;{date ? date.slice(0, 10) : ""}
        </p>
        <p className="hotel-detail">
          <strong>Precio:</strong>&nbsp;Q{price?.toFixed ? price.toFixed(2) : price}
        </p>
      </div>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="#232323" color="#fff">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eliminar evento
            </AlertDialogHeader>
            <AlertDialogBody>
              ¿Seguro que deseas eliminar este evento?
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

EventCard.propTypes = {
  uid: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  image: PropTypes.string,
  type: PropTypes.oneOf(["PUBLIC", "PRIVATE"]),
  onClick: PropTypes.func,
};

export default EventCard;