import { useEffect, useState } from "react";
import { getEventById } from "../../../services/api";

const useEventById = (eventId) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!eventId) return;
    setLoading(true);
    getEventById(eventId)
      .then(res => {
        setEvent(res.data?.event || null);
      })
      .finally(() => setLoading(false));
  }, [eventId]);

  return { event, loading };
};

export default useEventById;