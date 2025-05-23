import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Flex, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";
import "../assets/styles/searchbar.css";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  let isAdmin = false;
  try {
    const userStr = localStorage.getItem("User");
    if (userStr) {
      const user = JSON.parse(userStr);
      const role = user.userDetails?.role;
      isAdmin = role === "ADMIN_ROLE";
    }
  } catch (e) {
    isAdmin = false;
  }

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

  const handleAddClick = () => {
    if (location.pathname.includes("/eventos")) {
      navigate("registrar-evento");
    } else if (location.pathname.includes("/hoteles")) {
      navigate("registrar-hotel");
    } else if (location.pathname.includes("/habitaciones")) {
      console.log("Agregar habitacion");
    } else {
      console.log("Ruta no reconocida:", location.pathname);
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
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </FormControl>
      <Button size="sm" ml={2} onClick={handleSearch}>
        Buscar
      </Button>
      {isAdmin && (
        <>
          <Button size="sm" ml={2} onClick={handleAddClick}>
            Agregar
          </Button>
        </>
      )}
    </Flex>
  );
};

export default SearchBar;
