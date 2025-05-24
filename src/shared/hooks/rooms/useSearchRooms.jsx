import { useEffect, useState } from "react";
import { searchRooms } from "../../../services/api.jsx";

const useSearchRooms = ({ page = 1, limit = 10, search = "" } = {}) => {
  const [rooms, setRooms] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!search || search.trim() === "") {
      setRooms([]);
      setTotalItems(0);
      setErrorMessage("");
      setLoading(false);
      return;
    }

    const fetchRooms = async () => {
      setLoading(true);
      try {
        const response = await searchRooms({ search: search, page, limit });
        if (response && response.data) {
          setRooms(response.data.rooms);
          setTotalItems(response.data.total);
          setErrorMessage("");
        } else {
          setErrorMessage(response.message || "Error en la búsqueda");
        }
      } catch (error) {
        setErrorMessage(error.message || "Error en la búsqueda");
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [page, limit, search]);

  return { rooms, totalItems, errorMessage, loading };
};

export default useSearchRooms;