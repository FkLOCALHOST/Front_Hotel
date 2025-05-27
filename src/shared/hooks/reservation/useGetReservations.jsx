import { useEffect, useState } from "react";
import { getReservation } from "../../../services/api.jsx";

const useGetReservations = ({ page = 1, limit = 10 } = {}) => {
    const [reservations, setReservations] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchReservations = async () => {
            setLoading(true);
            try {
                const response = await getReservation({ page, limit });

                if (response?.data?.reservations && Array.isArray(response.data.reservations)) {
                    setReservations(response.data.reservations);
                    setTotalItems(response.data.total || response.data.reservations.length);
                    setErrorMessage("");
                } else {
                    setReservations([]);
                    setTotalItems(0);
                    setErrorMessage("No se encontraron reservaciones");
                }
            } catch (error) {
                console.error("Error al obtener las reservaciones:", error);
                setErrorMessage("Error al obtener las reservaciones");
                setReservations([]);
                setTotalItems(0);
            }
            setLoading(false);
        };

        fetchReservations();
    }, [page, limit]);

    return {
        reservations,
        totalItems,
        errorMessage,
        loading,
    };
};

export default useGetReservations;
