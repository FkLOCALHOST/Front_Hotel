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
        <VStack align="start" spacing={2} position="relative" width="100%">
            <Text fontWeight="bold">Fecha de reserva:</Text>

            <Button
                variant="outline"
                onClick={() => setIsOpen(!isOpen)}
                width="100%"
            >
                {selectedDate
                    ? format(selectedDate, "PPP", { locale: es })
                    : "Selecciona una fecha"}
            </Button>

            {isOpen && (
                <Box
                    ref={ref}
                    position="absolute"
                    top="100%"
                    zIndex="10"
                    mt={2}
                    border="1px solid #ccc"
                    borderRadius="md"
                    bg="white"
                    boxShadow="md"
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
                        classNames={{
                            day: "rdp-day",
                            day_selected: "rdp-day_selected",
                            day_disabled: "rdp-day_disabled",
                            caption_label: "rdp-caption_label",
                            nav_button: "rdp-nav_button",
                            head_cell: "rdp-head_cell",
                        }}
                        styles={{
                            head_cell: {color: "#000000 !important"},
                        }}
                    />
                </Box>
            )}

            {loading && <Text fontSize="sm">Cargando fechas...</Text>}
            {error && <Text fontSize="sm" color="red.500">Error: {error}</Text>}
        </VStack>
    );
};

export default Calendary;
