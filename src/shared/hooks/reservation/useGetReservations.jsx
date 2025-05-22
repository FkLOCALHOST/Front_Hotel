import {useState, useEffect, use} from 'react';
import {getReservations} from '../../../services/api.jsx'


const useGetReservations = ({page = 1, limit = 8} = {}) => {
    const [reservations, setReservations] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservations = async () => {
            setLoading(true);
            try{
                const desde = (page -1) * limit

                const response = await getReservations({desde, limit})
                if(response.data && Array.isArray(response.data.reservations)){
                    setReservations(response.data.reservations);
                    setTotalItems(response.data.total || 0)
                }else if(Array.isArray(response.data)){
                    setReservations(response.data);
                    setTotalItems(response.data.length || 0)
                }else{
                    setReservations([]);
                    setTotalItems(0);
                }

            }catch(error){
                setErrorMessage("Error al obtener las reservaciones")
                setReservations([]);
                setTotalItems(0);
                console.error("Error al obtener las reservaciones:", error);

            }
            setLoading(false);
        }
        fetchReservations();
    }, [page, limit]);
    return {
        reservations,
        totalItems,
        errorMessage,
        loading
    }
}

export default useGetReservations;

