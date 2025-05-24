import {useState} from 'react';
import { updateUser} from "../../../services/api"

const useUpdateUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const editUser = async ( uid, data) => {
        setLoading(true);
        setError(null);

        try{
            const result = await updateUser(uid , data)
            setLoading(false);
            if(result.error || result.data?.error){
                setError(result.message || result.data?.message || "Error al editar usuario");
                return null;
            }

            return result.data || result;

        }catch(e) {
            setLoading(false);
            setError(e.message || "Error al editar usuario");
            return null;
        }
    }
    return { editUser, loading, error };
};

export default useUpdateUser;    