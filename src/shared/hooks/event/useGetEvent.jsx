import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:3005/hotelManagerSystem/v1",
});

const useEvents = () => {
    const [events, setEvents] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get("/event/getEvents");
                setEvents(response.data.data || []);
                setErrorMessage("");
            } catch (error) {
                setErrorMessage("Error al obtener los eventos");
                console.error("Error al obtener los eventos:", error);
            }
        };

        fetchEvents();
    }, []);

    return {
        events,
        errorMessage,
    };
};

export default useEvents;
