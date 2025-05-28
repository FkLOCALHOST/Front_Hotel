import React, { useState } from 'react';
import HotelStatsBarChart from '../../components/stats/Stats';
import RoomStatsBarChart from '../../components/stats/StatsRoom';
import Navbar from "../../components/navbar";
import SimpleFooter from '../../components/footer';
import useGetStats from "../../shared/hooks/stats/useGetStats";
import '../../assets/styles/stats/stats.css';

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
            <div className="stats-container">
                <h1>Estadísticas</h1>
                <div className="stats-tabs">
                    <button
                        onClick={() => handleTabChange('hotel')}
                        className={`stats-tab-btn${activeTab === 'hotel' ? ' active' : ''}`}
                    >
                        Hoteles
                    </button>
                    <button
                        onClick={() => handleTabChange('room')}
                        className={`stats-tab-btn${activeTab === 'room' ? ' active' : ''}`}
                    >
                        Cuartos
                    </button>
                </div>
                <div className="stats-content">
                    {renderContent()}
                </div>
            </div>
            <SimpleFooter />
        </>
    );
};

export default Stats;

