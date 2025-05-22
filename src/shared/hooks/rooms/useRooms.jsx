import { useState, useEffect } from "react";
import { getRooms } from "../../../services/api.jsx";

const useRooms = ({ page = 1, limit = 8, search = "" } = {}) => {
  const [rooms, setRooms] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const desde = (page - 1) * limit;
        const response = await getRooms({ desde, limit, search });

        if (response.data && Array.isArray(response.data.rooms)) {
          setRooms(response.data.rooms);
          setTotalItems(response.data.total || 0);
        } else {
          setRooms([]);
          setTotalItems(0);
        }
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Error al obtener las habitaciones");
        setRooms([]);
        setTotalItems(0);
        console.error("Error al obtener las habitaciones:", error);
      }
      setLoading(false);
    };
    fetchRooms();
  }, [page, limit, search]);

  return { rooms, totalItems, errorMessage, loading };
};
export default useRooms;
