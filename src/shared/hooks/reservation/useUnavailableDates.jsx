import { useState, useEffect } from "react";
import { getUnavalilableDates } from "@/services";

const useUnavailableDates = (roomId) => {
    const [unavailableDates, setUnavailableDates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUnavailableDates = async () => {
            if (!roomId) return;

            setLoading(true);
            setError(null);

            try {
                const response = await getUnavalilableDates(roomId);

                if (response.error) {
                    throw new Error(response.message || "Error al obtener las fechas no disponibles");
                }

                setUnavailableDates(response.data.unavailableDates || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUnavailableDates();
    }, [roomId]);

    return { unavailableDates, loading, error };
};

export default useUnavailableDates;
