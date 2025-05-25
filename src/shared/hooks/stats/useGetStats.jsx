import { useEffect, useState, useCallback } from "react";
import { getReports } from "../../../services/api";

const useGetStats = () => {
    const [hotelStats, setHotelStats] = useState(null);
    const [roomStats, setRoomStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStats = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getReports();

            if (res.error) {
                setError(res.message || "Error al obtener estadísticas");
                setHotelStats(null);
                setRoomStats(null);
            } else {
                const hotelData = res.data?.hotel;
                console.log("hotelData", hotelData);
                console.log("roomData", res.data?.room);
                const roomData = res.data?.room;

                if (
                    !hotelData || typeof hotelData !== "object" ||
                    !roomData || typeof roomData !== "object"
                ) {
                    setError("Respuesta inesperada: hotel o room no son objetos válidos");
                    setHotelStats(null);
                    setRoomStats(null);
                } else {
                    setHotelStats(hotelData);
                    setRoomStats(roomData);
                    setError(null);
                }
            }
        } catch (err) {
            setError("Error inesperado al obtener estadísticas");
            setHotelStats(null);
            setRoomStats(null);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return { hotelStats, roomStats, loading, error, refetch: fetchStats };
};

export default useGetStats;
