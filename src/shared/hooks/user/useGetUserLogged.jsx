import { useEffect, useState } from "react";
import { getUserLogged} from "../../../services/api"

const useGetUserLogged = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const res = await getUserLogged();

                if (res.data?.success && res.data.user) {
                    setUser(res.data.user);
                    setError(null);
                } else {
                    setUser(null);
                    setError("No se pudo obtener el usuario");
                }
            } catch (err) {
                setUser(null);
                setError("Error al obtener usuario");
                console.error(err);
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    return { user, loading, error };
};

export default useGetUserLogged;
