import { useState, useEffect } from "react";
import { getReservationById } from "../../../services/api"; // Ajusta la ruta si es necesario

const useReservationById = (uid) => {
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uid) return;

    const fetchReservation = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getReservationById(uid);
        setReservation(data);
      } catch (err) {
        setError(err?.response?.data?.message || "Error al obtener la reservación");
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [uid]);

  return { reservation, loading, error };
};

export default useReservationById;