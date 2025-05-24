import { useEffect, useState } from "react";
import { searchHotelsService } from "../../services/api.jsx";

const useSearchHotels = ({ page = 1, limit = 8, search = "" } = {}) => {
  const [hotels, setHotels] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!search || search.trim() === "") {
      setHotels([]);
      setTotalItems(0);
      setErrorMessage("");
      setLoading(false);
      return;
    }

    const fetchHotels = async () => {
      setLoading(true);
      try {
        const response = await searchHotelsService({ page, limit, search });
        if (response && response.data) {
          setHotels(response.data.hotels);
          setTotalItems(response.data.total);
          setErrorMessage("");
        } else {
          setErrorMessage(response.message || "Error en la búsqueda");
        }
      } catch (error) {
        setErrorMessage(error.message || "Error en la búsqueda");
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, [page, limit, search]);

  return { hotels, totalItems, errorMessage, loading };
};

export default useSearchHotels;
