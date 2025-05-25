import { useState } from "react";
import { deleteRoom } from "../../../services/api";

const useDeleteRooms = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const removeRoom = async (uid) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await deleteRoom(uid);
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

    return { removeRoom, loading, error, success };
}

export default useDeleteRooms;