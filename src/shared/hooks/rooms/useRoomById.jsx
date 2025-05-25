import { useEffect, useState } from "react";
import { getRoomById } from "../../../services/api";

const useRoomById = (roomId) => {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!roomId) return;
    setLoading(true);
    getRoomById(roomId)
      .then(res => {
        setRoom(res.data?.room || null); // Ajusta según la estructura de tu API
      })
      .finally(() => setLoading(false));
  }, [roomId]);

  return { room, loading };
};

export default useRoomById;