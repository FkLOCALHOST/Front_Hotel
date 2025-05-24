import { useEffect, useState } from "react";
import { getHotelById } from "../../services/api";

const useHotelById = (hotelId) => {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hotelId) return;
    setLoading(true);
    getHotelById(hotelId)
      .then(res => {
        setHotel(res.data?.hotel || null); 
      })
      .finally(() => setLoading(false));
  }, [hotelId]);

  return { hotel, loading };
};

export default useHotelById;
