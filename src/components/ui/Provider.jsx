import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const chakraTheme = extendTheme({
  //Personalización del tema aqui (no se q es)
});

export const Provider = ({ children }) => {
  return <ChakraProvider theme={chakraTheme}>{children}</ChakraProvider>;
};
