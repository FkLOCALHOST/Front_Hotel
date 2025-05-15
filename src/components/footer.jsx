import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  chakra,
  IconButton,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ReactNode } from "react";

const Logo = () => {
  return (
    <Text fontWeight="bold" fontSize="xl">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/25/25694.png" 
        alt="logo"
        width="40"
        height="40"
        style={{ display: "inline", verticalAlign: "middle", marginRight: "8px" }}/>
      MiSitio
    </Text>
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded="full"
      w={8}
      h={8}
      cursor="pointer"
      as="a"
      href={href}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s ease"
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const SimpleFooter = () => {
  return (
    <Box
      bg={useColorModeValue("red.100", "red.900")}
      color={useColorModeValue("blue.700", "blue.200")}
      mt={10}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Logo />
        <Stack direction={"row"} spacing={6}>
          <a href="#">Inicio</a>
          <a href="#">Hoteles</a>
          <a href="#">Reservaciones</a>
          <a href="#">Eventos</a>
          <a href="#">Favoritos</a>
          <a href="#">Manual de Usuario</a>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("red.200", "red.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>
            © {new Date().getFullYear()} MiSitio. Todos los derechos reservados.
          </Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton label={"Twitter"} href={"#"}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={"YouTube"} href={"#"}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={"Instagram"} href={"#"}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default SimpleFooter;
