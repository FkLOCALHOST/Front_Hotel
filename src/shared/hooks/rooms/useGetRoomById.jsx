import { useState, useEffect } from "react";
import { getRoomById } from "@/services";

const useGetRoomById = (uid) => {
    const [room, setRoom] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await getRoomById(uid);
                if (!response.error) {
                    setRoom(response.data.room || null);
                } else {
                    setErrorMessage("Error al cargar la habitación.");
                }
            } catch (error) {
                setErrorMessage("Error al conectar con el servidor.");
                console.error("Error fetching room:", error);
            } finally {
                setLoading(false);
            }
        };

        if (uid) {
            fetchRoom();
        }
    }, [uid]);

    return {
        room,
        errorMessage,
        loading,
    };
};

export default useGetRoomById;
