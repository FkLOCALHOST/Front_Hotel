import { useState } from "react";
import { getAmenities } from "@/services";
const useGetAmenities = () => {
    const [amenities, setAmenities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAmenities = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getAmenities();

            if (response.error) throw new Error(response.message);

            const amenitiesList = response.data?.amenity;

            if (!Array.isArray(amenitiesList)) {
                throw new Error("Respuesta inesperada: 'amenity' no es un arreglo");
            }

            setAmenities(amenitiesList);
            return amenitiesList;
        } catch (err) {
            setError(err.message || "Ocurrió un error al obtener las amenidades");
            setAmenities([]);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { fetchAmenities, amenities, loading, error };
};

export default useGetAmenities;
