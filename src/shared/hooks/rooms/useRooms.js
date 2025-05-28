import { useState } from "react";
import { getRooms } from "../../../services/api"; // Ajusta la ruta si es necesario

const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRooms();
      setRooms(data);
    } catch (err) {
      setError(err.message || "Error al obtener habitaciones");
    } finally {
      setLoading(false);
    }
  };

  return { fetchRooms, rooms, loading, error };
};

export default useRooms;