import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  FormControl,
  Avatar,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { register } from '../../services/api';
import "../../assets/styles/auth/register.css";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validateEmailMessage,
  validatecontrasenaT,
  validatecontrasenaTMessage,
  validateConfirmPassword,
  validateConfirmPasswordMessage,
  validateUsername,
  validateUsernameMessage,
  validateName,
  validateNameMessage,
  validatePhone,
  validatePhoneMessage,
} from '../../shared/validators';

const Register = () => {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [formState, setFormState] = useState({
    name: {
      value: "",
      isValid: false,
      showError: false,
    },
    surname: {
      value: "",
      isValid: false,
      showError: false,
    },
    userName: {
      value: "",
      isValid: false,
      showError: false,
    },
    email: {
      value: "",
      isValid: false,
      showError: false,
    },
    password: {
      value: "",
      isValid: false,
      showError: false,
    },
    confirmPassword: {
      value: "",
      isValid: false,
      showError: false,
    },
    phone: {
      value: "",
      isValid: false,
      showError: false,
    },
  });

  const handleShowClick = () => setShowPassword(!showPassword);
  const handleShowConfirmClick = () => setShowConfirmPassword(!showConfirmPassword);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value,
      },
    }));
  };

  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case "name":
        isValid = validateName(value);
        break;
      case "surname":
        isValid = validateName(value);
        break;
      case "userName":
        isValid = validateUsername(value);
        break;
      case "email":
        isValid = validateEmail(value);
        break;
      case "password":
        isValid = validatecontrasenaT(value);
        break;
      case "confirmPassword":
        isValid = validateConfirmPassword(formState.password.value, value);
        break;
      case "phone":
        isValid = validatePhone(value);
        break;
      default:
        break;
    }
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        isValid,
        showError: !isValid,
      },
    }));
  };
  const isSubmitDisabled = 
    isLoading ||
    !formState.name.isValid ||
    !formState.surname.isValid ||
    !formState.userName.isValid ||
    !formState.email.isValid ||
    !formState.password.isValid ||
    !formState.confirmPassword.isValid ||
    !formState.phone.isValid;
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isSubmitDisabled) {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('name', formState.name.value);
      formData.append('surname', formState.surname.value);
      formData.append('userName', formState.userName.value);
      formData.append('email', formState.email.value);
      formData.append('password', formState.password.value);
      formData.append('phone', formState.phone.value);
      if (profilePicture) {
        formData.append('profilePicture', profilePicture); 
      }

      const response = await register(formData);

      setIsLoading(false);

      if (response.error) {
        setError('Ocurrió un problema al registrar. Pruebe otra vez');
      } else {
        setSuccess('¡Registro exitoso! Ya puedes iniciar sesión');
        setFormState({
          name: { value: "", isValid: false, showError: false },
          surname: { value: "", isValid: false, showError: false },
          userName: { value: "", isValid: false, showError: false },
          email: { value: "", isValid: false, showError: false },
          password: { value: "", isValid: false, showError: false },
          confirmPassword: { value: "", isValid: false, showError: false },
          phone: { value: "", isValid: false, showError: false },
        });
        setProfilePicture(null);
        navigate("/auth/login");
      }
    }
  };
  return (
    <Flex className="register-page">
      <Stack className="register-container">
        <Avatar className="avatar" src={profilePreview} borderRadius="full"/>
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
                  value={formState.name.value}
                  onChange={(e) => handleInputValueChange(e.target.value, 'name')}
                  onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'name')}
                  required
                  className="input-field"
                />
              </InputGroup>
              {formState.name.showError && (
                <div className="error-text">
                  {validateNameMessage}
                </div>
              )}
            </FormControl>
            <FormControl>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Surname"
                  value={formState.surname.value}
                  onChange={(e) => handleInputValueChange(e.target.value, 'surname')}
                  onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'surname')}
                  required
                  className="input-field"
                />
              </InputGroup>
              {formState.surname.showError && (
                <div className="error-text">
                  {validateNameMessage}
                </div>
              )}
            </FormControl>
          </Flex>          
          <div className="form-row">
            <FormControl>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="User Name"
                  value={formState.userName.value}
                  onChange={(e) => handleInputValueChange(e.target.value, 'userName')}
                  onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'userName')}
                  required
                  className="input-field"
                />
              </InputGroup>
              {formState.userName.showError && (
                <div className="error-text">
                  {validateUsernameMessage}
                </div>
              )}
            </FormControl>            <FormControl>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Phone"
                  value={formState.phone.value}
                  onChange={(e) => handleInputValueChange(e.target.value, 'phone')}
                  onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'phone')}
                  required
                  className="input-field"
                />
              </InputGroup>
              {formState.phone.showError && (
                <div className="error-text">
                  {validatePhoneMessage}
                </div>
              )}
            </FormControl>
          </div>          <FormControl>
              <InputGroup>
                <Input
                  type="email"
                  placeholder="Email"
                  value={formState.email.value}
                  onChange={(e) => handleInputValueChange(e.target.value, 'email')}
                  onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'email')}
                  required
                  className="input-field"
                />
              </InputGroup>
              {formState.email.showError && (
                <div className="error-text">
                  {validateEmailMessage}
                </div>
              )}
            </FormControl>            <FormControl>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formState.password.value}
                  onChange={(e) => handleInputValueChange(e.target.value, 'password')}
                  onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'password')}
                  required
                  className="input-field"
                />                <span
                  className="eye-icon"
                  onClick={handleShowClick}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </InputGroup>
              {formState.password.showError && (
                <div className="error-text">
                  {validatecontrasenaTMessage}
                </div>
              )}
            </FormControl>            <FormControl>
              <InputGroup>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formState.confirmPassword.value}
                  onChange={(e) => handleInputValueChange(e.target.value, 'confirmPassword')}
                  onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'confirmPassword')}
                  required
                  className="input-field"
                />                <span
                  className="eye-icon"
                  onClick={handleShowConfirmClick}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </InputGroup>
              {formState.confirmPassword.showError && (
                <div className="error-text">
                  {validateConfirmPasswordMessage}
                </div>
              )}
            </FormControl>          <FormControl className="form-control">
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
            className="submit-button"
            type="submit"
            disabled={isSubmitDisabled}
            isLoading={isLoading}
            loadingText="Registrando..."
          >
            Registrarse
          </Button>
        </form>        <div className="login-link-box">
          Ya tienes una cuenta{' '}
          <button className="login-link" onClick={() => navigate("/auth/login")}>
            Login
          </button>
        </div>
      </Stack>
    </Flex>
  );
};

export default Register;
