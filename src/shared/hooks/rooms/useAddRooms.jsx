import { useState } from "react";
import { createRoom } from "@/services";

const useAddRooms = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addRoom = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await createRoom(formData);
            if (response.error) throw new Error(response.message);
            return response.room;
        } catch (err) {
            setError(err.message || "Ocurrió un error al crear la habitación");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { addRoom, loading, error };
};

export default useAddRooms;
