import React, { useState, useRef } from "react";
import {
    Box,
    Button,
    Text,
    VStack,
    useOutsideClick,
} from "@chakra-ui/react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../../assets/styles/calendary/style.css";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import useUnavailableDates from "../../shared/hooks/reservation/useUnavailableDates";

const Calendary = ({ roomId, selectedDate, onSelect }) => {
    const { unavailableDates, loading, error } = useUnavailableDates(roomId);
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef();

    useOutsideClick({
        ref,
        handler: () => setIsOpen(false),
    });

    const parsedUnavailableDates = unavailableDates.map((d) => new Date(d));

    return (
        <VStack align="start" spacing={2} position="relative" width="100%" className="calendary-container">
            <Text fontWeight="bold" className="calendary-label">Fecha de reserva:</Text>

            <Button
                variant="outline"
                onClick={() => setIsOpen(!isOpen)}
                width="100%"
                className="calendary-button"
            >
                {selectedDate
                    ? format(selectedDate, "PPP", { locale: es })
                    : "Selecciona una fecha"}
            </Button>

            {isOpen && (
                <Box
                    ref={ref}
                    className="calendary-dropdown"
                >
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                            onSelect(date);
                            setIsOpen(false);
                        }}
                        disabled={parsedUnavailableDates}
                        locale={es}
                    />
                </Box>
            )}

            {loading && <Text fontSize="sm" className="calendary-loading">Cargando fechas...</Text>}
            {error && <Text fontSize="sm" className="calendary-error">Error: {error}</Text>}
        </VStack>
    );
};

export default Calendary;
