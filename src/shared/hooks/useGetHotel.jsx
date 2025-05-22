import { useEffect, useState } from "react";
import { getHotels } from "../../services/api";

const useGetHotel = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotels = async () => {
            setLoading(true);
            try {
                const res = await getHotels();

                const hotelesApi = res.data?.hotels || [];

                if (!Array.isArray(hotelesApi)) {
                    setError("Respuesta inesperada: hotels no es un arreglo");
                    setHotels([]);
                } else {
                    setHotels(hotelesApi);
                    setError(null);
                }
            } catch (err) {
                setError("Error al obtener hoteles");
                setHotels([]);
                console.error(err);
            }
            setLoading(false);
        };

        fetchHotels();
    }, []);

    return { hotels, loading, error };
};

export default useGetHotel;
