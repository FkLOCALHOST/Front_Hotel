import { useEffect, useState } from "react";
import { getReservation } from "../../../services/api.jsx";


const useGetReservations = ({ page = 1, limit = 10, search = "" } = {}) => {
    const [reservations, setReservations] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchReservations = async () => {
            setLoading(true);
            try {
                const response = await getReservation({ page, limit, search });

                let data = response?.data?.reservations || [];

                setReservations(data);
                setTotalItems(response?.data?.total || data.length);
                setErrorMessage("");
            } catch (error) {
                setErrorMessage("Error al obtener las reservaciones");
                setReservations([]);
                setTotalItems(0);
            }
            setLoading(false);
        };

        fetchReservations();
    }, [page, limit, search]);
    return {
        reservations,
        totalItems,
        errorMessage,
        loading,
    };
};

export default useGetReservations;
