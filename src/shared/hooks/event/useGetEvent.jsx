import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3005/hotelManagerSystem/v1",
});

const useEvents = ({ page = 1, limit = 8, search = "" } = {}) => {
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/event/getEvents`);
        const data = response.data;

        let eventos = Array.isArray(data.events)
          ? data.events
          : Array.isArray(data.data)
          ? data.data
          : [];

        if (search) {
          const searchLower = search.toLowerCase();
          eventos = eventos.filter(
            (ev) =>
              (ev.name && ev.name.toLowerCase().includes(searchLower)) ||
              (ev.description && ev.description.toLowerCase().includes(searchLower))
          );
        }

        const total = eventos.length;
        const start = (page - 1) * limit;
        const end = start + limit;
        const pagedEvents = eventos.slice(start, end);

        setEvents(pagedEvents);
        setTotalItems(total);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Error al obtener los eventos");
        setEvents([]);
        setTotalItems(0);
      }
      setLoading(false);
    };

    fetchEvents();
  }, [page, limit, search]);

  return {
    events,
    errorMessage,
    totalItems,
    loading,
  };
};

export default useEvents;
