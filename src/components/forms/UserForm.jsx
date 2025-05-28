import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useUpdateUser from "../../shared/hooks/user/useUpdateUser.jsx";
import useUpdatePassword from "../../shared/hooks/user/useUpdatePassword.jsx";
import "../../assets/styles/user/userForm.css";
import Navbar from "../navbar.jsx";
import SimpleFooter from "../footer.jsx";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
  validateName,
  validateNameMessage,
  validateUsername,
  validateUsernameMessage,
  validateEmail,
  validateEmailMessage,
  validatePhone,
  validatePhoneMessage,
  validatecontrasenaT,
  validatecontrasenaTMessage,
} from "../../shared/validators";


const EditProfileForm = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const editMode = props.editMode ?? location.state?.editMode ?? true;
  const userData = props.user ?? location.state?.user ?? null;
  const onSubmit = props.onSubmit ?? null;
  const onCancel = props.onCancel ?? null;

  const { editUser, loading: loadingUpdate } = useUpdateUser();
  const { changePassword, loading: loadingPassword } = useUpdatePassword();
  const [form, setForm] = useState({
    name: "",
    surname: "",
    userName: "",
    email: "",
    phone: "",
  });

  const [formState, setFormState] = useState({
    name: { value: "", isValid: false, showError: false },
    surname: { value: "", isValid: false, showError: false },
    userName: { value: "", isValid: false, showError: false },
    email: { value: "", isValid: false, showError: false },
    phone: { value: "", isValid: false, showError: false },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordState, setPasswordState] = useState({
    value: "",
    isValid: false,
    showError: false,
  });
  
  useEffect(() => {
    if (editMode && userData) {
      const newForm = {
        name: userData.name || "",
        surname: userData.surname || "",
        userName: userData.userName || "",
        email: userData.email || "",
        phone: userData.phone || "",
      };
      setForm(newForm);
      
      setFormState({
        name: { value: newForm.name, isValid: validateName(newForm.name), showError: false },
        surname: { value: newForm.surname, isValid: validateName(newForm.surname), showError: false },
        userName: { value: newForm.userName, isValid: validateUsername(newForm.userName), showError: false },
        email: { value: newForm.email, isValid: validateEmail(newForm.email), showError: false },
        phone: { value: newForm.phone, isValid: validatePhone(newForm.phone), showError: false },
      });
    }
  }, [editMode, userData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    // Validation logic
    if (formState[name]) {
      let isValid = false;
      switch (name) {
        case "name":
        case "surname":
          isValid = validateName(value);
          break;
        case "userName":
          isValid = validateUsername(value);
          break;
        case "email":
          isValid = validateEmail(value);
          break;
        case "phone":
          isValid = validatePhone(value);
          break;
        default:
          break;
      }
      
      setFormState((prevState) => ({
        ...prevState,
        [name]: {
          ...prevState[name],
          value,
          isValid,
          showError: prevState[name].showError && !isValid,
        },      }));
    }
  }


  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setPendingSubmit(true);
    onOpen();
  };

  const confirmUpdate = async () => {
  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case "name":
      case "surname":
        isValid = validateName(value);
        break;
      case "userName":
        isValid = validateUsername(value);
        break;
      case "email":
        isValid = validateEmail(value);
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

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    setPasswordState({
      value,
      isValid: validatecontrasenaT(value),
      showError: passwordState.showError && !validatecontrasenaT(value),
    });
  };

  const handlePasswordValidationOnBlur = (value) => {
    const isValid = validatecontrasenaT(value);
    setPasswordState((prevState) => ({
      ...prevState,
      isValid,
      showError: !isValid,
    }));
  };
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    

    const isFormValid = 
      formState.name.isValid &&
      formState.surname.isValid &&
      formState.userName.isValid &&
      formState.email.isValid &&
      formState.phone.isValid;

    if (!isFormValid) {
      const newFormState = { ...formState };
      Object.keys(newFormState).forEach(field => {
        if (!newFormState[field].isValid) {
          newFormState[field].showError = true;
        }
      });
      setFormState(newFormState);
      alert("Por favor corrige los errores en el formulario.");
      return;
    }


    setPendingSubmit(false);
  };


  

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword) return;

    // Validate password
    if (!passwordState.isValid) {
      setPasswordState(prev => ({ ...prev, showError: true }));
      alert("Por favor ingresa una contraseña válida.");
      return;
    }

    const success = await changePassword(userData?.uid, newPassword);

    if (success) {
      toast({
        title: "Contraseña actualizada correctamente.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
        containerStyle: { color: "#fff" },
      });
      setNewPassword("");
      setPasswordState({
        value: "",
        isValid: false,
        showError: false,
      });
    } else {
      toast({
        title: "Error al actualizar contraseña.",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top",
        containerStyle: { color: "#fff" },
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="hotel-form-container" style={{ marginTop: "120px" }}>
        <h2 className="hotel-form-title">Editar Perfil</h2>        <form className="hotel-form" onSubmit={handleProfileSubmit}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'name')}
              required
            />
            {formState.name.showError && (
              <span className="validation-error">
                {validateNameMessage}
              </span>
            )}
          </div>
          <div>
            <label>Apellido:</label>
            <input
              type="text"
              name="surname"
              value={form.surname}
              onChange={handleChange}
              onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'surname')}
              required
            />
            {formState.surname.showError && (
              <span className="validation-error">
                {validateNameMessage}
              </span>
            )}
          </div>
          <div>
            <label>Nombre de usuario:</label>
            <input
              type="text"
              name="userName"
              value={form.userName}
              onChange={handleChange}
              onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'userName')}
              required
            />
            {formState.userName.showError && (
              <span className="validation-error">
                {validateUsernameMessage}
              </span>
            )}
          </div>
          <div>
            <label>Teléfono:</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'phone')}
              required
            />
            {formState.phone.showError && (
              <span className="validation-error">
                {validatePhoneMessage}
              </span>
            )}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'email')}
              required
            />
            {formState.email.showError && (
              <span className="validation-error">
                {validateEmailMessage}
              </span>
            )}
          </div>
          <button 
            type="submit" 
            disabled={
              loadingUpdate ||
              !(formState.name.isValid &&
                formState.surname.isValid &&
                formState.userName.isValid &&
                formState.email.isValid &&
                formState.phone.isValid)
            }
          >
            {loadingUpdate ? "Guardando..." : "Guardar Cambios"}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>
              Cancelar
            </button>
          )}
        </form>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={() => {
            setPendingSubmit(false);
            onClose();
          }}
        >
          <AlertDialogOverlay>
            <AlertDialogContent bg="#232323" color="#fff">
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Confirmar actualización
              </AlertDialogHeader>
              <AlertDialogBody>
                ¿Estás seguro de que deseas actualizar tus datos?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={() => { setPendingSubmit(false); onClose(); }} bg="#333" color="#fff" _hover={{ bg: "#444" }}>
                  Cancelar
                </Button>
                <Button colorScheme="teal" onClick={confirmUpdate} ml={3} isLoading={loadingUpdate}>
                  Sí, actualizar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        <h2 className="hotel-form-title" style={{ marginTop: "50px" }}>
          Cambiar Contraseña
        </h2>        <form className="hotel-form" onSubmit={handlePasswordSubmit}>
          <div>
            <label>Nueva Contraseña:</label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handlePasswordChange}
              onBlur={(e) => handlePasswordValidationOnBlur(e.target.value)}
              required
            />
            {passwordState.showError && (
              <span className="validation-error">
                {validatecontrasenaTMessage}
              </span>
            )}
          </div>
          <button 
            type="submit" 
            disabled={loadingPassword || !passwordState.isValid || !newPassword}
          >
            {loadingPassword ? "Actualizando..." : "Cambiar Contraseña"}
          </button>
        </form>
      </div>
      <SimpleFooter />
    </>
  )
}

export default EditProfileForm;