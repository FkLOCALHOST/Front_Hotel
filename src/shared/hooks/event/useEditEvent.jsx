import { useState } from "react";
import { updateEvent } from "../../../services/api.jsx";

const useEditEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editEvent = async (eid, data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateEvent(eid, data);
      setLoading(false);
      if (result.error || result.data?.error) {
        setError(result.message || result.data?.message || "Error al editar evento");
        return null;
      }
      return result.data || result;
    } catch (e) {
      setLoading(false);
      setError(e.message || "Error al editar evento");
      return null;
    }
  };

  return { editEvent, loading, error };
};

export default useEditEvent;
