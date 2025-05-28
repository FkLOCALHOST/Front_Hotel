import { useState } from "react";
import { updateReservation } from "../../../services/api";

const useEditReservation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const editReservation = async (id, data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await updateReservation(id, data);
      if (response?.error) {
        throw new Error(response.message || "Error al editar la reservación");
      }
      setSuccess(true);
      return response;
    } catch (err) {
      setError(err.message || "Error al editar la reservación");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { editReservation, loading, error, success };
};

export default useEditReservation;
