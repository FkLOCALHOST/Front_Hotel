import { useState } from "react";
import { getReservationReceipt } from "../../../services/api";

const useReservationReceipt = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const downloadReceipt = async (uid) => {
        setLoading(true);
        setError(null);
        try {
            const response = await getReservationReceipt(uid);
            if (!response || !response.data) {
                throw new Error("No se pudo descargar el recibo");
            }
            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `recibo_${uid}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError(err.message || "Error al descargar el recibo");
        } finally {
            setLoading(false);
        }
    };

    return { downloadReceipt, loading, error };
};

export default useReservationReceipt;
