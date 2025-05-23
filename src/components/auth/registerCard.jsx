import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  chakra,
  Box,
  FormControl,
  Avatar,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { register } from '../../services/api';
import "../../assets/styles/auth/register.css";
import { useNavigate } from "react-router-dom";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Register = ({ switchAuthHandler }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [userName, setUserName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleShowConfirmClick = () => setShowConfirmPassword(!showConfirmPassword);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const response = await register({
      name,
      surname,
      userName,
      profilePicture,
      email,
      password,
      phone
    });

    if (response.error) {
      setError('Ocurrió un problema al registrar. Pruebe otra vez');
    } else {
      setSuccess('¡Registro exitoso! Ya puedes iniciar sesión');
      setName('');
      setSurname('');
      setUserName('');
      setProfilePicture('');
      setEmail('');
      setPassword('');
      setPhone('');
      setTimeout(() => {
        navigate("/auth/login");
      }, 1500);
    }
  };

  return (
    <Flex className="register-page">
      <Stack className="register-container">
        <Avatar className="avatar" src={profilePicture} borderRadius="full"/>
        <Heading>Registro LocalHotel</Heading>
        {error && <Box className="error-message">{error}</Box>}
        {success && <Box className="success-message">{success}</Box>}
        <form className="register-form" onSubmit={handleRegister}>
          <Flex flexDirection="row" gap={4}>
            <FormControl>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input-field"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
                  className="input-field"
                />
              </InputGroup>
            </FormControl>
          </Flex>
          <Flex flexDirection="row" gap={4}>
            <FormControl>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="User Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  className="input-field"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="input-field"
                />
              </InputGroup>
            </FormControl>
          </Flex>
          <FormControl>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                />
                <span
                  className="eye-icon"
                  onClick={handleShowClick}
                  style={{ right: 16, top: "50%", position: "absolute", transform: "translateY(-50%)" }}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="input-field"
                />
                <span
                  className="eye-icon"
                  onClick={handleShowConfirmClick}
                  style={{ right: 16, top: "50%", position: "absolute", transform: "translateY(-50%)" }}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </InputGroup>
            </FormControl>
          <FormControl mt={4} mb={2}>
            <label
              htmlFor="image-upload"
              className="image-upload-label"
            >
              Subir foto de perfil
            </label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              display="none"
            />
          </FormControl>
          <Button
            className="input-button"
            type="submit"
            width="full"
            mt={2}
          >
            Registrarse
          </Button>
        </form>
        <Box>
          Ya tienes una cuenta{' '}
          <Button variant="link" colorScheme="teal" onClick={() => navigate("/auth/login")}>
            Login
          </Button>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
