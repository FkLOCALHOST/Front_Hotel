import { useState } from "react";
import { updateRoom } from "../../../services/api"


const useEditRooms = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const editRoom = async (id, data) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await updateRoom(id, data);
            if (response.error) {
                throw new Error(response.message);
            }
            setSuccess(true);
            return response;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { editRoom, loading, error, success };
}

export default useEditRooms;