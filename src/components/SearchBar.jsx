import React, { useState } from "react";
import { Flex, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";
import "../assets/styles/searchbar.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  return (
    <Flex className="search-bar">
      <FormControl flex="1">
        <FormLabel fontSize="xs" mb={1} hidden>
          Buscar
        </FormLabel>
        <Input
          size="sm"
          placeholder="Ciudad, hotel o destino"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </FormControl>
      <Button size="sm" ml={2} onClick={() => onSearch(searchTerm)}>
        Buscar
      </Button>
    </Flex>
  );
};

export default SearchBar;
