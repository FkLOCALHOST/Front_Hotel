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
                <Bar dataKey="popularidad" fill="#8884d8" name="Popularidad" />
                <Bar dataKey="reservaciones" fill="#82ca9d" name="Reservaciones" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default HotelStatsBarChart;
