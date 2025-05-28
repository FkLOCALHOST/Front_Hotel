import { useState } from 'react';
import { updatePassword } from "../../../services/api";

const useUpdatePassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const changePassword = async (uid, newPassword) => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const result = await updatePassword(uid, { newPassword });

            if (result.error || result.data?.error) {
                setError(result.message || result.data?.message || "Error al actualizar contraseña");
                return false;
            }

            setSuccessMessage(result.message || "Contraseña actualizada");
            return true;
        } catch (e) {
            setError(e.message || "Error al actualizar contraseña");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { changePassword, loading, error, successMessage };
};

export default useUpdatePassword;
