import { useState } from "react";
import { cancelReservation } from "../../../services/api";

const useCancelReservation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const cancel = async (uid) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const response = await cancelReservation(uid);

        if (response?.error) {
            setError(response.message);
        } else {
            setSuccess(true);
        }

        setLoading(false);
    };

    return { cancel, loading, error, success };
};

export default useCancelReservation;
