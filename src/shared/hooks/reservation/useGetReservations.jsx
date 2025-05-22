import { useEffect, useState } from "react";
import { getReservation } from "../../../services/api.jsx";

const useGetReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await getReservation();

                if (response?.data?.reservations) {
                    setReservations(response.data.reservations);
                    setTotalItems(response.data.total || response.data.reservations.length);
                    setErrorMessage("");
                } else {
                    setReservations([]);
                    setTotalItems(0);
                    setErrorMessage("No se encontraron reservaciones");
                }
            } catch (error) {
                setErrorMessage("Error al obtener las reservaciones");
                console.error("Error al obtener las reservaciones:", error);
                setReservations([]);
                setTotalItems(0);
            }
        };

        fetchReservations();
    }, []);

    return {
        reservations,
        totalItems,
        errorMessage,
    };
};

export default useGetReservations;
