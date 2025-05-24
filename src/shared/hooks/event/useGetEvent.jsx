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
                const params = { page, limit };
                if (search) params.search = search;
                const response = await api.get("/event/getEvents", { params });
                setEvents(response.data.data || []);
                setTotalItems(response.data.totalItems || (response.data.data ? response.data.data.length : 0));
                setErrorMessage("");
            } catch (error) {
                setErrorMessage("Error al obtener los eventos");
                setEvents([]);
                setTotalItems(0);
                console.error("Error al obtener los eventos:", error);
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
