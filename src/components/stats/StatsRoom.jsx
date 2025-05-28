import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import useGetStats from "../../shared/hooks/stats/useGetStats";

const RoomStatsBarChart = () => {
    const { roomStats, loading, error } = useGetStats();

    if (loading) return <p>Cargando estadísticas...</p>;
    if (error) return <p>{error}</p>;
    if (!roomStats || Object.keys(roomStats).length === 0) return <p>No hay datos de cuartos disponibles.</p>;

    const data = Object.entries(roomStats).map(([roomName, values]) => ({
        name: roomName,
        popularidad: values.popularidad,
        reservaciones: values.reservaciones
    }));

    return (
        <ResponsiveContainer width="80%" height={400}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="popularidad" fill="#1d3557" name="Popularidad" />
                <Bar dataKey="reservaciones" fill="#457b9d" name="Reservaciones" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default RoomStatsBarChart;
