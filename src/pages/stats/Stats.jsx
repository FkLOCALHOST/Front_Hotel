import React, { useState } from 'react';
import HotelStatsBarChart from '../../components/stats/Stats';
import RoomStatsBarChart from '../../components/stats/StatsRoom';
import Navbar from "../../components/navbar";
import SimpleFooter from '../../components/footer';
import useGetStats from "../../shared/hooks/stats/useGetStats";

export const Stats = () => {
    const [activeTab, setActiveTab] = useState('hotel');
    const { hotelStats, roomStats, loading, error, refetch } = useGetStats();

    const handleTabChange = (tab) => {
        if (tab !== activeTab) {
            setActiveTab(tab);
            refetch();
        }
    };

    const renderContent = () => {
        if (loading) return <p>Cargando estadísticas...</p>;
        if (error) return <p>{error}</p>;

        if (activeTab === 'hotel') {
            if (!hotelStats || Object.keys(hotelStats).length === 0)
                return <p>No hay datos de hoteles disponibles.</p>;
            return <HotelStatsBarChart data={hotelStats} />;
        }

        if (activeTab === 'room') {
            if (!roomStats || Object.keys(roomStats).length === 0)
                return <p>No hay datos de cuartos disponibles.</p>;
            return <RoomStatsBarChart data={roomStats} />;
        }

        return <p>Selecciona una pestaña para ver estadísticas</p>;
    };

    return (
        <>
            <Navbar />
            <div style={{ marginTop: "120px", textAlign: "center" }}>
                <h1>Estadísticas</h1>
                <div style={{ marginBottom: "50px" }}>
                    <button
                        onClick={() => handleTabChange('hotel')}
                        style={{
                            marginRight: "10px",
                            padding: "10px 20px",
                            backgroundColor: activeTab === 'hotel' ? '#4CAF50' : '#ccc',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Hoteles
                    </button>
                    <button
                        onClick={() => handleTabChange('room')}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: activeTab === 'room' ? '#4CAF50' : '#ccc',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Cuartos
                    </button>
                </div>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    padding: "0 20px"
                }}>
                    {renderContent()}
                </div>
            </div>
            <SimpleFooter />
        </>
    );
};


export default Stats;

