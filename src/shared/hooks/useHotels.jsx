import { useState, useEffect } from "react";
import { getHotels } from "../../services/api";

const useHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [orderBy, setOrderBy] = useState("highestStars");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await getHotels();
        if (!response.error) {
          setHotels(response.data.hotels || []);
        }
      } catch (error) {
        setErrorMessage("Error al conectar con el servidor.");
      }
    };
    fetchHotels();
  }, []);

  const toggleOrder = () => {
    setOrderBy((prev) =>
      prev === "highestStars" ? "lowestStars" : "highestStars"
    );
  };

  const sortedHotels = hotels.slice().sort((a, b) => {
    const getStars = (hotel) =>
      typeof hotel.category === "string"
        ? parseInt(hotel.category)
        : hotel.category || 0;
    if (orderBy === "highestStars") {
      return getStars(b) - getStars(a);
    } else {
      return getStars(a) - getStars(b);
    }
  });

  return {
    hotels: sortedHotels,
    errorMessage,
    toggleOrder,
    orderBy,
  };
};

export default useHotels;
