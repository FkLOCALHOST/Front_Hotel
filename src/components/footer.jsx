import {
  Box,
  Container,
  Stack,
  Text,
  VisuallyHidden,
  chakra,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "../assets/styles/footer.css";
import logoConTexto from "../assets/images/logo_blanco.png";

const Logo = () => {
  return <img src={logoConTexto} alt="HostHotels" className="logo" />;
};

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button as="a" href={href} className="social-button">
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const SimpleFooter = () => {
  return (
    <Box className="footer">
      <Container className="footer-container">
        <Logo />
        <Stack direction="row" spacing={6} className="nav-links">
          <a href="#">Inicio</a>
          <a href="#">Nosotros</a>
          <a href="#">Servicios</a>
          <a href="#">Contacto</a>
        </Stack>
      </Container>

      <Box className="footer-bottom">
        <Text fontSize="sm">
          © {new Date().getFullYear()} LocalHost. Todos los derechos reservados.
        </Text>
        <Stack direction="row" spacing={6} className="social-buttons">
          <SocialButton
            label="Twitter"
            href="https://x.com/LocalHost_Hotel?t=ITXUVcWQejJg9Of-gVW2_g&s=09"
          >
            <FaTwitter />
          </SocialButton>
          <SocialButton label="YouTube" href="#">
            <FaYoutube />
          </SocialButton>
          <SocialButton
            label="Instagram"
            href="https://www.instagram.com/localhost_hotel?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          >
            <FaInstagram />
          </SocialButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default SimpleFooter;
