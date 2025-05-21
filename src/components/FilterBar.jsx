import React from "react";
import {
  Flex,
  Input,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import "../assets/styles/filterbar.css";

const FilterBar = () => {
  return (
    <Flex
      className="filter-bar"
      mt="70px"
      position="relative"
      zIndex="1001"
      w="80%"
      maxW="1000px"
      mx="auto"
      py={2}
      px={4}
      bg="white"
      boxShadow="md"
      borderRadius="md"
      align="flex-start"
      justify="space-between"
      mb={8}
    >
      {}
      <FormControl mr={2}>
        <FormLabel fontSize="xs" mb={1}>
          Destino
        </FormLabel>
        <Input size="sm" placeholder="Ciudad, hotel o destino" width="180px" />
      </FormControl>
      {}
      <FormControl mr={2}>
        <FormLabel fontSize="xs" mb={1}>
          Check-in
        </FormLabel>
        <Input size="sm" type="date" width="120px" />
      </FormControl>
      {}
      <FormControl mr={2}>
        <FormLabel fontSize="xs" mb={1}>
          Check-out
        </FormLabel>
        <Input size="sm" type="date" width="120px" />
      </FormControl>
      {}
      <FormControl mr={2}>
        <FormLabel fontSize="xs" mb={1}>
          Huéspedes
        </FormLabel>
        <NumberInput size="sm" defaultValue={2} min={1} width="60px">
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      {}
      <FormControl mr={2}>
        <FormLabel fontSize="xs" mb={1}>
          Habitaciones
        </FormLabel>
        <NumberInput size="sm" defaultValue={1} min={1} width="60px">
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      {}
      <Button size="md" alignSelf="flex-end" px={8} py={5}>
        Buscar
      </Button>
    </Flex>
  );
};

export default FilterBar;
