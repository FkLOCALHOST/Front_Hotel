import React, { useState, useEffect } from "react";
import useAddRooms from "@/shared/hooks/rooms/useAddRooms";
import useGetHotel from "../../shared/hooks/useGetHotel";
import useGetAmenities from "../../shared/hooks/amenity/useGetAmenity";
import { useToast } from "@chakra-ui/react";
import Navbar from "../navbar";
import SimpleFooter from "../footer";
import "../../assets/styles/forms/forms.css";

const RoomForm = () => {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        capacity: "",
        hotel: "",
        amenity: "",
        number: "",
    });

    const [images, setImages] = useState([]);
    const toast = useToast();
    const { addRoom, loading, error } = useAddRooms();
    const { hotels, loading: loadingHotels, error: errorHotels } = useGetHotel();
    const { fetchAmenities, amenities, loading: loadingAmenities, error: errorAmenities } = useGetAmenities();

    useEffect(() => {
        fetchAmenities();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        const withPreview = droppedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setImages((prev) => [...prev, ...withPreview]);
    };

    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value);
        });

        images.forEach((img) => {
            formData.append("preView", img.file);
        });

        const response = await addRoom(formData);

        if (response) {
            toast({
                title: "Habitación registrada",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setForm({
                name: "",
                description: "",
                price: "",
                capacity: "",
                hotel: "",
                amenity: "",
                number: "",
            });
            setImages([]);
        } else {
            toast({
                title: "Error al registrar habitación",
                description: error || "Inténtalo de nuevo.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Navbar />
            <div className="form-center-container" style={{
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <div className="login-container-Event">
                    <div className="login-content event-form-content">
                        <h1 className="login-title" style={{ textAlign: "center" }}>
                            Registrar Habitación
                        </h1>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <div className="input-group"><input type="text" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required /></div>
                            <div className="input-group"><textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} required className="event-description" /></div>
                            <div className="input-group"><input type="number" name="price" placeholder="Precio" value={form.price} onChange={handleChange} required /></div>
                            <div className="input-group"><input type="number" name="capacity" placeholder="Capacidad" value={form.capacity} onChange={handleChange} required /></div>
                            <div className="input-group"><input type="text" name="number" placeholder="Número" value={form.number} onChange={handleChange} required /></div>
                            <div className="input-group">
                                <select name="hotel" value={form.hotel} onChange={handleChange} required className="event-select" disabled={loadingHotels}>
                                    <option value="">Selecciona un hotel</option>
                                    {loadingHotels ? <option>Cargando...</option> : errorHotels ? <option>Error</option> : hotels.map(h => (
                                        <option key={h.uid} value={h.uid}>{h.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <select name="amenity" value={form.amenity} onChange={handleChange} required className="event-select" disabled={loadingAmenities}>
                                    <option value="">Selecciona un amenity</option>
                                    {loadingAmenities ? <option>Cargando...</option> : errorAmenities ? <option>Error</option> : amenities.map(a => (
                                        <option key={a.uid} value={a.uid}>{a.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div
                                onDrop={handleDrop}
                                onDragOver={(e) => e.preventDefault()}
                                className="drop-zone"
                                style={{
                                    border: "2px dashed #aaa",
                                    padding: "20px",
                                    textAlign: "center",
                                    marginBottom: "1rem",
                                    borderRadius: "10px",
                                }}
                            >
                                <p>Arrastra y suelta imágenes aquí (max 5)</p>
                                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
                                    {images.map((img, idx) => (
                                        <div key={idx} style={{ position: "relative" }}>
                                            <img src={img.preview} alt={`preview-${idx}`} style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }} />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                style={{
                                                    position: "absolute",
                                                    top: "-5px",
                                                    right: "-5px",
                                                    background: "red",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "50%",
                                                    width: "20px",
                                                    height: "20px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button type="submit" className="login-button" disabled={loading}>
                                {loading ? "Registrando..." : "Registrar Habitación"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <SimpleFooter />
        </>
    );
};

export default RoomForm;
