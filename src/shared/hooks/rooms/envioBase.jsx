import { useState } from "react";
import { createRoom } from "@/services";

const useAddRooms = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addRoom = async (roomData) => {
        setLoading(true);
        setError(null);

        try {
            console.log("Room Data:");
            Object.entries(roomData).forEach(([key, value]) => {
                console.log(`${key}: ${value}`);
            });

            const response = await createRoom(roomData);

            if (response.error) {
                throw new Error(response.message);
            }

            return response.room || response.data || response;
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
