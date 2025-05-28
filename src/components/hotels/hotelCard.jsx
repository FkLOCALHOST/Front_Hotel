import PropTypes from "prop-types";
import React, { useState, useRef } from "react";
import "../../assets/styles/hotel/hotelCard.css";
import { Star, Edit, Trash2 } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import useDeleteHotel from "../../shared/hooks/useDeleteHotel";
import { addFavHotel, removeFavHotel } from "../../services/api";
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
  useToast,
} from "@chakra-ui/react";

const HotelCard = ({ hotelName, department, starts, imageUrl, onClick, onEdit, onDelete, id, showLike = true }) => {
  const userData = JSON.parse(localStorage.getItem("User"));
  const favHotels = userData?.userDetails?.favHotel || [];
  const isFavorite = favHotels.includes(id);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const loginAlertCancelRef = useRef();
  

  const [liked, setLiked] = useState(isFavorite);
  const { removeHotel, loading } = useDeleteHotel();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

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
  }

  const toggleLike = async (e) => {
    e.stopPropagation();
    if (!userData?.userDetails?._id) {
      setShowLoginAlert(true);
      return;
    }
    const uid = userData.userDetails._id;
    if (!liked) {
      const response = await addFavHotel(uid, id);
      if (response.data && response.data.success) {
        setLiked(true);
        const favs = userData.userDetails.favHotel || [];
        userData.userDetails.favHotel = [...favs, id];
        localStorage.setItem("User", JSON.stringify(userData));
      } else {
        alert("No se pudo guardar como favorito.");
      }
    } else {
      const response = await removeFavHotel(uid, id);
    if (response.data && response.data.success) {
      setLiked(false);
      const favs = userData.userDetails.favHotel || [];
      userData.userDetails.favHotel = favs.filter(favId => favId !== id);
      localStorage.setItem("User", JSON.stringify(userData));
    } else {
      alert("No se pudo quitar de favoritos.");
    }
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (loading) return;
    onOpen();
  };

  const confirmDelete = async () => {
    const ok = await removeHotel(id);
    if (ok && ok.data && ok.data.success) {
      toast({
        title: "Hotel eliminado exitosamente",
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
        title: ok?.data?.message || "No se pudo eliminar el hotel",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top",
        containerStyle: { color: "#fff" },
      });
      onClose();
    }
  };

  return (
    <div className="hotel-card" onClick={onClick} style={{ cursor: "pointer", position: "relative" }}>
      {isAdmin && (
        <div className="hotel-card-actions">
          <Edit
            size={35}
            className="hotel-card-action-icon"
            title="Editar"
            onClick={e => {
              e.stopPropagation();
              navigate("/hoteles/registrar-hotel", {
                state: {
                  editMode: true,
                  hotelId: id
                }
              });
            }}
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
        src={imageUrl}
        alt={`Imagen de ${hotelName}`}
        className="hotel-image"
      />
      {showLike !== false && (
        <span
          className={`like-button${liked ? " liked" : ""}`}
          onClick={toggleLike}
          title={liked ? "Quitar de favoritos" : "Guardar como favorito"}
          style={{
            position: "absolute",
            top: "300px",
            right: "16px",
            fontSize: "1.6rem",
            cursor: "pointer",
            transition: "color 0.2s",
            zIndex: 2
          }}
        >
          <FaHeart />
        </span>
      )}
      <div className="hotel-info">
        <h2 className="hotel-name">{hotelName}</h2>
        <p className="hotel-detail">
          {[...Array(starts)].map((_, i) => (
            <Star
              key={i}
              size={16}
              style={{ marginRight: "2px", color: "#FFD700", verticalAlign: "middle" }}
              fill="#FFD700"
            />
          ))}
          <span style={{ marginLeft: "6px" }}>{starts} estrellas</span>
        </p>
        <p className="hotel-detail">
          <span style={{ fontWeight: "bold" }}>Departamento:</span> {department}
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
              Eliminar hotel
            </AlertDialogHeader>
            <AlertDialogBody>
              ¿Seguro que deseas eliminar este hotel?
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

      <AlertDialog
        isOpen={showLoginAlert}
        leastDestructiveRef={loginAlertCancelRef}
        onClose={() => setShowLoginAlert(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="#232323" color="#fff">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Iniciar sesión requerida
            </AlertDialogHeader>
            <AlertDialogBody>
              Debes iniciar sesión para guardar hoteles como favoritos.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={loginAlertCancelRef} onClick={() => setShowLoginAlert(false)} bg="#333" color="#fff" _hover={{ bg: "#444" }}>
                Cerrar
              </Button>
              <Button colorScheme="teal" ml={3} onClick={() => { setShowLoginAlert(false); navigate("/auth/login"); }}>
                Iniciar sesión
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

HotelCard.propTypes = {
  hotelName: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  starts: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  onClick: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onDeleted: PropTypes.func,
  showLike: PropTypes.bool,
};

export default HotelCard;