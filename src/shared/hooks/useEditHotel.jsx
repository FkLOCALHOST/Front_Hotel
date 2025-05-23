import { useState } from "react";
import { updateHotel } from "../../services/api";

const useEditHotel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editHotel = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      // Asegúrate de que el id y data sean correctos
      const result = await updateHotel(id, data);
      setLoading(false);
      if (result.error || result.data?.error) {
        setError(result.message || result.data?.message || "Error al editar hotel");
        return null;
      }
      return result.data || result;
    } catch (e) {
      setLoading(false);
      setError(e.message || "Error al editar hotel");
      return null;
    }
  };

  return { editHotel, loading, error };
};

export default useEditHotel;
