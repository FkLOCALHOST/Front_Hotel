import { useState, useEffect } from "react";
import { getRooms } from "../../../services/api.jsx";

const useRooms = ({ page = 1, limit = 10 } = {}) => {
  const [rooms, setRooms] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const response = await getRooms({ page, limit });
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
      }
      setLoading(false);
    };
    fetchRooms();
  }, [page, limit]);

  return { rooms, totalItems, errorMessage, loading };
};

export default useRooms;