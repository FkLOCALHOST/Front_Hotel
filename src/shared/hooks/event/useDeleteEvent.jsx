import { useState } from "react";
import { deleteEvent } from "../../../services/api.jsx";

const useDeleteEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const removeEvent = async (eid) => {
    setLoading(true);
    setError(null);
    try {
      const res = await deleteEvent(eid);
      if (res.error) {
        setError(res.message || "Error al eliminar el evento");
        return false;
      }
      return true;
    } catch (err) {
      setError("Error al eliminar el evento");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { removeEvent, loading, error };
};

export default useDeleteEvent;
