import { useState } from "react";
import { createEvent } from "../../../services/api";

const useAddEvent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addEvent = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", Number(data.price)); 
            formData.append("date", data.date);
            formData.append("place", data.place);
            formData.append("type", data.type || "PRIVATE");
            if (data.hotel) formData.append("hotel", data.hotel);
            if (data.room) formData.append("room", data.room);
            if (data.image) formData.append("image", data.image);

            const response = await createEvent(formData);
            if (response.error) throw new Error(response.message);
            return response.data;
        } catch (err) {
            setError(err.message || "Ocurrió un error al crear el evento");
            return null;
        } finally {
            setLoading(false);
        }
    };


    return { addEvent, loading, error };
};

export default useAddEvent;
