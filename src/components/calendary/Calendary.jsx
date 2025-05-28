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

const Calendary = ({ roomId, selectedDate, onSelect, label}) => {
    const { unavailableDates, loading, error } = useUnavailableDates(roomId);
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef();

    useOutsideClick({
        ref,
        handler: () => setIsOpen(false),
    });

    const disabledDates = unavailableDates.map((date) => new Date(date));

    return (
        <VStack align="start" spacing={2} position="relative" width="100%" className="calendary-container">
            <Text fontWeight="bold" className="calendary-label" style={{position: "relative", left: "25px"}}>{label}</Text>
            <Button
                variant="outline"
                onClick={() => setIsOpen(!isOpen)}
                width="100%"
                className="calendary-button"
            >
                {selectedDate
                    ? format(selectedDate, "PPP", { locale: es })
                    : "Fecha"}
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
                        disabled={disabledDates}
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
