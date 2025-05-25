import { useEffect, useState } from "react";
import { searchEvent } from "../../../services/api.jsx";

const useSearchEvent = ({ page = 1, limit = 8, search = "" } = {}) => {
  const [events, setEvents] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search || search.trim() === "") {
      setEvents([]);
      setTotalItems(0);
      setErrorMessage("");
      setLoading(false);
      return;
    }

    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await searchEvent({ search: search, page, limit });
        if (response && response.data) {
          setEvents(response.data.events);
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
    fetchEvents();
  }, [page, limit, search]);

  return { events, totalItems, errorMessage, loading };
};

export default useSearchEvent;