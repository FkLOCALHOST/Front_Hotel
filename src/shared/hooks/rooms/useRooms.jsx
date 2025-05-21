import { useState, useEffect } from "react";
import { getRooms } from "../../../services/api.jsx";

const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        console.log("Llamando a getRooms...");
        const response = await getRooms();
        console.log("Respuesta de getRooms:", response);
        setRooms(response.data || []);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Error al obtener las habitaciones");
        console.error("Error al obtener las habitaciones:", error);
      }
    };
    fetchRooms();
  }, []);

  return { rooms, errorMessage };
};
export default useRooms;
