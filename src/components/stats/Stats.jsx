import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const HotelStatsBarChart = ({ data }) => {
    if (!data || Object.keys(data).length === 0) 
        return <p>No hay datos de hoteles disponibles.</p>;

    const chartData = Object.entries(data).map(([hotelName, values]) => ({
        name: hotelName,
        popularidad: values.popularidad,
        reservaciones: values.reservaciones,
    }));

    return (
        <ResponsiveContainer width="80%" height={400}>
            <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="popularidad" fill="#1d3557" name="Popularidad" /> {/* azul oscuro */}
                <Bar dataKey="reservaciones" fill="#457b9d" name="Reservaciones" /> {/* azul claro */}
            </BarChart>
        </ResponsiveContainer>
    );
};

export default HotelStatsBarChart;
