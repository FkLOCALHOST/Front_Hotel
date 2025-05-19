import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3005/hotelManagerSystem/v1/hotel",
});

const useHotels = ({ page = 1, limit = 8 } = {}) => {
  const [hotels, setHotels] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const desde = (page - 1) * limit;
        const response = await api.get(`/getHotels?limite=${limit}&desde=${desde}`);
        setHotels(response.data.hotels);
        setTotalItems(response.data.total);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Error al obtener los hoteles");
        console.error("Error al obtener los hoteles:", error);
      }
    };
    fetchHotels();
  }, [page, limit]);

  return {
    hotels,
    totalItems,
    errorMessage,
  };
};

export default useHotels;
