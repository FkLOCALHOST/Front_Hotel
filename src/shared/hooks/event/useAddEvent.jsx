import { useState } from "react";
import { createEvent } from "../../../services/api";

const useAddEvent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addEvent = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            console.log("FormData contents:");
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }

            const response = await createEvent(formData);
            if (response.error) throw new Error(response.message);
            return response.data;
        } catch (err) {
            setError(err.message || "Ocurrió un error al crear el evento");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { addEvent, loading, error };
};

export default useAddEvent;
