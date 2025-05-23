import { useState, useEffect } from "react";
import { getHotelById } from "../../services/api";

const useHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await getHotelById();
        if (!response.error) {
          setHotels(response.data.hotels || []);
        } else {
          setErrorMessage("Error al cargar el hotel.");
        }
      } catch (error) {
        setErrorMessage("Error al conectar con el servidor.");
        console.error("Error fetching hotels:", error);
      }
    };
    fetchHotels();
  }, []);

  return {
    hotels,
    errorMessage,
  };
};

export default useHotels;