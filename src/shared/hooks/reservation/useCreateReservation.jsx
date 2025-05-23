import { useState } from "react";
import { createReservation } from "../../../services/api";

const useCreateReservation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addReservation = async (reservationData) => {
        setLoading(true);
        setError(null);

        try {
            console.log("Reservation Data:");
            Object.entries(reservationData).forEach(([key, value]) => {
                console.log(`${key}: ${value}`);
            });

            const response = await createReservation(reservationData);

            if (response.error) {
                throw new Error(response.message);
            }

            return response.reservation || response.data || response;
        } catch (err) {
            setError(err.message || "Ocurrió un error al crear la reservación");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { addReservation, loading, error };
};

export default useCreateReservation;
