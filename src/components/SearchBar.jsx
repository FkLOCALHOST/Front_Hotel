import React, { useState } from "react";
import { Flex, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";
import "../assets/styles/searchbar.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <Flex className="search-bar" align="center">
      <FormControl flex="1">
        <FormLabel fontSize="xs" mb={1} hidden>
          Buscar
        </FormLabel>
        <Input
          size="sm"
          placeholder="Buscar habitaciones..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </FormControl>
      <Button size="sm" ml={2} onClick={handleSearch}>
        Buscar
      </Button>
    </Flex>
  );
};

export default SearchBar;
