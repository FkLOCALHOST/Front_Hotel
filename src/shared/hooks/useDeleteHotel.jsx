import { useState } from "react";
import { deleteHotel } from "../../services/api.jsx";

const useDeleteHotel = (params = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const removeHotel = async (uid) => {
    setLoading(true);
    setError(null);
    try {
      const res = await deleteHotel(uid);
      if (res.error) {
        setError(res.message || "Error al eliminar el hotel");
        return false;
      }
      return true;  
    } catch (err) {
      setError("Error al eliminar el hotel");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { removeHotel, loading, error };
};

export default useDeleteHotel;
